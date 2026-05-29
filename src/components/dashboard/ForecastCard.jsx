const ForecastCard = ({
  forecast = 0,
  trend = "stable",
  percentage = 0
}) => {

  const trendConfig =

    trend === "up"

      ? {

          icon: "📈",

          text: "ค่าใช้จ่ายมีแนวโน้มเพิ่มขึ้น",

          color: "text-pink-300",

          bg: "from-pink-500/20 to-orange-500/10",

          border: "border-pink-500/20"

        }

      : trend === "down"

      ? {

          icon: "📉",

          text: "ค่าใช้จ่ายเริ่มลดลง",

          color: "text-emerald-300",

          bg: "from-emerald-500/20 to-cyan-500/10",

          border: "border-emerald-500/20"

        }

      : {

          icon: "📊",

          text: "ค่าใช้จ่ายคงที่",

          color: "text-cyan-300",

          bg: "from-cyan-500/20 to-blue-500/10",

          border: "border-cyan-500/20"

        };

  return (

    <div
      className={`
        relative
        overflow-hidden

        rounded-[32px]

        border

        ${trendConfig.border}

        bg-gradient-to-br
        ${trendConfig.bg}

        backdrop-blur-2xl

        p-6

        shadow-2xl
      `}
    >

      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />

      <div className="relative z-10">

        <div className="flex items-center gap-4 mb-5">

          <div className="w-14 h-14 rounded-2xl bg-white/10 border border-white/10 flex items-center justify-center text-2xl">

            {trendConfig.icon}

          </div>

          <div>

            <div className="text-sm text-white/50 uppercase tracking-widest">

              AI Forecast

            </div>

            <div className="text-2xl font-black text-white">

              Expense Prediction

            </div>

          </div>

        </div>

        <div
          className={`
            text-5xl
            font-black

            ${trendConfig.color}
          `}
        >

          ฿{forecast.toLocaleString()}

        </div>

        <div className="text-white/70 mt-3">

          {trendConfig.text}

        </div>

        <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/10 px-4 py-2 text-sm font-bold text-white">

          {trend === "up"

            ? "⬆"

            : trend === "down"

            ? "⬇"

            : "➡"}

          {Math.abs(percentage)}%

        </div>

      </div>

    </div>

  );

};

export default ForecastCard;