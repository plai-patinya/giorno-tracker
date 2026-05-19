import { useMemo } from "react";

const useFuelAnalytics = (fuelRecordsInput = []) => {

  const fuelRecords = Array.isArray(fuelRecordsInput)
    ? fuelRecordsInput
    : [];

  const fuelStats = useMemo(() => {

    const safeFuel = Array.isArray(fuelRecords)
      ? fuelRecords
      : [];

    if (safeFuel.length === 0) {
      return null;
    }

    const sorted = [...safeFuel]
      .sort((a, b) => a.odometer - b.odometer);

    const latest = sorted[sorted.length - 1];

    const totalDistance =
      latest.odometer -
      (sorted[0]?.odometer || 0);

    const totalLiters =
      safeFuel.reduce(
        (sum, rec) => sum + (rec.liters || 0),
        0
      );

    const totalSpent =
      safeFuel.reduce(
        (sum, rec) => sum + (rec.totalPrice || 0),
        0
      );

    const avgEfficiency =
      totalLiters > 0
        ? totalDistance / totalLiters
        : 0;

    const efficiencies =
      safeFuel
        .filter(r => r?.efficiency)
        .map(r => r.efficiency);

    const bestEfficiency =
      efficiencies.length > 0
        ? Math.max(...efficiencies)
        : 0;

    const worstEfficiency =
      efficiencies.length > 0
        ? Math.min(...efficiencies)
        : 0;

    const monthlyStats = {};

    safeFuel.forEach((record) => {

      if (!record?.date) return;

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

      monthlyStats[monthKey].totalSpent += record.totalPrice || 0;
      monthlyStats[monthKey].totalLiters += record.liters || 0;
      monthlyStats[monthKey].count++;
      monthlyStats[monthKey].records.push(record);

      if (record.distance) {
        monthlyStats[monthKey].totalDistance += record.distance;
      }

    });

    const monthlyArray =
      Object.values(monthlyStats)
        .sort((a, b) =>
          b.month.localeCompare(a.month)
        );

    return {
      currentOdometer: latest.odometer,
      totalDistance,
      totalLiters,
      totalSpent,
      avgEfficiency,
      bestEfficiency,
      worstEfficiency,
      recordCount: safeFuel.length,
      monthlyStats: monthlyArray
    };

  }, [fuelRecords]);

  return fuelStats;

};

export default useFuelAnalytics;