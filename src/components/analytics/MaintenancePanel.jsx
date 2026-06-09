import {
  Wrench,
  Car,
  Battery,
  Disc,
  ShieldCheck,
  AlertTriangle,
  Activity,
  Calendar,
  Gauge
} from "lucide-react";

const MaintenancePanel = ({
  maintenanceAnalytics
}) => {

  if (!maintenanceAnalytics) {
    return null;
  }

  const {

    oil,
    airFilter,
    sparkPlug,
    cvtBelt,
    roller,
    brakeFluid,

    tires,
    brakes,
    battery,

    maintenanceHealth,
    maintenanceCoverage,
    overallHealth,

    avgKmPerDay,

    oilPrediction,

    predictions,

    serviceTimeline,

    priorityList,

    aiAdvisor

  } = maintenanceAnalytics;

  const services = [

    {
      title: "Engine Oil",
      icon: "🛢️",
      data: oil
    },

    {
      title: "Air Filter",
      icon: "🌬️",
      data: airFilter
    },

    {
      title: "Spark Plug",
      icon: "⚡",
      data: sparkPlug
    },

    {
      title: "CVT Belt",
      icon: "⚙️",
      data: cvtBelt
    },

    {
      title: "Roller Weight",
      icon: "🔩",
      data: roller
    },

    {
      title: "Brake Fluid",
      icon: "🧪",
      data: brakeFluid
    },

    {
      title: "Tires",
      icon: "🛞",
      data: tires
    },

    {
      title: "Brake Pads",
      icon: "🛑",
      data: brakes
    },

    {
      title: "Battery",
      icon: "🔋",
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

  const getPriorityBadge = (
    level
  ) => {

    switch (level) {

      case "high":

        return {
          label:
            "🔴 High",

          className:
            "bg-red-500/20 text-red-300"
        };

      case "medium":

        return {
          label:
            "🟡 Medium",

          className:
            "bg-yellow-500/20 text-yellow-300"
        };

      case "low":

        return {
          label:
            "🟢 Low",

          className:
            "bg-green-500/20 text-green-300"
        };

      default:

        return {
          label:
            "⚪ Unknown",

          className:
            "bg-slate-500/20 text-slate-300"
        };

    }

  };

  const getConfidence = (
    coverage
  ) => {

    if (coverage >= 80) {

      return {
        label: "High",
        color:
          "text-green-300"
      };

    }

    if (coverage >= 50) {

      return {
        label: "Medium",
        color:
          "text-yellow-300"
      };

    }

    return {
      label: "Low",
      color:
        "text-red-300"
    };

  };

  const confidence =

    getConfidence(
      maintenanceCoverage
    );

  const getHealthColor = (
    score
  ) => {

    if (score >= 75)
      return "text-green-300";

    if (score >= 50)
      return "text-yellow-300";

    return "text-red-300";

  };

  const healthColor =
  getHealthColor(
    overallHealth
  );

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
            flex gap-3
            flex-wrap
          "
        >

        <div
          className="
            px-4 py-3
            rounded-2xl
            border border-white/10
            bg-white/5
            text-center
            min-w-[120px]
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
            className={`
              text-2xl
              font-black
              ${healthColor}
            `}
          >
            {overallHealth}/100
          </div>

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
              Coverage
            </div>

            <div
              className="
                text-2xl
                font-black
                text-white
              "
            >
              {maintenanceCoverage ?? "--"}%
            </div>

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
    Confidence
  </div>

  <div
    className={`
      text-xl
      font-black
      ${confidence.color}
    `}
  >
    {confidence.label}
  </div>

</div>

        </div>

      </div>

      <div
        className="
          rounded-2xl
          border border-cyan-500/20
          bg-cyan-500/10
          p-5
        "
      >

        <div
          className="
            flex items-center gap-2
            text-cyan-300
            font-bold
            mb-4
          "
        >

          <Activity size={18} />

          Predictive Maintenance

        </div>

        <div
          className="
            grid
            grid-cols-1
            md:grid-cols-3
            gap-4
          "
        >

          <div>

            <div
              className="
                text-xs
                text-white/50
              "
            >
              Avg KM / Day
            </div>

            <div
              className="
                text-xl
                font-bold
                text-white
              "
            >
              {avgKmPerDay?.toFixed(1)}
            </div>

          </div>

          <div>

            <div
              className="
                text-xs
                text-white/50
              "
            >
              Days Remaining
            </div>

            <div
              className="
                text-xl
                font-bold
                text-white
              "
            >
              {oilPrediction?.estimatedDays ?? "--"}
            </div>

          </div>

          <div>

            <div
              className="
                text-xs
                text-white/50
              "
            >
              Due Date
            </div>

            <div
              className="
                text-xl
                font-bold
                text-white
              "
            >
              {oilPrediction?.estimatedDate ?? "--"}
            </div>

          </div>

        </div>

        <div
          className="
            mt-4
            border-t
            border-cyan-500/20
            pt-4
          "
        >

          <div
            className="
              text-sm
              font-semibold
              text-cyan-300
              mb-3
            "
          >
            Service Forecast Timeline
          </div>

          <div
            className="
              grid
              grid-cols-1
              md:grid-cols-2
              gap-2
            "
          >

            {[
              ["🛢️", "Engine Oil", predictions?.oil],
              ["🌬️", "Air Filter", predictions?.airFilter],
              ["⚡", "Spark Plug", predictions?.sparkPlug],
              ["⚙️", "CVT Belt", predictions?.cvtBelt],
              ["🔩", "Roller Weight", predictions?.roller],
              ["🧪", "Brake Fluid", predictions?.brakeFluid],
              ["🛞", "Tires", predictions?.tires],
              ["🛑", "Brake Pads", predictions?.brakes],
              ["🔋", "Battery", predictions?.battery]
            ].map(

              ([icon, label, forecast]) => (

                <div
                  key={label}
                  className="
                    flex
                    justify-between
                    items-center
                    text-sm
                    bg-white/5
                    rounded-xl
                    px-3
                    py-2
                  "
                >

                  <span>

                    {icon} {label}

                  </span>

                  <span
                    className="
                      text-cyan-300
                    "
                  >

                    {forecast

                      ? `${forecast.estimatedDays} วัน`

                      : "No Data"}

                  </span>

                </div>

              )

            )}

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

                  {service.data?.status === "unknown"

                    ? "Unknown"

                    : `${service.data?.remainingKm ?? 0} km`
                  }

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

      <div
        className="
          rounded-2xl
          border border-amber-500/20
          bg-amber-500/10
          p-5
        "
      >

        <div
          className="
            text-amber-300
            font-bold
            mb-4
          "
        >
          📅 Upcoming Services
        </div>

        {

          serviceTimeline?.length > 0

            ? (

              <div
                className="
                  space-y-3
                "
              >

                {

                  serviceTimeline
                    .slice(0, 5)
                    .map(

                      (
                        item,
                        index
                      ) => (

                        <div
                          key={
                            item.title
                          }
                          className="
                            flex
                            justify-between
                            items-center
                            bg-white/5
                            rounded-xl
                            px-4
                            py-3
                          "
                        >

                          <div>

                            <div
                              className="
                                text-white
                                font-semibold
                              "
                            >

                              #{index + 1}

                              {" "}

                              {item.icon}

                              {" "}

                              {item.title}

                            </div>

                            <div
                              className="
                                text-xs
                                text-white/50
                              "
                            >

                              {
                                item
                                  .forecast
                                  .estimatedDate
                              }

                            </div>

                          </div>

                          <div
                            className="
                              text-amber-300
                              font-bold
                            "
                          >

                            {
                              item
                                .forecast
                                .estimatedDays
                            }

                            {" "}
                            วัน

                          </div>

                        </div>

                      )

                    )

                }

              </div>

            )

            : (

              <div
                className="
                  text-white/50
                  text-sm
                "
              >

                ยังไม่มีข้อมูล Forecast

              </div>

            )

        }

      </div>

      <div
        className="
          rounded-2xl
          border border-purple-500/20
          bg-purple-500/10
          p-5
        "
      >

        <div
          className="
            text-purple-300
            font-bold
            mb-4
          "
        >
          🚦 Maintenance Priority
        </div>

        <div
          className="
            space-y-3
          "
        >

          {

            priorityList
              ?.filter(
                item =>
                  item.priority.score > 0
              )
              .slice(0, 5)
              .map(

                item => {

                  const badge =

                    getPriorityBadge(
                      item.priority.level
                    );

                  return (

                    <div
                      key={
                        item.title
                      }
                      className="
                        flex
                        justify-between
                        items-center
                        bg-white/5
                        rounded-xl
                        px-4
                        py-3
                      "
                    >

                      <div>

                        <div
                          className="
                            text-white
                            font-medium
                          "
                        >

                          {item.icon}

                          {" "}

                          {item.title}

                        </div>

                        <div
                          className="
                            text-xs
                            text-white/50
                          "
                        >

                          Score

                          {" "}

                          {
                            item
                              .priority
                              .score
                          }

                        </div>

                      </div>

                      <div
                        className={`
                          px-3
                          py-1
                          rounded-full
                          text-xs
                          font-semibold
                          ${badge.className}
                        `}
                      >

                        {
                          badge.label
                        }

                      </div>

                    </div>

                  );

                }

              )

          }

        </div>

      </div>

      {/* AI MAINTENANCE ADVISOR */}

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
            text-cyan-300
            font-bold
            mb-4
          "
        >

          <Activity size={18} />

          AI Maintenance Advisor

        </div>

        <div
          className="
            grid
            grid-cols-1
            md:grid-cols-2
            gap-3
          "
        >

          {/* VEHICLE STATUS */}

          <div
            className="
              bg-white/5
              rounded-xl
              p-4
            "
          >

            <div
              className="
                text-xs
                text-white/50
                mb-1
              "
            >
              🟢 Vehicle Status
            </div>

            <div>

            <span
              className="
                inline-flex
                items-center
                gap-2

                px-3
                py-1

                rounded-full

                bg-green-500/20
                text-green-300

                text-sm
                font-bold
              "
            >

              🟢

              {aiAdvisor?.vehicleStatus}

            </span>

          </div>

            <div
              className="
                text-xs
                text-white/50
              "
            >
              Health Score {aiAdvisor?.healthScore}/100
            </div>

          </div>

          {/* ENGINE OIL */}

          <div
            className="
              bg-white/5
              rounded-xl
              p-4
            "
          >

            <div
              className="
                text-xs
                text-white/50
                mb-1
              "
            >
              🛢️ Engine Oil Forecast
            </div>

            <div
              className="
                text-lg
                font-bold
                text-white
              "
            >
              {aiAdvisor?.oilRemainingKm?.toLocaleString()} km
            </div>

            <div
              className="
                text-xs
                text-cyan-300
              "
            >
              {aiAdvisor?.oilRemainingDays} วัน
            </div>

            <div
              className="
                text-xs
                text-white/50
                mt-1
              "
            >

              Due

              {" "}

              {aiAdvisor?.oilDueDate}

            </div>

          </div>

          {/* COVERAGE */}

          <div
            className="
              bg-white/5
              rounded-xl
              p-4
            "
          >

            <div
              className="
                text-xs
                text-white/50
                mb-1
              "
            >
              📊 Data Coverage
            </div>

            <div
              className="
                text-lg
                font-bold
                text-white
              "
            >
              {aiAdvisor?.coverage}%
            </div>

            <div
              className="
                text-xs
                text-yellow-300
              "
            >
              {aiAdvisor?.confidence} Confidence
            </div>

            <div
              className="
                text-xs
                text-white/50
                mt-1
              "
            >

              ต้องการข้อมูลเพิ่มอีก

              {" "}

              {aiAdvisor?.unknownServices}

              {" "}

              รายการ

            </div>

          </div>

          {/* RECOMMENDATION */}

          <div
            className="
              bg-white/5
              rounded-xl
              p-4
            "
          >

            <div
              className="
                text-xs
                text-white/50
                mb-1
              "
            >
              💡 Suggested Action
            </div>

            <div
              className="
                text-lg
                font-bold
                text-white
              "
            >
              เพิ่มข้อมูลอีก
              {" "}
              {aiAdvisor?.unknownServices}
              {" "}
              รายการ
            </div>

            <div
              className="
                text-xs
                text-white/50
              "
            >
              เพื่อเพิ่มความแม่นยำของระบบ
            </div>

          </div>

        </div>

      </div>

    </div>

  );

};

export default MaintenancePanel;