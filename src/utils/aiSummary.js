export const generateAISummary = ({

  expenses = [],

  monthlyAverage = 0,

  monthlyTrend = 0,

  maintenanceScore = 80

}) => {

  //
  // 📊 CATEGORY TOTAL
  //

  const categoryTotals = {};

  expenses.forEach((item) => {

    const category =
      item.category || "อื่นๆ";

    categoryTotals[category] =

      (categoryTotals[category] || 0)

      + Number(item.price || 0);

  });

  //
  // 🏆 TOP CATEGORY
  //

  const topCategory =

    Object.entries(categoryTotals)

      .sort(
        (a, b) =>
          b[1] - a[1]
      )[0]?.[0]

      || "ไม่มีข้อมูล";

  //
  // 🧠 AI STATUS
  //

  let aiStatus =

    "ระบบอยู่ในสภาพสมดุล";

  if (monthlyTrend > 100) {

    aiStatus =

      "ค่าใช้จ่ายเพิ่มขึ้นผิดปกติ";

  }

  if (maintenanceScore < 70) {

    aiStatus =

      "ควรตรวจเช็กสภาพรถ";

  }

  //
  // 🎯 RETURN
  //

  return {

    topCategory,

    monthlyAverage,

    monthlyTrend,

    aiStatus

  };

};