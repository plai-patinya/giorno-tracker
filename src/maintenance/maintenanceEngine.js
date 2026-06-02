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

  lastServiceOdo = null,

  intervalKm = 3000

}) => {

  //
  // ⚪ NO RECORD
  //

  if (
    lastServiceOdo === null ||
    lastServiceOdo === undefined
  ) {

    return {

      usedKm: 0,

      remainingKm: null,

      progress: 0,

      isOverdue: false,

      status: "unknown"

    };

  }

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

  const isOverdue =
    remainingKm <= 0;

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
    
    case "unknown":

      return {

        color:
          "text-slate-400",

        bg:
          "bg-slate-500/10",

        border:
          "border-slate-500/20",

        label:
          "Unknown"

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
(statuses = []) => {

  const statusMap = {

    healthy: 100,
    warning: 70,
    critical: 40

  };

  if (!statuses.length) {
    return 100;
  }

  const validStatuses =

    statuses.filter(
      status =>
        status !== "unknown"
    );

  if (!validStatuses.length) {
    return 100;
  }

  const scores =

    validStatuses.map(
      status =>
        statusMap[status] || 100
    );

  const avg =

    scores.reduce(
      (a, b) => a + b,
      0
    ) / scores.length;

  return Math.round(avg);

};