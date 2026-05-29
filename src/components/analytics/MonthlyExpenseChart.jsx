import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from "recharts";

const MonthlyExpenseChart = ({
  monthlyChartData = [],
  range,
  setRange
}) => {

  const topMonth =
    [...monthlyChartData].sort(
      (a, b) =>
        b.total - a.total
    )[0];

  const averageMonthly =

    monthlyChartData.length > 0

      ? monthlyChartData.reduce(
          (sum, item) =>
            sum + item.total,
          0
        ) / monthlyChartData.length

      : 0;

  return (

    <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-white/5 backdrop-blur-2xl p-4 shadow-2xl">

      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />

      {/* HEADER */}

      <div className="flex items-center gap-4 mb-6 relative z-10">

        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-400/30 to-cyan-500/20 border border-white/10 flex items-center justify-center text-2xl backdrop-blur-xl">

          📊

        </div>

        <div>

          <h3 className="text-3xl font-black text-white">
            ค่าใช้จ่ายรายเดือน
          </h3>

          <div className="text-sm text-gray-300">
            ภาพรวมค่าใช้จ่ายรายเดือน
          </div>

        </div>

      </div>

      {/* INSIGHTS */}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">

        <div className="rounded-3xl bg-white/5 border border-white/10 p-5 backdrop-blur-xl">

          <div className="text-sm text-gray-300">
            เดือนใช้สูงสุด
          </div>

          <div className="text-2xl font-black text-orange-300 mt-2">

            {topMonth?.month || "-"}

          </div>

          <div className="text-sm text-white/70 mt-1">

            ฿{Number(
              topMonth?.total || 0
            ).toLocaleString()}

          </div>

        </div>

        <div className="rounded-3xl bg-white/5 border border-white/10 p-5 backdrop-blur-xl">

          <div className="text-sm text-gray-300">
            เฉลี่ยต่อเดือน
          </div>

          <div className="text-2xl font-black text-cyan-300 mt-2">

            ฿{Math.round(
              averageMonthly
            ).toLocaleString()}

          </div>

          <div className="text-sm text-white/70 mt-1">

            Monthly Average

          </div>

        </div>

      </div>

      {/* RANGE */}

      <div className="flex flex-wrap gap-3 mb-6">

        {[
          "3",
          "6",
          "12",
          "ALL"
        ].map((item) => (

          <button
            key={item}

            onClick={() =>
              setRange(item)
            }

            className={`

              px-5 py-3 rounded-2xl

              border border-white/10

              backdrop-blur-xl

              transition-all duration-300

              font-semibold

              ${
                range === item

                  ? `
                    bg-orange-500/30
                    text-white
                    shadow-lg shadow-orange-500/20
                  `

                  : `
                    bg-white/5
                    text-gray-300
                    hover:bg-white/10
                  `
              }

            `}
          >

            {item === "ALL"

              ? "ทั้งหมด"

              : `${item} เดือน`
            }

          </button>

        ))}

      </div>

      {/* CHART */}

      <div className="h-[340px] min-h-[340px] w-full">

        <ResponsiveContainer width="100%" height={300}>

          <BarChart
            data={monthlyChartData}
          >

            <defs>

              <linearGradient
                id="barGradient"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >

                <stop
                  offset="0%"
                  stopColor="#fb923c"
                />

                <stop
                  offset="100%"
                  stopColor="#f97316"
                />

              </linearGradient>

            </defs>

            <CartesianGrid
              strokeDasharray="4 4"
              opacity={0.08}
            />

            <XAxis
              dataKey="month"
              stroke="#c4b5fd"
              tick={{
                fill: "#ddd6fe"
              }}
            />

            <YAxis
              stroke="#c4b5fd"
              tick={{
                fill: "#ddd6fe"
              }}
            />

            <Tooltip

              contentStyle={{

                background:
                  "rgba(20,20,40,0.85)",

                border:
                  "1px solid rgba(255,255,255,0.1)",

                borderRadius: 16,

                backdropFilter:
                  "blur(20px)",

                color: "white"

              }}

              formatter={(value) =>

                `฿${Number(
                  value
                ).toLocaleString()}`

              }

            />

            <Bar
              dataKey="total"

              radius={[14, 14, 0, 0]}

              fill="url(#barGradient)"

              animationDuration={1200}
            />

          </BarChart>

        </ResponsiveContainer>

      </div>

    </div>

  );

};

export default MonthlyExpenseChart;