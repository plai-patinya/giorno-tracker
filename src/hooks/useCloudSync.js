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
  maintenanceRecords,
  setExpenses,
  setFuelRecords,
  setMaintenanceRecords

}) => {

  const [cloudLoaded, setCloudLoaded] = useState(false);

  //
  // 🔥 Realtime Subscribe (ต้องอยู่ใน useEffect)
  //
  useEffect(() => {

    if (!user) return;

    const unsub = subscribeUserData(
      user.uid,
      setExpenses,
      setFuelRecords,
      setMaintenanceRecords,
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
      Array.isArray(maintenanceRecords) &&
      expenses.length === 0 &&
      fuelRecords.length === 0 &&
      maintenanceRecords.length === 0
    ) {
      console.log("⛔ skip save (empty)");
      return;
    }

  const timer = setTimeout(async () => {

    // ✅ กัน type พัง
    if (
      !Array.isArray(expenses) ||
      !Array.isArray(fuelRecords) ||
      !Array.isArray(maintenanceRecords)
    ) {
      console.warn("❌ Invalid data type - skip sync");
      return;
    }

    // ✅ sanitize กัน function / proxy
    const safeExpenses = JSON.parse(JSON.stringify(expenses));
    const safeFuel = JSON.parse(JSON.stringify(fuelRecords));
    const safeMaintenance =
    JSON.parse(
      JSON.stringify(
        maintenanceRecords
      )
    );

    try {

    await saveUserData(
      user.uid,
      safeExpenses,
      safeFuel,
      safeMaintenance
    );

    console.log(
      "☁️ Cloud saved"
    );

  }

  catch (error) {

    console.error(
      "❌ Cloud save failed:",
      error
    );

  }

  }, 2000);

    return () => clearTimeout(timer);

  }, [
    expenses,
    fuelRecords,
    maintenanceRecords,
    user,
    loading,
    cloudLoaded
  ]);


  return {
    cloudLoaded
  };

};

export default useCloudSync;