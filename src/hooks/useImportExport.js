const useImportExport = ({

  expenses,
  setExpenses,

  fuelRecords,
  setFuelRecords,

  saveExpenses,
  saveFuelRecords,

  setNotification,

  setShowImportModal,
  setImportText

}) => {

  // 📤 Export
  const exportedData = JSON.stringify(
  {
    version: "2.0",
    exportDate: new Date().toISOString(),
    expenses,
    fuelRecords
  },
  null,
  2
);

  const exportData = () => {

    navigator.clipboard.writeText(exportedData);

    setNotification({
      show: true,
      type: "success",
      title: "Export สำเร็จ",
      message: "คัดลอก JSON แล้ว"
    });

  };

  // 📥 Import
  const handleImportFromText = async (importText) => {

    try {

      const parsed =
        JSON.parse(importText);

      if (
        !parsed.expenses ||
        !parsed.fuelRecords
      ) {

        throw new Error(
          "Invalid backup format"
        );

      }

      setExpenses(parsed.expenses);
      setFuelRecords(parsed.fuelRecords);

      await saveExpenses(parsed.expenses);

      await saveFuelRecords(
        parsed.fuelRecords
      );

      setNotification({
        show: true,
        type: "success",
        title: "Import สำเร็จ",
        message: "นำเข้าข้อมูลเรียบร้อย"
      });

      setShowImportModal(false);

      setImportText('');

    } catch (error) {

      setNotification({
        show: true,
        type: "error",
        title: "Import ไม่สำเร็จ",
        message: "JSON ไม่ถูกต้อง"
      });

    }

  };

  return {

    exportedData,

    exportData,

    handleImportFromText

  };

};

export default useImportExport;