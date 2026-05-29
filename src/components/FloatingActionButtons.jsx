import {

  Fuel,

  PlusCircle,

  Wrench

} from "lucide-react";

const fabStyle = `

  relative

  w-14 h-14 sm:w-16 sm:h-16

  rounded-full

  flex items-center justify-center

  backdrop-blur-2xl

  border border-white/10

  shadow-[0_0_30px_rgba(255,120,80,0.35)]

  transition-all duration-300 ease-out

  hover:scale-110
  hover:-translate-y-1

  active:scale-95

  before:absolute
  before:inset-0
  before:rounded-full
  before:bg-white/10
  before:opacity-0

  hover:before:opacity-100

  before:transition-opacity

  disabled:opacity-40
  disabled:cursor-not-allowed
  disabled:hover:scale-100
  disabled:hover:translate-y-0

  bg-white/10
  before:backdrop-blur-3xl

`;

const FloatingActionButtons = ({

  view,

  setShowFuelModal,

  setShowAddModal,

  setShowMaintenanceModal,

  isAnyModalOpen

}) => {

  return (

    <div

      className="

        fixed

        bottom-[calc(1.5rem+env(safe-area-inset-bottom))]
        right-4 sm:right-6 lg:right-10

        z-50

        flex flex-col gap-4

      "

    >

      {/* 🛠️ Maintenance Button */}

      <button

        disabled={isAnyModalOpen}

        onClick={() =>

          setShowMaintenanceModal(
            true
          )

        }

        title="Maintenance"

        className={`

          ${fabStyle}

          bg-gradient-to-br

          from-violet-500
          via-purple-500
          to-fuchsia-600

          hover:shadow-[0_0_45px_rgba(168,85,247,0.65)]

        `}

      >

        <Wrench

          size={24}

          className="sm:w-7 sm:h-7 text-white drop-shadow"

        />

      </button>

      {/* ⛽ Fuel Button */}

      {view === 'fuel' && (

        <button

          disabled={isAnyModalOpen}

          onClick={() =>

            setShowFuelModal(
              true
            )

          }

          title="เพิ่มข้อมูลน้ำมัน"

          className={`

            ${fabStyle}

            bg-gradient-to-br

            from-cyan-400
            via-sky-500
            to-blue-600

            hover:shadow-[0_0_45px_rgba(16,185,129,0.55)]

          `}

        >

          <Fuel

            size={24}

            className="sm:w-7 sm:h-7 text-white drop-shadow"

          />

        </button>

      )}

      {/* ➕ Add Expense Button */}

      {view !== 'fuel' && (

        <button

          disabled={isAnyModalOpen}

          onClick={() =>

            setShowAddModal(
              true
            )

          }

          title="เพิ่มรายการใหม่"

          className={`

            ${fabStyle}

            bg-gradient-to-br

            from-orange-400
            via-pink-500
            to-fuchsia-500

            hover:shadow-[0_0_45px_rgba(255,120,80,0.65)]

          `}

        >

          <PlusCircle

            size={24}

            className="sm:w-7 sm:h-7 text-white drop-shadow"

          />

        </button>

      )}

    </div>

  );

};

export default FloatingActionButtons;