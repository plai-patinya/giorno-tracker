import {
  PlusCircle,
  Edit2,
  Save,
  X
} from "lucide-react";

const ExpenseModal = ({
  showAddModal,
  setShowAddModal,

  editingId,

  newItem,
  setNewItem,

  newPrice,
  setNewPrice,

  newCategory,
  setNewCategory,

  newDate,
  setNewDate,

  addExpense,
  cancelEdit,

  categories
}) => {

  if (!showAddModal) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn"
      onClick={(e) =>
        e.target === e.currentTarget && cancelEdit()
      }
    >

      <div className="bg-slate-800/95 backdrop-blur-xl rounded-2xl p-6 w-full max-w-2xl border border-white/20 shadow-2xl animate-scaleIn max-h-[80vh] overflow-y-auto">

        <div className="flex items-center justify-between mb-6">

          <div className="flex items-center gap-3">

            {editingId ? (
              <Edit2 className="text-blue-400" size={24} />
            ) : (
              <PlusCircle className="text-orange-400" size={24} />
            )}

            <h3 className="text-2xl font-bold">
              {editingId ? 'แก้ไขรายการ' : 'เพิ่มรายการใหม่'}
            </h3>

          </div>

          <button
            onClick={cancelEdit}
            className="p-2 hover:bg-white/10 rounded-lg transition-all"
          >
            <X size={24} />
          </button>

        </div>

        <div className="space-y-4">

          <div>

            <label className="block text-sm font-medium mb-2 text-gray-300">
              ชื่อรายการ
            </label>

            <input
              type="text"
              placeholder="เช่น ท่อผ่า, โช้คหลัง"
              value={newItem}
              onChange={(e) => setNewItem(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
              onKeyPress={(e) => e.key === 'Enter' && addExpense()}
              autoFocus
            />

          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

            <div>

              <label className="block text-sm font-medium mb-2 text-gray-300">
                ราคา (บาท)
              </label>

              <input
                type="number"
                placeholder="0"
                value={newPrice}
                onChange={(e) => setNewPrice(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
                onKeyPress={(e) => e.key === 'Enter' && addExpense()}
              />

            </div>

            <div>

              <label className="block text-sm font-medium mb-2 text-gray-300">
                หมวดหมู่
              </label>

              <select
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
              >

                {Object.entries(categories)
                  .filter(([key]) => key !== 'base')
                  .map(([key, cat]) => (
                    <option
                      key={key}
                      value={key}
                      className="bg-slate-800"
                    >
                      {cat.icon} {cat.name}
                    </option>
                  ))}

              </select>

            </div>

            <div>

              <label className="block text-sm font-medium mb-2 text-gray-300">
                วันที่
              </label>

              <input
                type="date"
                value={newDate}
                onChange={(e) => setNewDate(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
              />

            </div>

          </div>

          <div className="flex gap-3 pt-4">

            <button
              onClick={addExpense}
              disabled={!newItem.trim() || !newPrice || parseFloat(newPrice) <= 0}
              className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed rounded-xl py-3 font-bold transition-all shadow-lg flex items-center justify-center gap-2"
            >
              <Save size={20} />

              {editingId ? 'บันทึกการแก้ไข' : 'เพิ่มรายการ'}

            </button>

            <button
              onClick={cancelEdit}
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

export default ExpenseModal;