"use client";

import { useSyncExternalStore } from "react";

const KEY = "ars-arcanum:realm";
export type Realm = "physical" | "cognitive";

/**
 * The realm lives on <html data-realm>, set by a blocking script in the layout
 * before first paint so nobody sees the wrong one flash. This component reads
 * that attribute as an external store rather than keeping a second copy of the
 * truth in React state.
 */
const listeners = new Set<() => void>();

function subscribe(l: () => void) {
  listeners.add(l);
  return () => {
    listeners.delete(l);
  };
}

function getSnapshot(): Realm {
  return document.documentElement.dataset.realm === "cognitive"
    ? "cognitive"
    : "physical";
}

const getServerSnapshot = (): Realm => "physical";

function setRealm(next: Realm) {
  document.documentElement.dataset.realm = next;
  try {
    window.localStorage.setItem(KEY, next);
  } catch {
    /* storage blocked — the toggle still works for this visit */
  }
  for (const l of listeners) l();
}

export default function RealmToggle() {
  const realm = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const other: Realm = realm === "physical" ? "cognitive" : "physical";

  return (
    <button
      onClick={() => setRealm(other)}
      className="stamp inline-flex items-center gap-2 underline decoration-dotted underline-offset-4 transition hover:text-accent"
      aria-label={`Switch to the ${other} realm`}
      title={`Switch to the ${other} realm`}
    >
      {/* The icon shows where you are, matching the label beside it. Drawn in
          the same thin line as the rest of the site rather than pulled from an
          icon set. */}
      <svg
        viewBox="0 0 24 24"
        className="h-[15px] w-[15px] shrink-0"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        {realm === "physical" ? (
          <>
            <circle cx="12" cy="12" r="4.4" />
            <path d="M12 2.6v2.6M12 18.8v2.6M2.6 12h2.6M18.8 12h2.6M5.4 5.4l1.9 1.9M16.7 16.7l1.9 1.9M18.6 5.4l-1.9 1.9M7.3 16.7l-1.9 1.9" />
          </>
        ) : (
          <>
            <path d="M20 14.2A8.4 8.4 0 1 1 9.8 4a6.6 6.6 0 0 0 10.2 10.2Z" />
            <path d="M17.6 4.4v2.2M16.5 5.5h2.2" opacity="0.7" />
          </>
        )}
      </svg>
      <span>{realm === "physical" ? "physical realm" : "cognitive realm"}</span>
    </button>
  );
}
