import { useMemo } from "react";

const useFuelAnalytics = (fuelRecords) => {

  const fuelStats = useMemo(() => {

    if (fuelRecords.length === 0) {
      return null;
    }

    const sorted = [...fuelRecords]
      .sort((a, b) => a.odometer - b.odometer);

    const latest =
      sorted[sorted.length - 1];

    const totalDistance =
      latest.odometer -
      (sorted[0]?.odometer || 0);

    const totalLiters =
      fuelRecords.reduce(
        (sum, rec) => sum + rec.liters,
        0
      );

    const totalSpent =
      fuelRecords.reduce(
        (sum, rec) => sum + rec.totalPrice,
        0
      );

    const avgEfficiency =
      totalDistance / totalLiters;

    const efficiencies =
      fuelRecords
        .filter(r => r.efficiency)
        .map(r => r.efficiency);

    const bestEfficiency =
      efficiencies.length > 0
        ? Math.max(...efficiencies)
        : 0;

    const worstEfficiency =
      efficiencies.length > 0
        ? Math.min(...efficiencies)
        : 0;

    // 📅 Monthly stats
    const monthlyStats = {};

    fuelRecords.forEach((record) => {

      const monthKey =
        record.date.substring(0, 7);

      if (!monthlyStats[monthKey]) {

        monthlyStats[monthKey] = {
          month: monthKey,
          totalSpent: 0,
          totalLiters: 0,
          totalDistance: 0,
          count: 0,
          records: []
        };

      }

      monthlyStats[monthKey]
        .totalSpent += record.totalPrice;

      monthlyStats[monthKey]
        .totalLiters += record.liters;

      monthlyStats[monthKey]
        .count++;

      monthlyStats[monthKey]
        .records.push(record);

      if (record.distance) {

        monthlyStats[monthKey]
          .totalDistance += record.distance;

      }

    });

    const monthlyArray =
      Object.values(monthlyStats)
        .sort((a, b) =>
          b.month.localeCompare(a.month)
        );

    return {

      currentOdometer:
        latest.odometer,

      totalDistance,

      totalLiters,

      totalSpent,

      avgEfficiency,

      bestEfficiency,

      worstEfficiency,

      recordCount:
        fuelRecords.length,

      monthlyStats:
        monthlyArray

    };

  }, [fuelRecords]);

  return fuelStats;

};

export default useFuelAnalytics;