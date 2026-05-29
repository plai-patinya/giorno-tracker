import {

  useEffect

} from "react";

import useMaintenanceStore
from "../store/useMaintenanceStore";

import {

  saveMaintenanceRecords,

  loadMaintenanceRecords

} from "../database/indexedDB";

const useMaintenancePersistence =
() => {

  //
  // 🛠️ STORE
  //

  const {

    maintenanceRecords,

    setMaintenanceRecords

  } = useMaintenanceStore();

  //
  // 📥 LOAD
  //

  useEffect(() => {

    const load =
      async () => {

        try {

          const records =

            await loadMaintenanceRecords();

          setMaintenanceRecords(
            records
          );

        } catch (error) {

          console.error(

            "❌ Load maintenance failed:",

            error

          );

        }

      };

    load();

  }, []);

  //
  // 💾 SAVE
  //

  useEffect(() => {

    const save =
      async () => {

        try {

          await saveMaintenanceRecords(

            maintenanceRecords

          );

        } catch (error) {

          console.error(

            "❌ Save maintenance failed:",

            error

          );

        }

      };

    save();

  }, [maintenanceRecords]);

};

export default
useMaintenancePersistence;