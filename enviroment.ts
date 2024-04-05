import { FIREBASE_KEY } from "./env";

export const ENVIROMENT = {
    production: false,
    firebaseConfig: {
        apiKey: FIREBASE_KEY.apiKey,
        authDomain: FIREBASE_KEY.authDomain,
        projectId: FIREBASE_KEY.projectId,
        storageBucket: FIREBASE_KEY.storageBucket,
        messagingSenderId: FIREBASE_KEY.messagingSenderId,
        appId: FIREBASE_KEY.appId,
        measurementId: FIREBASE_KEY.measurementId
    }
}