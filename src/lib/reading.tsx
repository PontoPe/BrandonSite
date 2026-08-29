"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useSyncExternalStore,
} from "react";
import { BOOKS, type BookId, type Line, booksInLine } from "@/data/books";

const STORAGE_KEY = "ars-arcanum:read";

export type Depth = "physical" | "cognitive" | "spiritual";

/* ---------------------------------------------------------------------------
 * The shelf is an external store rather than component state.
 *
 * It has to be: it lives in localStorage, it is read during render by every
 * plate on the page, and the server has no access to it. useSyncExternalStore
 * gives us the one property that matters here — the server and the first client
 * paint both see an empty shelf, which is the safe state. Nothing is revealed
 * before we know what the reader has actually read.
 * ------------------------------------------------------------------------- */

const EMPTY: readonly BookId[] = Object.freeze([]);
const VALID_IDS = new Set(BOOKS.map((b) => b.id));

/** Referentially stable between changes, as getSnapshot requires. */
let snapshot: readonly BookId[] = EMPTY;
let loaded = false;
const listeners = new Set<() => void>();

function emit() {
  for (const l of listeners) l();
}

function readStorage(): readonly BookId[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return EMPTY;
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return EMPTY;
    const ids = parsed.filter(
      (id): id is BookId => typeof id === "string" && VALID_IDS.has(id),
    );
    return ids.length ? Object.freeze(ids) : EMPTY;
  } catch {
    return EMPTY;
  }
}

function subscribe(listener: () => void) {
  // The first subscriber pulls the real shelf in, after hydration has settled.
  if (!loaded) {
    loaded = true;
    const stored = readStorage();
    if (stored !== snapshot) {
      snapshot = stored;
      queueMicrotask(emit);
    }
  }

  // Another tab edited the shelf — stay in step with it.
  const onStorage = (e: StorageEvent) => {
    if (e.key !== null && e.key !== STORAGE_KEY) return;
    snapshot = readStorage();
    emit();
  };
  window.addEventListener("storage", onStorage);

  listeners.add(listener);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

const getSnapshot = () => snapshot;
const getServerSnapshot = () => EMPTY;

function write(next: BookId[]) {
  snapshot = next.length ? Object.freeze(next) : EMPTY;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    /* private browsing or blocked storage — the site works, it just forgets */
  }
  emit();
}

/* ------------------------------------------------------------------------ */

interface ReadingState {
  read: ReadonlySet<BookId>;
  toggle(id: BookId): void;
  setLine(line: Line, read: boolean): void;
  clear(): void;
  /** True when any one of the given books has been read. */
  reveals(revealedBy: BookId[]): boolean;
  /** Not a setting. A consequence of what is on the shelf behind you. */
  depth: Depth;
  count: number;
}

const Ctx = createContext<ReadingState | null>(null);

/**
 * Depth is derived, never chosen. A reader who has finished one series sits at
 * a different depth from one who has read a book from each — which is the point.
 */
function deriveDepth(read: ReadonlySet<BookId>): Depth {
  const spiritual = ["hero-of-ages", "oathbringer", "arcanum-unbounded", "rhythm-of-war", "wind-and-truth"];
  const cognitive = ["words-of-radiance", "bands-of-mourning", "lost-metal", "tress", "sunlit-man", "yumi"];
  if (spiritual.some((id) => read.has(id))) return "spiritual";
  if (cognitive.some((id) => read.has(id))) return "cognitive";
  // Books set on two different worlds is enough to start noticing the seams.
  const worlds = new Set(
    BOOKS.filter((b) => read.has(b.id) && b.cosmere && b.world).map((b) => b.world),
  );
  return worlds.size >= 2 ? "cognitive" : "physical";
}

export function ReadingProvider({ children }: { children: React.ReactNode }) {
  const ids = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const read = useMemo(() => new Set(ids), [ids]);

  const toggle = useCallback((id: BookId) => {
    const next = new Set(snapshot);
    if (!next.delete(id)) next.add(id);
    write([...next]);
  }, []);

  const setLine = useCallback((line: Line, value: boolean) => {
    const next = new Set(snapshot);
    for (const b of booksInLine(line)) {
      if (value) next.add(b.id);
      else next.delete(b.id);
    }
    write([...next]);
  }, []);

  const clear = useCallback(() => write([]), []);

  const value = useMemo<ReadingState>(
    () => ({
      read,
      toggle,
      setLine,
      clear,
      reveals: (revealedBy) => revealedBy.some((id) => read.has(id)),
      depth: deriveDepth(read),
      count: read.size,
    }),
    [read, toggle, setLine, clear],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useReading(): ReadingState {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useReading must be used inside <ReadingProvider>");
  return ctx;
}
