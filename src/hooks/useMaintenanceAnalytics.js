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

  const airFilterService =
  getLatestService(
    maintenanceRecords,
    "Air Filter"
  );

  const sparkPlugService =
    getLatestService(
      maintenanceRecords,
      "Spark Plug"
    );

  const cvtBeltService =
    getLatestService(
      maintenanceRecords,
      "CVT Belt"
    );

  const rollerService =
    getLatestService(
      maintenanceRecords,
      "Roller Weight"
    );

  const brakeFluidService =
    getLatestService(
      maintenanceRecords,
      "Brake Fluid"
    );  

  //
  // 📊 ANALYTICS
  //

  return useMemo(() => {

    const oil =
      calculateServiceStatus({

        currentOdo,

        lastServiceOdo:
          oilService?.serviceOdometer,

        intervalKm:
          oilService?.nextServiceKm || 3000

      });

    const tires =
      calculateServiceStatus({

        currentOdo,

        lastServiceOdo:
          tireService?.serviceOdometer,

        intervalKm:
          tireService?.nextServiceKm || 20000

      });

    const airFilter =
      calculateServiceStatus({

        currentOdo,

        lastServiceOdo:
          airFilterService?.serviceOdometer,

        intervalKm:
          airFilterService?.nextServiceKm || 4000

      });

    const sparkPlug =
      calculateServiceStatus({

        currentOdo,

        lastServiceOdo:
          sparkPlugService?.serviceOdometer,

        intervalKm:
          sparkPlugService?.nextServiceKm || 8000

      });

    const cvtBelt =
      calculateServiceStatus({

        currentOdo,

        lastServiceOdo:
          cvtBeltService?.serviceOdometer,

        intervalKm:
          cvtBeltService?.nextServiceKm || 24000

      });

    const roller =
      calculateServiceStatus({

        currentOdo,

        lastServiceOdo:
          rollerService?.serviceOdometer,

        intervalKm:
          rollerService?.nextServiceKm || 24000

      });

    const brakeFluid =
      calculateServiceStatus({

        currentOdo,

        lastServiceOdo:
          brakeFluidService?.serviceOdometer,

        intervalKm:
          brakeFluidService?.nextServiceKm || 24000

      });

    const brakes =
      calculateServiceStatus({

        currentOdo,

        lastServiceOdo:
          brakeService?.serviceOdometer,

        intervalKm:
          brakeService?.nextServiceKm || 12000

      });

    const battery =
      calculateServiceStatus({

        currentOdo,

        lastServiceOdo:
          batteryService?.serviceOdometer,

        intervalKm:
          batteryService?.nextServiceKm || 18000

      });

    const allServices = [

      oil,
      airFilter,
      sparkPlug,
      cvtBelt,
      roller,
      brakeFluid,
      tires,
      brakes,
      battery

    ];

    const knownServices =

      allServices.filter(
        service =>
          service.status !==
          "unknown"
      );

    const maintenanceCoverage =

      Math.round(

        (
          knownServices.length /
          allServices.length
        ) * 100

      );

    //
    // 🚗 HEALTH
    //

    const maintenanceHealth =
      calculateMaintenanceHealth([

        oil.status,

        airFilter.status,

        sparkPlug.status,

        cvtBelt.status,

        roller.status,

        tires.status,

        brakes.status,

        battery.status,

        brakeFluid.status

      ]);

      console.log(
        "📊 ANALYTICS V3:",
        {

          oil,

          airFilter,

          sparkPlug,

          cvtBelt,

          roller,

          brakeFluid,

          tires,

          brakes,

          battery,

          maintenanceHealth,

          maintenanceCoverage

        }
      );

    return {

      oil,

      airFilter,

      sparkPlug,

      cvtBelt,

      roller,

      brakeFluid,

      tires,

      brakes,

      battery,

      maintenanceHealth,

      maintenanceCoverage,

      oilStyle:
        getServiceStatusStyle(
          oil.status
        ),

      airFilterStyle:
        getServiceStatusStyle(
          airFilter.status
        ),

      sparkPlugStyle:
        getServiceStatusStyle(
          sparkPlug.status
        ),

      cvtBeltStyle:
        getServiceStatusStyle(
          cvtBelt.status
        ),

      rollerStyle:
        getServiceStatusStyle(
          roller.status
        ),

      brakeFluidStyle:
        getServiceStatusStyle(
          brakeFluid.status
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