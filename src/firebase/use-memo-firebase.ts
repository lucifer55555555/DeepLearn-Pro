"use client";

import { useMemo } from "react";
import { initializeFirebase } from "@/firebase";

export function useMemoFirebase() {
  return useMemo(() => initializeFirebase(), []);
}
