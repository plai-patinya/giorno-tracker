import {
  Gauge,
  Activity,
  Fuel,
  ShieldCheck
} from "lucide-react";

const HeroVehiclePanel = ({

  maintenanceScore = 0,

  averageKmPerLiter = 0,

  nextServiceDays = 0,

  totalExpense = 0

}) => {

  //
  // 🚗 VEHICLE MOOD
  //

  const vehicleMood =

    maintenanceScore >= 80

      ? {
          label: "VEHICLE HEALTHY",
          emoji: "🟢",
          glow: "from-emerald-500/20 to-cyan-500/10",
          border: "border-emerald-500/20",
          text: "text-emerald-300"
        }

      : maintenanceScore >= 60

      ? {
          label: "NEEDS ATTENTION",
          emoji: "🟡",
          glow: "from-yellow-500/20 to-orange-500/10",
          border: "border-yellow-500/20",
          text: "text-yellow-300"
        }

      : {
          label: "CRITICAL STATUS",
          emoji: "🔴",
          glow: "from-red-500/20 to-pink-500/10",
          border: "border-red-500/20",
          text: "text-red-300"
        };

  return (

    <div
      className={`
        relative
        overflow-hidden

        rounded-[36px]

        border

        ${vehicleMood.border}

        bg-gradient-to-br
        ${vehicleMood.glow}

        backdrop-blur-2xl

        p-5 sm:p-8

        shadow-[0_20px_80px_rgba(0,0,0,0.35)]
      `}
    >

      {/* GLOW */}

      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />

      {/* TOP */}

      <div className="relative z-10 flex flex-col xl:flex-row xl:items-center xl:justify-between gap-6">

        {/* LEFT */}

        <div>

          <div className="flex items-center gap-3 mb-4">

            <div className="w-16 h-16 rounded-3xl bg-white/10 border border-white/10 backdrop-blur-xl flex items-center justify-center text-3xl shadow-2xl">

              🏍️

            </div>

            <div>

              <div className="text-sm text-white/50 tracking-widest uppercase">

                Giorno Vehicle OS

              </div>

              <div className="text-3xl sm:text-5xl font-black text-white mt-1">

                Giorno Tracker

              </div>

            </div>

          </div>

          <div
            className={`
              inline-flex
              items-center
              gap-2

              rounded-full

              px-4 py-2

              border

              ${vehicleMood.border}

              bg-white/5

              text-sm
              font-bold

              ${vehicleMood.text}
            `}
          >

            <span className="text-lg">

              {vehicleMood.emoji}

            </span>

            {vehicleMood.label}

          </div>

        </div>

        {/* SCORE */}

        <div className="text-center xl:text-right">

          <div className="text-sm text-white/50 uppercase tracking-widest">

            Vehicle Health Score

          </div>

          <div
            className={`
              text-6xl sm:text-7xl

              font-black

              mt-2

              ${vehicleMood.text}

              drop-shadow-[0_0_30px_rgba(255,255,255,0.15)]
            `}
          >

            {maintenanceScore}%

          </div>

        </div>

      </div>

      {/* STATS */}

      <div className="relative z-10 grid grid-cols-2 xl:grid-cols-4 gap-4 mt-8">

        <div className="rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-xl p-5">

          <div className="flex items-center gap-2 text-white/60 text-sm">

            <Fuel size={16} />

            Fuel Avg

          </div>

          <div className="text-3xl font-black text-cyan-300 mt-3">

            {averageKmPerLiter}

          </div>

          <div className="text-sm text-white/50 mt-1">

            km/L

          </div>

        </div>

        <div className="rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-xl p-5">

          <div className="flex items-center gap-2 text-white/60 text-sm">

            <Activity size={16} />

            Next Service

          </div>

          <div className="text-3xl font-black text-orange-300 mt-3">

            {nextServiceDays}

          </div>

          <div className="text-sm text-white/50 mt-1">

            days left

          </div>

        </div>

        <div className="rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-xl p-5">

          <div className="flex items-center gap-2 text-white/60 text-sm">

            <Gauge size={16} />

            Expense

          </div>

          <div className="text-3xl font-black text-pink-300 mt-3">

            ฿{Math.round(
              totalExpense
            ).toLocaleString()}

          </div>

          <div className="text-sm text-white/50 mt-1">

            total spent

          </div>

        </div>

        <div className="rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-xl p-5">

          <div className="flex items-center gap-2 text-white/60 text-sm">

            <ShieldCheck size={16} />

            System

          </div>

          <div className="text-2xl font-black text-emerald-300 mt-3">

            ONLINE

          </div>

          <div className="text-sm text-white/50 mt-1">

            all systems active

          </div>

        </div>

      </div>

    </div>

  );

};

export default HeroVehiclePanel;