"use client";

import { getAuth } from "firebase/auth";
import { initializeFirebase } from "@/firebase";

export function useFirebaseAuth() {
  const { firebaseApp } = initializeFirebase();
  return getAuth(firebaseApp);
}
