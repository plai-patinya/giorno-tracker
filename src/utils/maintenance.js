//
// 🛠️ CALCULATE SERVICE
//

export const calculateService = (
  currentOdo,
  lastOdo,
  intervalKm
) => {

  const nextKm =
    lastOdo + intervalKm;

  const remainingKm =
    Math.max(
      nextKm - currentOdo,
      0
    );

  const kmUsed =
    currentOdo - lastOdo;

  const progress = Math.min(

    Math.max(
      (kmUsed / intervalKm) * 100,
      0
    ),

    100

  );

  const status =

    remainingKm <= 300

      ? "critical"

      : remainingKm <= 800

      ? "warning"

      : "healthy";

  return {

    nextKm,
    remainingKm,
    kmUsed,
    progress,
    status

  };

};

//
// 🚨 SERVICE STATUS
//

export const getServiceStatus = (
  progress
) => {

  if (progress >= 90) {

    return {

      label: "CRITICAL",

      color: "text-red-400",

      bg: "bg-red-500/15",

      border: "border-red-500/30",

      icon: "🚨"

    };

  }

  if (progress >= 70) {

    return {

      label: "WARNING",

      color: "text-yellow-300",

      bg: "bg-yellow-500/15",

      border: "border-yellow-500/30",

      icon: "⚠"

    };

  }

  return {

    label: "GOOD",

    color: "text-emerald-400",

    bg: "bg-emerald-500/15",

    border: "border-emerald-500/30",

    icon: "✅"

  };

};

//
// 🤖 AI RECOMMENDATION
//

export const getRecommendation = (
  progress,
  type
) => {

  if (progress >= 90) {
    return `ควรเปลี่ยน${type}ทันที`;
  }

  if (progress >= 70) {
    return `ควรตรวจสอบ${type}ภายในสัปดาห์นี้`;
  }

  return `${type}ยังอยู่ในสภาพดี`;

};

//
// 📅 ESTIMATE DAYS
//

export const estimateDaysLeft = (
  remainingKm,
  avgDailyKm = 35
) => {

  if (avgDailyKm <= 0) {
    return "N/A";
  }

  return Math.ceil(
    remainingKm / avgDailyKm
  );

};