export const generateNotifications = ({

  maintenanceAnalytics,

  averageKmPerLiter,

  monthlyTrend,

  trendUp

}) => {

  const notifications = [];

  let unknownCount = 0;

  const addServiceNotification = (
    icon,
    title,
    service
  ) => {

    //
    // ไม่มีข้อมูล
    //

  if (
    !service ||
    service.status === "unknown"
  ) {

    unknownCount++;

    if (unknownCount <= 3) {

      notifications.push({

        level: "info",

        icon,

        title,

        description:
          "ยังไม่มีประวัติการบำรุงรักษา"

      });

    }

    return;

  }

    //
    // เลยกำหนด
    //

    if (service.isOverdue) {

      notifications.push({

        level: "critical",

        icon,

        title,

        description:
          `เลยกำหนด ${Math.abs(
            service.remainingKm
          ).toLocaleString()} km`

      });

      return;

    }

    //
    // ใกล้ถึงกำหนด
    //

    if (service.remainingKm <= 1000) {

      notifications.push({

        level: "warning",

        icon,

        title,

        description:
          `เหลืออีก ${service.remainingKm.toLocaleString()} km`

      });

    }

  };

  //
  // 🛠️ Maintenance
  //

  addServiceNotification(
    "🛢️",
    "Engine Oil",
    maintenanceAnalytics?.oil
  );

  addServiceNotification(
    "🌬️",
    "Air Filter",
    maintenanceAnalytics?.airFilter
  );

  addServiceNotification(
    "⚡",
    "Spark Plug",
    maintenanceAnalytics?.sparkPlug
  );

  addServiceNotification(
    "⚙️",
    "CVT Belt",
    maintenanceAnalytics?.cvtBelt
  );

  addServiceNotification(
    "🔩",
    "Roller Weight",
    maintenanceAnalytics?.roller
  );

  addServiceNotification(
    "🧪",
    "Brake Fluid",
    maintenanceAnalytics?.brakeFluid
  );

  addServiceNotification(
    "🛑",
    "Brake Pads",
    maintenanceAnalytics?.brakes
  );

  addServiceNotification(
    "🔋",
    "Battery",
    maintenanceAnalytics?.battery
  );

  addServiceNotification(
    "🛞",
    "Tires",
    maintenanceAnalytics?.tires
  );

  //
  // 📋 Coverage
  //

  const coverage =
    maintenanceAnalytics?.maintenanceCoverage;

  if (

    coverage !== null &&

    coverage !== undefined &&

    coverage < 30

  ) {

    notifications.push({

      level: "warning",

      icon: "📋",

      title:
        "Service Coverage ต่ำ",

      description:
        `มีข้อมูลการบำรุงรักษาเพียง ${coverage}%`

    });

  }

  //
  // 💚 Vehicle Health
  //

  if (
    maintenanceAnalytics?.maintenanceHealth >=
    90
  ) {

    notifications.push({

      level: "info",

      icon: "💚",

      title:
        "Vehicle Health ดีเยี่ยม",

      description:
        "ระบบบำรุงรักษาอยู่ในเกณฑ์ดี"

    });

  }

  //
  // 📈 Expense Trend
  //

  if (trendUp) {

    notifications.push({

      level: "warning",

      icon: "📈",

      title:
        "ค่าใช้จ่ายเพิ่มขึ้น",

      description:
        `เพิ่มขึ้น ${monthlyTrend}% จากเดือนก่อน`

    });

  }

  //
  // ⛽ Fuel Economy
  //

  if (
    averageKmPerLiter &&
    averageKmPerLiter < 30
  ) {

    notifications.push({

      level: "warning",

      icon: "⛽",

      title:
        "อัตราสิ้นเปลืองสูง",

      description:
        "รถเริ่มกินน้ำมันมากขึ้น"

    });

  }

  const priorityOrder = {

    critical: 1,
    warning: 2,
    info: 3

  };

  notifications.sort(

    (a, b) =>

      priorityOrder[a.level] -
      priorityOrder[b.level]

  );

  if (unknownCount > 3) {

    notifications.push({

      level: "info",

      icon: "📋",

      title:
        "ยังไม่มีประวัติการบำรุงรักษาเพิ่มเติม",

      description:
        `อีก ${unknownCount - 3} รายการ`

    });

  }

  return notifications;

};