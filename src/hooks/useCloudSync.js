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
  useEffect(() => {

    if (!user) return;

    const unsub = subscribeUserData(
      user.uid,
      setExpenses,
      setFuelRecords,
      setServiceHistory,
      setCloudLoaded
    );

    return () => unsub();

  }, [user]);


  // ☁️ Auto Save
  useEffect(() => {

  if (!user || loading || !cloudLoaded) return;

  if (
    expenses.length === 0 &&
    fuelRecords.length === 0 &&
    serviceHistory.length === 0
  ) return;

  const timer = setTimeout(() => {

    saveUserData(
      user.uid,
      expenses,
      fuelRecords,
      serviceHistory
    );

  }, 1000);

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