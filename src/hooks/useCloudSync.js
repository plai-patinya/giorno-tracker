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
      expenses.length === 0 &&
      fuelRecords.length === 0 &&
      serviceHistory.length === 0
    ) {
      console.log("⛔ skip save (empty)");
      return;
    }

    const timer = setTimeout(() => {

      console.log("☁️ SAFE SAVE");

      saveUserData(
        user.uid,
        expenses,
        fuelRecords,
        serviceHistory
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