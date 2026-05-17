const useFuelCRUD = ({

  fuelRecords,
  setFuelRecords,

  saveFuelRecords,

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

  editingFuelId,
  setEditingFuelId,

  setShowFuelModal

}) => {

  // ➕ Add / Update Fuel
  const addFuelRecord = async () => {

    if (
      fuelOdometer &&
      fuelLiters &&
      parseFloat(fuelLiters) > 0
    ) {

      let updatedRecords;

      if (editingFuelId) {

        updatedRecords = fuelRecords.map(rec =>
          rec.id === editingFuelId
            ? {
                ...rec,
                date: fuelDate,
                odometer: parseFloat(fuelOdometer),
                liters: parseFloat(fuelLiters),
                pricePerLiter: parseFloat(fuelPricePerLiter) || 0,
                fuelType,
                totalPrice: parseFloat(fuelTotalPrice) || 0
              }
            : rec
        );

        setEditingFuelId(null);

      } else {

        const newRecord = {
          id: crypto.randomUUID(),
          date: fuelDate,
          odometer: parseFloat(fuelOdometer),
          liters: parseFloat(fuelLiters),
          pricePerLiter: parseFloat(fuelPricePerLiter) || 0,
          fuelType,
          totalPrice: parseFloat(fuelTotalPrice) || 0
        };

        updatedRecords = [
          ...fuelRecords,
          newRecord
        ];

      }

      // 📊 calculate efficiency
      const sorted = [...updatedRecords]
        .sort((a, b) => a.odometer - b.odometer);

      for (let i = 1; i < sorted.length; i++) {

        const distance =
          sorted[i].odometer -
          sorted[i - 1].odometer;

        sorted[i].distance = distance;

        sorted[i].efficiency =
          distance / sorted[i].liters;

      }

      setFuelRecords(sorted);

      await saveFuelRecords(sorted);

      resetFuelForm();

      setShowFuelModal(false);

    }

  };

  // ❌ Delete
  const deleteFuelRecord = async (id) => {

    const updated =
      fuelRecords.filter(rec => rec.id !== id);

    setFuelRecords(updated);

    await saveFuelRecords(updated);

  };

  // ✏️ Start Edit
  const startEditFuel = (record) => {

    setFuelDate(record.date);

    setFuelOdometer(
      record.odometer.toString()
    );

    setFuelLiters(
      record.liters.toString()
    );

    setFuelPricePerLiter(
      record.pricePerLiter.toString()
    );

    setFuelType(record.fuelType);

    setEditingFuelId(record.id);

    setShowFuelModal(true);

  };

  // 🔄 Reset Form
  const resetFuelForm = () => {

    setFuelDate(
      new Date()
        .toISOString()
        .split('T')[0]
    );

    setFuelOdometer('');

    setFuelLiters('');

    setFuelPricePerLiter('');

    setFuelType('91');

    setEditingFuelId(null);

  };

  return {

    addFuelRecord,

    deleteFuelRecord,

    startEditFuel,

    resetFuelForm

  };

};

export default useFuelCRUD;