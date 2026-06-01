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

      "Engine Oil"
    );

  //
  // 🛞 TIRES
  //

  const tireService =
    getLatestService(

      maintenanceRecords,

      "Tires"
    );

  //
  // 🛑 BRAKES
  //

  const brakeService =
    getLatestService(

      maintenanceRecords,

      "Brake Pads"
    );

  //
  // 🔋 BATTERY
  //

  const batteryService =
    getLatestService(

      maintenanceRecords,

      "Battery"
    );

  //
  // 📊 ANALYTICS
  //

  return useMemo(() => {

    const oil =
      calculateServiceStatus({

        currentOdo,

        lastServiceOdo:
          oilService?.serviceOdometer || 0,

        intervalKm:
          oilService?.nextServiceKm || 3000

      });

    const tires =
      calculateServiceStatus({

        currentOdo,

        lastServiceOdo:
          tireService?.serviceOdometer || 0,

        intervalKm:
          tireService?.nextServiceKm || 20000

      });

    const brakes =
      calculateServiceStatus({

        currentOdo,

        lastServiceOdo:
          brakeService?.serviceOdometer || 0,

        intervalKm:
          brakeService?.nextServiceKm || 12000

      });

    const battery =
      calculateServiceStatus({

        currentOdo,

        lastServiceOdo:
          batteryService?.serviceOdometer || 0,

        intervalKm:
          batteryService?.nextServiceKm || 18000

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