import {
  X,
  Save,
  Receipt,
  Calendar,
  Package,
  Wallet,
  FileText,
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

  focus:border-pink-400
  focus:bg-white/10

  transition-all

  placeholder:text-white/30

`;

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

  categories = {},

  newNote,
  setNewNote,
}) => {
  //
  // 🚫 CLOSED
  //

  if (!showAddModal) return null;

  //
  // ❌ CLOSE
  //

  const handleClose = () => {
    setShowAddModal(false);
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

          rounded-3xl

          border border-white/10

          bg-[#12071f]/95

          backdrop-blur-2xl

          shadow-[0_0_80px_rgba(255,120,80,0.20)]

          max-h-[90vh]

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

                from-orange-400
                via-pink-500
                to-fuchsia-500

                flex items-center justify-center

                shadow-[0_0_30px_rgba(255,120,80,0.35)]

              "
            >
              <Receipt />
            </div>

            <div>
              <div className="text-2xl font-black">
                {editingId ? "Edit Expense" : "Expense Record"}
              </div>

              <div className="text-white/50 text-sm">
                เพิ่มข้อมูลค่าใช้จ่ายและของแต่งรถ
              </div>
            </div>
          </div>

          <button
            onClick={cancelEdit}
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
          {/* DATE */}

          <div>
            <label className="text-sm text-white/60 flex items-center gap-2">
              <Calendar size={14} />
              วันที่
            </label>

            <input
              type="date"
              value={newDate}
              onChange={(e) => setNewDate(e.target.value)}
              className={inputStyle}
            />
          </div>

          {/* TITLE */}

          <div>
            <label className="text-sm text-white/60 flex items-center gap-2">
              <Package size={14} />
              รายการ
            </label>

            <input
              type="text"
              placeholder="เช่น ท่อแต่ง / โช๊ค / น้ำมันเครื่อง"
              value={newItem}
              onChange={(e) => setNewItem(e.target.value)}
              className={inputStyle}
            />
          </div>

          {/* CATEGORY + PRICE */}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="text-sm text-white/60">หมวดหมู่</label>

              <select
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                className={inputStyle}
              >
                <option value="" className="bg-[#14091f] text-white">
                  Select Category
                </option>

                {Object.entries(categories || {}).map(([key, category]) => (
                  <option
                    key={key}
                    value={key}
                    className="bg-[#14091f] text-white"
                  >
                    {category?.name || key}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-sm text-white/60 flex items-center gap-2">
                <Wallet size={14} />
                ราคา
              </label>

              <input
                type="number"
                placeholder="เช่น 3500"
                value={newPrice}
                onChange={(e) => setNewPrice(e.target.value)}
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
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
              className={inputStyle}
              placeholder="รายละเอียดเพิ่มเติม..."
            />
          </div>

          {/* TOTAL PREVIEW */}

          <div
            className="

              rounded-2xl

              border border-pink-500/20

              bg-pink-500/10

              p-5

              backdrop-blur-xl

            "
          >
            <div className="text-sm text-pink-300 font-semibold">
              Expense Summary
            </div>

            <div className="mt-2 text-3xl font-black text-white">
              ฿{Number(newPrice || 0).toLocaleString()}
            </div>

            <div className="mt-2 text-sm text-white/60">
              ระบบจะนำข้อมูลนี้ไปวิเคราะห์ Vehicle Cost, Budget Analytics, AI
              Recommendation และแนวโน้มค่าใช้จ่ายแบบ real-time
            </div>
          </div>
        </div>

        {/* FOOTER */}

        <div
          className="
            sticky bottom-0

            px-6 py-5

            border-t border-white/10

            bg-[#12071f]/95

            backdrop-blur-xl

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
            onClick={() => {
              addExpense();
            }}
            disabled={!newItem || !newPrice || Number(newPrice) <= 0}
            className="

              px-6 py-3

              rounded-2xl

              bg-gradient-to-r

              from-orange-400
              via-pink-500
              to-fuchsia-500

              font-bold

              shadow-[0_0_30px_rgba(255,120,80,0.35)]

              hover:scale-[1.03]

              transition-all

              disabled:opacity-40
              disabled:cursor-not-allowed
              disabled:hover:scale-100

              flex items-center gap-2

            "
          >
            <Save size={18} />

            {editingId ? "Save Changes" : "Save Expense"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExpenseModal;
