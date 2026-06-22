import { useState, useEffect } from "react";
import { Gauge, Activity, Fuel, ShieldCheck } from "lucide-react";
import KpiCard from "../ui/KpiCard";
import StatusBadge from "../ui/StatusBadge";

const HeroVehiclePanel = ({
  maintenanceScore = 0,

  averageKmPerLiter = 0,

  nextServiceDays = 0,

  totalExpense = 0,
}) => {
  const [animatedScore, setAnimatedScore] = useState(0);

  useEffect(() => {
    let current = 0;

    const interval = setInterval(() => {
      current += Math.ceil(maintenanceScore / 20);

      if (current >= maintenanceScore) {
        current = maintenanceScore;

        clearInterval(interval);
      }

      setAnimatedScore(current);
    }, 40);

    return () => clearInterval(interval);
  }, [maintenanceScore]);

  const formatCompactCurrency = (value) => {
    if (value >= 1000000) {
      return `฿${(value / 1000000).toFixed(1)}M`;
    }

    if (value >= 1000) {
      return `฿${(value / 1000).toFixed(0)}K`;
    }

    return `฿${value}`;
  };

  //
  // 🚗 VEHICLE MOOD
  //

  const vehicleMood =
    maintenanceScore >= 80
      ? {
          label: "VEHICLE HEALTHY",
          emoji: "🟢",
          variant: "success",
          glow: "from-emerald-500/20 to-cyan-500/10",
          border: "border-emerald-500/20",
          text: "text-emerald-300",
        }
      : maintenanceScore >= 60
        ? {
            label: "NEEDS ATTENTION",
            emoji: "🟡",
            variant: "warning",
            glow: "from-yellow-500/20 to-orange-500/10",
            border: "border-yellow-500/20",
            text: "text-yellow-300",
          }
        : {
            label: "CRITICAL STATUS",
            emoji: "🔴",
            variant: "danger",
            glow: "from-red-500/20 to-pink-500/10",
            border: "border-red-500/20",
            text: "text-red-300",
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

              <div className="text-3xl sm:text-4xl font-black text-white mt-1">
                Giorno Tracker
              </div>
            </div>
          </div>

          {/* <div
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
            <span className="text-lg">{vehicleMood.emoji}</span>

            {vehicleMood.label}
          </div> */}
        </div>

        {/* SCORE */}

        <div
          className="
    flex
    justify-center
    xl:justify-end
  "
        >
          <div
            className="
      relative
      w-48
      h-48
    "
          >
            <svg
              className="
        w-full
        h-full
        -rotate-90
      "
              viewBox="
        0 0 120 120
      "
            >
              <circle
                cx="60"
                cy="60"
                r="52"
                fill="none"
                stroke="rgba(255,255,255,0.08)"
                strokeWidth="10"
              />

              <circle
                cx="60"
                cy="60"
                r="52"
                fill="none"
                stroke="currentColor"
                strokeWidth="10"
                strokeLinecap="round"
                className={vehicleMood.text}
                strokeDasharray={2 * Math.PI * 52}
                strokeDashoffset={2 * Math.PI * 52 * (1 - animatedScore / 100)}
                style={{
                  transition: "stroke-dashoffset 1s ease",
                }}
              />
            </svg>

            <div
              className="
        absolute
        inset-0

        flex
        flex-col

        items-center
        justify-center
      "
            >
              <div
                className="
          text-xs
          uppercase
          tracking-widest
          text-white/50
        "
              >
                Health
              </div>
              <div
                className={`
                  text-5xl
                  font-black

                  ${vehicleMood.text}
                `}
              >
                {animatedScore}%
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="
    flex
    justify-center
    mt-4
  "
      >
        <StatusBadge
          icon={<span>{vehicleMood.emoji}</span>}
          label={vehicleMood.label}
          variant={vehicleMood.variant}
        />
      </div>

      {/* STATS */}

      <div
        className="
          relative
          z-10

          grid
          grid-cols-2

          gap-4

          mt-10
        "
      >
        <KpiCard
          variant="premium"
          icon={<Fuel size={16} />}
          label="Fuel Avg"
          value={averageKmPerLiter}
          subtitle="km/L"
          colorVariant="info"
        />

        <KpiCard
          variant="premium"
          icon={<Activity size={16} />}
          label="Next Service"
          value={nextServiceDays}
          subtitle="days left"
          colorVariant="warning"
        />

        <KpiCard
          variant="premium"
          icon={<Gauge size={16} />}
          label="Expense"
          value={formatCompactCurrency(Math.round(totalExpense))}
          subtitle="total spent"
          colorVariant="money"
        />

        <KpiCard
          variant="premium"
          icon={<ShieldCheck size={16} />}
          label="System"
          value="ONLINE"
          subtitle="all systems active"
          colorVariant="success"
        />
      </div>
    </div>
  );
};

export default HeroVehiclePanel;
