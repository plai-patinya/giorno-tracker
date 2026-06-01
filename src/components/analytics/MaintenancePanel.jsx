import {
  Wrench,
  Car,
  Battery,
  Disc,
  ShieldCheck,
  AlertTriangle
} from "lucide-react";

const MaintenancePanel = ({
  maintenanceAnalytics
}) => {

  if (!maintenanceAnalytics) {
    return null;
  }

  const {
    oil,
    tires,
    brakes,
    battery,
    maintenanceHealth
  } = maintenanceAnalytics;

  const services = [

    {
      title: "Engine Oil",
      icon: <Wrench size={18} />,
      data: oil
    },

    {
      title: "Tires",
      icon: <Car size={18} />,
      data: tires
    },

    {
      title: "Brake Pads",
      icon: <Disc size={18} />,
      data: brakes
    },

    {
      title: "Battery",
      icon: <Battery size={18} />,
      data: battery
    }

  ];

  const getStatusColor = (status) => {

    switch (status) {

      case "healthy":
        return {
          badge:
            "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
          progress:
            "from-emerald-500 to-green-400"
        };

      case "warning":
        return {
          badge:
            "bg-yellow-500/15 text-yellow-300 border-yellow-500/30",
          progress:
            "from-yellow-500 to-orange-400"
        };

      case "critical":
        return {
          badge:
            "bg-red-500/15 text-red-300 border-red-500/30",
          progress:
            "from-red-500 to-pink-500"
        };

      default:
        return {
          badge:
            "bg-white/10 text-white/60 border-white/10",
          progress:
            "from-slate-500 to-slate-400"
        };

    }

  };

  return (

    <div
      className="
        rounded-3xl
        border border-white/10
        bg-white/5
        backdrop-blur-xl
        p-6
        space-y-6
      "
    >

      {/* HEADER */}

      <div className="flex items-center justify-between">

        <div>

          <h2
            className="
              text-2xl
              font-black
              text-white
            "
          >
            🛠 Maintenance Intelligence
          </h2>

          <p
            className="
              text-sm
              text-white/50
              mt-1
            "
          >
            ระบบวิเคราะห์การบำรุงรักษารถแบบ Real-Time
          </p>

        </div>

        <div
          className="
            px-4 py-3
            rounded-2xl
            border border-white/10
            bg-white/5
            text-center
          "
        >

          <div
            className="
              text-xs
              text-white/50
            "
          >
            Vehicle Health
          </div>

          <div
            className="
              text-2xl
              font-black
              text-white
            "
          >
            {maintenanceHealth}/100
          </div>

        </div>

      </div>

      {/* SERVICE GRID */}

      <div
        className="
          grid
          grid-cols-1
          xl:grid-cols-2
          gap-4
        "
      >

        {services.map((service) => {

          const color =
            getStatusColor(
              service.data?.status
            );

          return (

            <div
              key={service.title}
              className="
                rounded-2xl
                border border-white/10
                bg-white/5
                p-5
              "
            >

              <div
                className="
                  flex
                  items-center
                  justify-between
                  mb-4
                "
              >

                <div
                  className="
                    flex
                    items-center
                    gap-3
                  "
                >

                  <div
                    className="
                      w-10 h-10
                      rounded-xl
                      bg-white/5
                      flex items-center justify-center
                      text-white
                    "
                  >
                    {service.icon}
                  </div>

                  <div>

                    <div
                      className="
                        text-white
                        font-bold
                      "
                    >
                      {service.title}
                    </div>

                    <div
                      className="
                        text-xs
                        text-white/50
                      "
                    >
                      Remaining
                    </div>

                  </div>

                </div>

                <div
                  className={`
                    px-3 py-1
                    rounded-full
                    border
                    text-xs font-bold
                    ${color.badge}
                  `}
                >

                  {service.data?.remainingKm ??
                    "N/A"} km

                </div>

              </div>

              {/* PROGRESS */}

              <div
                className="
                  h-2
                  rounded-full
                  bg-white/10
                  overflow-hidden
                "
              >

                <div
                  className={`
                    h-full
                    bg-gradient-to-r
                    ${color.progress}
                  `}
                  style={{
                    width:
                      `${Math.min(
                        service.data?.progress || 0,
                        100
                      )}%`
                  }}
                />

              </div>

              <div
                className="
                  flex
                  justify-between
                  text-xs
                  text-white/50
                  mt-2
                "
              >

                <span>
                  Progress
                </span>

                <span>
                  {Math.round(
                    service.data?.progress || 0
                  )}%
                </span>

              </div>

            </div>

          );

        })}

      </div>

      {/* RECOMMENDATION */}

      <div
        className="
          rounded-2xl
          border border-blue-500/20
          bg-blue-500/10
          p-5
        "
      >

        <div
          className="
            flex items-center gap-2
            text-blue-300
            font-bold
            mb-2
          "
        >

          <ShieldCheck size={18} />

          Recommendation

        </div>

        <div
          className="
            text-sm
            text-white/80
          "
        >

          {oil?.remainingKm > 2000
            ? "น้ำมันเครื่องยังอยู่ในเกณฑ์ดี ยังไม่จำเป็นต้องเข้ารับบริการ"
            : "แนะนำวางแผนเข้ารับบริการเปลี่ยนน้ำมันเครื่องเร็ว ๆ นี้"}

        </div>

      </div>

      {/* ALERT */}

      {oil?.isOverdue && (

        <div
          className="
            rounded-2xl
            border border-red-500/20
            bg-red-500/10
            p-4
          "
        >

          <div
            className="
              flex items-center gap-2
              text-red-300
              font-bold
            "
          >

            <AlertTriangle size={18} />

            Maintenance Overdue

          </div>

          <div
            className="
              text-sm
              text-white/80
              mt-1
            "
          >

            น้ำมันเครื่องเลยกำหนดแล้ว กรุณาเข้ารับบริการโดยเร็ว

          </div>

        </div>

      )}

    </div>

  );

};

export default MaintenancePanel;