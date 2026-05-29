import { useMemo, useState } from "react";

import SmartInsights from "./analytics/SmartInsights";
import ExpensePieChart from "./analytics/ExpensePieChart";
import MonthlyExpenseChart from "./analytics/MonthlyExpenseChart";
import MaintenancePanel from "./analytics/MaintenancePanel";

const AnalyticsCharts = ({
  stats,
  categoryTotals,
  monthlyData,
  fuelRecords = [],
  serviceHistory = [],
  setServiceHistory,
  expenses = []
}) => {

  //
  // FILTER RANGE
  //

  const [range, setRange] = useState("ALL");

  //
  // CATEGORY DATA
  //

  const categoryChartData = useMemo(() => {

    const CATEGORY_CONFIG = {

      engine: {
        label: "เครื่องยนต์",
        color: "#8b5cf6",
        glow: "shadow-purple-500/30",
        icon: "🔧"
      },

      suspension: {
        label: "ช่วงล่าง/ยาง",
        color: "#3b82f6",
        glow: "shadow-blue-500/30",
        icon: "🛞"
      },

      body: {
        label: "ตัวถัง/อุปกรณ์",
        color: "#22c55e",
        glow: "shadow-green-500/30",
        icon: "🎨"
      },

      electrical: {
        label: "ไฟฟ้า",
        color: "#f59e0b",
        glow: "shadow-orange-500/30",
        icon: "⚡"
      },

      other: {
        label: "อื่นๆ",
        color: "#ec4899",
        glow: "shadow-pink-500/30",
        icon: "📦"
      }

    };

    const rawData = Array.isArray(categoryTotals)

      ? categoryTotals.map((item) => ({

          key: item.category,

          name:
            CATEGORY_CONFIG[item.category]?.label ||
            item.category,

          color:
            CATEGORY_CONFIG[item.category]?.color ||
            "#8b5cf6",

          glow:
            CATEGORY_CONFIG[item.category]?.glow,

          icon:
            CATEGORY_CONFIG[item.category]?.icon ||
            "📦",

          value: Number(item.total || 0)

        }))

      : Object.entries(categoryTotals || {}).map(
          ([key, value]) => ({

            key,

            name:
              CATEGORY_CONFIG[key]?.label || key,

            color:
              CATEGORY_CONFIG[key]?.color ||
              "#8b5cf6",

            glow:
              CATEGORY_CONFIG[key]?.glow,

            icon:
              CATEGORY_CONFIG[key]?.icon ||
              "📦",

            value:
              typeof value === "number"
                ? Number(value)
                : Number(value?.total || 0)

          })
        );

    return rawData.sort(
      (a, b) => b.value - a.value
    );

  }, [categoryTotals]);

  //
  // MONTHLY DATA
  //

  const allMonthlyData = useMemo(() => {

    return Object.entries(monthlyData || {}).map(
      ([month, expenses]) => ({

        month,

        total: expenses.reduce(
          (sum, exp) => sum + exp.price,
          0
        )

      })
    );

  }, [monthlyData]);

  //
  // FILTERED
  //

  const monthlyChartData = useMemo(() => {

    if (range === "ALL") {
      return allMonthlyData;
    }

    return allMonthlyData.slice(
      -Number(range)
    );

  }, [allMonthlyData, range]);

  //
  // TOTAL
  //

  const total = categoryChartData.reduce(
    (sum, item) => sum + Number(item.value),
    0
  );

  return (

    <div className="space-y-8 mt-8">

      <SmartInsights
        stats={stats}
        categoryChartData={categoryChartData}
        monthlyChartData={monthlyChartData}
        fuelRecords={fuelRecords}
        serviceHistory={serviceHistory}
        expenses={expenses}
      />

      <MaintenancePanel
        fuelRecords={fuelRecords}
        serviceHistory={serviceHistory}
        setServiceHistory={setServiceHistory}
      />

      <ExpensePieChart
        categoryChartData={categoryChartData}
        total={total}
      />

      <MonthlyExpenseChart
        monthlyChartData={monthlyChartData}
        range={range}
        setRange={setRange}
      />

    </div>

  );

};

export default AnalyticsCharts;