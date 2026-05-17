import {
  Fuel,
  Save,
  X
} from "lucide-react";

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

  if (!showFuelModal) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn"
      onClick={(e) =>
        e.target === e.currentTarget &&
        (setShowFuelModal(false), resetFuelForm())
      }
    >

      <div className="bg-slate-800/95 backdrop-blur-xl rounded-2xl p-6 w-full max-w-2xl border border-white/20 shadow-2xl animate-scaleIn max-h-[90vh] overflow-y-auto">

        <div className="flex items-center justify-between mb-6">

          <div className="flex items-center gap-3">

            <Fuel className="text-green-400" size={24} />

            <h3 className="text-2xl font-bold">
              {editingFuelId
                ? 'แก้ไขข้อมูลการเติมน้ำมัน'
                : 'บันทึกการเติมน้ำมัน'}
            </h3>

          </div>

          <button
            onClick={() => {
              setShowFuelModal(false);
              resetFuelForm();
            }}
            className="p-2 hover:bg-white/10 rounded-lg transition-all"
          >
            <X size={24} />
          </button>

        </div>

        <div className="space-y-4">

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

            <div>

              <label className="block text-sm font-medium mb-2 text-gray-300">
                วันที่เติม
              </label>

              <input
                type="date"
                value={fuelDate}
                onChange={(e) => setFuelDate(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
              />

            </div>

            <div>

              <label className="block text-sm font-medium mb-2 text-gray-300">
                ระยะทาง (กม.)
              </label>

              <input
                type="number"
                step="0.1"
                placeholder="เช่น 1250.5"
                value={fuelOdometer}
                onChange={(e) => setFuelOdometer(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
              />

            </div>

          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

            <div>

              <label className="block text-sm font-medium mb-2 text-gray-300">
                จำนวนลิตร
              </label>

              <input
                type="number"
                step="0.01"
                placeholder="เช่น 3.50"
                value={fuelLiters}
                onChange={(e) => setFuelLiters(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
              />

            </div>

            <div>

              <label className="block text-sm font-medium mb-2 text-gray-300">
                ราคา/ลิตร (บาท)
              </label>

              <input
                type="number"
                step="0.01"
                placeholder="เช่น 35.50"
                value={fuelPricePerLiter}
                onChange={(e) => setFuelPricePerLiter(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
              />

            </div>

          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

            <div>

              <label className="block text-sm font-medium mb-2 text-gray-300">
                ชนิดน้ำมัน
              </label>

              <select
                value={fuelType}
                onChange={(e) => setFuelType(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
              >

                {Object.entries(fuelTypes).map(([key, type]) => (
                  <option
                    key={key}
                    value={key}
                    className="bg-slate-800"
                  >
                    {type.name}
                  </option>
                ))}

              </select>

            </div>

            <div>

              <label className="block text-sm font-medium mb-2 text-gray-300">
                รวมเงิน (บาท)
              </label>

              <input
                type="number"
                step="0.01"
                placeholder="คำนวณอัตโนมัติ"
                value={fuelTotalPrice}
                readOnly
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-gray-400 cursor-not-allowed"
              />

            </div>

          </div>

          <div className="flex gap-3 pt-4">

            <button
              onClick={addFuelRecord}
              disabled={!fuelOdometer || !fuelLiters || parseFloat(fuelLiters) <= 0}
              className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed rounded-xl py-3 font-bold transition-all shadow-lg flex items-center justify-center gap-2"
            >
              <Save size={20} />

              {editingFuelId
                ? 'บันทึกการแก้ไข'
                : 'บันทึกข้อมูล'}

            </button>

            <button
              onClick={() => {
                setShowFuelModal(false);
                resetFuelForm();
              }}
              className="px-6 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl py-3 font-bold transition-all"
            >
              ยกเลิก
            </button>

          </div>

        </div>

      </div>

    </div>
  );

};

export default FuelModal;