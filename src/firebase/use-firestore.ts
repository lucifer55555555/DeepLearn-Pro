"use client";

import { getFirestore } from "firebase/firestore";
import { initializeFirebase } from "@/firebase";

export function useFirestore() {
  const { firebaseApp } = initializeFirebase();
  return getFirestore(firebaseApp);
}
