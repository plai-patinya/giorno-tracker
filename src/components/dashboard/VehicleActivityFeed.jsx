const VehicleActivityFeed = ({
  activities = []
}) => {

  return (

    <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-white/5 backdrop-blur-2xl p-5 shadow-2xl">

      {/* GLOW */}

      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />

      {/* HEADER */}

      <div className="relative z-10 flex items-center gap-4 mb-6">

        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-500/10 border border-white/10 flex items-center justify-center text-2xl">

          📡

        </div>

        <div>

          <h3 className="text-3xl font-black text-white">

            Live Activity Feed

          </h3>

          <div className="text-sm text-white/50">

            กิจกรรมล่าสุดของรถ

          </div>

        </div>

      </div>

      {/* TIMELINE */}

      <div className="relative z-10 space-y-4">

        {activities.map((item, index) => (

          <div
            key={index}

            style={{
              animationDelay:
                `${index * 0.08}s`
            }}

            className="
              relative

              flex gap-4

              rounded-3xl

              border border-white/10

              bg-white/[0.04]

              backdrop-blur-xl

              p-4

              transition-all
              duration-300

              hover:scale-[1.01]
              hover:bg-white/[0.07]

              animate-[fadeInUp_0.5s_ease]
            "
          >

            {/* ICON */}

            <div
              className={`
                w-14 h-14

                rounded-2xl

                flex items-center justify-center

                text-2xl

                border border-white/10

                ${item.bg}
              `}
            >

              {item.icon}

            </div>

            {/* CONTENT */}

            <div className="flex-1">

              <div className="flex items-center justify-between gap-4">

                <div className="font-bold text-white text-lg">

                  {item.title}

                </div>

                <div className="text-xs text-white/40 whitespace-nowrap">

                  {item.time}

                </div>

              </div>

              <div className="text-sm text-white/60 mt-1">

                {item.description}

              </div>

            </div>

          </div>

        ))}

      </div>

    </div>

  );

};

export default VehicleActivityFeed;