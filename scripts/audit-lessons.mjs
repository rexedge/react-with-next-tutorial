/**
 * Lesson code audit.
 *
 * Lesson prose is MDX, so the code samples inside it are never compiled and the
 * build cannot catch mistakes in them. This script parses every fenced code
 * block in `content/lessons/` and reports the two failure modes that actually
 * bit us while writing Tier 0:
 *
 *   1. An identifier used but never introduced - a `topics` that appears from
 *      nowhere. The student assumes they missed something earlier.
 *   2. The same name declared twice inside one block, which would be a real
 *      error if it were pasted into a file.
 *
 * Plus syntax errors, which are free once the code is parsed anyway.
 *
 * Names accumulate across a lesson in reading order, so a later block may use
 * something an earlier block defined - that is how lessons are written. To
 * exempt a block deliberately, tag its fence: ```ts no-audit
 *
 * Run with: pnpm audit:lessons
 */

import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";

import ts from "typescript";

const LESSONS_DIR = "content/lessons";
const CODE_LANGS = new Set(["ts", "tsx", "js", "jsx"]);

/** Ambient things a snippet may reference without declaring. */
const GLOBALS = new Set([
  // Language builtins
  "console", "Math", "JSON", "Object", "Array", "String", "Number", "Boolean",
  "Date", "Promise", "Error", "Map", "Set", "Symbol", "BigInt", "RegExp",
  "parseInt", "parseFloat", "isNaN", "undefined", "null", "NaN", "Infinity",
  "globalThis", "structuredClone",
  // Browser / runtime
  "window", "document", "fetch", "localStorage", "sessionStorage", "navigator",
  "setTimeout", "clearTimeout", "setInterval", "clearInterval", "alert",
  "requestAnimationFrame", "cancelAnimationFrame", "URL", "URLSearchParams",
  "AbortController", "FormData", "process",
  // React
  "React", "useState", "useEffect", "useRef", "useMemo", "useCallback",
  "useReducer", "useContext", "useTransition", "useOptimistic",
  "useActionState", "useSyncExternalStore", "useId", "use", "createContext",
  "memo", "forwardRef", "Suspense", "Fragment", "StrictMode", "ReactNode",
  "ComponentType", "PropsWithChildren", "FormEvent", "ChangeEvent",
  "MouseEvent", "KeyboardEvent",
  // Next.js ambient / generated
  "Link", "Image", "Metadata", "PageProps", "LayoutProps", "RouteContext",
  "notFound", "redirect", "revalidatePath", "revalidateTag", "cookies",
  "headers", "NextRequest", "NextResponse",
  // TypeScript-only type names that appear bare in examples
  "Partial", "Pick", "Omit", "Record", "Readonly", "Awaited", "Exclude",
  // DOM types that show up in event-handler annotations
  "Element", "Node", "Event", "HTMLElement", "EventTarget",
]);

/**
 * Ambient DOM interfaces are too numerous to list - `HTMLInputElement`,
 * `SVGPathElement`, `KeyboardEvent` and so on. Match them by shape instead.
 */
const AMBIENT_TYPE = /^(HTML|SVG)\w*Element$|^\w*Event$/;

function walkFiles(dir) {
  const out = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) out.push(...walkFiles(full));
    else if (entry.endsWith(".mdx")) out.push(full);
  }
  return out;
}

