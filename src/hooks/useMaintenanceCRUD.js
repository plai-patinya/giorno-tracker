import useMaintenanceStore
from "../store/useMaintenanceStore";

const useMaintenanceCRUD = () => {

  //
  // 🛠️ STORE
  //

  const {

    maintenanceRecords,

    addMaintenanceRecord,

    updateMaintenanceRecord,

    deleteMaintenanceRecord,

    setMaintenanceRecords

  } = useMaintenanceStore();

  //
  // ➕ CREATE
  //

  const createMaintenance = (
    record
  ) => {

    addMaintenanceRecord(record);

  };

  //
  // ✏️ UPDATE
  //

  const updateMaintenance = (
    id,
    updatedRecord
  ) => {

    updateMaintenanceRecord(
      id,
      updatedRecord
    );

  };

  //
  // ❌ DELETE
  //

  const removeMaintenance = (
    id
  ) => {

    deleteMaintenanceRecord(id);

  };

  //
  // 🔄 REPLACE ALL
  //

  const replaceMaintenanceRecords = (
    records
  ) => {

    setMaintenanceRecords(
      records
    );

  };

  //
  // 🚀 RETURN
  //

  return {

    maintenanceRecords,

    createMaintenance,

    updateMaintenance,

    removeMaintenance,

    replaceMaintenanceRecords

  };

};

export default
useMaintenanceCRUD;