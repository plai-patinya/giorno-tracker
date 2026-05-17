import { auth, db } from "../firebase";

import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut
} from "firebase/auth";

import {
  doc,
  setDoc,
  onSnapshot,
  getDoc
} from "firebase/firestore";

//
// 🔐 LOGIN
//

export const loginUser = async (email, password) => {
  return await signInWithEmailAndPassword(auth, email, password);
};

//
// 🔐 REGISTER
//

export const registerUser = async (email, password) => {
  return await createUserWithEmailAndPassword(auth, email, password);
};

//
// 🔐 LOGOUT
//

export const logoutUser = async () => {
  return await signOut(auth);
};

//
// ☁️ SAVE TO CLOUD
//

export const saveUserData = async (
  uid,
  expenses,
  fuelRecords,
  serviceHistory
) => {

  await setDoc(doc(db, "users", uid), {
    expenses,
    fuelRecords,
    serviceHistory
  });

};

//
// ☁️ GET USER DATA (แก้ใหม่ให้ถูก)
//

export const getUserData = async (uid) => {

  const userRef = doc(db, "users", uid);
  const snap = await getDoc(userRef);

  if (!snap.exists()) {
    return {
      expenses: [],
      fuelRecords: [],
      serviceHistory: []
    };
  }

  const data = snap.data();

  return {
    expenses: data?.expenses || [],
    fuelRecords: data?.fuelRecords || [],
    serviceHistory: data?.serviceHistory || []
  };

};

//
// ⚡ REALTIME SUBSCRIBE
//

export const subscribeUserData = (
  uid,
  setExpenses,
  setFuelRecords,
  setServiceHistory,
  setCloudLoaded
) => {

  const ref = doc(db, "users", uid);

  return onSnapshot(

    ref,

    (snap) => {

      if (snap.exists()) {

        const data = snap.data();

        // 💸 EXPENSES
        setExpenses(data?.expenses || []);

        // ⛽ FUEL
        setFuelRecords(data?.fuelRecords || []);

        // 🛠️ SERVICE (แก้ตรงนี้สำคัญมาก)
        if (data?.serviceHistory && data.serviceHistory.length > 0) {
          setServiceHistory(data.serviceHistory);
        }

        setCloudLoaded(true);

      } else {

        // USER ใหม่
        setExpenses([]);
        setFuelRecords([]);
        setServiceHistory([]);

        setCloudLoaded(true);

      }

    },

    (error) => {
      console.error("Realtime subscribe error:", error);
      setCloudLoaded(true);
    }

  );

};