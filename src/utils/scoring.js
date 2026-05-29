//
// 🚗 VEHICLE HEALTH SCORE
//

export const calculateVehicleHealth = ({

  fuelAverage,
  totalExpense,

  oilProgress,
  airProgress,
  tireProgress,

  serviceCount

}) => {

  const maintenancePenalty =

    serviceCount === 0
      ? 40
      : 0;

  const fuelScore =

    Number(fuelAverage) >= 45
      ? 100

      : Number(fuelAverage) >= 35
      ? 80

      : Number(fuelAverage) >= 25
      ? 60

      : 40;

  const spendingPenalty =

    totalExpense >= 100000
      ? 20

      : totalExpense >= 50000
      ? 10

      : 0;

  const maintenanceUsagePenalty = Math.floor(

    (
      oilProgress * 0.5 +
      airProgress * 0.3 +
      tireProgress * 0.2
    ) * 0.5

  );

  return Math.max(

    100 -

    maintenancePenalty -

    spendingPenalty -

    maintenanceUsagePenalty +

    Math.round(fuelScore * 0.15),

    5

  );

};

//
// 🎨 HEALTH COLOR
//

export const getHealthColor = (
  score
) => {

  if (score >= 80) {
    return "text-emerald-400";
  }

  if (score >= 60) {
    return "text-yellow-400";
  }

  return "text-red-400";

};