import { useEffect } from "react";

const useLocalBackup = ({

  STORAGE_KEY,
  FUEL_STORAGE_KEY,

  initialExpenses,

  expenses,
  fuelRecords,

  setNotification

}) => {

  // 📥 Load Expenses
  const loadExpenses = () => {

    try {

      const data =
        localStorage.getItem(STORAGE_KEY);

      if (data) {

        const parsed =
          JSON.parse(data);

        return Array.isArray(parsed)
          ? parsed
          : initialExpenses;

      }

    } catch (error) {

      console.log(
        'Load error',
        error
      );

    }

    return initialExpenses;

  };

  // 📥 Load Fuel
  const loadFuelRecords = () => {

    try {

      const data =
        localStorage.getItem(
          FUEL_STORAGE_KEY
        );

      if (data) {

        const parsed =
          JSON.parse(data);

        return Array.isArray(parsed)
          ? parsed
          : [];

      }

    } catch (error) {

      console.log('No fuel data');

    }

    return [];

  };

  // 💾 Save Expenses
  const saveExpenses = (data) => {

    try {

      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(data)
      );

      setNotification({
        show: true,
        message: '✓ บันทึกสำเร็จ',
        type: 'success'
      });

      return true;

    } catch (error) {

      setNotification({
        show: true,
        message: '⚠ บันทึกไม่ได้',
        type: 'warning'
      });

      return false;

    }

  };

  // 💾 Save Fuel
  const saveFuelRecords = (data) => {

    try {

      localStorage.setItem(
        FUEL_STORAGE_KEY,
        JSON.stringify(data)
      );

      setNotification({
        show: true,
        message: '✓ บันทึกน้ำมันสำเร็จ',
        type: 'success'
      });

      return true;

    } catch (error) {

      return false;

    }

  };

  // 🔄 Auto Backup
  useEffect(() => {

    const timer = setTimeout(() => {

      try {

        const backup = {

          expenses,
          fuelRecords,

          backupDate:
            new Date().toISOString()

        };

        localStorage.setItem(
          'giorno-auto-backup',
          JSON.stringify(backup)
        );

      } catch (e) {

        console.error(
          'Auto backup error:',
          e
        );

      }

    }, 1000);

    return () => clearTimeout(timer);

  }, [expenses, fuelRecords]);

  // 📦 Manual Backup
  const backupData = () => {

    try {

      const data = {

        version: '1.1',

        expenses,
        fuelRecords,

        backupDate:
          new Date().toISOString()

      };

      const blob = new Blob(
        [
          JSON.stringify(
            data,
            null,
            2
          )
        ],
        {
          type: 'application/json'
        }
      );

      const url =
        URL.createObjectURL(blob);

      const a =
        document.createElement('a');

      a.href = url;

      a.download =
        `giorno-backup-${
          new Date()
            .toISOString()
            .split('T')[0]
        }.json`;

      a.click();

      URL.revokeObjectURL(url);

      setNotification({
        show: true,
        message: '✓ Backup สำเร็จ',
        type: 'success'
      });

    } catch (e) {

      console.error(
        'Backup error:',
        e
      );

    }

  };

  return {

    loadExpenses,
    loadFuelRecords,

    saveExpenses,
    saveFuelRecords,

    backupData

  };

};

export default useLocalBackup;