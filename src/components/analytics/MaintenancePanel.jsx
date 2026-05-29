import {

  calculateService,
  getServiceStatus,
  getRecommendation,
  estimateDaysLeft

} from "../../utils/maintenance";

const MaintenancePanel = ({

  fuelRecords = [],
  serviceHistory = []

}) => {

  //
  // 🚗 MOCK CURRENT ODO
  //

  const currentOdo =

    fuelRecords.length > 0

      ? Math.max(
          ...fuelRecords.map(
            (r) => Number(r.odometer || 0)
          )
        )

      : 18500;

  //
  // 🛠️ MAINTENANCE CONFIG
  //

  const maintenanceRecords = {

    oil: {

      lastOdo: 15000,

      intervalKm: 3000

    },

    airFilter: {

      lastOdo: 12000,

      intervalKm: 12000

    },

    tires: {

      lastOdo: 5000,

      intervalKm: 20000

    }

  };

  //
  // 🛠️ SERVICE ENGINE
  //

  const oilService =

    calculateService(

      currentOdo,

      maintenanceRecords.oil.lastOdo,

      maintenanceRecords.oil.intervalKm

    );

  const airService =

    calculateService(

      currentOdo,

      maintenanceRecords.airFilter.lastOdo,

      maintenanceRecords.airFilter.intervalKm

    );

  const tireService =

    calculateService(

      currentOdo,

      maintenanceRecords.tires.lastOdo,

      maintenanceRecords.tires.intervalKm

    );

  //
  // 🚨 STATUS
  //

  const oilStatus =
    getServiceStatus(
      oilService.progress
    );

  const airStatus =
    getServiceStatus(
      airService.progress
    );

  const tireStatus =
    getServiceStatus(
      tireService.progress
    );

  //
  // 🔔 ALERTS
  //

  const notifications = [];

  if (oilService.remainingKm <= 500) {

    notifications.push({

      icon: "🛢️",

      title:
        oilService.remainingKm <= 150

          ? "ถึงรอบเปลี่ยนน้ำมันเครื่อง"

          : "ใกล้ถึงรอบเปลี่ยนน้ำมันเครื่อง",

      description:
        `เหลืออีก ${oilService.remainingKm.toLocaleString()} km`

    });

  }

  if (airService.remainingKm <= 800) {

    notifications.push({

      icon: "🌬️",

      title:
        "ควรตรวจไส้กรองอากาศ",

      description:
        `เหลืออีก ${airService.remainingKm.toLocaleString()} km`

    });

  }

  if (tireService.remainingKm <= 2000) {

    notifications.push({

      icon: "🛞",

      title:
        "อายุยางใกล้ครบระยะ",

      description:
        `เหลืออีก ${tireService.remainingKm.toLocaleString()} km`

    });

  }

  //
  // 🧩 SERVICE CARD
  //

  const ServiceCard = ({

    title,
    icon,

    service,
    status,

    color

  }) => (

    <div
      className="
        rounded-3xl
        border border-white/10
        bg-white/5
        backdrop-blur-xl
        p-5
      "
    >

      <div className="flex items-center justify-between mb-4">

        <div className="flex items-center gap-3">

          <div className="text-3xl">

            {icon}

          </div>

          <div>

            <div className="font-black text-lg text-white">

              {title}

            </div>

            <div
              className={`
                text-sm
                ${status.color}
              `}
            >

              {status.label}

            </div>

          </div>

        </div>

        <div
          className={`
            px-3 py-1 rounded-full
            text-xs font-bold

            ${status.bg}
            ${status.border}
            border
          `}
        >

          {service.remainingKm.toLocaleString()} km

        </div>

      </div>

      {/* PROGRESS */}

      <div className="mb-3">

        <div className="flex justify-between text-sm text-white/50 mb-2">

          <span>Progress</span>

          <span>

            {Math.round(
              service.progress
            )}%

          </span>

        </div>

        <div className="h-3 rounded-full bg-white/10 overflow-hidden">

          <div
            className={`
              h-full rounded-full

              ${color}

              transition-all duration-700
            `}
            style={{
              width:
                `${service.progress}%`
            }}
          />

        </div>

      </div>

      {/* RECOMMEND */}

      <div className="text-sm text-white/70">

        {getRecommendation(
          service.progress,
          title
        )}

      </div>

      <div className="text-xs text-white/40 mt-2">

        ประมาณ
        {" "}
        {
          estimateDaysLeft(
            service.remainingKm
          )
        }
        {" "}
        วัน

      </div>

    </div>

  );

  return (

    <div className="space-y-6">

      {/* HEADER */}

      <div className="flex items-center gap-4">

        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-500/20 to-red-500/10 border border-white/10 flex items-center justify-center text-2xl">

          🛠️

        </div>

        <div>

          <h3 className="text-3xl font-black text-white">

            Smart Maintenance

          </h3>

          <div className="text-sm text-white/50">

            ระบบดูแลรักษารถอัจฉริยะ

          </div>

        </div>

      </div>

      {/* ALERTS */}

      {notifications.length > 0 && (

        <div className="space-y-3">

          {notifications.map(
            (item, index) => (

              <div
                key={index}

                className="
                  rounded-2xl
                  border border-yellow-500/20
                  bg-yellow-500/10
                  p-4
                "
              >

                <div className="font-bold text-yellow-300">

                  {item.icon} {item.title}

                </div>

                <div className="text-sm text-white/70 mt-1">

                  {item.description}

                </div>

              </div>

            )
          )}

        </div>

      )}

      {/* GRID */}

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">

        <ServiceCard

          title="น้ำมันเครื่อง"

          icon="🛢️"

          service={oilService}

          status={oilStatus}

          color="bg-orange-500"

        />

        <ServiceCard

          title="ไส้กรองอากาศ"

          icon="🌬️"

          service={airService}

          status={airStatus}

          color="bg-cyan-500"

        />

        <ServiceCard

          title="ยางรถ"

          icon="🛞"

          service={tireService}

          status={tireStatus}

          color="bg-purple-500"

        />

      </div>

    </div>

  );

};

export default MaintenancePanel;