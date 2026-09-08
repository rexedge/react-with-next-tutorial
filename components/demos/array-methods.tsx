/*
 * ============================================================================
 *  EDIT THIS FILE. That is what it is for.
 *
 *  Everything you need to change is in the top half, marked "THE DATA" and
 *  "THE TRANSFORMATIONS". The bottom half just puts the results on screen -
 *  you can ignore it until Tier 1, when JSX is taught properly.
 *
 *  Save the file and the browser updates on its own. Break it, undo, try again.
 * ============================================================================
 */

// ----------------------------------------------------------------------------
// THE DATA
// ----------------------------------------------------------------------------

type Session = {
  day: string;
  topic: string;
  minutes: number;
  done: boolean;
};

const sessions: Session[] = [
  { day: "Mon", topic: "JSX", minutes: 45, done: true },
  { day: "Tue", topic: "Props", minutes: 30, done: true },
  { day: "Wed", topic: "State", minutes: 60, done: false },
  { day: "Thu", topic: "Effects", minutes: 25, done: true },
  { day: "Fri", topic: "Routing", minutes: 90, done: false },
];

// ----------------------------------------------------------------------------
// THE TRANSFORMATIONS
//
// Each one takes the same `sessions` array and produces something new. None of
// them change `sessions` itself - that is the point. Try adding a session above
// and watch every result below update at once.
// ----------------------------------------------------------------------------

// map: same number of items, each one reshaped.
const topics = sessions.map((session) => session.topic);

// filter: fewer items, each one unchanged.
const finished = sessions.filter((session) => session.done);

// reduce: many items collapsed into one value.
const totalMinutes = sessions.reduce((total, session) => total + session.minutes, 0);

// Chained together. Each step hands its result to the next.
const unfinishedTopics = sessions
  .filter((session) => !session.done)
  .map((session) => session.topic);

// sort mutates the array it is called on, so copy first with a spread.
// Remove the [...] and `sessions` itself gets reordered - which changes every
// result computed BELOW this line, while the ones above stay as they were.
const longestFirst = [...sessions].sort((a, b) => b.minutes - a.minutes);

// Destructuring pulls fields out by name. The `?.` is optional chaining: if
// there is no first item, this is `undefined` instead of a crash.
const { topic: longestTopic, minutes: longestMinutes } = longestFirst[0] ?? {
  topic: "nothing yet",
  minutes: 0,
};

// Derived values, not stored ones. There is no `completionRate` in the data -
// it is computed from what is there, every time.
const completionRate = Math.round((finished.length / sessions.length) * 100);

// Computed last, and read straight off `sessions` rather than off a copy. If
// anything above quietly reordered that array, this is the line that tells you.
const firstInList = sessions[0]?.topic ?? "nothing yet";

// ----------------------------------------------------------------------------
// PUTTING IT ON SCREEN
// Ignore this part for now if you like. It is React, and it is next.
// ----------------------------------------------------------------------------

function Result({ label, code, children }: {
  label: string;
  code: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
      <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{label}</p>
      <code className="mt-1 block font-mono text-xs text-zinc-500">{code}</code>
      <div className="mt-3 font-mono text-sm text-emerald-700 dark:text-emerald-400">
        {children}
      </div>
    </div>
  );
}

export default function ArrayMethodsDemo() {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <Result label="Every topic" code="sessions.map(s => s.topic)">
        {topics.join(", ")}
      </Result>

      <Result label="Sessions finished" code="sessions.filter(s => s.done)">
        {finished.length} of {sessions.length}
      </Result>

      <Result label="Total time" code="sessions.reduce((t, s) => t + s.minutes, 0)">
        {totalMinutes} minutes
      </Result>

      <Result label="Still to do" code=".filter(...).map(...)">
        {unfinishedTopics.length > 0 ? unfinishedTopics.join(", ") : "all done"}
      </Result>

      <Result label="Longest session" code="[...sessions].sort(...)">
        {longestTopic} ({longestMinutes} min)
      </Result>

      <Result label="Completion" code="finished.length / sessions.length">
        {completionRate}%
      </Result>

      <Result label="First in the list" code="sessions[0].topic">
        {firstInList}
      </Result>
    </div>
  );
}
