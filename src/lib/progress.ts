"use client";

import { useSyncExternalStore } from "react";
import { COURSE } from "./course";

export type LessonProgress = { score: number; passed: boolean; answer?: string };
type Store = Record<string, LessonProgress>;

const KEY = COURSE.progressKey;
const EVENT = `${COURSE.progressKey}-change`;

function read(): Store {
  try {
    return JSON.parse(localStorage.getItem(KEY) ?? "{}") as Store;
  } catch {
    return {};
  }
}

let cache: Store | null = null;
let cacheRaw: string | null = null;

function snapshot(): Store {
  let raw: string | null = null;
  try {
    raw = localStorage.getItem(KEY);
  } catch {
    raw = null;
  }
  if (cache && raw === cacheRaw) return cache;
  cacheRaw = raw;
  cache = read();
  return cache;
}

const EMPTY: Store = {};

function subscribe(cb: () => void) {
  window.addEventListener(EVENT, cb);
  window.addEventListener("storage", cb);
  return () => {
    window.removeEventListener(EVENT, cb);
    window.removeEventListener("storage", cb);
  };
}

export function useProgress(): Store {
  return useSyncExternalStore(subscribe, snapshot, () => EMPTY);
}

export function saveProgress(n: number, patch: Partial<LessonProgress>) {
  const store = read();
  const prev = store[n] ?? { score: 0, passed: false };
  store[n] = { ...prev, ...patch, passed: prev.passed || Boolean(patch.passed) };
  try {
    localStorage.setItem(KEY, JSON.stringify(store));
  } catch {
    return;
  }
  window.dispatchEvent(new Event(EVENT));
}
