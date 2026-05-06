import { useState, useMemo, useEffect } from 'react';
import { PlusCircle, Trash2, Edit2, PieChart, TrendingUp, Calendar, DollarSign, Package, Award, Activity, Save, X, Check, Download, Upload, RefreshCw, Gauge, Fuel} from 'lucide-react';

const ExpenseTracker = () => {
  const BIKE_BASE_PRICE = 71500;
  const STORAGE_KEY = 'giorno-expenses';
  const FUEL_STORAGE_KEY = 'giorno-fuel-records';
  
  const initialExpenses = [
    { id: 1, item: 'มอเตอร์ไซค์ Honda Giorno', price: 71500, category: 'base', date: '2025-02-21' },
    { id: 2, item: 'โหลดโช๊คหน้า 2"', price: 1000, category: 'suspension', date: '2025-02-21' },
    { id: 3, item: 'เปลี่ยนเบาะปาด', price: 1000, category: 'body', date: '2025-02-26' },
    { id: 4, item: 'แผ่นรองเหยียบ', price: 315, category: 'body', date: '2025-02-26' },
    { id: 5, item: 'ครอบไฟท้ายใส + ไฟผ่าหมาก', price: 579, category: 'electrical', date: '2025-03-01' },
    { id: 6, item: 'ไฟหน้า 3 สเต็ป', price: 189, category: 'electrical', date: '2025-03-03' },
    { id: 7, item: 'ฟิล์มกันรอยเรือนไมล์', price: 30, category: 'body', date: '2025-03-04' },
    { id: 8, item: 'ปลั๊กไฟหรี่เลี้ยว', price: 219, category: 'electrical', date: '2025-03-05' },
    { id: 9, item: 'หลอดไฟหรี่เลี้ยว', price: 159, category: 'electrical', date: '2025-03-05' },
    { id: 10, item: 'ค่าช่างติดตั้งไฟ', price: 200, category: 'other', date: '2025-03-11' },
    { id: 11, item: 'สติ๊กเกอร์ Giorno', price: 87, category: 'body', date: '2025-03-28' },
    { id: 12, item: 'ยาง Pirelli Angel Scooter 2 เส้น', price: 2552, category: 'suspension', date: '2025-03-29' },
    { id: 13, item: 'หมวกกันน็อค 2 ใบ', price: 2278, category: 'other', date: '2025-04-01' },
    { id: 14, item: 'ล้อทำสีม่วง', price: 2300, category: 'body', date: '2025-04-03' },
    { id: 15, item: 'ปลายแฮนด์ Kamui', price: 525, category: 'body', date: '2025-04-06' },
    { id: 16, item: 'กระจกปลายแฮนด์', price: 304, category: 'body', date: '2025-04-06' },
    { id: 17, item: 'อุดกระจก Rottae', price: 334, category: 'body', date: '2025-04-06' },
    { id: 18, item: 'ปลอกแฮนด์ RCB', price: 294, category: 'body', date: '2025-04-06' },
    { id: 19, item: 'ค่าช่างติดตั้งปลอกแฮนด์', price: 150, category: 'other', date: '2025-04-09' },
    { id: 20, item: 'ครอบสวิทช์กุญแจ', price: 99, category: 'body', date: '2025-04-22' },
    { id: 21, item: 'น็อตบู๊ชพักเท้า', price: 130, category: 'body', date: '2025-05-20' },
    { id: 22, item: 'ชามแต่ง ช่างพัฒน์นครสวรรค์', price: 2100, category: 'engine', date: '2025-06-02' },
    { id: 23, item: 'ท่อกู่มหาชัยผ่าหมก', price: 3500, category: 'engine', date: '2025-06-02' },
    { id: 24, item: 'เปลี่ยนเบาะ', price: 800, category: 'body', date: '2025-07-25' },
    { id: 25, item: 'ปะยาง', price: 300, category: 'suspension', date: '2025-07-28' },
    { id: 26, item: 'ใส่จุกลดเสียงท่อ', price: 500, category: 'engine', date: '2025-08-01' },
    { id: 27, item: 'สลับกันตกดำ PDC', price: 800, category: 'body', date: '2025-08-01' },
    { id: 28, item: 'กรองเลส', price: 400, category: 'engine', date: '2025-09-26' },
    { id: 29, item: 'ชุดสี บังโคลนหน้า, ฝาครอบไฟหน้า', price: 1244, category: 'body', date: '2025-09-27' },
    { id: 30, item: 'สปริงทอร์ค', price: 600, category: 'engine', date: '2025-10-09' },
    { id: 31, item: 'ค่าประกอบชุดหน้า', price: 200, category: 'other', date: '2025-10-09' }
  ];

  const loadExpenses = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) {
      const parsed = JSON.parse(data);
      return Array.isArray(parsed) ? parsed : initialExpenses;
    }
  } catch (error) {
    console.log('Load error', error);
  }
  return initialExpenses;
};

  const loadFuelRecords = () => {
  try {
    const data = localStorage.getItem(FUEL_STORAGE_KEY);
    if (data) {
      const parsed = JSON.parse(data);
      return Array.isArray(parsed) ? parsed : [];
    }
  } catch (error) {
    console.log('No fuel data');
  }
  return [];
};

  const saveExpenses = (data) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    setNotification({ show: true, message: '✓ บันทึกสำเร็จ', type: 'success' });
    return true;
  } catch (error) {
    setNotification({ show: true, message: '⚠ บันทึกไม่ได้', type: 'warning' });
    return false;
  }
};

  const saveFuelRecords = (data) => {
  try {
    localStorage.setItem(FUEL_STORAGE_KEY, JSON.stringify(data));
    setNotification({ show: true, message: '✓ บันทึกน้ำมันสำเร็จ', type: 'success' });
    return true;
  } catch (error) {
    return false;
  }
};
  
  const [expenses, setExpenses] = useState(initialExpenses);
  const [fuelRecords, setFuelRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newItem, setNewItem] = useState('');
  const [newPrice, setNewPrice] = useState('');
  const [newCategory, setNewCategory] = useState('engine');
  const [newDate, setNewDate] = useState(new Date().toISOString().split('T')[0]);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [view, setView] = useState('dashboard');
  const [notification, setNotification] = useState({ show: false, message: '', type: '' });
  const [showExportMenu, setShowExportMenu] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showFuelModal, setShowFuelModal] = useState(false);
  
  // Fuel form states
  const [fuelDate, setFuelDate] = useState(new Date().toISOString().split('T')[0]);
  const [fuelOdometer, setFuelOdometer] = useState('');
  const [fuelLiters, setFuelLiters] = useState('');
  const [fuelPricePerLiter, setFuelPricePerLiter] = useState('');
  const [fuelType, setFuelType] = useState('91');
  //const [fuelTotalPrice, setFuelTotalPrice] = useState('');
  const [editingFuelId, setEditingFuelId] = useState(null);

  useEffect(() => {
  const init = async () => {
    let expenseData = await loadExpenses();
    let fuelData = await loadFuelRecords();

    // 🔥 fallback ถ้า localStorage หลักพัง
    if (!expenseData || expenseData.length === 0) {
      const backup = localStorage.getItem('giorno-auto-backup');
      if (backup) {
        try {
          const parsed = JSON.parse(backup);
            expenseData = parsed.expenses || initialExpenses;
            fuelData = parsed.fuelRecords || [];
        } catch (e) {
          console.error('Backup parse error:', e);
        }
      }
    }

    setExpenses(expenseData);
    setFuelRecords(fuelData);
    setLoading(false);
  };
  init();
}, []);

  useEffect(() => {
    if (notification.show) {
      const timer = setTimeout(() => {
        setNotification({ ...notification, show: false });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [notification.show]);

  // AUTO BACKUP (background - ไม่รบกวน user)
useEffect(() => {
  const timer = setTimeout(() => {
    try {
      const backup = {
        expenses,
        fuelRecords,
        backupDate: new Date().toISOString()
      };
      localStorage.setItem('giorno-auto-backup', JSON.stringify(backup));
    } catch (e) {
      console.error('Auto backup error:', e);
    }
  }, 1000);

  return () => clearTimeout(timer);
}, [expenses, fuelRecords]);

  // Auto-calculate fuel total price
  const fuelTotalPrice = useMemo(() => {
  if (!fuelLiters || !fuelPricePerLiter) return '';
  return (parseFloat(fuelLiters) * parseFloat(fuelPricePerLiter)).toFixed(2);
}, [fuelLiters, fuelPricePerLiter]);

  const categories = {
    base: { name: 'ตัวรถ', icon: '🏍️', color: 'from-purple-500 to-purple-600', bg: 'bg-purple-500/20', border: 'border-purple-500' },
    engine: { name: 'เครื่องยนต์', icon: '⚙️', color: 'from-red-500 to-orange-600', bg: 'bg-red-500/20', border: 'border-red-500' },
    suspension: { name: 'ช่วงล่าง/ยาง', icon: '🔧', color: 'from-blue-500 to-cyan-600', bg: 'bg-blue-500/20', border: 'border-blue-500' },
    electrical: { name: 'ไฟฟ้า', icon: '⚡', color: 'from-yellow-500 to-amber-600', bg: 'bg-yellow-500/20', border: 'border-yellow-500' },
    body: { name: 'ตัวถัง/อุปกรณ์', icon: '🎨', color: 'from-green-500 to-emerald-600', bg: 'bg-green-500/20', border: 'border-green-500' },
    other: { name: 'อื่นๆ', icon: '📦', color: 'from-gray-500 to-slate-600', bg: 'bg-gray-500/20', border: 'border-gray-500' }
  };

  const fuelTypes = {
    '91': { name: 'แก๊สโซฮอล์ 91', color: 'text-green-400' },
    '95': { name: 'แก๊สโซฮอล์ 95', color: 'text-orange-400' },
    'E20': { name: 'E20', color: 'text-blue-400' },
    'E85': { name: 'E85', color: 'text-purple-400' },
    'diesel': { name: 'ดีเซล', color: 'text-yellow-400' }
  };

  const addExpense = async () => {
    if (newItem.trim() && newPrice && parseFloat(newPrice) > 0) {
      let updatedExpenses;
      if (editingId) {
        updatedExpenses = expenses.map(exp => 
          exp.id === editingId 
            ? { ...exp, item: newItem, price: parseFloat(newPrice), category: newCategory, date: newDate }
            : exp
        );
        setEditingId(null);
      } else {
        const newExpense = {
          id: crypto.randomUUID(),
          item: newItem,
          price: parseFloat(newPrice),
          category: newCategory,
          date: newDate
        };
        updatedExpenses = [...expenses, newExpense];
      }
      setExpenses(updatedExpenses);
      await saveExpenses(updatedExpenses);
      setNewItem('');
      setNewPrice('');
      setNewCategory('engine');
      setNewDate(new Date().toISOString().split('T')[0]);
      setShowAddModal(false);
    }
  };

  const addFuelRecord = async () => {
    if (fuelOdometer && fuelLiters && parseFloat(fuelLiters) > 0) {
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
                fuelType: fuelType,
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
          fuelType: fuelType,
          totalPrice: parseFloat(fuelTotalPrice) || 0
        };
        updatedRecords = [...fuelRecords, newRecord];
      }
      
      // Calculate fuel efficiency for each record
      const sorted = [...updatedRecords].sort((a, b) => a.odometer - b.odometer);
      for (let i = 1; i < sorted.length; i++) {
        const distance = sorted[i].odometer - sorted[i - 1].odometer;
        sorted[i].distance = distance;
        sorted[i].efficiency = distance / sorted[i].liters;
      }
      
      setFuelRecords(sorted);
      await saveFuelRecords(sorted);
      resetFuelForm();
      setShowFuelModal(false);
    }
  };

  const resetFuelForm = () => {
    setFuelDate(new Date().toISOString().split('T')[0]);
    setFuelOdometer('');
    setFuelLiters('');
    setFuelPricePerLiter('');
    setFuelType('91');
    //setFuelTotalPrice('');
    setEditingFuelId(null);
  };

  const startEditFuel = (record) => {
    setFuelDate(record.date);
    setFuelOdometer(record.odometer.toString());
    setFuelLiters(record.liters.toString());
    setFuelPricePerLiter(record.pricePerLiter.toString());
    setFuelType(record.fuelType);
    //setFuelTotalPrice(record.totalPrice.toString());
    setEditingFuelId(record.id);
    setShowFuelModal(true);
  };

  const deleteFuelRecord = async (id) => {
    const updated = fuelRecords.filter(rec => rec.id !== id);
    setFuelRecords(updated);
    await saveFuelRecords(updated);
  };

  const deleteExpense = async (id) => {
    if (id === 1) return;
    const updatedExpenses = expenses.filter(exp => exp.id !== id);
    setExpenses(updatedExpenses);
    await saveExpenses(updatedExpenses);
  };

  const startEdit = (expense) => {
    if (expense.id === 1) return;
    setNewItem(expense.item);
    setNewPrice(expense.price.toString());
    setNewCategory(expense.category);
    setNewDate(expense.date);
    setEditingId(expense.id);
    setShowAddModal(true);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setNewItem('');
    setNewPrice('');
    setNewCategory('engine');
    setNewDate(new Date().toISOString().split('T')[0]);
    setShowAddModal(false);
  };

  const [showExportModal, setShowExportModal] = useState(false);
  const [exportedData, setExportedData] = useState('');

  const exportAllData = () => {
    const allData = {
      version: '1.0',
      exportDate: new Date().toISOString(),
      expenses: expenses,
      fuelRecords: fuelRecords
    };
    const dataStr = JSON.stringify(allData, null, 2);
    setExportedData(dataStr);
    setShowExportModal(true);
    setShowExportMenu(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(exportedData).then(() => {
      setNotification({ show: true, message: '✓ คัดลอกข้อมูลสำเร็จ! บันทึกลง Notes หรือ iCloud', type: 'success' });
    }).catch(() => {
      setNotification({ show: true, message: '⚠ กรุณาคัดลอกด้วยตนเอง', type: 'warning' });
    });
  };

  const downloadAsFile = () => {
    try {
      const blob = new Blob([exportedData], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `giorno-backup-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      setNotification({ show: true, message: '✓ ดาวน์โหลดสำเร็จ', type: 'success' });
    } catch (error) {
      setNotification({ show: true, message: '⚠ ใช้วิธีคัดลอกแทน', type: 'warning' });
    }
  };

  const [showImportModal, setShowImportModal] = useState(false);
  const [importText, setImportText] = useState('');

  const backupData = () => {
    try {
      const data = {
        version: '1.1',
        expenses,
        fuelRecords,
        backupDate: new Date().toISOString()
      };

      const blob = new Blob([JSON.stringify(data, null, 2)], {
        type: 'application/json'
      });

      const url = URL.createObjectURL(blob);

      const a = document.createElement('a');
        a.href = url;
        a.download = `giorno-backup-${new Date().toISOString().split('T')[0]}.json`;
        a.click();

      URL.revokeObjectURL(url);

      setNotification({
        show: true,
        message: '✓ Backup สำเร็จ',
        type: 'success'
      });

    } catch (e) {
      console.error('Backup error:', e);
    }
  };

  const handleImportFromText = async () => {
    try {
      const imported = JSON.parse(importText);
      
      if (Array.isArray(imported)) {
        setExpenses(imported);
        await saveExpenses(imported);
        setNotification({ show: true, message: '✓ นำเข้าข้อมูลค่าใช้จ่ายสำเร็จ', type: 'success' });
      } else if (imported.expenses || imported.fuelRecords) {
        if (imported.expenses && Array.isArray(imported.expenses)) {
          setExpenses(imported.expenses);
          await saveExpenses(imported.expenses);
        }
        if (imported.fuelRecords && Array.isArray(imported.fuelRecords)) {
          setFuelRecords(imported.fuelRecords);
          await saveFuelRecords(imported.fuelRecords);
        }
        setNotification({ show: true, message: '✓ นำเข้าข้อมูลทั้งหมดสำเร็จ', type: 'success' });
      } else {
        throw new Error('Invalid format');
      }
      
      setShowImportModal(false);
      setImportText('');
    } catch (error) {
      setNotification({ show: true, message: '✗ ไฟล์ไม่ถูกต้อง กรุณาตรวจสอบรูปแบบ JSON', type: 'error' });
    }
  };

  const resetData = async () => {
    if (confirm('⚠️ ต้องการรีเซ็ตข้อมูลกลับไปเป็นค่าเริ่มต้นหรือไม่?')) {
      setExpenses(initialExpenses);
      await saveExpenses(initialExpenses);
      setNotification({ show: true, message: '✓ รีเซ็ตข้อมูลสำเร็จ', type: 'success' });
      setShowExportMenu(false);
    }
  };

  const filteredExpenses = useMemo(() => {
    return expenses.filter(exp =>
      exp.item.toLowerCase().includes(searchTerm.toLowerCase())
    ).sort((a, b) => new Date(b.date) - new Date(a.date));
  }, [expenses, searchTerm]);

  const totalExpense = expenses.reduce((sum, exp) => sum + exp.price, 0);
  const partsExpense = totalExpense - BIKE_BASE_PRICE;

  const fuelStats = useMemo(() => {
    if (fuelRecords.length === 0) return null;
    
    const sorted = [...fuelRecords].sort((a, b) => a.odometer - b.odometer);
    const latest = sorted[sorted.length - 1];
    const totalDistance = latest.odometer - (sorted[0]?.odometer || 0);
    const totalLiters = fuelRecords.reduce((sum, rec) => sum + rec.liters, 0);
    const totalSpent = fuelRecords.reduce((sum, rec) => sum + rec.totalPrice, 0);
    const avgEfficiency = totalDistance / totalLiters;
    
    const efficiencies = fuelRecords.filter(r => r.efficiency).map(r => r.efficiency);
    const bestEfficiency = efficiencies.length > 0 ? Math.max(...efficiencies) : 0;
    const worstEfficiency = efficiencies.length > 0 ? Math.min(...efficiencies) : 0;
    
    // Calculate monthly stats
    const monthlyStats = {};
    fuelRecords.forEach((record, index) => {
      const monthKey = record.date.substring(0, 7); // YYYY-MM
      if (!monthlyStats[monthKey]) {
        monthlyStats[monthKey] = {
          month: monthKey,
          totalSpent: 0,
          totalLiters: 0,
          totalDistance: 0,
          count: 0,
          records: []
        };
      }
      monthlyStats[monthKey].totalSpent += record.totalPrice;
      monthlyStats[monthKey].totalLiters += record.liters;
      monthlyStats[monthKey].count++;
      monthlyStats[monthKey].records.push(record);
      
      // Calculate distance for this record
      if (record.distance) {
        monthlyStats[monthKey].totalDistance += record.distance;
      }
    });

    // Convert to array and sort by month (newest first)
    const monthlyArray = Object.values(monthlyStats).sort((a, b) => b.month.localeCompare(a.month));
    
    return {
      currentOdometer: latest.odometer,
      totalDistance,
      totalLiters,
      totalSpent,
      avgEfficiency,
      bestEfficiency,
      worstEfficiency,
      recordCount: fuelRecords.length,
      monthlyStats: monthlyArray
    };
  }, [fuelRecords]);

  const categoryTotals = useMemo(() => {
    const totals = {};
    expenses.forEach(exp => {
      if (exp.category !== 'base') {
        totals[exp.category] = (totals[exp.category] || 0) + exp.price;
      }
    });
    return Object.entries(totals).sort((a, b) => b[1] - a[1]);
  }, [expenses]);

  const monthlyData = useMemo(() => {
    const monthly = {};
    expenses.forEach(exp => {
      if (exp.category !== 'base') {
        const monthYear = exp.date.substring(0, 7);
        if (!monthly[monthYear]) {
          monthly[monthYear] = { total: 0, items: [], count: 0 };
        }
        monthly[monthYear].total += exp.price;
        monthly[monthYear].items.push(exp);
        monthly[monthYear].count++;
      }
    });
    return Object.entries(monthly).sort((a, b) => b[0].localeCompare(a[0]));
  }, [expenses]);

  const stats = useMemo(() => {
    const parts = expenses.filter(e => e.category !== 'base');
    const sorted = [...parts].sort((a, b) => b.price - a.price);
    const avgPerMonth = monthlyData.length > 0 ? partsExpense / monthlyData.length : 0;
    const daysSinceReceived = Math.floor((new Date() - new Date('2025-02-21')) / (1000 * 60 * 60 * 24));
    
    return {
      mostExpensive: sorted[0],
      totalItems: parts.length,
      avgPerMonth: avgPerMonth,
      avgPerDay: daysSinceReceived > 0 ? partsExpense / daysSinceReceived : 0,
      daysSinceReceived
    };
  }, [expenses, monthlyData, partsExpense]);

  const formatThaiDate = (dateStr) => {
    const [year, month, day] = dateStr.split('-');
    const months = ['ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'];
    return `${day} ${months[parseInt(month) - 1]} ${parseInt(year) + 543}`;
  };

  const formatMonthYear = (monthStr) => {
    const [year, month] = monthStr.split('-');
    const months = ['มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน', 'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'];
    return `${months[parseInt(month) - 1]} ${parseInt(year) + 543}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-white text-2xl animate-pulse">🏍️ กำลังโหลด...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white p-4 sm:p-6 pb-24 px-4">
      {/* Notification */}
      {notification.show && (
        <div className={`fixed top-4 right-4 z-50 px-6 py-4 rounded-xl shadow-2xl backdrop-blur-xl animate-slide-in ${
          notification.type === 'success' ? 'bg-green-500/90' : 
          notification.type === 'warning' ? 'bg-yellow-500/90' : 'bg-red-500/90'
        }`}>
          <div className="flex items-center gap-2">
            <span className="font-semibold">{notification.message}</span>
          </div>
        </div>
      )}

      {/* Expense Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn" onClick={(e) => e.target === e.currentTarget && cancelEdit()}>
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
              <button onClick={cancelEdit} className="p-2 hover:bg-white/10 rounded-lg transition-all">
                <X size={24} />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">ชื่อรายการ</label>
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
                  <label className="block text-sm font-medium mb-2 text-gray-300">ราคา (บาท)</label>
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
                  <label className="block text-sm font-medium mb-2 text-gray-300">หมวดหมู่</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
                  >
                    {Object.entries(categories).filter(([key]) => key !== 'base').map(([key, cat]) => (
                      <option key={key} value={key} className="bg-slate-800">{cat.icon} {cat.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-300">วันที่</label>
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
      )}

      {/* Import Modal */}
      {showImportModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn" onClick={(e) => e.target === e.currentTarget && (setShowImportModal(false), setImportText(''))}>
          <div className="bg-slate-800/95 backdrop-blur-xl rounded-2xl p-6 w-full max-w-2xl border border-white/20 shadow-2xl animate-scaleIn max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <Upload className="text-blue-400" size={24} />
                <h3 className="text-2xl font-bold">นำเข้าข้อมูล</h3>
              </div>
              <button onClick={() => {setShowImportModal(false); setImportText('');}} className="p-2 hover:bg-white/10 rounded-lg transition-all">
                <X size={24} />
              </button>
            </div>

            <div className="space-y-4">
              <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4">
                <div className="text-sm font-semibold text-blue-300 mb-2">วิธีใช้งาน:</div>
                <ol className="text-sm text-gray-300 space-y-2 ml-4 list-decimal">
                  <li>เปิดไฟล์สำรองจาก Notes/Files</li>
                  <li>คัดลอกข้อความ JSON ทั้งหมด</li>
                  <li>วางในช่องด้านล่าง</li>
                  <li>กดปุ่ม "นำเข้าข้อมูล"</li>
                </ol>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">วางข้อมูล JSON ที่นี่:</label>
                <textarea
                  value={importText}
                  onChange={(e) => setImportText(e.target.value)}
                  placeholder='{"version":"1.0","exportDate":"...","expenses":[...],"fuelRecords":[...]}'
                  className="w-full h-64 bg-black/30 border border-white/10 rounded-xl px-4 py-3 font-mono text-xs text-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                />
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleImportFromText}
                  disabled={!importText.trim()}
                  className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed rounded-xl py-3 font-bold transition-all shadow-lg flex items-center justify-center gap-2"
                >
                  <Upload size={20} />
                  นำเข้าข้อมูล
                </button>
                <button
                  onClick={() => {setShowImportModal(false); setImportText('');}}
                  className="px-6 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl py-3 font-bold transition-all"
                >
                  ยกเลิก
                </button>
              </div>

              <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4">
                <div className="text-xs text-yellow-300 flex items-start gap-2">
                  <span>⚠️</span>
                  <span><strong>คำเตือน:</strong> การนำเข้าข้อมูลจะแทนที่ข้อมูลปัจจุบันทั้งหมด กรุณาส่งออกข้อมูลปัจจุบันก่อนถ้าต้องการเก็บไว้</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Export Modal */}
      {showExportModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn" onClick={(e) => e.target === e.currentTarget && setShowExportModal(false)}>
          <div className="bg-slate-800/95 backdrop-blur-xl rounded-2xl p-6 w-full max-w-2xl border border-white/20 shadow-2xl animate-scaleIn max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <Download className="text-green-400" size={24} />
                <h3 className="text-2xl font-bold">ส่งออกข้อมูล</h3>
              </div>
              <button onClick={() => setShowExportModal(false)} className="p-2 hover:bg-white/10 rounded-lg transition-all">
                <X size={24} />
              </button>
            </div>

            <div className="space-y-4">
              <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4">
                <div className="text-sm font-semibold text-blue-300 mb-2">📱 สำหรับ iPhone/iPad:</div>
                <ol className="text-sm text-gray-300 space-y-2 ml-4 list-decimal">
                  <li>กดปุ่ม "คัดลอกข้อมูล" ด้านล่าง</li>
                  <li>เปิดแอป <strong>Notes</strong> หรือ <strong>Files</strong></li>
                  <li>สร้างไฟล์ใหม่ ตั้งชื่อ: <code className="bg-black/30 px-2 py-1 rounded">backup-{new Date().toISOString().split('T')[0]}.txt</code></li>
                  <li>วางข้อมูล (Paste)</li>
                  <li>บันทึกไฟล์ลง iCloud</li>
                </ol>
              </div>

              <div className="bg-orange-500/10 border border-orange-500/30 rounded-xl p-4">
                <div className="text-sm font-semibold text-orange-300 mb-2">💻 สำหรับคอมพิวเตอร์:</div>
                <ol className="text-sm text-gray-300 space-y-2 ml-4 list-decimal">
                  <li>กดปุ่ม "ดาวน์โหลดไฟล์"</li>
                  <li>หรือคัดลอกข้อมูล → บันทึกเป็น .json</li>
                </ol>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium text-gray-300">ข้อมูล JSON:</label>
                  <span className="text-xs text-gray-500">{exportedData.length} ตัวอักษร</span>
                </div>
                <textarea
                  value={exportedData}
                  readOnly
                  className="w-full h-64 bg-black/30 border border-white/10 rounded-xl px-4 py-3 font-mono text-xs text-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
                  onClick={(e) => e.target.select()}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  onClick={copyToClipboard}
                  className="bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 rounded-xl py-3 font-bold transition-all shadow-lg flex items-center justify-center gap-2"
                >
                  <Check size={20} />
                  คัดลอกข้อมูล
                </button>
                <button
                  onClick={downloadAsFile}
                  className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 rounded-xl py-3 font-bold transition-all shadow-lg flex items-center justify-center gap-2"
                >
                  <Download size={20} />
                  ดาวน์โหลดไฟล์
                </button>
              </div>

              <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4">
                <div className="text-xs text-yellow-300 flex items-start gap-2">
                  <span>💡</span>
                  <span><strong>เคล็ดลับ:</strong> บันทึกไฟล์ลง iCloud Drive เพื่อเข้าถึงได้จากทุกอุปกรณ์</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Fuel Modal */}
      {showFuelModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn" onClick={(e) => e.target === e.currentTarget && (setShowFuelModal(false), resetFuelForm())}>
          <div className="bg-slate-800/95 backdrop-blur-xl rounded-2xl p-6 w-full max-w-2xl border border-white/20 shadow-2xl animate-scaleIn max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <Fuel className="text-green-400" size={24} />
                <h3 className="text-2xl font-bold">
                  {editingFuelId ? 'แก้ไขข้อมูลการเติมน้ำมัน' : 'บันทึกการเติมน้ำมัน'}
                </h3>
              </div>
              <button onClick={() => {setShowFuelModal(false); resetFuelForm();}} className="p-2 hover:bg-white/10 rounded-lg transition-all">
                <X size={24} />
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-300">วันที่เติม</label>
                  <input
                    type="date"
                    value={fuelDate}
                    onChange={(e) => setFuelDate(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-300">ระยะทาง (กม.)</label>
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
                  <label className="block text-sm font-medium mb-2 text-gray-300">จำนวนลิตร</label>
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
                  <label className="block text-sm font-medium mb-2 text-gray-300">ราคา/ลิตร (บาท)</label>
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
                  <label className="block text-sm font-medium mb-2 text-gray-300">ชนิดน้ำมัน</label>
                  <select
                    value={fuelType}
                    onChange={(e) => setFuelType(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
                  >
                    {Object.entries(fuelTypes).map(([key, type]) => (
                      <option key={key} value={key} className="bg-slate-800">{type.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-300">รวมเงิน (บาท)</label>
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
                  {editingFuelId ? 'บันทึกการแก้ไข' : 'บันทึกข้อมูล'}
                </button>
                <button
                  onClick={() => {setShowFuelModal(false); resetFuelForm();}}
                  className="px-6 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl py-3 font-bold transition-all"
                >
                  ยกเลิก
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-red-500/20 blur-3xl"></div>
          <div className="relative">
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1"></div>
              <div className="flex-1">
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-black mb-3 bg-gradient-to-r from-orange-400 via-red-400 to-pink-400 bg-clip-text text-transparent drop-shadow-2xl">
                  🏍️ HONDA GIORNO
                </h1>
              </div>
              <div className="flex-1 flex justify-end">
                <div className="relative">
                  <button
                    onClick={() => setShowExportMenu(!showExportMenu)}
                    className="p-3 bg-white/10 hover:bg-white/20 backdrop-blur-xl rounded-xl border border-white/20 transition-all"
                    title="จัดการข้อมูล"
                  >
                    <Package size={20} />
                  </button>
                  
                  {showExportMenu && (
                    <div className="absolute right-0 mt-2 w-72 bg-slate-800/95 backdrop-blur-xl rounded-xl border border-white/20 shadow-2xl overflow-hidden z-50 animate-scaleIn">
    
                      {/* HEADER */}
                      <div className="p-3 bg-gradient-to-r from-orange-500/20 to-red-500/20 border-b border-white/10">
                        <div className="text-sm font-bold text-orange-300">💾 จัดการข้อมูล</div>
                        <div className="text-xs text-gray-400 mt-1">สำรองข้อมูลก่อนอัพเดท!</div>
                      </div>

                      {/* ✅ Backup Button (ย้ายออกมา) */}
                      <button
                        onClick={backupData}
                        className="w-full px-4 py-3 flex items-center gap-3 hover:bg-white/10 transition-all text-left"
                      >
                        <Download size={18} className="text-purple-400" />
                          <div className="flex-1">
                            <div className="font-semibold">Backup ด่วน</div>
                            <div className="text-xs text-gray-400">ดาวน์โหลดไฟล์ JSON ทันที</div>
                          </div>
                      </button>

                      <button
                        onClick={exportAllData}
                        className="w-full px-4 py-3 flex items-center gap-3 hover:bg-white/10 transition-all text-left border-t border-white/10"
                      >
                        <Download size={18} className="text-green-400" />
                          <div className="flex-1">
                            <div className="font-semibold">ส่งออกข้อมูลทั้งหมด</div>
                            <div className="text-xs text-gray-400">รายจ่าย + น้ำมัน (แนะนำ!)</div>
                            </div>
                      </button>

                      <button
                        onClick={() => {
                          setShowImportModal(true);
                          setShowExportMenu(false);
                        }}
                        className="w-full px-4 py-3 flex items-center gap-3 hover:bg-white/10 transition-all text-left border-t border-white/10"
                      >
                        <Upload size={18} className="text-blue-400" />
                        <div className="flex-1">
                          <div className="font-semibold">นำเข้าข้อมูล</div>
                          <div className="text-xs text-gray-400">กู้คืนจากข้อความ JSON</div>
                        </div>
                      </button>

                      <button
                        onClick={resetData}
                        className="w-full px-4 py-3 flex items-center gap-3 hover:bg-white/10 transition-all text-left border-t border-white/10"
                      >
                        <RefreshCw size={18} className="text-orange-400" />
                        <div className="flex-1">
                          <div className="font-semibold">รีเซ็ตข้อมูล</div>
                          <div className="text-xs text-gray-400">กลับไปข้อมูลเริ่มต้น</div>
                        </div>
                      </button>

                      <div className="p-3 bg-yellow-500/10 border-t border-yellow-500/30">
                        <div className="text-xs text-yellow-300 flex items-start gap-2">
                          <span>⚠️</span>
                          <span>ก่อนอัพเดทเวอร์ชันใหม่ ควรส่งออกข้อมูลสำรองไว้ก่อนเสมอ!</span>
                        </div>
                      </div>

                    </div>
                    )}
                </div>
              </div>
            </div>
            
            <p className="text-gray-300 text-base sm:text-lg">Track Your Dream Build</p>
            <div className="flex items-center justify-center gap-2 sm:gap-4 mt-3 text-xs sm:text-sm text-gray-400 flex-wrap">
              <span>📅 รับรถ {formatThaiDate('2025-02-21')}</span>
              <span>•</span>
              <span>⏱️ {stats.daysSinceReceived} วัน</span>
              <span>•</span>
              <span className="text-yellow-400">💾 v1.0</span>
            </div>
            <div className="mt-2 text-xs text-cyan-400/80 bg-cyan-500/10 border border-cyan-500/30 rounded-lg px-3 py-2 max-w-md mx-auto">
              💡 <strong>สำคัญ!</strong> ก่อนอัพเดทเวอร์ชันใหม่ ให้กด 📦 → ส่งออกข้อมูลทั้งหมด เพื่อสำรองข้อมูล
            </div>
          </div>
        </div>

        {/* View Tabs */}
        <div className="grid grid-cols-4 gap-2 mb-6 bg-white/5 backdrop-blur-xl p-2 rounded-2xl border border-white/10">
          {[
            { id: 'dashboard', icon: Activity, label: 'Dashboard' },
            { id: 'fuel', icon: Gauge, label: 'ระยะทาง/น้ำมัน' },
            { id: 'timeline', icon: Calendar, label: 'Timeline' },
            { id: 'list', icon: Package, label: 'รายการ' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setView(tab.id)}
              className={`flex items-center justify-center gap-2 px-2 sm:px-4 py-3 rounded-xl font-semibold text-xs sm:text-base transition-all ${
                view === tab.id
                  ? 'bg-gradient-to-r from-orange-500 to-red-500 shadow-lg scale-105'
                  : 'hover:bg-white/5'
              }`}
            >
              <tab.icon size={16} className="sm:w-5 sm:h-5" />
              <span className="hidden lg:inline">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Fuel/Distance View */}
        {view === 'fuel' && (
          <div className="space-y-6">
            {/* Digital Speedometer Dashboard */}
            {fuelStats ? (
              <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-white/10 shadow-2xl">
                <div className="flex flex-col items-center">
                  {/* Speedometer Circle */}
                  <div className="relative w-64 h-64 sm:w-80 sm:h-80 mb-8">
                    {/* Outer ring */}
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 200 200">
                      <circle
                        cx="100"
                        cy="100"
                        r="85"
                        fill="none"
                        stroke="rgba(255,255,255,0.1)"
                        strokeWidth="8"
                      />
                      <circle
                        cx="100"
                        cy="100"
                        r="85"
                        fill="none"
                        stroke="url(#gradient)"
                        strokeWidth="8"
                        strokeDasharray={`${(fuelStats.avgEfficiency / 60) * 534} 534`}
                        strokeLinecap="round"
                        className="transition-all duration-1000"
                      />
                      <defs>
                        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#10b981" />
                          <stop offset="50%" stopColor="#f59e0b" />
                          <stop offset="100%" stopColor="#ef4444" />
                        </linearGradient>
                      </defs>
                    </svg>
                    
                    {/* Center display */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <div className="text-6xl sm:text-7xl font-black bg-gradient-to-br from-green-400 to-emerald-600 bg-clip-text text-transparent mb-2">
                        {fuelStats.avgEfficiency.toFixed(1)}
                      </div>
                      <div className="text-sm sm:text-base text-gray-400 font-semibold">กม./ลิตร</div>
                      <div className="text-xs text-gray-500 mt-1">เฉลี่ย</div>
                    </div>
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full">
                    <div className="bg-white/5 rounded-xl p-4 text-center border border-white/10">
                      <div className="text-2xl sm:text-3xl font-bold text-blue-400">{fuelStats.currentOdometer.toLocaleString()}</div>
                      <div className="text-xs text-gray-400 mt-1">กม. ปัจจุบัน</div>
                    </div>
                    
                    <div className="bg-white/5 rounded-xl p-4 text-center border border-white/10">
                      <div className="text-2xl sm:text-3xl font-bold text-purple-400">{fuelStats.totalDistance.toLocaleString()}</div>
                      <div className="text-xs text-gray-400 mt-1">กม. รวม</div>
                    </div>
                    
                    <div className="bg-white/5 rounded-xl p-4 text-center border border-white/10">
                      <div className="text-2xl sm:text-3xl font-bold text-green-400">{fuelStats.bestEfficiency.toFixed(1)}</div>
                      <div className="text-xs text-gray-400 mt-1">กม./ลิตร ดีที่สุด</div>
                    </div>
                    
                    <div className="bg-white/5 rounded-xl p-4 text-center border border-white/10">
                      <div className="text-2xl sm:text-3xl font-bold text-orange-400">฿{fuelStats.totalSpent.toLocaleString()}</div>
                      <div className="text-xs text-gray-400 mt-1">ค่าน้ำมันรวม</div>
                    </div>
                  </div>

                  {/* Additional Info */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full mt-4">
                    <div className="bg-gradient-to-br from-yellow-600/20 to-amber-600/20 rounded-xl p-4 text-center border border-yellow-500/30">
                      <div className="text-xl sm:text-2xl font-bold">{fuelStats.totalLiters.toFixed(2)} ลิตร</div>
                      <div className="text-xs text-gray-400 mt-1">น้ำมันรวม</div>
                    </div>
                    
                    <div className="bg-gradient-to-br from-red-600/20 to-orange-600/20 rounded-xl p-4 text-center border border-red-500/30">
                      <div className="text-xl sm:text-2xl font-bold">{fuelStats.worstEfficiency.toFixed(1)} กม./ลิตร</div>
                      <div className="text-xs text-gray-400 mt-1">ต่ำที่สุด</div>
                    </div>
                    
                    <div className="bg-gradient-to-br from-cyan-600/20 to-blue-600/20 rounded-xl p-4 text-center border border-cyan-500/30">
                      <div className="text-xl sm:text-2xl font-bold">{fuelStats.recordCount} ครั้ง</div>
                      <div className="text-xs text-gray-400 mt-1">จำนวนครั้งที่เติม</div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-12 border border-white/10 text-center">
                <Gauge size={64} className="mx-auto mb-4 text-gray-500 opacity-50" />
                <h3 className="text-2xl font-bold mb-2">ยังไม่มีข้อมูลการเติมน้ำมัน</h3>
                <p className="text-gray-400 mb-6">เริ่มบันทึกการเติมน้ำมันเพื่อดูสถิติและอัตราสิ้นเปลือง</p>
                <button
                  onClick={() => setShowFuelModal(true)}
                  className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 px-8 py-3 rounded-xl font-bold transition-all shadow-lg inline-flex items-center gap-2"
                >
                  <Fuel size={20} />
                  เพิ่มข้อมูลการเติมน้ำมัน
                </button>
              </div>
            )}

            {/* Fuel Records List */}
            {fuelRecords.length > 0 && (
              <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-4 sm:p-6 border border-white/10 shadow-2xl">
                <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 flex items-center gap-2">
                  <Fuel className="text-green-400" />
                  ประวัติการเติมน้ำมัน
                </h3>
                <div className="space-y-3">
                  {[...fuelRecords].reverse().map((record) => (
                    <div key={record.id} className="bg-white/5 rounded-xl p-4 border border-white/10 hover:border-green-500/50 transition-all group">
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className={`text-sm font-semibold ${fuelTypes[record.fuelType].color}`}>
                              {fuelTypes[record.fuelType].name}
                            </span>
                            <span className="text-xs text-gray-500">•</span>
                            <span className="text-xs text-gray-400">{formatThaiDate(record.date)}</span>
                          </div>
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-sm">
                            <div>
                              <div className="text-gray-400 text-xs">ระยะทาง</div>
                              <div className="font-bold">{record.odometer.toLocaleString()} กม.</div>
                            </div>
                            <div>
                              <div className="text-gray-400 text-xs">จำนวน</div>
                              <div className="font-bold">{record.liters.toFixed(2)} ลิตร</div>
                            </div>
                            <div>
                              <div className="text-gray-400 text-xs">ราคา</div>
                              <div className="font-bold">฿{record.totalPrice.toFixed(2)}</div>
                            </div>
                            {record.efficiency && (
                              <div>
                                <div className="text-gray-400 text-xs">อัตราสิ้นเปลือง</div>
                                <div className="font-bold text-green-400">{record.efficiency.toFixed(2)} กม./ลิตร</div>
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
                          <button
                            onClick={() => startEditFuel(record)}
                            className="p-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-all"
                          >
                            <Edit2 size={16} />
                          </button>
                          <button
                            onClick={() => deleteFuelRecord(record.id)}
                            className="p-2 bg-red-600 hover:bg-red-700 rounded-lg transition-all"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Dashboard View - (ย่อส่วนนี้เพื่อความสั้น - คงเดิม) */}
        {view === 'dashboard' && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              <div className="bg-gradient-to-br from-purple-600/30 to-purple-800/30 backdrop-blur-xl rounded-2xl p-4 sm:p-6 border border-purple-500/30 shadow-2xl hover:scale-105 transition-transform">
                <div className="text-purple-300 text-xs sm:text-sm mb-2 flex items-center gap-2">
                  <DollarSign size={14} />
                  ราคาตัวรถ
                </div>
                <div className="text-2xl sm:text-4xl font-black mb-1">฿{BIKE_BASE_PRICE.toLocaleString()}</div>
                <div className="text-xs text-purple-300">ซื้อสด</div>
              </div>

              <div className="bg-gradient-to-br from-orange-600/30 to-red-600/30 backdrop-blur-xl rounded-2xl p-4 sm:p-6 border border-orange-500/30 shadow-2xl hover:scale-105 transition-transform">
                <div className="text-orange-300 text-xs sm:text-sm mb-2 flex items-center gap-2">
                  <TrendingUp size={14} />
                  ค่าแต่งทั้งหมด
                </div>
                <div className="text-2xl sm:text-4xl font-black mb-1">฿{partsExpense.toLocaleString()}</div>
                <div className="text-xs text-orange-300">{stats.totalItems} รายการ</div>
              </div>

              <div className="bg-gradient-to-br from-blue-600/30 to-cyan-600/30 backdrop-blur-xl rounded-2xl p-4 sm:p-6 border border-blue-500/30 shadow-2xl hover:scale-105 transition-transform">
                <div className="text-blue-300 text-xs sm:text-sm mb-2 flex items-center gap-2">
                  <Activity size={14} />
                  รวมทั้งสิ้น
                </div>
                <div className="text-2xl sm:text-4xl font-black mb-1">฿{totalExpense.toLocaleString()}</div>
                <div className="text-xs text-blue-300">฿{Math.round(stats.avgPerDay)}/วัน</div>
              </div>

              <div className="bg-gradient-to-br from-pink-600/30 to-rose-600/30 backdrop-blur-xl rounded-2xl p-4 sm:p-6 border border-pink-500/30 shadow-2xl hover:scale-105 transition-transform">
                <div className="text-pink-300 text-xs sm:text-sm mb-2 flex items-center gap-2">
                  <Award size={14} />
                  เฉลี่ยต่อเดือน
                </div>
                <div className="text-2xl sm:text-4xl font-black mb-1">฿{Math.round(stats.avgPerMonth).toLocaleString()}</div>
                <div className="text-xs text-pink-300">{monthlyData.length} เดือน</div>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-4 sm:p-6 border border-white/10 shadow-2xl">
              <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 flex items-center gap-2">
                <PieChart className="text-orange-400" size={20} />
                สัดส่วนค่าใช้จ่าย
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                {categoryTotals.map(([cat, total]) => {
                  const percentage = (total / partsExpense * 100).toFixed(1);
                  return (
                    <div key={cat} className={`${categories[cat].bg} rounded-xl p-3 sm:p-4 border ${categories[cat].border} border-opacity-30 hover:border-opacity-100 transition-all cursor-pointer`}>
                      <div className="flex justify-between items-center mb-3">
                        <div className="flex items-center gap-2">
                          <span className="text-xl sm:text-2xl">{categories[cat].icon}</span>
                          <span className="font-semibold text-sm sm:text-base">{categories[cat].name}</span>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-base sm:text-lg">฿{total.toLocaleString()}</div>
                          <div className="text-xs opacity-70">{percentage}%</div>
                        </div>
                      </div>
                      <div className="w-full bg-black/30 rounded-full h-2 overflow-hidden">
                        <div 
                          className={`bg-gradient-to-r ${categories[cat].color} h-full rounded-full transition-all duration-1000 ease-out`}
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Monthly Overview & Top Expense sections remain the same */}
          </div>
        )}

        {/* Timeline & List views remain the same */}
      </div>

      {/* Floating Action Buttons */}
      <div className="fixed bottom-20 right-5 w-14 h-14 text-xl flex flex-col gap-3 z-40">
        {view === 'fuel' && (
          <button
            onClick={() => setShowFuelModal(true)}
            className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 rounded-full shadow-2xl flex items-center justify-center transition-all hover:scale-110 active:scale-95"
            title="เพิ่มข้อมูลน้ำมัน"
          >
            <Fuel size={24} className="sm:w-7 sm:h-7" />
          </button>
        )}
        
        {view !== 'fuel' && (
          <button
            onClick={() => setShowAddModal(true)}
            className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 rounded-full shadow-2xl flex items-center justify-center transition-all hover:scale-110 active:scale-95"
            title="เพิ่มรายการใหม่"
          >
            <PlusCircle size={24} className="sm:w-7 sm:h-7" />
          </button>
        )}
      </div>

      <style jsx>{`
        @keyframes slide-in {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from { transform: scale(0.95); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .animate-slide-in { animation: slide-in 0.3s ease-out; }
        .animate-fadeIn { animation: fadeIn 0.3s ease-out; }
        .animate-scaleIn { animation: scaleIn 0.2s ease-out; }
      `}</style>
    </div>
  );
};

export default ExpenseTracker;