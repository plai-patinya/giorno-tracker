const DrivingProfileCard = ({
  profile
}) => {

  return (

    <div
      className={`
        relative
        overflow-hidden

        rounded-[32px]

        border border-white/10

        bg-gradient-to-br
        ${profile.bg}

        backdrop-blur-2xl

        p-6

        shadow-2xl
      `}
    >

      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />

      <div className="relative z-10">

        <div className="flex items-center gap-4 mb-5">

          <div className="w-16 h-16 rounded-3xl bg-white/10 border border-white/10 flex items-center justify-center text-3xl">

            {profile.emoji}

          </div>

          <div>

            <div className="text-sm text-white/50 uppercase tracking-widest">

              Driving Profile

            </div>

            <div
              className={`
                text-3xl
                font-black

                ${profile.color}
              `}
            >

              {profile.type}

            </div>

          </div>

        </div>

        <div className="text-white/70 text-lg">

          {profile.description}

        </div>

      </div>

    </div>

  );

};

export default DrivingProfileCard;