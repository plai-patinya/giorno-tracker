import {
  PieChart,
  TrendingUp,
  Activity,
  Award,
  DollarSign
} from "lucide-react";
import AnalyticsCharts
  from "./AnalyticsCharts";
import { cardStyle } from "../styles/ui";

  const DashboardView = ({
    expenses,
    stats,
    BIKE_BASE_PRICE,
    partsExpense,
    totalExpense,
    monthlyData,
    categoryTotals,
    categories,
    fuelRecords,
    serviceHistory,
    setServiceHistory,
    saveServiceHistoryWithSync,
    user
  }) => {

  return (
    <>
          <div className="space-y-5 sm:space-y-6">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              <div className={`${cardStyle} p-4 sm:p-6 transition-all duration-300 ease-out hover:scale-[1.02]`}>
                <div className="text-purple-300 text-xs sm:text-sm mb-2 flex items-center gap-2">
                  <DollarSign size={14} />
                  ราคาตัวรถ
                </div>
                <div className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight mb-1">฿{BIKE_BASE_PRICE.toLocaleString()}</div>
                <div className="text-xs text-purple-300">ซื้อสด</div>
              </div>

              <div className={`${cardStyle} p-4 sm:p-6 transition-all duration-300 ease-out hover:scale-[1.02]`}>
                <div className="text-orange-300 text-xs sm:text-sm mb-2 flex items-center gap-2">
                  <TrendingUp size={14} />
                  ค่าแต่งทั้งหมด
                </div>
                <div className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight mb-1">฿{(partsExpense || 0).toLocaleString()}</div>
                <div className="text-xs text-orange-300">{stats?.totalItems || 0} รายการ</div>
              </div>

              <div className={`${cardStyle} p-4 sm:p-6 transition-all duration-300 ease-out hover:scale-[1.02]`}>
                <div className="text-blue-300 text-xs sm:text-sm mb-2 flex items-center gap-2">
                  <Activity size={14} />
                  รวมทั้งสิ้น
                </div>
                <div className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight mb-1">
                  ฿{(stats?.totalExpenseWithBike || 0).toLocaleString()}
                </div>
                <div className="text-xs text-blue-300">฿{Math.round(stats?.avgPerDay || 0)}/วัน</div>
              </div>

              <div className={`${cardStyle} p-4 sm:p-6 transition-all duration-300 ease-out hover:scale-[1.02]`}>
                <div className="text-pink-300 text-xs sm:text-sm mb-2 flex items-center gap-2">
                  <Award size={14} />
                  เฉลี่ยต่อเดือน
                </div>
                <div className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight mb-1">฿{Math.round(stats?.avgPerMonth || 0).toLocaleString()}</div>
                <div className="text-xs text-pink-300">
                  {Object.keys(monthlyData).length} เดือน
                </div>
              </div>
            </div>

            <div className={`${cardStyle} p-4 sm:p-6`}>
              <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 flex items-center gap-2">
                <PieChart className="text-orange-400" size={20} />
                สัดส่วนค่าใช้จ่าย
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                {categoryTotals.map((item) => {
                  const percentage = partsExpense > 0
                  ? (item.total / partsExpense * 100).toFixed(1)
                  : 0;
                  return (
                    <div
                      key={item.category}
                      className={`${cardStyle} p-3 sm:p-4 transition-all duration-300 ease-out hover:scale-[1.02] cursor-pointer`}
                    >

                      {/* 🔥 สี category ย้ายมาอยู่ข้างใน */}
                      <div className={`${categories[item.category].bg} rounded-xl p-3`}>

                        <div className="flex justify-between items-center mb-3">
                          <div className="flex items-center gap-2">
                            <span className="text-xl sm:text-2xl">
                              {categories[item.category].icon}
                            </span>
                            <span className="font-semibold text-sm sm:text-base">
                              {categories[item.category].name}
                            </span>
                          </div>

                          <div className="text-right">
                            <div className="font-bold text-base sm:text-lg">
                              ฿{item.total.toLocaleString()}
                            </div>
                            <div className="text-xs opacity-70">
                              {percentage}%
                            </div>
                          </div>
                        </div>

                        {/* 🔥 Progress Bar */}
                        <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                          <div
                            className={`bg-gradient-to-r ${categories[item.category].color} h-full rounded-full transition-all duration-1000 ease-out`}
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Monthly Overview & Top Expense sections remain the same */}
            <AnalyticsCharts

              categoryTotals={categoryTotals}

              monthlyData={monthlyData}

              categories={categories}

              fuelRecords={fuelRecords}

              serviceHistory={serviceHistory}

              setServiceHistory={setServiceHistory}

              user={user}
            />
          </div>
    </>
  );

};

export default DashboardView;