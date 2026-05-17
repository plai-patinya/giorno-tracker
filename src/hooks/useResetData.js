const useResetData = ({

  initialExpenses,

  setExpenses,
  setFuelRecords,

  saveExpenses,
  saveFuelRecords,

  setNotification

}) => {

  const resetData = async () => {

    const confirmed =
      window.confirm(
        '⚠️ ต้องการรีเซ็ตข้อมูลทั้งหมดใช่หรือไม่?'
      );

    if (!confirmed) {
      return;
    }

    try {

      setExpenses(initialExpenses);

      setFuelRecords([]);

      await saveExpenses(
        initialExpenses
      );

      await saveFuelRecords([]);

      localStorage.removeItem(
        'giorno-auto-backup'
      );

      setNotification({
        show: true,
        message:
          '✓ รีเซ็ตข้อมูลสำเร็จ',
        type: 'success'
      });

    } catch (error) {

      setNotification({
        show: true,
        message:
          '⚠️ รีเซ็ตไม่สำเร็จ',
        type: 'error'
      });

    }

  };

  return {

    resetData

  };

};

export default useResetData;