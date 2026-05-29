export const getVehicleMood = (
  maintenanceScore = 80
) => {

  //
  // 🟢 HEALTHY
  //

  if (maintenanceScore >= 80) {

    return {

      status: "healthy",

      label: "Vehicle Healthy",

      glow:
        "from-emerald-500/20 via-cyan-500/10 to-transparent",

      orb:
        "bg-emerald-500/20",

      text:
        "text-emerald-300",

      border:
        "border-emerald-500/20"

    };

  }

  //
  // 🟡 WARNING
  //

  if (maintenanceScore >= 60) {

    return {

      status: "warning",

      label: "Needs Attention",

      glow:
        "from-yellow-500/20 via-orange-500/10 to-transparent",

      orb:
        "bg-yellow-500/20",

      text:
        "text-yellow-300",

      border:
        "border-yellow-500/20"

    };

  }

  //
  // 🔴 CRITICAL
  //

  return {

    status: "critical",

    label: "Critical Status",

    glow:
      "from-red-500/20 via-pink-500/10 to-transparent",

    orb:
      "bg-red-500/20",

    text:
      "text-red-300",

    border:
      "border-red-500/20"

  };

};