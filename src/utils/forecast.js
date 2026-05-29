//
// 📈 EXPENSE FORECAST AI
//

export const generateExpenseForecast = (
  monthlyChartData = []
) => {

  if (
    monthlyChartData.length < 2
  ) {

    return {

      forecast: 0,

      trend: "stable",

      percentage: 0

    };

  }

  //
  // LAST MONTH
  //

  const latest =
    monthlyChartData[
      monthlyChartData.length - 1
    ]?.total || 0;

  //
  // PREVIOUS MONTH
  //

  const previous =
    monthlyChartData[
      monthlyChartData.length - 2
    ]?.total || 0;

  //
  // TREND %
  //

  const percentage =

    previous > 0

      ? (
          (
            (latest - previous) /
            previous
          ) * 100
        )

      : 0;

  //
  // FORECAST
  //

  let forecast = latest;

  if (percentage > 15) {

    forecast =
      latest * 1.15;

  } else if (percentage > 5) {

    forecast =
      latest * 1.08;

  } else if (percentage < -10) {

    forecast =
      latest * 0.92;

  }

  //
  // TREND
  //

  const trend =

    percentage > 8

      ? "up"

      : percentage < -8

      ? "down"

      : "stable";

  return {

    forecast:
      Math.round(forecast),

    trend,

    percentage:
      percentage.toFixed(1)

  };

};