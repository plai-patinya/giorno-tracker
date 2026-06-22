const SectionCard = ({ title, icon, children }) => (
  <div
    className="
      rounded-3xl
      border border-white/10
      bg-white/5
      backdrop-blur-xl
      p-4
    "
  >
    <div
      className="
        flex
        items-center
        gap-2
        mb-4
        text-white
        font-bold
      "
    >
      <span>{icon}</span>

      <span>{title}</span>
    </div>

    {children}
  </div>
);
const AccountCenter = ({
  user,
  logout,
  onClose,

  maintenanceScore,
  averageKmPerLiter,
  nextServiceDays,
  totalExpense,

  lastSync = "09:42",
  cloudConnected = true,

  exportData,
  openImportModal,
}) => {
  const formatCompactCurrency = (value) => {
    if (value >= 1000) {
      return `฿${(value / 1000).toFixed(1)}K`;
    }

    return `฿${value}`;
  };
  return (
    <div
      className="
      flex
      flex-col
      gap-4
    "
    >
      <div
        className="
    w-12
    h-1.5
    rounded-full
    bg-white/20
    mx-auto
    mb-2
  "
      />
      <SectionCard icon="👤" title="Account">
        <div className="flex justify-between items-center">
          <div className="text-xl font-black text-white">Account Center</div>

          <button
            onClick={onClose}
            className="
      w-10
      h-10
      rounded-full
      bg-white/5
      border
      border-white/10
      text-white/70
    "
          >
            ✕
          </button>
        </div>
        <div className="flex items-center gap-4">
          <div
            className="
        w-16
        h-16
        rounded-full
        bg-gradient-to-br
        from-purple-500
        to-pink-500
        flex
        items-center
        justify-center
        text-2xl
      "
          >
            👤
          </div>

          <div>
            <div className="font-bold text-white">
              {user?.displayName || "Vehicle Owner"}
            </div>

            <div className="text-sm text-white/60">
              {user?.email || "Not Connected"}
            </div>
            <div className="mt-3 text-xs text-white/40">
              Member since Apr 2025
            </div>
          </div>
        </div>
      </SectionCard>
      <div
        className="
    rounded-3xl
    p-[1px]

    bg-gradient-to-r
    from-pink-500/25
    via-purple-500/25
    to-cyan-500/20
  "
      >
        <div
          className="
      rounded-3xl
      bg-[#2a1d57]/95
      p-4
    "
        >
          <div className="text-xl font-bold text-white">🏍️ Honda Giorno</div>

          <div className="text-cyan-300 text-sm">Giorno Tracker OS</div>

          <div
            className="
                inline-flex
                items-center
                gap-2

                mt-3

                px-3
                py-1

                rounded-full

                bg-emerald-500/15

                border
                border-emerald-500/20

                text-emerald-300

                text-xs
            "
          >
            🟢 Vehicle Healthy
          </div>

          <div className="mt-3 text-xs text-white/50">Powered by NEXOVA</div>
        </div>
      </div>

      <div
        className="
    rounded-3xl
    p-[1px]

    bg-gradient-to-r
    from-purple-500/20
    via-pink-500/15
    to-purple-500/20

    shadow-[0_0_25px_rgba(168,85,247,0.15)]
  "
      >
        <SectionCard icon="🏍️" title="Vehicle Passport">
          <div className="space-y-4">
            <div>
              <div>
                <div className="text-lg font-bold text-white">
                  Vehicle Metrics
                </div>

                <div className="text-white/50 text-sm">
                  Real-time vehicle insights
                </div>
              </div>
            </div>

            <div
              className="
        grid
        grid-cols-2
        gap-3
        mt-4
      "
            >
              <div
                className="
                rounded-2xl
                bg-black/20
                border
                border-yellow-500/20
                backdrop-blur-md 
                p-3"
              >
                <div className="text-white/50 text-xs">Health Score</div>

                <div
                  className="
                    flex flex-col items-start
                "
                >
                  <span
                    className="
                    text-yellow-300
                    font-bold
                    text-lg
                    "
                  >
                    {maintenanceScore}%
                  </span>

                  <span
                    className="
                    text-xs
                    text-white/40
                    "
                  >
                    Healthy
                  </span>
                </div>
              </div>

              <div
                className="
                rounded-2xl 
                bg-black/20
                border 
                border-cyan-500/20
                backdrop-blur-md 
                p-3"
              >
                <div className="text-white/50 text-xs">Fuel Avg</div>

                <div className="text-cyan-300 font-bold">
                  {averageKmPerLiter} km/L
                </div>
              </div>

              <div
                className="
                rounded-2xl 
                bg-black/20
                border 
                border-pink-500/20
                backdrop-blur-md 
                p-3"
              >
                <div className="text-white/50 text-xs">Expense</div>

                <div
                  className="
              text-pink-300
                text-lg
                font-black"
                >
                  {formatCompactCurrency(totalExpense)}
                </div>
              </div>

              <div
                className="
                rounded-2xl 
                bg-black/20
                border 
                border-orange-500/20
                backdrop-blur-md 
                p-3"
              >
                <div className="text-white/50 text-xs">Service</div>

                <div className="text-orange-300 font-bold">
                  {nextServiceDays} Days
                </div>
              </div>
            </div>
          </div>
        </SectionCard>
      </div>

      <div
        className="
            rounded-3xl
            p-[1px]

            bg-gradient-to-r
            from-cyan-500/15
            via-blue-500/10
            to-purple-500/10
        "
      >
        <SectionCard icon="☁️" title="Cloud Intelligence">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-white font-semibold">Firebase Cloud</div>

                <div className="text-xs text-white/50">
                  Realtime Sync Service
                </div>
              </div>

              <div
                className={`
                    px-3
                    py-1
                    rounded-full
                    text-xs
                    font-semibold

                    ${
                      cloudConnected
                        ? "bg-emerald-500/20 text-emerald-300"
                        : "bg-red-500/20 text-red-300"
                    }
                    `}
              >
                {cloudConnected ? "ONLINE" : "OFFLINE"}
              </div>
            </div>

            <div
              className="
                rounded-2xl
                bg-white/5
                border
                border-white/10
                p-3
            "
            >
              <div className="text-xs text-white/50">Last Sync</div>

              <div className="text-white font-bold">{lastSync}</div>
              <div className="grid grid-cols-2 gap-3">
                <button
                  className="
                    rounded-2xl
                    bg-cyan-500/10
                    border
                    border-cyan-500/20
                    p-3

                    text-cyan-300
                    text-sm
                    font-semibold
                    "
                >
                  Sync Now
                </button>

                <button
                  className="
                    rounded-2xl
                    bg-white/5
                    border
                    border-white/10
                    p-3

                    text-white
                    text-sm
                    font-semibold
                    "
                >
                  View Backup
                </button>
              </div>
            </div>
          </div>
        </SectionCard>
      </div>

      <SectionCard icon="📦" title="Data Center">
        <div className="mb-4">
          <div className="text-lg font-bold text-white">
            Data Management Hub
          </div>

          <div className="text-sm text-white/50">
            Secure storage and backup center
          </div>
        </div>
        <div
          className="
                grid
                grid-cols-2
                gap-3
                mb-4
            "
        >
          <div
            className="
                rounded-2xl
                bg-black/20
                border
                border-cyan-500/20
                p-3
            "
          >
            <div className="text-xs text-white/50">Records</div>

            <div className="text-cyan-300 font-bold">31</div>
          </div>

          <div
            className="
                rounded-2xl
                bg-black/20
                border
                border-yellow-500/20
                p-3
            "
          >
            <div className="text-xs text-white/50">Storage</div>

            <div className="text-yellow-300 font-bold">2.4 MB</div>
          </div>

          <div
            className="
                rounded-2xl
                bg-black/20
                border
                border-emerald-500/20
                p-3
            "
          >
            <div className="text-xs text-white/50">Cloud</div>

            <div className="text-emerald-300 font-bold">Active</div>
          </div>

          <div
            className="
                rounded-2xl
                bg-black/20
                border
                border-purple-500/20
                p-3
            "
          >
            <div className="text-xs text-white/50">Backup</div>

            <div className="text-purple-300 font-bold">Ready</div>
          </div>
        </div>

        <div
          className="
            grid
            grid-cols-2
            gap-3
            "
        >
          <button
            onClick={exportData}
            className="
                rounded-2xl
                bg-black/20
                border
                border-cyan-500/20
                p-3

                text-left
                cursor-pointer
                transition-all
                duration-200

                hover:scale-[1.02]
                hover:bg-white/10

                active:scale-[0.98]
            "
          >
            <div className="text-lg">📤</div>

            <div className="text-white text-sm font-semibold">Export</div>

            <div className="text-xs text-white/40">JSON / Excel</div>
          </button>

          <button
            onClick={openImportModal}
            className="
                rounded-2xl
                bg-black/20
                border
                border-emerald-500/20
                p-3

                text-left
                cursor-pointer
                transition-all
                duration-200

                hover:scale-[1.02]
                hover:bg-white/10

                active:scale-[0.98]
            "
          >
            <div className="text-lg">📥</div>

            <div className="text-white text-sm font-semibold">Import</div>

            <div className="text-xs text-white/40">Restore records</div>
          </button>

          <button
            className="
                rounded-2xl
                bg-black/20
                border
                border-purple-500/20
                p-3

                text-left
                cursor-pointer
                transition-all
                duration-200

                hover:scale-[1.02]
                hover:bg-white/10

                active:scale-[0.98]
            "
          >
            <div className="text-lg">☁️</div>

            <div className="text-white text-sm font-semibold">Backup</div>

            <div className="text-xs text-white/40">Cloud snapshot</div>
          </button>

          <button
            className="
                rounded-2xl
                bg-black/20
                border
                border-orange-500/20
                p-3

                text-left
                cursor-pointer
                transition-all
                duration-200

                hover:scale-[1.02]
                hover:bg-white/10

                active:scale-[0.98]
            "
          >
            <div className="text-lg">🛡️</div>

            <div className="text-white text-sm font-semibold">Restore</div>

            <div className="text-xs text-white/40">Recovery point</div>
          </button>
        </div>
      </SectionCard>

      {/* PREFERENCES */}

      <SectionCard icon="🚀" title="About">
        <div className="space-y-2">
          <div className="text-white">Giorno Tracker</div>

          <div className="text-white/60">Version 1.0.0</div>

          <div className="text-cyan-300">Powered by NEXOVA</div>
        </div>
      </SectionCard>

      <button
        onClick={logout}
        className="
    rounded-3xl
    bg-red-500/15
    border
    border-red-500/30
    p-4

    text-red-300
    font-bold
  "
      >
        🚪 Logout
      </button>
    </div>
  );
};

export default AccountCenter;
