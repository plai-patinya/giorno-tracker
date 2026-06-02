const RecommendationPanel = ({
  recommendations = []
}) => {

  const getPriorityStyle = (
    priority
  ) => {

    switch (priority) {

      case "high":

        return {

          border:
            "border-red-500/20",

          bg:
            "from-red-500/15 to-pink-500/10",

          text:
            "text-red-300"

        };

      case "medium":

        return {

          border:
            "border-yellow-500/20",

          bg:
            "from-yellow-500/15 to-orange-500/10",

          text:
            "text-yellow-300"

        };

      case "good":

        return {

          border:
            "border-emerald-500/20",

          bg:
            "from-emerald-500/15 to-cyan-500/10",

          text:
            "text-emerald-300"

        };

      case "unknown":

        return {

          border:
            "border-white/10",

          bg:
            "from-white/5 to-white/0",

          text:
            "text-white/50"

        };

      case "low":

        return {

          border:
            "border-cyan-500/20",

          bg:
            "from-cyan-500/15 to-blue-500/10",

          text:
            "text-cyan-300"

        };

      default:

        return {

          border:
            "border-cyan-500/20",

          bg:
            "from-cyan-500/15 to-blue-500/10",

          text:
            "text-cyan-300"

        };

    }

  };

  return (

    <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-white/5 backdrop-blur-2xl p-6 shadow-2xl">

      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />

      <div className="relative z-10">

        {/* HEADER */}

        <div className="flex items-center gap-4 mb-6">

          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-fuchsia-500/20 to-cyan-500/10 border border-white/10 flex items-center justify-center text-2xl">

            🤖

          </div>

          <div>

            <div className="text-sm text-white/50 uppercase tracking-widest">

              AI Assistant

            </div>

            <div className="text-3xl font-black text-white">

              Smart Recommendations

            </div>

          </div>

        </div>

        {/* LIST */}

        <div className="space-y-4">

          {recommendations.map(
            (item, index) => {

              const style =
                getPriorityStyle(
                  item.priority
                );

              return (

                <div
                  key={index}

                  style={{
                    animationDelay:
                      `${index * 0.08}s`
                  }}

                  className={`
                    relative
                    overflow-hidden

                    rounded-3xl

                    border

                    ${style.border}

                    bg-gradient-to-br
                    ${style.bg}

                    p-5

                    animate-[fadeInUp_0.5s_ease]

                    transition-all
                    duration-300

                    hover:scale-[1.02]
                  `}
                >

                  <div className="flex items-start gap-4">

                    <div className="text-3xl">

                      {item.icon}

                    </div>

                    <div>

                      <div
                        className={`
                          text-xl
                          font-black

                          ${style.text}
                        `}
                      >

                        {item.title}

                      </div>

                      <div className="text-white/70 mt-2">

                        {item.description}

                      </div>

                    </div>

                  </div>

                </div>

              );

            }
          )}

        </div>

      </div>

    </div>

  );

};

export default RecommendationPanel;