export const generateRecommendations = ({

  maintenanceScore,

  averageKmPerLiter,

  monthlyTrend,

  totalExpense,

  oilService,

  drivingProfile

}) => {

  const recommendations = [];

  //
  // 🛢️ OIL
  //

  if (oilService.progress >= 75) {

    recommendations.push({

      priority: "high",

      icon: "🛢️",

      title:
        "ควรเปลี่ยนน้ำมันเครื่อง",

      description:
        `เหลืออีก ${oilService.remainingKm.toLocaleString()} km`

    });

  }

  //
  // ⛽ FUEL
  //

  if (averageKmPerLiter < 30) {

    recommendations.push({

      priority: "medium",

      icon: "⛽",

      title:
        "อัตราสิ้นเปลืองสูง",

      description:
        "ควรตรวจสอบกรองอากาศและแรงดันลมยาง"

    });

  }

  //
  // 📈 TREND
  //

  if (monthlyTrend > 15) {

    recommendations.push({

      priority: "medium",

      icon: "📈",

      title:
        "ค่าใช้จ่ายเพิ่มขึ้น",

      description:
        "ควรควบคุมงบประมาณในเดือนถัดไป"

    });

  }

  //
  // 🚨 HEALTH
  //

  if (maintenanceScore < 70) {

    recommendations.push({

      priority: "high",

      icon: "🚨",

      title:
        "Vehicle Health ต่ำ",

      description:
        "ควรเข้าตรวจเช็กสภาพรถ"

    });

  }

  //
  // 🔴 PERFORMANCE
  //

  if (
    drivingProfile?.type ===
    "PERFORMANCE BUILDER"
  ) {

    recommendations.push({

      priority: "low",

      icon: "🏁",

      title:
        "รถถูกใช้งานหนัก",

      description:
        "ควรตรวจสอบระบบช่วงล่างและเครื่องยนต์สม่ำเสมอ"

    });

  }

  //
  // 🟢 HEALTHY
  //

  if (
    recommendations.length === 0
  ) {

    recommendations.push({

      priority: "good",

      icon: "✅",

      title:
        "สภาพรถยอดเยี่ยม",

      description:
        "ยังไม่พบความเสี่ยงสำคัญ"

    });

  }

  return recommendations;

};