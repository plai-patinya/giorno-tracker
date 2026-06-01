import {
  PieChart,
  TrendingUp,
  Activity,
  Award,
  DollarSign
} from "lucide-react";

import AnalyticsCharts from "./AnalyticsCharts";
import CountUp from "../components/CountUp";

import {
  cardStyle,
  hoverCard,
  glassOverlay
} from "../styles/ui";

import HeroVehiclePanel
from "./dashboard/HeroVehiclePanel";

import VehicleActivityFeed
from "./dashboard/VehicleActivityFeed";

import { generateActivityFeed }
from "../utils/activityFeed";

import ForecastCard
from "./dashboard/ForecastCard";

import { generateExpenseForecast }
from "../utils/forecast";

import DrivingProfileCard
from "./dashboard/DrivingProfileCard";

import { getDrivingProfile }
from "../utils/drivingProfile";

import RecommendationPanel
from "./dashboard/RecommendationPanel";

import { generateRecommendations }
from "../utils/recommendationEngine";

import useMaintenanceAnalytics
from "../hooks/useMaintenanceAnalytics";

const animateCard = (delay = 0) =>
  `opacity-0 animate-fadeUp [animation-delay:${delay}ms]`;

const DashboardView = ({
  stats,
  BIKE_BASE_PRICE,
  partsExpense,
  monthlyData,
  categoryTotals,
  categories,
  fuelRecords,
  serviceHistory,
  setServiceHistory,
  user,
  expenses
}) => {

  const activities =
  generateActivityFeed({

    expenses:
      stats?.expenses || [],

    fuelRecords,

    maintenanceScore:
      stats?.vehicleHealth || 82,

    monthlyTrend:
      stats?.monthlyTrend || 12,

    oilService: {

      progress: 78,

      remainingKm: 420

    }

  });

  const forecastData =
  generateExpenseForecast(

    Object.entries(monthlyData || {}).map(
      ([month, expenses]) => ({

        month,

        total:
          expenses.reduce(
            (sum, item) =>
              sum + item.price,
            0
          )

      })
    )

  );

  const drivingProfile =
  getDrivingProfile({

    averageKmPerLiter:
      stats?.avgFuelConsumption || 42,

    totalExpense:
      stats?.totalExpenseWithBike || 0,

    expenseCount:
      stats?.totalItems || 0,

    avgPerDay:
      stats?.avgPerDay || 0,

    maintenanceScore:
      stats?.vehicleHealth || 82

  });

  const recommendations =
  generateRecommendations({

    maintenanceScore:
      stats?.vehicleHealth || 82,

    averageKmPerLiter:
      stats?.avgFuelConsumption || 42,

    monthlyTrend:
      stats?.monthlyTrend || 12,

    totalExpense:
      stats?.totalExpenseWithBike || 0,

    oilService: {

      progress: 78,

      remainingKm: 420

    },

    drivingProfile

  });

  //
// 🚗 CURRENT ODOMETER
//

const currentOdo =

  fuelRecords.length > 0

    ? Math.max(

        ...fuelRecords.map(
          (record) =>

            Number(
              record.odometer || 0
            )
        )

      )

    : 0;

//
// 🛠️ MAINTENANCE ANALYTICS
//

const maintenanceAnalytics =

  useMaintenanceAnalytics(
    currentOdo
  );

  return (
    <div className="space-y-6 lg:space-y-8">

      {/* MAIN GRID */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">

        {/* LEFT SIDE */}
        <div className="xl:col-span-8 space-y-6">

          <HeroVehiclePanel

            maintenanceAnalytics={
              maintenanceAnalytics
            }

            maintenanceScore={
              Math.round(
                maintenanceAnalytics
                  ?.maintenanceHealth
              )
            }

            averageKmPerLiter={
              stats?.avgFuelConsumption || 42
            }

            nextServiceDays={8}

            totalExpense={
              stats?.totalExpenseWithBike || 0
            }

          />

          {/* HERO STATS */}
          <div
            className="
              grid
              grid-cols-1
              sm:grid-cols-2
              2xl:grid-cols-4
              gap-4 sm:gap-5
            "
          >

            {/* BIKE PRICE */}
            <div
              className={`
                ${cardStyle}
                ${hoverCard}
                ${glassOverlay}
                ${animateCard(0)}

                p-5 sm:p-6
              `}
            >
              <div className="text-purple-300 text-sm mb-2 flex items-center gap-2">
                <DollarSign size={14} />
                ราคาตัวรถ
              </div>

              <div className="text-3xl sm:text-4xl font-black tracking-tight mb-1">
                ฿<CountUp value={BIKE_BASE_PRICE} />
              </div>

              <div className="text-sm text-purple-300">
                ซื้อสด
              </div>
            </div>

            {/* PARTS */}
            <div
              className={`
                ${cardStyle}
                ${hoverCard}
                ${glassOverlay}
                ${animateCard(100)}

                p-5 sm:p-6
              `}
            >
              <div className="text-orange-300 text-sm mb-2 flex items-center gap-2">
                <TrendingUp size={14} />
                ค่าแต่งทั้งหมด
              </div>

              <div className="text-3xl sm:text-4xl font-black tracking-tight mb-1">
                ฿<CountUp value={partsExpense || 0} />
              </div>

              <div className="text-sm text-orange-300">
                {stats?.totalItems || 0} รายการ
              </div>
            </div>

            {/* TOTAL */}
            <div
              className={`
                ${cardStyle}
                ${hoverCard}
                ${glassOverlay}
                ${animateCard(200)}

                p-6 sm:p-7

                ring-1 ring-cyan-400/20

                shadow-[0_0_50px_rgba(34,211,238,0.12)]
              `}
            >
              <div className="${vehicleMood.text} text-sm mb-2 flex items-center gap-2">
                <Activity size={14} />
                รวมทั้งสิ้น
              </div>

              <div className="text-3xl sm:text-4xl font-black tracking-tight mb-1">
                ฿<CountUp value={stats?.totalExpenseWithBike || 0} />
              </div>

              <div className="text-sm text-cyan-300">
                ฿{Math.round(stats?.avgPerDay || 0)}/วัน
              </div>
            </div>

            {/* MONTHLY */}
            <div
              className={`
                ${cardStyle}
                ${hoverCard}
                ${glassOverlay}
                ${animateCard(300)}

                p-5 sm:p-6
              `}
            >
              <div className="text-pink-300 text-sm mb-2 flex items-center gap-2">
                <Award size={14} />
                เฉลี่ยต่อเดือน
              </div>

              <div className="text-3xl sm:text-4xl font-black tracking-tight mb-1">
                ฿<CountUp value={Math.round(stats?.avgPerMonth || 0)} />
              </div>

              <div className="text-sm text-pink-300">
                {Object.keys(monthlyData || {}).length} เดือน
              </div>
            </div>

          </div>

          <RecommendationPanel
            recommendations={recommendations}
          />

          <DrivingProfileCard
            profile={drivingProfile}
          />

          <ForecastCard

            forecast={
              forecastData.forecast
            }

            trend={
              forecastData.trend
            }

            percentage={
              forecastData.percentage
            }

          />

          <VehicleActivityFeed
            activities={activities}
          />

          {/* ANALYTICS */}
          <AnalyticsCharts
            categoryTotals={categoryTotals}
            monthlyData={monthlyData}
            categories={categories}
            fuelRecords={fuelRecords}
            serviceHistory={serviceHistory}
            setServiceHistory={setServiceHistory}
            user={user}
            expenses={expenses}
            maintenanceAnalytics={maintenanceAnalytics}
          />

        </div>

        {/* RIGHT SIDEBAR */}
        <div
          className={`
            xl:col-span-4

            ${cardStyle}
            ${hoverCard}
            ${glassOverlay}
            ${animateCard(400)}

            p-4 sm:p-6

            sticky top-24
          `}
        >

          <h3 className="text-xl sm:text-2xl font-bold mb-5 flex items-center gap-2">
            <PieChart className="text-orange-400" size={20} />
            สัดส่วนค่าใช้จ่าย
          </h3>

          <div className="grid grid-cols-1 gap-4">

            {(categoryTotals || []).map((item, index) => {

              if (!item?.category) return null;

              const percentage =
                partsExpense > 0
                  ? (item.total / partsExpense * 100).toFixed(1)
                  : 0;

              return (
                <div
                  key={item.category}
                  className={`
                    ${cardStyle}
                    ${hoverCard}
                    ${glassOverlay}
                    ${animateCard(500 + index * 80)}

                    p-4
                    hover:scale-[1.02]
                    cursor-pointer
                  `}
                >

                  <div
                    className={`
                      ${categories[item.category]?.bg || ""}

                      rounded-2xl
                      p-4
                    `}
                  >

                    <div className="flex justify-between items-center mb-4">

                      <div className="flex items-center gap-3">

                        <span className="text-2xl">
                          {categories[item.category]?.icon || "📦"}
                        </span>

                        <div>
                          <div className="font-bold text-base">
                            {categories[item.category]?.name || item.category}
                          </div>

                          <div className="text-sm opacity-70">
                            {percentage}%
                          </div>
                        </div>

                      </div>

                      <div className="text-right">

                        <div className="font-black text-xl">
                          ฿{item.total.toLocaleString()}
                        </div>

                      </div>

                    </div>

                    {/* PROGRESS */}
                    <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">

                      <div
                        className={`
                          bg-gradient-to-r
                          ${categories[item.category]?.color || "from-gray-400 to-gray-500"}

                          h-full
                          rounded-full

                          transition-all
                          duration-1000
                          ease-out
                        `}
                        style={{
                          width: `${percentage}%`
                        }}
                      />

                    </div>

                  </div>

                </div>
              );
            })}

          </div>

        </div>

      </div>

    </div>
  );
};

export default DashboardView;