/** Pull fenced code blocks out of MDX, with the line each one starts on. */
function extractBlocks(source) {
  const blocks = [];
  const lines = source.split("\n");
  let open = null;

  lines.forEach((line, index) => {
    const fence = line.match(/^```(\S*)(.*)$/);
    if (!fence) return;

    if (open) {
      blocks.push({ ...open, code: lines.slice(open.start, index).join("\n") });
      open = null;
    } else {
      open = {
        lang: fence[1],
        meta: fence[2].trim(),
        start: index + 1,
        line: index + 1,
      };
    }
  });

  return blocks;
}

const bindingNames = (name, out) => {
  if (ts.isIdentifier(name)) out.add(name.text);
  else if (ts.isObjectBindingPattern(name) || ts.isArrayBindingPattern(name)) {
    for (const el of name.elements) {
      if (ts.isBindingElement(el)) bindingNames(el.name, out);
    }
  }
};

/**
 * True when this Identifier is a *use* of a name rather than a place where a
 * name is being introduced or a property being written.
 */
function isReference(node) {
  const parent = node.parent;
  if (!parent) return false;

  // obj.prop  -> `prop` is not a variable reference
  if (ts.isPropertyAccessExpression(parent) && parent.name === node) return false;
  // { key: value } -> `key` is not a reference
  if (ts.isPropertyAssignment(parent) && parent.name === node) return false;
  if (ts.isPropertySignature(parent) && parent.name === node) return false;
  if (ts.isMethodSignature(parent) && parent.name === node) return false;
  // Declaration sites
  if (ts.isVariableDeclaration(parent) && parent.name === node) return false;
  if (ts.isFunctionDeclaration(parent) && parent.name === node) return false;
  if (ts.isClassDeclaration(parent) && parent.name === node) return false;
  if (ts.isTypeAliasDeclaration(parent) && parent.name === node) return false;
  if (ts.isInterfaceDeclaration(parent) && parent.name === node) return false;
  if (ts.isParameter(parent) && parent.name === node) return false;
  if (ts.isBindingElement(parent) && parent.name === node) return false;
  if (ts.isImportSpecifier(parent) || ts.isImportClause(parent)) return false;
  if (ts.isNamespaceImport(parent)) return false;
  // { a: b } destructuring -> `a` is the source property, not a reference
  if (ts.isBindingElement(parent) && parent.propertyName === node) return false;
  // JSX <div> vs <Component> - lowercase tags are intrinsic elements
  if (
    (ts.isJsxOpeningElement(parent) || ts.isJsxSelfClosingElement(parent) ||
      ts.isJsxClosingElement(parent)) &&
    parent.tagName === node
  ) {
    return /^[A-Z]/.test(node.text);
  }
  if (ts.isJsxAttribute(parent) && parent.name === node) return false;
  // Object shorthand `{ topic }` IS a reference, so it falls through.
  return true;
}

function analyseBlock(code, kind) {
  const sf = ts.createSourceFile("snippet.tsx", code, ts.ScriptTarget.Latest, true, kind);

  const declared = new Set();
  const duplicates = [];
  const referenced = new Map(); // name -> line within block

  const declare = (name, node) => {
    if (declared.has(name)) {
      duplicates.push({
        name,
        line: sf.getLineAndCharacterOfPosition(node.getStart(sf)).line + 1,
      });
    }
    declared.add(name);
  };

  const visit = (node) => {
    if (ts.isVariableDeclaration(node)) {
      const names = new Set();
      bindingNames(node.name, names);
      for (const n of names) declare(n, node);
    } else if (
      (ts.isFunctionDeclaration(node) || ts.isClassDeclaration(node) ||
        ts.isTypeAliasDeclaration(node) || ts.isInterfaceDeclaration(node) ||
        ts.isEnumDeclaration(node)) &&
      node.name
    ) {
      declare(node.name.text, node);
    } else if (ts.isParameter(node)) {
      const names = new Set();
      bindingNames(node.name, names);
      for (const n of names) declared.add(n);
    } else if (ts.isImportDeclaration(node) && node.importClause) {
      const clause = node.importClause;
      if (clause.name) declared.add(clause.name.text);
      if (clause.namedBindings) {
        if (ts.isNamespaceImport(clause.namedBindings)) {
          declared.add(clause.namedBindings.name.text);
        } else {
          for (const el of clause.namedBindings.elements) declared.add(el.name.text);
        }
      }
    } else if (ts.isTypeParameterDeclaration(node)) {
      declared.add(node.name.text);
    }

    if (ts.isIdentifier(node) && isReference(node)) {
      if (!referenced.has(node.text)) {
        referenced.set(
          node.text,
          sf.getLineAndCharacterOfPosition(node.getStart(sf)).line + 1,
        );
      }
    }

    ts.forEachChild(node, visit);
  };

  visit(sf);

  // Syntax errors, via the parser's own diagnostics.
  const syntax = sf.parseDiagnostics.map((d) => ({
    message: ts.flattenDiagnosticMessageText(d.messageText, " "),
    line: sf.getLineAndCharacterOfPosition(d.start ?? 0).line + 1,
  }));

  return { declared, duplicates, referenced, syntax };
}

function auditLesson(file) {
  const source = readFileSync(file, "utf8");
  const blocks = extractBlocks(source);
  const findings = [];
  const knownSoFar = new Set();

  for (const block of blocks) {
    if (!CODE_LANGS.has(block.lang)) continue;
    if (block.meta.includes("no-audit")) continue;

    const kind = block.lang.endsWith("x") ? ts.ScriptKind.TSX : ts.ScriptKind.TS;
    const { declared, duplicates, referenced, syntax } = analyseBlock(block.code, kind);

    for (const err of syntax) {
      findings.push({
        line: block.line + err.line,
        kind: "syntax",
        message: err.message,
      });
    }

    for (const dup of duplicates) {
      findings.push({
        line: block.line + dup.line,
        kind: "duplicate",
        message: `'${dup.name}' is declared twice in the same block`,
      });
    }

    for (const [name, line] of referenced) {
      if (declared.has(name) || knownSoFar.has(name) || GLOBALS.has(name)) continue;
      if (AMBIENT_TYPE.test(name)) continue;
      findings.push({
        line: block.line + line,
        kind: "undefined",
        message: `'${name}' is used but never introduced in this lesson`,
      });
    }

    for (const name of declared) knownSoFar.add(name);
  }

  return findings;
}

const files = walkFiles(LESSONS_DIR).sort();
let total = 0;

for (const file of files) {
  const findings = auditLesson(file);
  if (findings.length === 0) continue;

  total += findings.length;
  console.log(`\n${relative(process.cwd(), file)}`);
  for (const f of findings.sort((a, b) => a.line - b.line)) {
    console.log(`  ${String(f.line).padStart(4)}  [${f.kind}] ${f.message}`);
  }
}

console.log(
  total === 0
    ? `\n✓ ${files.length} lessons audited, no findings.`
    : `\n✗ ${total} finding(s) across ${files.length} lessons.`,
);

process.exit(total === 0 ? 0 : 1);
