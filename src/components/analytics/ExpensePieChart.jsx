import { useState } from "react";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip
} from "recharts";

const ExpensePieChart = ({
  categoryChartData = [],
  total = 0
}) => {

  const [activeCategory, setActiveCategory] =
    useState(null);

  return (

    <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-white/5 backdrop-blur-2xl p-4 shadow-2xl">

      {/* Glow */}

      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />

      {/* HEADER */}

      <div className="flex items-center gap-4 mb-8 relative z-10">

        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-400/30 to-pink-500/20 border border-white/10 flex items-center justify-center text-2xl backdrop-blur-xl">

          🥧

        </div>

        <div>

          <h3 className="text-3xl font-black text-white">
            สัดส่วนค่าใช้จ่าย
          </h3>

          <div className="text-sm text-gray-300">
            วิเคราะห์ค่าใช้จ่ายแต่ละหมวดหมู่
          </div>

        </div>

      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 items-center">

        {/* PIE */}

        <div className="h-[340px] relative">

          <ResponsiveContainer width="100%" height={300}>

            <PieChart>

              <defs>

                <filter
                  id="glassGlow"
                  x="-50%"
                  y="-50%"
                  width="200%"
                  height="200%"
                >

                  <feGaussianBlur
                    stdDeviation="18"
                    result="blur"
                  />

                  <feColorMatrix
                    in="blur"
                    type="matrix"
                    values="
                    1 0 0 0 0
                    0 1 0 0 0
                    0 0 1 0 0
                    0 0 0 18 -7
                    "
                    result="glow"
                  />

                  <feBlend
                    in="SourceGraphic"
                    in2="glow"
                  />

                </filter>

              </defs>

              <Pie
                data={categoryChartData}

                dataKey="value"

                innerRadius={88}

                outerRadius={128}

                paddingAngle={4}

                cornerRadius={999}

                stroke="rgba(255,255,255,0.15)"

                strokeWidth={2}
              >

                {categoryChartData.map(
                  (entry, index) => (

                    <Cell
                      key={index}

                      fill={entry.color}

                      filter="url(#glassGlow)"

                      opacity={

                        activeCategory &&
                        activeCategory !== entry.key

                          ? 0.25

                          : 1

                      }

                      onClick={() =>

                        setActiveCategory(

                          activeCategory ===
                          entry.key

                            ? null

                            : entry.key

                        )

                      }

                      style={{
                        cursor: "pointer",

                        transition:
                          "all 0.35s ease"
                      }}
                    />

                  )
                )}

              </Pie>

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

            </PieChart>

          </ResponsiveContainer>

          {/* CENTER */}

          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">

            <div className="text-sm text-gray-300">
              รวมทั้งหมด
            </div>

            <div className="text-4xl font-black text-white drop-shadow-lg">

              ฿{total.toLocaleString()}

            </div>

          </div>

        </div>

        {/* LEGEND */}

        <div className="xl:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">

          {categoryChartData

            .filter((item) =>

              activeCategory

                ? item.key === activeCategory

                : true

            )

            .map((item) => {

              const percentage =

                (
                  (item.value / total) * 100
                ).toFixed(1);

              return (

                <div
                  key={item.key}

                  className={`
                    group
                    relative
                    overflow-hidden

                    rounded-3xl

                    border border-white/10

                    bg-white/5

                    backdrop-blur-xl

                    p-5

                    transition-all
                    duration-300

                    hover:scale-[1.02]
                    hover:bg-white/10
                  `}
                >

                  <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent opacity-50" />

                  <div className="relative z-10 flex items-center justify-between">

                    <div className="flex items-center gap-4">

                      <div
                        className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shadow-2xl border border-white/10 backdrop-blur-xl"
                        style={{

                          background:
                            `${item.color}25`,

                          boxShadow:
                            `0 0 25px ${item.color}40`

                        }}
                      >

                        {item.icon}

                      </div>

                      <div>

                        <div className="font-bold text-lg text-white">
                          {item.name}
                        </div>

                        <div className="text-sm text-gray-300">

                          {percentage}%

                        </div>

                        <div className="mt-3 w-full h-2 rounded-full bg-white/10 overflow-hidden">

                          <div
                            className="h-full rounded-full transition-all duration-700"
                            style={{

                              width: `${percentage}%`,

                              background:
                                item.color

                            }}
                          />

                        </div>

                      </div>

                    </div>

                    <div className="text-right">

                      <div className="text-2xl font-black text-white">

                        ฿{Number(
                          item.value
                        ).toLocaleString()}

                      </div>

                    </div>

                  </div>

                </div>

              );

            })}

        </div>

      </div>

    </div>

  );

};

export default ExpensePieChart;