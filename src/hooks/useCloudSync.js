import { useEffect, useState } from "react";

import {
  saveUserData,
  subscribeUserData
} from "../services/firebaseService";

const useCloudSync = ({
  user,
  loading,

  expenses,
  fuelRecords,
  serviceHistory,

  setExpenses,
  setFuelRecords,
  setServiceHistory

}) => {

  const [cloudLoaded, setCloudLoaded] = useState(false);

  //
  // 🔥 Realtime Subscribe (ต้องอยู่ใน useEffect)
  //
  useEffect(() => {

    if (!user) return;

    console.log("🔄 Subscribing to cloud...");

    const unsub = subscribeUserData(
      user.uid,
      setExpenses,
      setFuelRecords,
      setServiceHistory,
      setCloudLoaded
    );

    return () => {
      console.log("🛑 Unsubscribe");
      unsub();
    };

  }, [user]);



  //
  // ☁️ Auto Save
  //
  useEffect(() => {

    if (!user || loading || !cloudLoaded) return;

    // ❗ กัน empty overwrite
    if (
      Array.isArray(expenses) &&
      Array.isArray(fuelRecords) &&
      Array.isArray(serviceHistory) &&
      expenses.length === 0 &&
      fuelRecords.length === 0 &&
      serviceHistory.length === 0
    ) {
      console.log("⛔ skip save (empty)");
      return;
    }

  const timer = setTimeout(() => {

    console.log("☁️ SAFE SAVE");

    // ✅ กัน type พัง
    if (
      !Array.isArray(expenses) ||
      !Array.isArray(fuelRecords) ||
      !Array.isArray(serviceHistory)
    ) {
      console.warn("❌ Invalid data type - skip sync");
      return;
    }

    // ✅ sanitize กัน function / proxy
    const safeExpenses = JSON.parse(JSON.stringify(expenses));
    const safeFuel = JSON.parse(JSON.stringify(fuelRecords));
    const safeService = JSON.parse(JSON.stringify(serviceHistory));

    saveUserData(
      user.uid,
      safeExpenses,
      safeFuel,
      safeService
    );

  }, 2000);

    return () => clearTimeout(timer);

  }, [
    expenses,
    fuelRecords,
    serviceHistory,
    user,
    loading,
    cloudLoaded
  ]);


  return {
    cloudLoaded
  };

};

export default useCloudSync;