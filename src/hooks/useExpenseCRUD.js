const useExpenseCRUD = ({

  expenses,
  setExpenses,

  saveExpenses,

  newItem,
  setNewItem,

  newPrice,
  setNewPrice,

  newCategory,
  setNewCategory,

  newDate,
  setNewDate,

  editingId,
  setEditingId,

  setShowAddModal,

  newNote,
  setNewNote

}) => {

  // ➕ Add / Update
  const addExpense = async () => {

    if (
      newItem.trim() &&
      newPrice &&
      parseFloat(newPrice) > 0
    ) {

      let updatedExpenses;

      if (editingId) {

        updatedExpenses = expenses.map(exp =>
          exp.id === editingId
            ? {
                ...exp,

                item: newItem,

                price: parseFloat(newPrice),

                category: newCategory,

                date: newDate,

                note: newNote

              }
            : exp
        );

        setEditingId(null);

      } else {

        const newExpense = {

          id: crypto.randomUUID(),

          item: newItem,

          price: parseFloat(newPrice),

          category: newCategory,

          date: newDate,

          note: newNote

        };

        updatedExpenses = [
          ...expenses,
          newExpense
        ];

      }

      setExpenses(updatedExpenses);

      await saveExpenses(updatedExpenses);

      // reset form
      setNewItem('');
      setNewPrice('');
      setNewCategory('');

      setNewDate(
        new Date()
          .toISOString()
          .split('T')[0]
      );

      setNewNote('');

      setShowAddModal(false);

    }

  };

  // ❌ Delete
  const deleteExpense = async (id) => {

    const updatedExpenses =
      expenses.filter(exp => exp.id !== id);

    setExpenses(updatedExpenses);

    await saveExpenses(updatedExpenses);

  };

  // ✏️ Start Edit
  const startEdit = (expense) => {

    setNewItem(expense.item);

    setNewPrice(
      expense.price.toString()
    );

    setNewCategory(expense.category);

    setNewDate(expense.date);

    setNewNote(
      expense.note || ''
    );

    setEditingId(expense.id);

    setShowAddModal(true);

  };

  // ❌ Cancel Edit
  const cancelEdit = () => {

    setEditingId(null);

    setNewItem('');
    setNewPrice('');

    setNewCategory('');

    setNewDate(
      new Date()
        .toISOString()
        .split('T')[0]
    );

    setNewNote('');

    setShowAddModal(false);

  };

  return {

    addExpense,

    deleteExpense,

    startEdit,

    cancelEdit

  };

};

export default useExpenseCRUD;