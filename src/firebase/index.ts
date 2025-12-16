// core
export { FirebaseClientProvider } from "./client-provider";
export { useFirebaseAuth } from "./use-firebase-auth";

// hooks
export { useAuth } from "./use-auth";
export { useFirestore } from "./use-firestore";
export { useMemoFirebase } from "./use-memo-firebase";
export { useUser } from "./use-user";

// existing exports (keep if already there)
export * from "./errors";
export * from "./error-emitter";



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

