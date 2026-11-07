"use client";

import { useSyncExternalStore } from "react";
import {
  DEMO_EVENT,
  emptyProgress,
  parseDemo,
  parseProgress,
  PROGRESS_EVENT,
  demoSnapshot,
  progressSnapshot,
  type DemoProfile,
  type ProgressState,
} from "@/Lib/storage";

function subscribeProgress(onStoreChange: () => void) {
  window.addEventListener("storage", onStoreChange);
  window.addEventListener(PROGRESS_EVENT, onStoreChange);
  return () => {
    window.removeEventListener("storage", onStoreChange);
    window.removeEventListener(PROGRESS_EVENT, onStoreChange);
  };
}

function subscribeDemo(onStoreChange: () => void) {
  window.addEventListener("storage", onStoreChange);
  window.addEventListener(DEMO_EVENT, onStoreChange);
  return () => {
    window.removeEventListener("storage", onStoreChange);
    window.removeEventListener(DEMO_EVENT, onStoreChange);
  };
}

export function useProgress(): ProgressState {
  const raw = useSyncExternalStore(subscribeProgress, progressSnapshot, () => "");
  return raw ? parseProgress(raw) : emptyProgress;
}

export function useDemoProfile(): DemoProfile | null {
  const raw = useSyncExternalStore(subscribeDemo, demoSnapshot, () => "");
  return parseDemo(raw);
}
