import { useMemo }
from "react";

import useMaintenanceStore
from "../store/useMaintenanceStore";

import {

  getLatestService,

  calculateServiceStatus,

  getServiceStatusStyle,

  calculateMaintenanceHealth

} from "../maintenance/maintenanceEngine";

const useMaintenanceAnalytics =
(currentOdo = 0) => {

  //
  // 🛠️ STORE
  //

  const {

    maintenanceRecords

  } = useMaintenanceStore();

  //
  // 🛢️ OIL
  //

  const oilService =
    getLatestService(

      maintenanceRecords,

      "oil"
    );

  //
  // 🛞 TIRES
  //

  const tireService =
    getLatestService(

      maintenanceRecords,

      "tires"
    );

  //
  // 🛑 BRAKES
  //

  const brakeService =
    getLatestService(

      maintenanceRecords,

      "brakes"
    );

  //
  // 🔋 BATTERY
  //

  const batteryService =
    getLatestService(

      maintenanceRecords,

      "battery"
    );

  //
  // 📊 ANALYTICS
  //

  return useMemo(() => {

    const oil =
      calculateServiceStatus({

        currentOdo,

        lastServiceOdo:
          oilService?.odometer || 0,

        intervalKm: 3000

      });

    const tires =
      calculateServiceStatus({

        currentOdo,

        lastServiceOdo:
          tireService?.odometer || 0,

        intervalKm: 20000

      });

    const brakes =
      calculateServiceStatus({

        currentOdo,

        lastServiceOdo:
          brakeService?.odometer || 0,

        intervalKm: 12000

      });

    const battery =
      calculateServiceStatus({

        currentOdo,

        lastServiceOdo:
          batteryService?.odometer || 0,

        intervalKm: 18000

      });

    //
    // 🚗 HEALTH
    //

    const maintenanceHealth =
      calculateMaintenanceHealth({

        oilStatus:
          oil.status,

        tireStatus:
          tires.status,

        brakeStatus:
          brakes.status,

        batteryStatus:
          battery.status

      });

    return {

      oil,

      tires,

      brakes,

      battery,

      maintenanceHealth,

      oilStyle:
        getServiceStatusStyle(
          oil.status
        ),

      tireStyle:
        getServiceStatusStyle(
          tires.status
        ),

      brakeStyle:
        getServiceStatusStyle(
          brakes.status
        ),

      batteryStyle:
        getServiceStatusStyle(
          battery.status
        )

    };

  }, [

    currentOdo,

    maintenanceRecords

  ]);

};

export default
useMaintenanceAnalytics;