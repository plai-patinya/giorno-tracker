const NotificationCenter = ({
  notifications = []
}) => {

  const criticalCount =
    notifications.filter(
      (n) => n.level === "critical"
    ).length;

  return (

    <div className="space-y-4">

      {/* HEADER */}

      <div className="flex items-center justify-between">

        <div className="flex items-center gap-3">

          <div className="relative">

            <div className="w-12 h-12 rounded-2xl bg-red-500/15 border border-red-500/20 flex items-center justify-center text-2xl">

              🔔

            </div>

            {criticalCount > 0 && (

              <div className="absolute -top-1 -right-1 min-w-[22px] h-[22px] px-1 rounded-full bg-red-500 text-white text-xs font-black flex items-center justify-center animate-pulse">

                {criticalCount}

              </div>

            )}

          </div>

          <div>

            <h3 className="text-xl font-black">

              AI Notifications

            </h3>

            <p className="text-sm text-white/50">

              ระบบแจ้งเตือนอัจฉริยะ

            </p>

          </div>

        </div>

      </div>

      {/* LIST */}

      <div className="space-y-3">

        {notifications.length === 0 && (

          <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-4 text-emerald-300">

            ✅ ทุกระบบทำงานปกติ

          </div>

        )}

        {notifications.map(
          (item, index) => (

            <div
              key={index}
              style={{
                animationDelay:
                  `${index * 0.08}s`
              }}
              className={`
                rounded-2xl
                border
                p-4

                backdrop-blur-xl

                animate-[fadeInUp_0.5s_ease]

                transition-all duration-300

                hover:scale-[1.02]

                ${
                  item.level === "critical"

                    ? `
                      border-red-500/30
                      bg-red-500/10
                    `

                    : item.level === "warning"

                    ? `
                      border-yellow-500/30
                      bg-yellow-500/10
                    `

                    : item.level === "info"

                    ? `
                      border-blue-500/30
                      bg-blue-500/10
                    `

                    : `
                      border-cyan-500/30
                      bg-cyan-500/10
                    `
                }
              `}
            >

              <div className="flex items-start gap-3">

                <div className="text-2xl">

                  {item.icon}

                </div>

                <div className="flex-1">

                  <div className="font-bold">

                    {item.title}

                  </div>

                  <div className="text-sm text-white/60 mt-1">

                    {item.description}

                  </div>

                </div>

              </div>

            </div>

          )
        )}

      </div>

    </div>

  );

};

export default NotificationCenter;