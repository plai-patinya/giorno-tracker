import { useState } from "react";
import { Pencil, Check } from "lucide-react";
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
  const [unitSystem, setUnitSystem] = useState("metric");
  const [vehicleNickname, setVehicleNickname] = useState("Blue Giorno");
  const [isEditingNickname, setIsEditingNickname] = useState(false);
  const [isEditingVehicle, setIsEditingVehicle] = useState(false);
  const [vehicleType, setVehicleType] = useState("Motorcycle");
  const [vehicleBrand, setVehicleBrand] = useState("Honda");
  const [vehicleModel, setVehicleModel] = useState("Giorno+");
  const [vehicleYear, setVehicleYear] = useState("2025");

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
        <div className="flex items-start gap-4">
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
              flex-shrink-0
            "
          >
            👤
          </div>

          <div
            className="
              flex-1
              min-w-0
            "
          >
            <div className="font-bold text-white">
              {user?.displayName || "Vehicle Owner"}
            </div>

            <div className="text-sm text-white/60">
              {user?.email || "Not Connected"}
            </div>
            <div
              className="
                inline-flex
                mt-2
                px-3
                py-1

                rounded-full

                bg-cyan-500/10
                border
                border-cyan-500/20

                text-cyan-300
                text-xs
                font-medium
              "
            >
              🚀 NEXOVA Personal
            </div>
            <div
              className="
                mt-4
                pt-4
                border-t
                border-white/10
                space-y-4
              "
            >
              <div className="min-w-0">
                <div
                  className="
                  flex
                  items-center
                  justify-between
                  mb-2
                "
                >
                  <div
                    className="
                      text-xs
                      uppercase
                      tracking-wider
                      text-white/40
                    "
                  >
                    Vehicle Nickname
                  </div>

                  <button
                    onClick={() => {
                      if (vehicleNickname.trim() === "") {
                        return;
                      }
                      if (isEditingNickname) {
                        // Save

                        setIsEditingNickname(false);
                      } else {
                        // Edit

                        setIsEditingNickname(true);
                      }
                    }}
                    className="
                      p-1.5
                      rounded-lg
                      text-cyan-300/70
                      hover:bg-cyan-500/10
                      hover:text-cyan-300
                      transition-all
                    "
                  >
                    {isEditingNickname ? (
                      <Check size={14} />
                    ) : (
                      <Pencil size={14} />
                    )}
                  </button>
                </div>

                {isEditingNickname ? (
                  <input
                    value={vehicleNickname}
                    maxLength={18}
                    onChange={(e) => setVehicleNickname(e.target.value)}
                    className="
                      w-full
                      bg-black/20
                      border
                      border-cyan-500/30
                      shadow-[0_0_0_1px_rgba(34,211,238,0.1)]
                      rounded-xl
                      px-3
                      py-2

                      text-cyan-300
                      font-bold
                      text-xl

                      outline-none
                      
                      focus:ring-1
                    focus:ring-cyan-500/20
                    "
                    autoFocus
                  />
                ) : (
                  <div
                    title={vehicleNickname}
                    className="
                      text-2xl
                      font-bold
                      text-cyan-300
                      truncate
                    "
                  >
                    {vehicleNickname}
                  </div>
                )}
                {isEditingNickname && (
                  <div
                    className={`
                      text-right
                      text-xs
                      mt-1

                      ${vehicleNickname.length >= 14 ? "text-cyan-300/70" : "text-white/30"}
                    `}
                  >
                    {vehicleNickname.length}/18
                  </div>
                )}
              </div>

              <div
                className="
                  grid
                  grid-cols-2
                  gap-4
                "
              >
                <div>
                  <div className="text-xs text-white/40">Region</div>

                  <div className="text-white">Thailand</div>
                </div>

                <div>
                  <div className="text-xs text-white/40">Member Since</div>

                  <div className="text-white">Apr 2025</div>
                </div>
              </div>
              <div
                className="
                  pt-4
                  border-t
                  border-white/10
                "
              >
                <div
                  className="
                    flex
                    items-center
                    justify-between
                    mb-3
                  "
                >
                  <div
                    className="
                      text-xs
                      uppercase
                      tracking-wider
                      text-white/60
                    "
                  >
                    Vehicle Identity
                  </div>

                  <button
                    onClick={() => {
                      if (
                        vehicleType.trim() === "" ||
                        vehicleBrand.trim() === "" ||
                        vehicleModel.trim() === "" ||
                        vehicleYear.trim().length !== 4
                      ) {
                        return;
                      }

                      setIsEditingVehicle(!isEditingVehicle);
                    }}
                    className="
                      p-1.5
                      rounded-lg

                      text-cyan-300/70
                      hover:text-cyan-300
                      hover:bg-cyan-500/10

                      transition-all
                    "
                  >
                    {isEditingVehicle ? (
                      <Check size={14} />
                    ) : (
                      <Pencil size={14} />
                    )}
                  </button>
                </div>
                <div
                  className="
                    grid
                    grid-cols-2
                    gap-3
                  "
                >
                  <div
                    className="
                      min-w-0
                      bg-black/10
                      rounded-xl
                      p-3
                      border
                      border-white/5
                    "
                  >
                    <div className="text-white/40 text-xs">Type</div>

                    {isEditingVehicle ? (
                      <input
                        value={vehicleType}
                        maxLength={20}
                        onChange={(e) => setVehicleType(e.target.value)}
                        className="
                          w-full
                          bg-black/20
                          border
                          border-cyan-500/30
                          rounded-lg
                          px-3
                          py-1.5

                          text-white
                          text-sm
                          outline-none
                        "
                      />
                    ) : (
                      <div
                        title={vehicleType}
                        className="
                          text-white
                          font-medium

                          truncate
                          w-full
                        "
                      >
                        {vehicleType}
                      </div>
                    )}
                  </div>
                  <div
                    className="
                      min-w-0
                      bg-black/10
                      rounded-xl
                      p-3
                      border
                      border-white/5
                    "
                  >
                    <div className="text-white/40 text-xs">Brand</div>

                    {isEditingVehicle ? (
                      <input
                        value={vehicleBrand}
                        maxLength={20}
                        onChange={(e) => setVehicleBrand(e.target.value)}
                        className="
                          w-full
                          bg-black/20
                          border
                          border-cyan-500/30
                          rounded-lg
                          px-3
                          py-1.5

                          text-white
                          text-sm
                          outline-none
                        "
                      />
                    ) : (
                      <div
                        title={vehicleBrand}
                        className="
                          text-white
                          font-medium
                          truncate
                          w-full
                        "
                      >
                        {vehicleBrand}
                      </div>
                    )}
                  </div>
                  <div
                    className="
                      min-w-0
                      bg-black/10
                      rounded-xl
                      p-3
                      border
                      border-white/5
                    "
                  >
                    <div className="text-white/40 text-xs">Model</div>

                    {isEditingVehicle ? (
                      <input
                        value={vehicleModel}
                        maxLength={20}
                        onChange={(e) => setVehicleModel(e.target.value)}
                        className="
                          w-full
                          bg-black/20
                          border
                          border-cyan-500/30
                          rounded-lg
                          px-3
                          py-1.5

                          text-white
                          text-sm
                          outline-none
                        "
                      />
                    ) : (
                      <div
                        title={vehicleModel}
                        className="
                          text-white
                          font-medium
                          truncate
                          w-full
                        "
                      >
                        {vehicleModel}
                      </div>
                    )}
                  </div>
                  <div
                    className="
                      bg-black/10
                      rounded-xl
                      p-3
                      border
                      border-white/5
                    "
                  >
                    <div className="text-white/40 text-xs">Year</div>

                    {isEditingVehicle ? (
                      <input
                        value={vehicleYear}
                        maxLength={20}
                        onChange={(e) => {
                          const value = e.target.value.replace(/\D/g, "");

                          setVehicleYear(value.slice(0, 4));
                        }}
                        className="
                          w-full
                          bg-black/20
                          border
                          border-cyan-500/30
                          rounded-lg
                          px-3
                          py-1.5

                          text-white
                          text-sm
                          outline-none
                        "
                      />
                    ) : (
                      <div className="text-white font-medium">
                        {vehicleYear}
                      </div>
                    )}
                  </div>
                </div>
              </div>
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
          <div
            className="
    mt-2
    inline-flex
    items-center
    gap-2

    px-3
    py-1

    rounded-full

    bg-cyan-500/10
    border
    border-cyan-500/20

    text-cyan-300
    text-xs
  "
          >
            ✨ NEXOVA Data Intelligence
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
            rounded-2xl
            border
            border-emerald-500/20
            bg-emerald-500/5
            p-4
            mb-4
          "
        >
          <div className="text-xs text-white/50">Last Backup</div>

          <div
            className="
              text-emerald-300
              font-semibold
              mt-1
            "
          >
            Today • 21:30
          </div>

          <div className="text-xs text-white/40 mt-1">
            Latest export snapshot
          </div>
        </div>

        <div
          className="
            flex
            items-center
            justify-between

            rounded-2xl
            border
            border-emerald-500/20
            bg-emerald-500/5

            px-4
            py-3

            mb-4
          "
        >
          <div>
            <div className="text-xs text-white/50">Backup Status</div>

            <div className="text-emerald-300 font-semibold">Healthy</div>
          </div>

          <div
            className="
              px-3
              py-1
              rounded-full

              bg-emerald-500/15

              text-xs
              text-emerald-300
              font-semibold
            "
          >
            READY
          </div>
        </div>

        <div
          className="
    rounded-2xl
    border
    border-cyan-500/20
    bg-cyan-500/5

    p-4

    mb-4
  "
        >
          <div
            className="
      flex
      items-center
      justify-between
    "
          >
            <div>
              <div className="text-xs text-white/50">Restore Point</div>

              <div className="text-cyan-300 font-semibold">Today • 21:30</div>
              <div
                className="
    mt-2

    inline-flex
    items-center

    gap-2

    px-2
    py-1

    rounded-full

    bg-cyan-500/10

    text-cyan-300
    text-xs
  "
              >
                🛡️ Safe Restore
              </div>
              <div
                className="
    mt-3
    text-xs
    text-white/40
  "
              >
                Includes expenses, fuel records and maintenance history
              </div>
            </div>

            <div
              className="
        text-xs
        text-white/50
      "
            >
              Latest
            </div>
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
            <div className="text-xs text-white/50">Backup Size</div>

            <div className="text-cyan-300 font-bold">2.4 MB</div>
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
            <div className="text-xs text-white/50">Snapshots</div>

            <div className="text-purple-300 font-bold">1</div>
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
                hover:shadow-[0_0_20px_rgba(34,211,238,0.25)]

                active:scale-[0.98]
            "
          >
            <div className="text-lg">📤</div>

            <div className="text-white text-sm font-semibold">Export</div>

            <div className="text-xs text-white/40">JSON / Excel</div>
            <div
              className="
                mt-2
                inline-flex
                px-2
                py-1
                rounded-full

                bg-cyan-500/10
                text-cyan-300

                text-[10px]
                font-semibold
              "
            >
              Ready
            </div>
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
                hover:shadow-[0_0_20px_rgba(16,185,129,0.25)]

                active:scale-[0.98]
            "
          >
            <div className="text-lg">📥</div>

            <div className="text-white text-sm font-semibold">Import</div>

            <div className="text-xs text-white/40">Restore records</div>
            <div
              className="
    mt-2
    inline-flex
    px-2
    py-1
    rounded-full

    bg-emerald-500/10
    text-emerald-300

    text-[10px]
    font-semibold
  "
            >
              Paste Backup
            </div>
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
                hover:shadow-[0_0_20px_rgba(168,85,247,0.25)]

                active:scale-[0.98]
            "
          >
            <div className="text-lg">☁️</div>

            <div className="text-white text-sm font-semibold">Backup</div>

            <div className="text-xs text-white/40">Cloud snapshot</div>
            <div
              className="
    mt-2
    inline-flex
    px-2
    py-1
    rounded-full

    bg-purple-500/10
    text-purple-300

    text-[10px]
    font-semibold
  "
            >
              Snapshot
            </div>
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
                hover:shadow-[0_0_20px_rgba(249,115,22,0.25)]

                active:scale-[0.98]
            "
          >
            <div className="text-lg">🛡️</div>

            <div className="text-white text-sm font-semibold">Restore</div>

            <div className="text-xs text-white/40">Recovery point</div>
            <div
              className="
    mt-2
    inline-flex
    px-2
    py-1
    rounded-full

    bg-orange-500/10
    text-orange-300

    text-[10px]
    font-semibold
  "
            >
              Safe Restore
            </div>
          </button>
        </div>
      </SectionCard>

      <SectionCard icon="⚙️" title="Preferences">
        <div className="space-y-3">
          <div
            className="
    rounded-2xl
    bg-black/20
    border
    border-white/10
    p-3
  "
          >
            <div className="text-white font-semibold">Appearance</div>

            <div className="text-xs text-white/50 mb-3">
              Choose your experience
            </div>

            <div className="flex gap-2">
              <button
                className="
        flex-1
        rounded-xl
        border
        border-cyan-500/30
        bg-cyan-500/10
        py-2

        text-cyan-300
        text-sm
        font-semibold
      "
              >
                🌙 Dark
              </button>

              <button
                className="
        flex-1
        rounded-xl
        border
        border-white/10
        bg-white/5
        py-2

        text-white/60
        text-sm
      "
              >
                ☀️ Light
              </button>

              <button
                className="
        flex-1
        rounded-xl
        border
        border-purple-500/20
        bg-purple-500/10
        py-2

        text-purple-300
        text-sm
      "
              >
                🚀 NEXOVA
              </button>
            </div>
          </div>

          <div
            className="
    rounded-2xl
    bg-black/20
    border
    border-white/10
    p-3
  "
          >
            <div className="text-white font-semibold">Notifications</div>

            <div className="text-xs text-white/50 mb-3">Alert preferences</div>

            <div className="space-y-2">
              <div
                className="
    flex
    items-center
    justify-between
  "
              >
                <div>
                  <div className="text-white text-sm">Maintenance Alerts</div>

                  <div className="text-xs text-white/40">Upcoming services</div>
                </div>

                <div
                  className="
      px-2
      py-1
      rounded-full
      bg-emerald-500/15
      text-emerald-300
      text-xs
      font-semibold
    "
                >
                  ON
                </div>
              </div>
              <div
                className="
    flex
    items-center
    justify-between
  "
              >
                <div>
                  <div className="text-white text-sm">Backup Notifications</div>

                  <div className="text-xs text-white/40">Snapshot updates</div>
                </div>

                <div
                  className="
      px-2
      py-1
      rounded-full
      bg-emerald-500/15
      text-emerald-300
      text-xs
      font-semibold
    "
                >
                  ON
                </div>
              </div>
              <div
                className="
    flex
    items-center
    justify-between
  "
              >
                <div>
                  <div className="text-white text-sm">Cloud Sync</div>

                  <div className="text-xs text-white/40">
                    Realtime sync status
                  </div>
                </div>

                <div
                  className="
      px-2
      py-1
      rounded-full
      bg-cyan-500/15
      text-cyan-300
      text-xs
      font-semibold
    "
                >
                  LIVE
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div>
              <div className="text-white font-medium">Units</div>

              <div className="text-xs text-white/50">Measurement system</div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setUnitSystem("metric")}
                className={`
        rounded-xl
        py-2
        text-sm
        font-semibold
        transition-all
        ${
          unitSystem === "metric"
            ? "bg-cyan-500/20 border border-cyan-500/40 text-cyan-300"
            : "bg-white/5 border border-white/10 text-white/60"
        }
      `}
              >
                🇪🇺 Metric
              </button>

              <button
                onClick={() => setUnitSystem("imperial")}
                className={`
        rounded-xl
        py-2
        text-sm
        font-semibold
        transition-all
        ${
          unitSystem === "imperial"
            ? "bg-cyan-500/20 border border-cyan-500/40 text-cyan-300"
            : "bg-white/5 border border-white/10 text-white/60"
        }
      `}
              >
                🇺🇸 Imperial
              </button>
            </div>

            <div
              className="
      text-xs
      text-white/40
    "
            >
              Current: {unitSystem === "metric" ? "km/L" : "MPG"}
            </div>
          </div>
        </div>
      </SectionCard>

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
