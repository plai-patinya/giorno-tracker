const ListView = ({

  filteredExpenses,

  categories,

  formatThaiDate,

  startEdit,
  deleteExpense,

  searchTerm,
  setSearchTerm

}) => {

  return (

    <div className="space-y-6">

      {/* Search */}
      <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-4 border border-white/10">

        <input
          type="text"
          placeholder="ค้นหารายการ..."
          value={searchTerm}
          onChange={(e) =>
            setSearchTerm(e.target.value)
          }
          className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-purple-500"
        />

      </div>

      {/* List */}
      <div className="space-y-3">

        {filteredExpenses.map((expense) => (

          <div
            key={expense.id}
            className="bg-white/5 backdrop-blur-xl rounded-2xl p-4 border border-white/10"
          >

            <div className="flex items-start justify-between gap-4">

              <div>

                <div className="font-bold text-lg">
                  {expense.item}
                </div>

                <div className="text-sm text-gray-400 mt-1">
                  {categories[expense.category]?.label}
                </div>

                <div className="text-xs text-gray-500 mt-1">
                  {formatThaiDate(expense.date)}
                </div>

              </div>

              <div className="text-right">

                <div className="text-xl font-black text-orange-400">
                  ฿{expense.price.toLocaleString()}
                </div>

                <div className="flex gap-2 mt-3 justify-end">

                  <button
                    onClick={() =>
                      startEdit(expense)
                    }
                    className="px-3 py-1 rounded-lg bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 text-sm"
                  >
                    แก้ไข
                  </button>

                  <button
                    onClick={() =>
                      deleteExpense(expense.id)
                    }
                    className="px-3 py-1 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-300 text-sm"
                  >
                    ลบ
                  </button>

                </div>

              </div>

            </div>

          </div>

        ))}

      </div>

    </div>

  );

};

export default ListView;