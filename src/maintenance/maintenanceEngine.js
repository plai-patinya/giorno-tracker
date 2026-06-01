//
// 🧠 GET LATEST SERVICE
//

export const getLatestService = (

  records = [],

  type

) => {

  return records

    .filter(
      (record) =>

        record.category === type
    )

    .sort(
      (a, b) =>
        Number(
          b.serviceOdometer || 0
        ) -
        Number(
          a.serviceOdometer || 0
        )
    )[0];

};

//
// 🛠️ CALCULATE SERVICE STATUS
//

export const calculateServiceStatus = ({

  currentOdo = 0,

  lastServiceOdo = 0,

  intervalKm = 3000

}) => {

  const usedKm =

    currentOdo -
    lastServiceOdo;

  const remainingKm =

    intervalKm -
    usedKm;

  const progress =

    Math.min(

      Math.max(

        (usedKm / intervalKm)
        * 100,

        0

      ),

      100

    );

  //
  // 🚨 OVERDUE
  //

  const isOverdue =
    remainingKm <= 0;

  //
  // 🚨 STATUS
  //

  let status =
    "healthy";

  if (progress >= 90) {

    status = "critical";

  }

  else if (
    progress >= 70
  ) {

    status = "warning";

  }

  return {

    usedKm,

    remainingKm,

    progress,

    isOverdue,

    status

  };

};

//
// 🎨 STATUS STYLE
//

export const getServiceStatusStyle =
(status) => {

  switch (status) {

    case "critical":

      return {

        color:
          "text-red-400",

        bg:
          "bg-red-500/20",

        border:
          "border-red-500/30",

        label:
          "Critical"

      };

    case "warning":

      return {

        color:
          "text-yellow-400",

        bg:
          "bg-yellow-500/20",

        border:
          "border-yellow-500/30",

        label:
          "Warning"

      };

    default:

      return {

        color:
          "text-emerald-400",

        bg:
          "bg-emerald-500/20",

        border:
          "border-emerald-500/30",

        label:
          "Healthy"

      };

  }

};

//
// 🚗 VEHICLE HEALTH SCORE
//

export const calculateMaintenanceHealth =
({

  oilStatus,

  tireStatus,

  brakeStatus,

  batteryStatus

}) => {

  const statusMap = {

    healthy: 100,

    warning: 70,

    critical: 40

  };

  const scores = [

    statusMap[
      oilStatus
    ] || 100,

    statusMap[
      tireStatus
    ] || 100,

    statusMap[
      brakeStatus
    ] || 100,

    statusMap[
      batteryStatus
    ] || 100

  ];

  const avg =

    scores.reduce(
      (a, b) => a + b,
      0
    ) / scores.length;

  return Math.round(avg);

};