export const generateNotifications = ({

  maintenanceScore,
  monthlyTrend,
  trendUp,

  oilService,
  airService,
  tireService,

  averageKmPerLiter

}) => {

  const notifications = [];

  //
  // 🚨 HEALTH
  //

  if (maintenanceScore < 70) {

    notifications.push({

      level: "critical",

      icon: "🚨",

      title:
        "Vehicle Health ต่ำ",

      description:
        "ควรตรวจเช็กรถโดยด่วน"

    });

  }

  //
  // 📈 EXPENSE
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
  // 🛢️ OIL
  //

  if (oilService.progress >= 85) {

    notifications.push({

      level: "critical",

      icon: "🛢️",

      title:
        "ใกล้ถึงรอบเปลี่ยนน้ำมันเครื่อง",

      description:
        `เหลืออีก ${oilService.remainingKm.toLocaleString()} km`

    });

  }

  //
  // 🌬️ AIR FILTER
  //

  if (airService.progress >= 75) {

    notifications.push({

      level: "warning",

      icon: "🌬️",

      title:
        "ควรตรวจไส้กรองอากาศ",

      description:
        `เหลืออีก ${airService.remainingKm.toLocaleString()} km`

    });

  }

  //
  // 🛞 TIRES
  //

  if (tireService.progress >= 70) {

    notifications.push({

      level: "warning",

      icon: "🛞",

      title:
        "อายุยางใกล้ครบระยะ",

      description:
        `เหลืออีก ${tireService.remainingKm.toLocaleString()} km`

    });

  }

  //
  // ⛽ FUEL
  //

  if (
    Number(averageKmPerLiter) < 30
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

  return notifications;

};