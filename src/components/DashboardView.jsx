import {
  PieChart,
  TrendingUp,
  Activity,
  Award,
  DollarSign
} from "lucide-react";
import AnalyticsCharts
  from "./AnalyticsCharts";

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
          <div className="space-y-6">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              <div className="bg-gradient-to-br from-purple-600/30 to-purple-800/30 backdrop-blur-xl rounded-2xl p-4 sm:p-6 border border-purple-500/30 shadow-2xl hover:scale-105 transition-transform">
                <div className="text-purple-300 text-xs sm:text-sm mb-2 flex items-center gap-2">
                  <DollarSign size={14} />
                  ราคาตัวรถ
                </div>
                <div className="text-2xl sm:text-4xl font-black mb-1">฿{BIKE_BASE_PRICE.toLocaleString()}</div>
                <div className="text-xs text-purple-300">ซื้อสด</div>
              </div>

              <div className="bg-gradient-to-br from-orange-600/30 to-red-600/30 backdrop-blur-xl rounded-2xl p-4 sm:p-6 border border-orange-500/30 shadow-2xl hover:scale-105 transition-transform">
                <div className="text-orange-300 text-xs sm:text-sm mb-2 flex items-center gap-2">
                  <TrendingUp size={14} />
                  ค่าแต่งทั้งหมด
                </div>
                <div className="text-2xl sm:text-4xl font-black mb-1">฿{(partsExpense || 0).toLocaleString()}</div>
                <div className="text-xs text-orange-300">{stats?.totalItems || 0} รายการ</div>
              </div>

              <div className="bg-gradient-to-br from-blue-600/30 to-cyan-600/30 backdrop-blur-xl rounded-2xl p-4 sm:p-6 border border-blue-500/30 shadow-2xl hover:scale-105 transition-transform">
                <div className="text-blue-300 text-xs sm:text-sm mb-2 flex items-center gap-2">
                  <Activity size={14} />
                  รวมทั้งสิ้น
                </div>
                <div className="text-2xl sm:text-4xl font-black mb-1">
                  ฿{stats.totalExpenseWithBike.toLocaleString()}
                </div>
                <div className="text-xs text-blue-300">฿{Math.round(stats.avgPerDay)}/วัน</div>
              </div>

              <div className="bg-gradient-to-br from-pink-600/30 to-rose-600/30 backdrop-blur-xl rounded-2xl p-4 sm:p-6 border border-pink-500/30 shadow-2xl hover:scale-105 transition-transform">
                <div className="text-pink-300 text-xs sm:text-sm mb-2 flex items-center gap-2">
                  <Award size={14} />
                  เฉลี่ยต่อเดือน
                </div>
                <div className="text-2xl sm:text-4xl font-black mb-1">฿{Math.round(stats.avgPerMonth).toLocaleString()}</div>
                <div className="text-xs text-pink-300">
                  {Object.keys(monthlyData).length} เดือน
                </div>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-4 sm:p-6 border border-white/10 shadow-2xl">
              <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 flex items-center gap-2">
                <PieChart className="text-orange-400" size={20} />
                สัดส่วนค่าใช้จ่าย
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                {categoryTotals.map((item) => {
                  const percentage = (item.total / partsExpense * 100).toFixed(1);
                  return (
                    <div key={item.category} className={`${categories[item.category].bg} rounded-xl p-3 sm:p-4 border ${categories[item.category].border} border-opacity-30 hover:border-opacity-100 transition-all cursor-pointer`}>
                      <div className="flex justify-between items-center mb-3">
                        <div className="flex items-center gap-2">
                          <span className="text-xl sm:text-2xl">{categories[item.category].icon}</span>
                          <span className="font-semibold text-sm sm:text-base">{categories[item.category].name}</span>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-base sm:text-lg">฿{item.total.toLocaleString()}</div>
                          <div className="text-xs opacity-70">{percentage}%</div>
                        </div>
                      </div>
                      <div className="w-full bg-black/30 rounded-full h-2 overflow-hidden">
                        <div 
                          className={`bg-gradient-to-r ${categories[item.category].color} h-full rounded-full transition-all duration-1000 ease-out`}
                          style={{ width: `${percentage}%` }}
                        />
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