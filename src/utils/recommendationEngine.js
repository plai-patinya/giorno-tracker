export const generateRecommendations = ({

  maintenanceAnalytics,

  averageKmPerLiter,

  monthlyTrend,

  totalExpense,

  drivingProfile

}) => {

  const recommendations = [];

  const addServiceRecommendation = (
    icon,
    title,
    service
  ) => {

    //
    // ไม่มีข้อมูล
    //

    if (!service) {

      recommendations.push({

        priority: "unknown",

        icon,

        title,

        description:
          "ยังไม่มีประวัติการบำรุงรักษา"

      });

      return;

    }

    if (
      service.status ===
      "unknown"
    ) {

      recommendations.push({

        priority: "unknown",

        icon,

        title,

        description:
          "ยังไม่มีประวัติการบำรุงรักษา"

      });

      return;

    }

    //
    // เลยกำหนด
    //

    if (service.isOverdue) {

      recommendations.push({

        priority: "high",

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

      recommendations.push({

        priority: "medium",

        icon,

        title,

        description:
          `เหลืออีก ${service.remainingKm.toLocaleString()} km`

      });

      return;

    }

    //
    // ปกติ
    //

    recommendations.push({

      priority: "good",

      icon,

      title,

      description:
        `ปกติ (เหลือ ${service.remainingKm.toLocaleString()} km)`

    });

  };

  //
  // 🏍️ MAINTENANCE
  //

  addServiceRecommendation(
    "🛢️",
    "Engine Oil",
    maintenanceAnalytics?.oil
  );

  addServiceRecommendation(
    "🌬️",
    "Air Filter",
    maintenanceAnalytics?.airFilter
  );

  addServiceRecommendation(
    "⚡",
    "Spark Plug",
    maintenanceAnalytics?.sparkPlug
  );

  addServiceRecommendation(
    "⚙️",
    "CVT Belt",
    maintenanceAnalytics?.cvtBelt
  );

  addServiceRecommendation(
    "🔩",
    "Roller Weight",
    maintenanceAnalytics?.roller
  );

  addServiceRecommendation(
    "🧪",
    "Brake Fluid",
    maintenanceAnalytics?.brakeFluid
  );

  addServiceRecommendation(
    "🛑",
    "Brake Pads",
    maintenanceAnalytics?.brakes
  );

  addServiceRecommendation(
    "🔋",
    "Battery",
    maintenanceAnalytics?.battery
  );

  addServiceRecommendation(
    "🛞",
    "Tires",
    maintenanceAnalytics?.tires
  );

  //
  // ⛽ Fuel Economy
  //

  if (
    averageKmPerLiter &&
    averageKmPerLiter < 30
  ) {

    recommendations.push({

      priority: "medium",

      icon: "⛽",

      title:
        "Fuel Economy ต่ำ",

      description:
        "ควรตรวจสอบแรงดันลมยาง และไส้กรองอากาศ"

    });

  }

  //
  // 📈 Expense Trend
  //

  if (
    monthlyTrend &&
    monthlyTrend > 15
  ) {

    recommendations.push({

      priority: "medium",

      icon: "📈",

      title:
        "ค่าใช้จ่ายเพิ่มขึ้น",

      description:
        "ค่าใช้จ่ายเดือนนี้สูงกว่าปกติ"

    });

  }

  //
  // 🏁 Driving Style
  //

  if (
    drivingProfile?.type ===
    "PERFORMANCE BUILDER"
  ) {

    recommendations.push({

      priority: "low",

      icon: "🏁",

      title:
        "ใช้งานรถหนัก",

      description:
        "ควรตรวจสอบระบบส่งกำลังและช่วงล่างสม่ำเสมอ"

    });

  }

  //
  // 💚 Vehicle Health
  //

  if (
    maintenanceAnalytics?.maintenanceHealth >=
    90
  ) {

    recommendations.push({

      priority: "good",

      icon: "💚",

      title:
        "Vehicle Health ดีเยี่ยม",

      description:
        "ระบบบำรุงรักษาอยู่ในเกณฑ์ดี"

    });

  }

  const coverage =
    maintenanceAnalytics?.maintenanceCoverage ?? 0;

  if (coverage < 30) {

    recommendations.push({

      priority: "medium",

      icon: "📋",

      title:
        "Service Coverage ต่ำ",

      description:
        `มีข้อมูลการบำรุงรักษาเพียง ${coverage}%`

    });

  }
  else if (coverage < 70) {

    recommendations.push({

      priority: "low",

      icon: "📋",

      title:
        "Service Coverage ปานกลาง",

      description:
        `มีข้อมูลการบำรุงรักษา ${coverage}%`

    });

  }

  //
  // SORT PRIORITY
  //

  const priorityOrder = {

    high: 1,
    medium: 2,
    low: 3,
    good: 4,
    unknown: 5

  };

  recommendations.sort(

    (a, b) =>

      priorityOrder[a.priority] -
      priorityOrder[b.priority]

  );

  return recommendations;

};