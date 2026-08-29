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
      className="label border border-rule px-2 py-1 transition hover:border-rule-strong hover:text-ink"
      aria-label={`Switch to the ${other} realm`}
    >
      {realm === "physical" ? "Physical" : "Cognitive"}
    </button>
  );
}
