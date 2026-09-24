"use client";

/*
 * ============================================================================
 *  Four panels, each showing one thing useState does that surprises people.
 *
 *  Two of them are DELIBERATELY BROKEN. That is the point - click them and
 *  watch them fail, then read the lesson section with the same name.
 * ============================================================================
 */

import { useState } from "react";

export default function UseStateDemo() {
  return (
    <div className="grid gap-4">
      <PlainVariable />
      <StaleSnapshot />
      <UpdaterFunction />
      <MutatingState />
    </div>
  );
}

function Panel({
  title,
  verdict,
  children,
}: {
  title: string;
  verdict: "broken" | "works";
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
      <div className="mb-3 flex items-center gap-2">
        <h3 className="font-medium text-zinc-900 dark:text-zinc-100">{title}</h3>
        <span
          className={`rounded px-2 py-0.5 text-xs font-medium ${
            verdict === "broken"
              ? "bg-rose-500/10 text-rose-700 dark:text-rose-400"
              : "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400"
          }`}
        >
          {verdict}
        </span>
      </div>
      {children}
    </section>
  );
}

const buttonClass =
  "rounded-md border border-zinc-300 px-3 py-1.5 text-sm font-medium hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-800";

/* 1 ------------------------------------------------------------------------
 * A plain variable. It really does change - React just never looks again.
 */
// ESLint objects to this whole component, correctly: "Cannot reassign variable
// after render completes". The rule is switched off here precisely because the
// lesson needs you to watch the mistake fail rather than be prevented from
// making it. Outside a demo, take the rule's advice - it is describing the bug
// this panel exists to show.
/* eslint-disable react-hooks/immutability -- deliberately broken; see the useState lesson */
function PlainVariable() {
  let count = 0;

  function handleClick() {
    count += 1;
    console.log("the variable is now", count);
  }

  return (
    <Panel title="1. A plain variable" verdict="broken">
      <p className="mb-3 font-mono text-2xl text-zinc-900 dark:text-zinc-100">{count}</p>
      <button type="button" onClick={handleClick} className={buttonClass}>
        Add one
      </button>
      <p className="mt-2 text-xs text-zinc-500">
        Open the browser console. The number there climbs; the one above never moves.
      </p>
    </Panel>
  );
}
/* eslint-enable react-hooks/immutability */

/* 2 ------------------------------------------------------------------------
 * Calling the setter twice with a value. Both calls read the same `count`.
 */
function StaleSnapshot() {
  const [count, setCount] = useState(0);

  function addTwice() {
    setCount(count + 1);
    setCount(count + 1);
  }

  return (
    <Panel title="2. Two calls, one value" verdict="broken">
      <p className="mb-3 font-mono text-2xl text-zinc-900 dark:text-zinc-100">{count}</p>
      <button type="button" onClick={addTwice} className={buttonClass}>
        setCount(count + 1) twice
      </button>
      <p className="mt-2 text-xs text-zinc-500">Goes up by one, not two.</p>
    </Panel>
  );
}

/* 3 ------------------------------------------------------------------------
 * The updater form. Each call receives the result of the one before it.
 */
function UpdaterFunction() {
  const [count, setCount] = useState(0);

  function addTwice() {
    setCount((current) => current + 1);
    setCount((current) => current + 1);
  }

  return (
    <Panel title="3. Two calls, updater function" verdict="works">
      <p className="mb-3 font-mono text-2xl text-zinc-900 dark:text-zinc-100">{count}</p>
      <button type="button" onClick={addTwice} className={buttonClass}>
        setCount(c =&gt; c + 1) twice
      </button>
      <p className="mt-2 text-xs text-zinc-500">Goes up by two. Same two clicks.</p>
    </Panel>
  );
}

/* 4 ------------------------------------------------------------------------
 * Changing the array you already have, versus building a new one.
 */
function MutatingState() {
  const [topics, setTopics] = useState(["JSX"]);

  function addByMutating() {
    // Deliberately wrong. The array really does grow - but nothing told React,
    // so nothing re-renders and the screen keeps showing the old result.
    //
    // Adding `setTopics(topics)` here would not save it either: that is the
    // same array React already holds, and React compares by reference.
    topics.push("Another");
  }

  function addByCopying() {
    setTopics([...topics, "Another"]);
  }

  return (
    <Panel title="4. Mutate vs copy" verdict="works">
      <p className="mb-3 font-mono text-sm text-zinc-900 dark:text-zinc-100">
        [{topics.join(", ")}] — {topics.length}{" "}
        {topics.length === 1 ? "item" : "items"}
      </p>
      <div className="flex flex-wrap gap-2">
        <button type="button" onClick={addByMutating} className={buttonClass}>
          push (broken)
        </button>
        <button type="button" onClick={addByCopying} className={buttonClass}>
          spread (works)
        </button>
      </div>
      <p className="mt-2 text-xs text-zinc-500">
        Click <strong>push</strong> a few times — nothing. Then click{" "}
        <strong>spread</strong> once and watch everything you already pushed appear
        at the same time.
      </p>
    </Panel>
  );
}
