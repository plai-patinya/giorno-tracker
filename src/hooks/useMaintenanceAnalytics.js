import { useMemo } from "react";

import useMaintenanceStore from "../store/useMaintenanceStore";

import {
  getLatestService,
  calculateServiceStatus,
  getServiceStatusStyle,
  calculateMaintenanceHealth,
} from "../maintenance/maintenanceEngine";

import { predictMaintenanceDue } from "../utils/predictiveMaintenance";

const useMaintenanceAnalytics = (
  currentOdo = 0,

  fuelRecords = [],
) => {
  //
  // 🛠️ STORE
  //

  const { maintenanceRecords } = useMaintenanceStore();

  //
  // 🛢️ OIL
  //

  const oilService = getLatestService(maintenanceRecords, "Engine Oil");

  //
  // 🛞 TIRES
  //

  const tireService = getLatestService(maintenanceRecords, "Tires");

  //
  // 🛑 BRAKES
  //

  const brakeService = getLatestService(
    maintenanceRecords,

    "Brake Pads",
  );

  //
  // 🔋 BATTERY
  //

  const batteryService = getLatestService(
    maintenanceRecords,

    "Battery",
  );

  const airFilterService = getLatestService(maintenanceRecords, "Air Filter");

  const sparkPlugService = getLatestService(maintenanceRecords, "Spark Plug");

  const cvtBeltService = getLatestService(maintenanceRecords, "CVT Belt");

  const rollerService = getLatestService(maintenanceRecords, "Roller Weight");

  const brakeFluidService = getLatestService(maintenanceRecords, "Brake Fluid");

  //
  // 📊 ANALYTICS
  //

  return useMemo(() => {
    const oil = calculateServiceStatus({
      currentOdo,

      lastServiceOdo: oilService?.serviceOdometer,

      intervalKm: oilService?.nextServiceKm || 3000,
    });

    const tires = calculateServiceStatus({
      currentOdo,

      lastServiceOdo: tireService?.serviceOdometer,

      intervalKm: tireService?.nextServiceKm || 20000,
    });

    const airFilter = calculateServiceStatus({
      currentOdo,

      lastServiceOdo: airFilterService?.serviceOdometer,

      intervalKm: airFilterService?.nextServiceKm || 4000,
    });

    const sparkPlug = calculateServiceStatus({
      currentOdo,

      lastServiceOdo: sparkPlugService?.serviceOdometer,

      intervalKm: sparkPlugService?.nextServiceKm || 8000,
    });

    const cvtBelt = calculateServiceStatus({
      currentOdo,

      lastServiceOdo: cvtBeltService?.serviceOdometer,

      intervalKm: cvtBeltService?.nextServiceKm || 24000,
    });

    const roller = calculateServiceStatus({
      currentOdo,

      lastServiceOdo: rollerService?.serviceOdometer,

      intervalKm: rollerService?.nextServiceKm || 24000,
    });

    const brakeFluid = calculateServiceStatus({
      currentOdo,

      lastServiceOdo: brakeFluidService?.serviceOdometer,

      intervalKm: brakeFluidService?.nextServiceKm || 24000,
    });

    const brakes = calculateServiceStatus({
      currentOdo,

      lastServiceOdo: brakeService?.serviceOdometer,

      intervalKm: brakeService?.nextServiceKm || 12000,
    });

    const battery = calculateServiceStatus({
      currentOdo,

      lastServiceOdo: batteryService?.serviceOdometer,

      intervalKm: batteryService?.nextServiceKm || 18000,
    });

    const allServices = [
      oil,
      airFilter,
      sparkPlug,
      cvtBelt,
      roller,
      brakeFluid,
      tires,
      brakes,
      battery,
    ];

    const knownServices = allServices.filter(
      (service) => service.status !== "unknown",
    );

    //
    // ⏳ LOADING / NO DATA
    //

    const maintenanceCoverage =
      knownServices.length === 0
        ? null
        : Math.round((knownServices.length / allServices.length) * 100);

    //
    // 🚗 HEALTH
    //

    const maintenanceHealth = calculateMaintenanceHealth([
      oil.status,

      airFilter.status,

      sparkPlug.status,

      cvtBelt.status,

      roller.status,

      tires.status,

      brakes.status,

      battery.status,

      brakeFluid.status,
    ]);

    const coverageScore = maintenanceCoverage ?? 0;

    const overallHealth = Math.round(
      maintenanceHealth * 0.7 + coverageScore * 0.3,
    );

    //
    // 🚗 AVG KM / DAY
    //

    const avgKmPerDay = (() => {
      if (fuelRecords.length < 2) {
        return 0;
      }

      const sorted = [...fuelRecords].sort(
        (a, b) => new Date(a.date) - new Date(b.date),
      );

      const first = sorted[0];

      const last = sorted[sorted.length - 1];

      const distance = (last.odometer || 0) - (first.odometer || 0);

      const days = Math.max(
        1,

        Math.ceil((new Date(last.date) - new Date(first.date)) / 86400000),
      );

      return distance / days;
    })();

    const today = new Date();

    const createPrediction = (service) => {
      if (
        !service ||
        service.status === "unknown" ||
        !service.remainingKm ||
        avgKmPerDay <= 0
      ) {
        return null;
      }

      const estimatedDays = Math.max(
        0,

        Math.ceil(service.remainingKm / avgKmPerDay),
      );

      const estimatedDate = new Date(
        today.getTime() + estimatedDays * 24 * 60 * 60 * 1000,
      );

      return {
        estimatedDays,

        estimatedDate: estimatedDate.toISOString().split("T")[0],
      };
    };

    //
    // 🛢️ OIL FORECAST
    //

    const oilPrediction = predictMaintenanceDue(
      oil?.remainingKm,

      avgKmPerDay,
    );

    const predictions = {
      oil: createPrediction(oil),

      airFilter: createPrediction(airFilter),

      sparkPlug: createPrediction(sparkPlug),

      cvtBelt: createPrediction(cvtBelt),

      roller: createPrediction(roller),

      brakeFluid: createPrediction(brakeFluid),

      tires: createPrediction(tires),

      brakes: createPrediction(brakes),

      battery: createPrediction(battery),
    };

    const calculatePriority = (service) => {
      if (!service || service.status === "unknown") {
        return {
          level: "unknown",
          score: 0,
        };
      }

      if (service.status === "critical") {
        return {
          level: "high",
          score: 100,
        };
      }

      if (service.status === "warning") {
        return {
          level: "medium",
          score: 70,
        };
      }

      const score = Math.max(
        10,

        Math.round((service.progress || 0) / 3),
      );

      return {
        level: "low",

        score,
      };
    };

    const priorityScores = {
      oil: calculatePriority(oil),

      airFilter: calculatePriority(airFilter),

      sparkPlug: calculatePriority(sparkPlug),

      cvtBelt: calculatePriority(cvtBelt),

      roller: calculatePriority(roller),

      brakeFluid: calculatePriority(brakeFluid),

      tires: calculatePriority(tires),

      brakes: calculatePriority(brakes),

      battery: calculatePriority(battery),
    };

    const serviceTimeline = [
      {
        icon: "🛢️",
        title: "Engine Oil",
        forecast: predictions.oil,
      },

      {
        icon: "🌬️",
        title: "Air Filter",
        forecast: predictions.airFilter,
      },

      {
        icon: "⚡",
        title: "Spark Plug",
        forecast: predictions.sparkPlug,
      },

      {
        icon: "⚙️",
        title: "CVT Belt",
        forecast: predictions.cvtBelt,
      },

      {
        icon: "🔩",
        title: "Roller Weight",
        forecast: predictions.roller,
      },

      {
        icon: "🧪",
        title: "Brake Fluid",
        forecast: predictions.brakeFluid,
      },

      {
        icon: "🛞",
        title: "Tires",
        forecast: predictions.tires,
      },

      {
        icon: "🛑",
        title: "Brake Pads",
        forecast: predictions.brakes,
      },

      {
        icon: "🔋",
        title: "Battery",
        forecast: predictions.battery,
      },
    ]
      .filter((item) => item.forecast)
      .sort((a, b) => a.forecast.estimatedDays - b.forecast.estimatedDays);

    const priorityList = [
      {
        icon: "🛢️",
        title: "Engine Oil",
        priority: priorityScores.oil,
      },

      {
        icon: "🌬️",
        title: "Air Filter",
        priority: priorityScores.airFilter,
      },

      {
        icon: "⚡",
        title: "Spark Plug",
        priority: priorityScores.sparkPlug,
      },

      {
        icon: "⚙️",
        title: "CVT Belt",
        priority: priorityScores.cvtBelt,
      },

      {
        icon: "🔩",
        title: "Roller Weight",
        priority: priorityScores.roller,
      },

      {
        icon: "🧪",
        title: "Brake Fluid",
        priority: priorityScores.brakeFluid,
      },

      {
        icon: "🛞",
        title: "Tires",
        priority: priorityScores.tires,
      },

      {
        icon: "🛑",
        title: "Brake Pads",
        priority: priorityScores.brakes,
      },

      {
        icon: "🔋",
        title: "Battery",
        priority: priorityScores.battery,
      },
    ].sort((a, b) => b.priority.score - a.priority.score);

    const confidenceScore = Math.round(
      (maintenanceCoverage || 0) * 0.8 +
        (knownServices.length / allServices.length) * 20,
    );

    const confidenceLevel =
      confidenceScore >= 80 ? "High" : confidenceScore >= 50 ? "Medium" : "Low";

    //
    // 🚨 RISK ENGINE
    //

    const activePriorities = priorityList.filter(
      (item) => item.priority.score > 0,
    );

    const averagePriority =
      activePriorities.length > 0
        ? Math.round(
            activePriorities.reduce(
              (sum, item) => sum + item.priority.score,

              0,
            ) / activePriorities.length,
          )
        : 0;

    const riskScore = Math.round(
      averagePriority * 0.7 + (100 - overallHealth) * 0.3,
    );

    let riskLevel = "low";
    let riskLabel = "Low Risk";

    if (riskScore >= 80) {
      riskLevel = "high";
      riskLabel = "High Risk";
    } else if (riskScore >= 50) {
      riskLevel = "medium";
      riskLabel = "Medium Risk";
    }

    const aiAdvisor = {
      vehicleStatus:
        overallHealth >= 80
          ? "Excellent"
          : overallHealth >= 60
            ? "Good"
            : "Attention",

      healthScore: overallHealth,

      riskScore,
      riskLevel,
      riskLabel,

      oilRemainingKm: oil?.remainingKm || 0,

      oilRemainingDays: oilPrediction?.estimatedDays || null,

      coverage: maintenanceCoverage,

      confidence: confidenceLevel,

      confidenceScore,

      unknownServices: 9 - Math.round((maintenanceCoverage / 100) * 9),

      recommendedServices: [],

      oilDueDate: oilPrediction?.estimatedDate || null,
    };

    if (airFilter?.status === "unknown") {
      aiAdvisor.recommendedServices.push("Air Filter");
    }

    if (sparkPlug?.status === "unknown") {
      aiAdvisor.recommendedServices.push("Spark Plug");
    }

    if (battery?.status === "unknown") {
      aiAdvisor.recommendedServices.push("Battery");
    }

    //
    // 💰 COST FORECAST ENGINE
    //

    const SERVICE_COSTS = {
      oil: 320,

      airFilter: 180,

      sparkPlug: 120,

      cvtBelt: 850,

      roller: 250,

      brakeFluid: 180,

      tires: 1800,

      brakes: 450,

      battery: 650,
    };

    const costForecasts = Object.entries(predictions)

      .filter(([, forecast]) => forecast)

      .map(([key, forecast]) => ({
        service: key,

        estimatedCost: SERVICE_COSTS[key] || 0,

        estimatedDays: forecast.estimatedDays,

        estimatedDate: forecast.estimatedDate,
      }));

    const upcomingCost = costForecasts.reduce(
      (sum, item) => sum + item.estimatedCost,

      0,
    );

    const next30Days = costForecasts
      .filter((item) => item.estimatedDays <= 30)
      .reduce((sum, item) => sum + item.estimatedCost, 0);

    const next90Days = costForecasts
      .filter((item) => item.estimatedDays <= 90)
      .reduce((sum, item) => sum + item.estimatedCost, 0);

    const next180Days = costForecasts
      .filter((item) => item.estimatedDays <= 180)
      .reduce((sum, item) => sum + item.estimatedCost, 0);

    const next365Days = costForecasts
      .filter((item) => item.estimatedDays <= 365)
      .reduce((sum, item) => sum + item.estimatedCost, 0);

    const budgetPlanner = {
      next30Days,
      next90Days,
      next180Days,
      next365Days,
    };

    console.log("💰 COST FORECAST:", costForecasts);

    console.log("💵 UPCOMING COST:", upcomingCost);

    console.log("📈 BUDGET PLANNER:", budgetPlanner);

    return {
      oil,

      airFilter,

      sparkPlug,

      cvtBelt,

      roller,

      brakeFluid,

      tires,

      brakes,

      battery,

      maintenanceHealth,

      maintenanceCoverage,

      overallHealth,

      avgKmPerDay,

      oilPrediction,

      predictions,

      serviceTimeline,

      priorityList,

      priorityScores,

      aiAdvisor,

      confidenceScore,

      confidenceLevel,

      riskScore,

      riskLevel,

      riskLabel,

      costForecasts,

      upcomingCost,

      budgetPlanner,

      oilStyle: getServiceStatusStyle(oil.status),

      airFilterStyle: getServiceStatusStyle(airFilter.status),

      sparkPlugStyle: getServiceStatusStyle(sparkPlug.status),

      cvtBeltStyle: getServiceStatusStyle(cvtBelt.status),

      rollerStyle: getServiceStatusStyle(roller.status),

      brakeFluidStyle: getServiceStatusStyle(brakeFluid.status),

      tireStyle: getServiceStatusStyle(tires.status),

      brakeStyle: getServiceStatusStyle(brakes.status),

      batteryStyle: getServiceStatusStyle(battery.status),
    };
  }, [currentOdo, maintenanceRecords, fuelRecords]);
};

export default useMaintenanceAnalytics;
