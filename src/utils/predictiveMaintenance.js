//
// 🔮 Predictive Maintenance Engine
//

export const predictMaintenanceDue = (

  remainingKm,

  avgKmPerDay

) => {

  if (

    remainingKm == null ||

    avgKmPerDay <= 0

  ) {

    return {

      estimatedDays: null,

      estimatedDate: null

    };

  }

  const estimatedDays =

    Math.ceil(
      remainingKm /
      avgKmPerDay
    );

  const dueDate =
    new Date();

  dueDate.setDate(

    dueDate.getDate() +
    estimatedDays

  );

  return {

    estimatedDays,

    estimatedDate:

      dueDate
        .toISOString()
        .split("T")[0]

  };

};