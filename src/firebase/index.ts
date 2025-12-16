export * from "./use-user";
export * from "./use-auth";
export * from "./use-firestore";
export * from "./use-memo-firebase";
"use client";

import { initializeApp, getApps, getApp, type FirebaseApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { firebaseConfig } from "@/firebase/config";

export function initializeFirebase() {
  const app: FirebaseApp =
    getApps().length === 0
      ? initializeApp(firebaseConfig)
      : getApp();

  return {
    firebaseApp: app,
    auth: getAuth(app),
    firestore: getFirestore(app),
  };
}

