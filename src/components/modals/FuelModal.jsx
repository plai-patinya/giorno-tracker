import {

  Fuel,

  Save,

  X,

  Droplets,

  GaugeCircle,

  Calendar

} from "lucide-react";

const inputStyle = `

  w-full
  mt-2

  rounded-2xl

  bg-white/5

  border border-white/10

  px-4 py-3

  outline-none

  text-white

  backdrop-blur-xl

  focus:border-cyan-400
  focus:bg-white/10

  transition-all

  placeholder:text-white/30

`;

const FuelModal = ({

  showFuelModal,

  setShowFuelModal,

  editingFuelId,

  fuelDate,
  setFuelDate,

  fuelOdometer,
  setFuelOdometer,

  fuelLiters,
  setFuelLiters,

  fuelPricePerLiter,
  setFuelPricePerLiter,

  fuelType,
  setFuelType,

  fuelTotalPrice,

  fuelTypes,

  addFuelRecord,

  resetFuelForm

}) => {

  //
  // 🚫 CLOSED
  //

  if (!showFuelModal)
    return null;

  //
  // ❌ CLOSE
  //

  const handleClose = () => {

    setShowFuelModal(false);

    resetFuelForm();

  };

  return (

    <div

      className="

        fixed inset-0

        z-[9999]

        flex items-center justify-center

        bg-black/60

        backdrop-blur-md

        p-4

      "

    >

      <div

        className="

          w-full max-w-2xl

          rounded-3xl

          border border-white/10

          bg-[#12071f]/95

          backdrop-blur-2xl

          shadow-[0_0_80px_rgba(34,211,238,0.18)]

          overflow-hidden

          animate-[fadeInUp_0.35s_ease]

        "

      >

        {/* HEADER */}

        <div

          className="

            flex items-center justify-between

            px-6 py-5

            border-b border-white/10

          "

        >

          <div className="flex items-center gap-4">

            <div

              className="

                w-12 h-12

                rounded-2xl

                bg-gradient-to-br

                from-cyan-400
                via-sky-500
                to-blue-600

                flex items-center justify-center

                shadow-[0_0_30px_rgba(34,211,238,0.35)]

              "

            >

              <Fuel />

            </div>

            <div>

              <div className="text-2xl font-black">

                {editingFuelId

                  ? "Edit Fuel Record"

                  : "Fuel Record"}

              </div>

              <div className="text-white/50 text-sm">

                บันทึกข้อมูลการเติมน้ำมันจริง

              </div>

            </div>

          </div>

          <button

            onClick={handleClose}

            className="

              w-10 h-10

              rounded-xl

              bg-white/5

              hover:bg-white/10

              transition-all

              flex items-center justify-center

            "

          >

            <X size={18} />

          </button>

        </div>

        {/* BODY */}

        <div className="p-6 space-y-5">

          {/* DATE + ODOMETER */}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

            <div>

              <label className="text-sm text-white/60 flex items-center gap-2">

                <Calendar size={14} />

                วันที่เติมน้ำมัน

              </label>

              <input
                type="date"
                value={fuelDate}
                onChange={(e) =>
                  setFuelDate(
                    e.target.value
                  )
                }
                className={inputStyle}
              />

            </div>

            <div>

              <label className="text-sm text-white/60 flex items-center gap-2">

                <GaugeCircle size={14} />

                ระยะทาง (km)

              </label>

              <input
                type="number"
                step="0.1"
                placeholder="เช่น 1250.5"
                value={fuelOdometer}
                onChange={(e) =>
                  setFuelOdometer(
                    e.target.value
                  )
                }
                className={inputStyle}
              />

            </div>

          </div>

          {/* LITERS + PRICE */}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

            <div>

              <label className="text-sm text-white/60 flex items-center gap-2">

                <Droplets size={14} />

                จำนวนลิตร

              </label>

              <input
                type="number"
                step="0.01"
                placeholder="เช่น 3.50"
                value={fuelLiters}
                onChange={(e) =>
                  setFuelLiters(
                    e.target.value
                  )
                }
                className={inputStyle}
              />

            </div>

            <div>

              <label className="text-sm text-white/60">

                ราคา / ลิตร

              </label>

              <input
                type="number"
                step="0.01"
                placeholder="เช่น 35.50"
                value={fuelPricePerLiter}
                onChange={(e) =>
                  setFuelPricePerLiter(
                    e.target.value
                  )
                }
                className={inputStyle}
              />

            </div>

          </div>

          {/* TYPE + TOTAL */}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

            <div>

              <label className="text-sm text-white/60">

                ประเภทน้ำมัน

              </label>

              <select
                value={fuelType}
                onChange={(e) =>
                  setFuelType(
                    e.target.value
                  )
                }
                className={inputStyle}
              >

                {Object.entries(
                  fuelTypes
                ).map(([key, type]) => (

                  <option

                    key={key}

                    value={key}

                    className="bg-[#14091f] text-white"

                  >

                    {type.name}

                  </option>

                ))}

              </select>

            </div>

            <div>

              <label className="text-sm text-white/60">

                ราคารวม

              </label>

              <div

                className="

                  mt-2

                  rounded-2xl

                  border border-cyan-500/20

                  bg-cyan-500/10

                  px-4 py-3

                  text-cyan-300

                  font-bold text-lg

                  shadow-inner

                "

              >

                ฿{Number(
                  fuelTotalPrice || 0
                ).toLocaleString()}

              </div>

            </div>

          </div>

          {/* AI PREVIEW */}

          <div

            className="

              rounded-2xl

              border border-cyan-500/10

              bg-cyan-500/5

              p-4

              backdrop-blur-xl

            "

          >

            <div className="text-sm text-cyan-300 font-semibold">

              Fuel Intelligence Preview

            </div>

            <div className="mt-2 text-white/70 text-sm leading-relaxed">

              ระบบจะนำข้อมูลนี้ไปวิเคราะห์
              อัตราสิ้นเปลือง,
              พฤติกรรมการขับ,
              Vehicle Health
              และ AI Recommendation
              แบบ real-time

            </div>

          </div>

        </div>

        {/* FOOTER */}

        <div

          className="

            px-6 py-5

            border-t border-white/10

            flex justify-end gap-3

          "

        >

          <button

            onClick={handleClose}

            className="

              px-5 py-3

              rounded-2xl

              border border-white/10

              bg-white/5

              hover:bg-white/10

              transition-all

              font-semibold

            "

          >

            Cancel

          </button>

          <button

            onClick={addFuelRecord}

            disabled={
              !fuelOdometer ||

              !fuelLiters ||

              parseFloat(
                fuelLiters
              ) <= 0
            }

            className="

              px-6 py-3

              rounded-2xl

              bg-gradient-to-r

              from-cyan-400
              via-sky-500
              to-blue-600

              font-bold

              shadow-[0_0_30px_rgba(34,211,238,0.35)]

              hover:scale-[1.03]

              transition-all

              disabled:opacity-40
              disabled:cursor-not-allowed
              disabled:hover:scale-100

              flex items-center gap-2

            "

          >

            <Save size={18} />

            {editingFuelId

              ? "Save Changes"

              : "Save Fuel Record"}

          </button>

        </div>

      </div>

    </div>

  );

};

export default FuelModal;