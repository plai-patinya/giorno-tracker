export const generateActivityFeed = ({

  expenses = [],
  fuelRecords = [],

  maintenanceScore,
  monthlyTrend,

  oilService

}) => {

  const activities = [];

  //
  // 🛢️ OIL
  //

  if (oilService.progress >= 70) {

    activities.push({

      icon: "🛢️",

      title:
        "ใกล้ถึงรอบเปลี่ยนน้ำมันเครื่อง",

      description:
        `เหลืออีก ${oilService.remainingKm.toLocaleString()} km`,

      time: "วันนี้",

      bg: "bg-orange-500/15"

    });

  }

  //
  // ⛽ FUEL
  //

  if (fuelRecords.length > 0) {

    activities.push({

      icon: "⛽",

      title:
        "เติมน้ำมันล่าสุด",

      description:
        `บันทึกล่าสุด ${fuelRecords[fuelRecords.length - 1]?.liters || 0} ลิตร`,

      time: "ล่าสุด",

      bg: "bg-cyan-500/15"

    });

  }

  //
  // 📈 TREND
  //

  if (monthlyTrend > 10) {

    activities.push({

      icon: "📈",

      title:
        "ค่าใช้จ่ายเพิ่มขึ้น",

      description:
        `เพิ่มขึ้น ${monthlyTrend}% จากเดือนก่อน`,

      time: "เดือนนี้",

      bg: "bg-pink-500/15"

    });

  }

  //
  // 🚨 HEALTH
  //

  if (maintenanceScore < 70) {

    activities.push({

      icon: "🚨",

      title:
        "Vehicle Health ลดลง",

      description:
        "ควรตรวจเช็กสภาพรถ",

      time: "AI Alert",

      bg: "bg-red-500/15"

    });

  }

  //
  // 🔧 EXPENSES
  //

  if (expenses.length > 0) {

    const latestExpense =
      expenses[
        expenses.length - 1
      ];

    activities.push({

      icon: "🔧",

      title:
        "ติดตั้งอุปกรณ์ล่าสุด",

      description:
        latestExpense.name,

      time:
        latestExpense.date || "ล่าสุด",

      bg: "bg-purple-500/15"

    });

  }

  return activities;

};