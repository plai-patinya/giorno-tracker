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


  // 🔥 Realtime Subscribe
  /*useEffect(() => {

    if (!user) return;

    const unsub = subscribeUserData(
      user.uid,
      setExpenses,
      setFuelRecords,
      setServiceHistory,
      setCloudLoaded
    );

    return () => unsub();

  }, [user]);*/


// ☁️ Auto Save
  useEffect(() => {

    if (!user || loading || !cloudLoaded) return;

    // ❗ เพิ่ม guard สำคัญ
    if (
      expenses.length === 0 &&
      fuelRecords.length === 0 &&
      serviceHistory.length === 0
    ) {
      console.log("⛔ skip save (empty data)");
      return;
    }

    // ❗ เพิ่ม delay เพื่อรอ data load จริง
    const timer = setTimeout(() => {

      console.log("☁️ saving to cloud...");

      /*saveUserData(
        user.uid,
        expenses,
        fuelRecords,
        serviceHistory
      );*/

    }, 3000);

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