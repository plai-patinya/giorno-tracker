import { create }
from "zustand";

const useMaintenanceStore =
  create((set) => ({

    //
    // 🛠️ RECORDS
    //

    maintenanceRecords: [],

    //
    // ➕ ADD
    //

    addMaintenanceRecord:
      (record) =>

        set((state) => ({

          maintenanceRecords: [

            ...state.maintenanceRecords,

            record

          ]

        })),

    //
    // ✏️ UPDATE
    //

    updateMaintenanceRecord:
      (id, updatedRecord) =>

        set((state) => ({

          maintenanceRecords:

            state.maintenanceRecords.map(
              (record) =>

                record.id === id

                  ? {
                      ...record,
                      ...updatedRecord,
                      updatedAt:
                        new Date().toISOString()
                    }

                  : record
            )

        })),

    //
    // ❌ DELETE
    //

    deleteMaintenanceRecord:
      (id) =>

        set((state) => ({

          maintenanceRecords:

            state.maintenanceRecords.filter(
              (record) =>

                record.id !== id
            )

        })),

    //
    // 🔄 SET
    //

    setMaintenanceRecords:
      (records) =>

        set({

          maintenanceRecords:
            records

        })

  }));

export default
useMaintenanceStore;