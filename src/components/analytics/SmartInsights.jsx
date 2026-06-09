import {

  calculateVehicleHealth,
  getHealthColor

} from "../../utils/scoring";

import NotificationCenter
from "../notifications/NotificationCenter";

import { generateNotifications }
from "../../utils/notifications";

import { generateAISummary }
from "../../utils/aiSummary";

const SmartInsights = ({

  stats = {},
  categoryChartData = [],
  monthlyChartData = [],
  fuelRecords = [],
  expenses = [],

  maintenanceAnalytics

}) => {

  //
  // 💰 TOTAL EXPENSE
  //

  const total =
    categoryChartData.reduce(
      (sum, item) =>
        sum + Number(item.value || 0),
      0
    );

  //
  // 📈 MONTHLY
  //

  const totalMonths =
    monthlyChartData.length || 1;

  const averageMonthly =
    total / totalMonths;

  const currentMonth =
    monthlyChartData[
      monthlyChartData.length - 1
    ]?.total || 0;

  const previousMonth =
    monthlyChartData[
      monthlyChartData.length - 2
    ]?.total || 0;

  const monthlyTrend =
    previousMonth > 0

      ? (
          (
            (currentMonth - previousMonth) /
            previousMonth
          ) * 100
        ).toFixed(1)

      : 0;

  const trendUp =
    Number(monthlyTrend) > 0;

  //
  // 🏆 TOP CATEGORY
  //

  const topCategory =
    [...categoryChartData]
      .sort((a, b) =>
        b.value - a.value
      )[0];

  //
  // ⛽ FUEL
  //

  const averageKmPerLiter =

    fuelRecords.length > 0

      ? (
          fuelRecords.reduce(
            (sum, r) =>
              sum + Number(r.kmPerLiter || 0),
            0
          ) / fuelRecords.length
        ).toFixed(1)

      : 0;

  const averageCostPerKm =

    fuelRecords.length > 0

      ? (
          fuelRecords.reduce(
            (sum, r) =>
              sum + Number(r.costPerKm || 0),
            0
          ) / fuelRecords.length
        ).toFixed(2)

      : 0;

  const bestFuelRecord =
    [...fuelRecords].sort(
      (a, b) =>
        b.kmPerLiter -
        a.kmPerLiter
    )[0];

  const fuelTrend =

    Number(averageKmPerLiter) >= 45

      ? "ดีมาก"

      : Number(averageKmPerLiter) >= 35

      ? "ปกติ"

      : "เริ่มกินน้ำมัน";

  
  const maintenanceScore =

  maintenanceAnalytics
    ?.maintenanceHealth || 0;

  //
  // 🎨 HEALTH COLOR
  //

  const healthColor =
    getHealthColor(
      maintenanceScore
    );

  //
  // 🧠 AI STATUS
  //

  const serviceStatus =

    maintenanceScore >= 80

      ? "สภาพรถยอดเยี่ยม"

      : maintenanceScore >= 60

      ? "ควรเริ่มตรวจเช็กบางรายการ"

      : "ควรเข้าตรวจสภาพโดยด่วน";

  //
  // 🔮 FORECAST
  //

  const forecastNextMonth =
    Math.round(

      currentMonth *

      (
        trendUp
          ? 1.08
          : 0.95
      )

    );

  //
  // 🚨 OVERSPENDING
  //

  const overspendingCategory =

    topCategory?.value >

    total * 0.5

      ? topCategory

      : null;

  //
  // 🔔 aiSummary object
  //

    const aiSummary =
    generateAISummary({

      expenses,

      monthlyAverage:
        stats?.avgPerMonth || 0,

      monthlyTrend:
        stats?.monthlyTrend || 0,

      maintenanceScore:
        stats?.vehicleHealth || 80

    });

  //
  // 🔔 NOTIFICATIONS
  //

  const notifications =
  generateNotifications({

      maintenanceAnalytics,

      monthlyTrend,

      trendUp,

      averageKmPerLiter

  });

  console.log(
    "🔔 NOTIFICATIONS:",
    notifications
  );

  return (

    <div className="mt-8">

      <div className="rounded-[28px] p-5 sm:p-6 border border-white/10 bg-white/[0.04] backdrop-blur-xl shadow-[0_10px_40px_rgba(0,0,0,0.3)] space-y-6 transition-all duration-500 hover:border-white/20">

        {/* HEADER */}

        <div className="flex items-center gap-4">

          <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 flex items-center justify-center text-xl">

            🧠

          </div>

          <div>

            <h3 className="text-2xl font-black text-white">

              Smart Insights

            </h3>

            <p className="text-sm text-white/50">

              วิเคราะห์รถของคุณแบบอัตโนมัติ

            </p>

          </div>

        </div>

        {/* AI SCORE */}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          <div className="md:col-span-2 rounded-3xl p-5 bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-400/20">

            <div className="flex justify-between items-center">

              <div>

                <div className="text-sm text-green-200">

                  🚗 Vehicle Health Score

                </div>

                <div
                  className={`

                  text-5xl
                  font-black
                  mt-2

                  ${healthColor}

                  animate-pulse

                  `}
                >

                  {maintenanceScore}%

                </div>

                <div className="text-sm text-white/60 mt-1">

                  {serviceStatus}

                </div>

              </div>

              <div className="text-5xl">

                {

                  maintenanceScore >= 80

                    ? "🟢"

                    : maintenanceScore >= 50

                    ? "🟡"

                    : "🔴"

                }

              </div>

            </div>

          </div>

        {/* 🔔 AI NOTIFICATION CENTER */}

        <NotificationCenter
        notifications={notifications}
        />

        {/* SUMMARY */}

        <div
          className="
            rounded-3xl
            border border-white/10
            bg-white/[0.04]
            backdrop-blur-xl
            p-5
            mt-5
          "
        >

          <div className="flex items-center gap-3 mb-5">

            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-500/10 border border-white/10 flex items-center justify-center text-2xl">

              🧠

            </div>

            <div>

              <div className="text-sm text-white/50">

                AI Summary

              </div>

              <div className="text-xl font-black text-white">

                Vehicle Intelligence

              </div>

            </div>

          </div>

          <div className="space-y-4">

            <div className="flex items-center justify-between">

              <span className="text-white/50">

                Top Expense

              </span>

              <span className="font-bold text-orange-300">

                {aiSummary.topCategory}

              </span>

            </div>

            <div className="flex items-center justify-between">

              <span className="text-white/50">

                Monthly Average

              </span>

              <span className="font-bold text-cyan-300">

                ฿{
                  Math.round(
                    aiSummary.monthlyAverage
                  ).toLocaleString()
                }

              </span>

            </div>

            <div className="flex items-center justify-between">

              <span className="text-white/50">

                Spending Trend

              </span>

              <span className="font-bold text-pink-300">

                {aiSummary.monthlyTrend > 0
                  ? "+"
                  : ""}

                {aiSummary.monthlyTrend}%

              </span>

            </div>

            <div
              className="
                rounded-2xl
                border border-white/10
                bg-white/5
                p-4
              "
            >

              <div className="text-sm text-white/50 mb-2">

                AI Analysis

              </div>

              <div className="font-bold text-emerald-300">

                {aiSummary.aiStatus}

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>

    </div>

  );

};

export default SmartInsights;