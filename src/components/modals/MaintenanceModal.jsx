import {

  useState

} from "react";

import {

  X,

  Wrench,

  Save,

  Calendar,

  GaugeCircle,

  Wallet,

  FileText,

  ShieldCheck

} from "lucide-react";

import {

  MAINTENANCE_CATEGORIES

} from "../../maintenance/maintenanceCategories";

import {

  createMaintenanceRecord

} from "../../maintenance/maintenanceSchema";

import useMaintenanceCRUD
from "../../hooks/useMaintenanceCRUD";

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

  focus:border-fuchsia-400
  focus:bg-white/10

  transition-all

  placeholder:text-white/30

`;

const MaintenanceModal = ({

  isOpen,

  onClose,

  currentOdo = 0

}) => {

  //
  // 🛠️ CRUD
  //

  const {

    createMaintenance

  } = useMaintenanceCRUD();

  //
  // 📝 FORM
  //

  const [

    form,

    setForm

  ] = useState({

    ...createMaintenanceRecord(),

    date:
      new Date()
        .toISOString()
        .split("T")[0],

    serviceOdometer:
      currentOdo

  });

  //
  // 🚫 CLOSED
  //

  if (!isOpen)
    return null;

  //
  // 📝 HANDLE CHANGE
  //

  const handleChange = (
    key,
    value
  ) => {

    setForm((prev) => ({

      ...prev,

      [key]: value

    }));

  };

  //
  // ❌ CLOSE
  //

  const handleClose = () => {

    onClose();

  };

  //
  // 💾 SAVE
  //

  const handleSave = () => {

    const serviceOdometer =
      Number(form.serviceOdometer);

    const nextServiceKm =
      Number(form.nextServiceKm);

    const record = {

      ...form,

      serviceOdometer,

      nextServiceKm,

      nextDueOdo:
        serviceOdometer +
        nextServiceKm,

      laborCost:
        Number(form.laborCost),

      partsCost:
        Number(form.partsCost),

      totalCost:
        Number(form.laborCost) +
        Number(form.partsCost)

    };

    createMaintenance(
      record
    );

    onClose();

  };

  return (

    <div

      className="

        fixed inset-0

        z-[9999]

        overflow-y-auto

        flex items-center justify-center

        bg-black/60

        backdrop-blur-md

        p-4

      "

    >

      <div

        className="

          w-full max-w-2xl

          max-h-[90vh]

          rounded-3xl

          border border-white/10

          bg-[#12071f]/95

          backdrop-blur-2xl

          shadow-[0_0_80px_rgba(168,85,247,0.25)]

          overflow-y-auto

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

                from-violet-500
                via-purple-500
                to-fuchsia-600

                flex items-center justify-center

                shadow-[0_0_30px_rgba(168,85,247,0.35)]

              "

            >

              <Wrench />

            </div>

            <div>

              <div className="text-2xl font-black">

                Maintenance Record

              </div>

              <div className="text-white/50 text-sm">

                บันทึกข้อมูล maintenance จริง

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

          {/* DATE + serviceOdometer */}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

            <div>

              <label className="text-sm text-white/60 flex items-center gap-2">

                <Calendar size={14} />

                วันที่

              </label>

              <input
                type="date"
                value={form.date}
                onChange={(e) =>
                  handleChange(
                    "date",
                    e.target.value
                  )
                }
                className={inputStyle}
              />

            </div>

            <div>

              <label className="text-sm text-white/60 flex items-center gap-2">

                <GaugeCircle size={14} />

                เลขไมล์ตอนเข้ารับบริการ

              </label>

              <input
                type="number"
                value={form.serviceOdometer}
                onChange={(e) =>
                  handleChange(
                    "serviceOdometer",
                    e.target.value
                  )
                }
                className={inputStyle}
              />

            </div>

            <div>

              <label
                className="
                  text-sm
                  text-white/60
                  flex items-center gap-2
                "
              >

                <GaugeCircle size={14} />

                ระยะเปลี่ยนครั้งถัดไป (km)

              </label>

              <input

                type="number"

                value={form.nextServiceKm}

                onChange={(e) =>
                  handleChange(
                    "nextServiceKm",
                    e.target.value
                  )
                }

                className={inputStyle}

                placeholder="เช่น 5000"

              />

              <p className="mt-1 text-xs text-white/40">

                ตัวอย่าง:
                เปลี่ยนน้ำมันเครื่องทุก 5,000 km

              </p>

            </div>

          </div>

          {/* TITLE */}

          <div>

            <label className="text-sm text-white/60">

              รายการบริการ

            </label>

            <input
              value={form.title}
              onChange={(e) =>
                handleChange(
                  "title",
                  e.target.value
                )
              }
              className={inputStyle}
              placeholder="เช่น เปลี่ยนน้ำมันเครื่อง"
            />

          </div>

          {/* CATEGORY */}

          <div>

            <label className="text-sm text-white/60">

              หมวดหมู่

            </label>

            <select
              value={form.category}
              onChange={(e) =>
                handleChange(
                  "category",
                  e.target.value
                )
              }
              className={inputStyle}
            >

              <option
                value=""
                className="bg-[#14091f] text-white"
              >
                เลือกหมวดหมู่
              </option>

              {MAINTENANCE_CATEGORIES.map(
                (category) => (

                  <option

                    key={category}

                    value={category}

                    className="bg-[#14091f] text-white"

                  >

                    {category}

                  </option>

                )
              )}

            </select>

          </div>

          {/* COST */}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

            <div>

              <label className="text-sm text-white/60 flex items-center gap-2">

                <Wallet size={14} />

                ค่าแรง

              </label>

              <input
                type="number"
                value={form.laborCost}
                onChange={(e) =>
                  handleChange(
                    "laborCost",
                    e.target.value
                  )
                }
                className={inputStyle}
              />

            </div>

            <div>

              <label className="text-sm text-white/60 flex items-center gap-2">

                <Wallet size={14} />

                ค่าอะไหล่

              </label>

              <input
                type="number"
                value={form.partsCost}
                onChange={(e) =>
                  handleChange(
                    "partsCost",
                    e.target.value
                  )
                }
                className={inputStyle}
              />

            </div>

          </div>

          {/* NOTE */}

          <div>

            <label className="text-sm text-white/60 flex items-center gap-2">

              <FileText size={14} />

              หมายเหตุ

            </label>

            <textarea
              rows={4}
              value={form.note}
              onChange={(e) =>
                handleChange(
                  "note",
                  e.target.value
                )
              }
              className={inputStyle}
            />

          </div>

          {/* AI PREVIEW */}

          <div

            className="

              rounded-2xl

              border border-fuchsia-500/20

              bg-fuchsia-500/10

              p-5

              backdrop-blur-xl

            "

          >

            <div className="flex items-center gap-2 text-fuchsia-300 font-semibold">

              <ShieldCheck size={16} />

              Maintenance Intelligence

            </div>

            <div className="mt-2 text-sm text-white/70 leading-relaxed">

              ระบบจะนำข้อมูลนี้ไปวิเคราะห์
              Vehicle Health,
              Maintenance Timeline,
              Predictive Service,
              Reliability
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

            onClick={handleSave}

            disabled={
              !form.title ||
              !form.category ||
              !form.serviceOdometer ||
              !form.nextServiceKm
            }

            className="

              px-6 py-3

              rounded-2xl

              bg-gradient-to-r

              from-violet-500
              via-purple-500
              to-fuchsia-600

              font-bold

              shadow-[0_0_30px_rgba(168,85,247,0.35)]

              hover:scale-[1.03]

              transition-all

              disabled:opacity-40
              disabled:cursor-not-allowed
              disabled:hover:scale-100

              flex items-center gap-2

            "

          >

            <Save size={18} />

            Save Maintenance

          </button>

        </div>

      </div>

    </div>

  );

};

export default
MaintenanceModal;