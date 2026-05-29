export const getDrivingProfile = ({

  averageKmPerLiter = 0,

  totalExpense = 0,

  expenseCount = 0,

  avgPerDay = 0,

  maintenanceScore = 80

}) => {

  //
  // 🟢 ECO RIDER
  //

  if (

    averageKmPerLiter >= 40 &&

    totalExpense < 50000 &&

    maintenanceScore >= 80

  ) {

    return {

      type: "ECO RIDER",

      emoji: "🟢",

      color: "text-emerald-300",

      bg:
        "from-emerald-500/20 to-cyan-500/10",

      description:
        "ขับขี่ประหยัด ดูแลรถดีมาก"

    };

  }

  //
  // 🔴 PERFORMANCE
  //

  if (

    totalExpense >= 100000 ||

    expenseCount >= 50

  ) {

    return {

      type: "PERFORMANCE BUILDER",

      emoji: "🔴",

      color: "text-red-300",

      bg:
        "from-red-500/20 to-pink-500/10",

      description:
        "สายแต่งเต็มระบบ ใช้งานหนัก"

    };

  }

  //
  // 🟠 DAILY
  //

  if (

    avgPerDay >= 50

  ) {

    return {

      type: "DAILY COMMUTER",

      emoji: "🟠",

      color: "text-orange-300",

      bg:
        "from-orange-500/20 to-yellow-500/10",

      description:
        "ใช้งานทุกวัน ระยะทางสูง"

    };

  }

  //
  // 🟣 WEEKEND
  //

  return {

    type: "WEEKEND RIDER",

    emoji: "🟣",

    color: "text-purple-300",

    bg:
      "from-purple-500/20 to-fuchsia-500/10",

    description:
      "ใช้งานเป็นครั้งคราว เน้นขับชิล"

  };

};