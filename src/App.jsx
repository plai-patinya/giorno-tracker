import Header from "./components/Header";
import useAuth from "./hooks/useAuth";
import ImportModal from "./components/modals/ImportModal";
import ExpenseModal from "./components/modals/ExpenseModal";
import FuelModal from "./components/modals/FuelModal";
import DashboardView from "./components/DashboardView";
import FuelView from "./components/FuelView";
import ExportModal from "./components/modals/ExportModal";
import FloatingActionButtons from "./components/FloatingActionButtons";
import NotificationToast from "./components/NotificationToast";
import {
  BIKE_BASE_PRICE,
  categories,
  fuelTypes,
} from "./constants/appConstants";
import { formatThaiDate, formatMonthYear } from "./utils/dateUtils";
import useExpenseManager from "./hooks/useExpenseManager";
import useExpenseCRUD from "./hooks/useExpenseCRUD";
import useFuelCRUD from "./hooks/useFuelCRUD";
import useImportExport from "./hooks/useImportExport";
import useNotification from "./hooks/useNotification";
import useModalManager from "./hooks/useModalManager";
import useFuelAnalytics from "./hooks/useFuelAnalytics";
import ListView from "./components/ListView";
import TimelineView from "./components/TimelineView";
import useLocalBackup from "./hooks/useLocalBackup";
import useAuthActions from "./hooks/useAuthActions";
import AuthPage from "./components/AuthPage";
import useExportHelpers from "./hooks/useExportHelpers";
import useResetData from "./hooks/useResetData";
import "./styles/animations.css";
import useUIStore from "./store/useUIStore";
import useExpenseStore from "./store/useExpenseStore";
import useFuelStore from "./store/useFuelStore";
import useMaintenanceStore from "./store/useMaintenanceStore";
import useExpensesQuery from "./queries/useExpensesQuery";
import useSaveExpensesMutation from "./queries/useSaveExpensesMutation";
import { saveExpensesToDB, saveFuelToDB } from "./database/indexedDB";
import { getExpensesFromDB, getFuelFromDB } from "./database/indexedDB";
import { replayMutations } from "./database/mutationQueue";
import useCloudSync from "./hooks/useCloudSync";
import {
  loginUser,
  registerUser,
  logoutUser,
  saveUserData,
} from "./services/firebaseService";
window.saveUserData = saveUserData;
import { useState, useMemo, useEffect } from "react";
import {
  PlusCircle,
  Trash2,
  Edit2,
  PieChart,
  TrendingUp,
  Calendar,
  DollarSign,
  Package,
  Award,
  Activity,
  Save,
  X,
  Check,
  Download,
  Upload,
  RefreshCw,
  Gauge,
  Fuel,
} from "lucide-react";
import { getVehicleMood } from "./utils/vehicleMood";
import useMaintenancePersistence from "./hooks/useMaintenancePersistence";
import MaintenanceModal from "./components/modals/MaintenanceModal";
import AccountCenter from "./components/profile/AccountCenter";

const ExpenseTracker = () => {
  useMaintenancePersistence();

  const STORAGE_KEY = "giorno-expenses";
  const FUEL_STORAGE_KEY = "giorno-fuel-records";

  const initialExpenses = [
    {
      id: 1,
      item: 'โหลดโช๊คหน้า 2"',
      price: 1000,
      category: "suspension",
      date: "2025-02-21",
    },
    {
      id: 2,
      item: "เปลี่ยนเบาะปาด",
      price: 1000,
      category: "body",
      date: "2025-02-26",
    },
    {
      id: 3,
      item: "แผ่นรองเหยียบ",
      price: 315,
      category: "body",
      date: "2025-02-26",
    },
    {
      id: 4,
      item: "ครอบไฟท้ายใส + ไฟผ่าหมาก",
      price: 579,
      category: "electrical",
      date: "2025-03-01",
    },
    {
      id: 5,
      item: "ไฟหน้า 3 สเต็ป",
      price: 189,
      category: "electrical",
      date: "2025-03-03",
    },
    {
      id: 6,
      item: "ฟิล์มกันรอยเรือนไมล์",
      price: 30,
      category: "body",
      date: "2025-03-04",
    },
    {
      id: 7,
      item: "ปลั๊กไฟหรี่เลี้ยว",
      price: 219,
      category: "electrical",
      date: "2025-03-05",
    },
    {
      id: 8,
      item: "หลอดไฟหรี่เลี้ยว",
      price: 159,
      category: "electrical",
      date: "2025-03-05",
    },
    {
      id: 9,
      item: "ค่าช่างติดตั้งไฟ",
      price: 200,
      category: "other",
      date: "2025-03-11",
    },
    {
      id: 10,
      item: "สติ๊กเกอร์ Giorno",
      price: 87,
      category: "body",
      date: "2025-03-28",
    },
    {
      id: 11,
      item: "ยาง Pirelli Angel Scooter 2 เส้น",
      price: 2552,
      category: "suspension",
      date: "2025-03-29",
    },
    {
      id: 12,
      item: "หมวกกันน็อค 2 ใบ",
      price: 2278,
      category: "other",
      date: "2025-04-01",
    },
    {
      id: 13,
      item: "ล้อทำสีม่วง",
      price: 2300,
      category: "body",
      date: "2025-04-03",
    },
    {
      id: 14,
      item: "ปลายแฮนด์ Kamui",
      price: 525,
      category: "body",
      date: "2025-04-06",
    },
    {
      id: 15,
      item: "กระจกปลายแฮนด์",
      price: 304,
      category: "body",
      date: "2025-04-06",
    },
    {
      id: 16,
      item: "อุดกระจก Rottae",
      price: 334,
      category: "body",
      date: "2025-04-06",
    },
    {
      id: 17,
      item: "ปลอกแฮนด์ RCB",
      price: 294,
      category: "body",
      date: "2025-04-06",
    },
    {
      id: 18,
      item: "ค่าช่างติดตั้งปลอกแฮนด์",
      price: 150,
      category: "other",
      date: "2025-04-09",
    },
    {
      id: 19,
      item: "ครอบสวิทช์กุญแจ",
      price: 99,
      category: "body",
      date: "2025-04-22",
    },
    {
      id: 20,
      item: "น็อตบู๊ชพักเท้า",
      price: 130,
      category: "body",
      date: "2025-05-20",
    },
    {
      id: 21,
      item: "ชามแต่ง ช่างพัฒน์นครสวรรค์",
      price: 2100,
      category: "engine",
      date: "2025-06-02",
    },
    {
      id: 22,
      item: "ท่อกู่มหาชัยผ่าหมก",
      price: 3500,
      category: "engine",
      date: "2025-06-02",
    },
    {
      id: 23,
      item: "เปลี่ยนเบาะ",
      price: 800,
      category: "body",
      date: "2025-07-25",
    },
    {
      id: 24,
      item: "ปะยาง",
      price: 300,
      category: "suspension",
      date: "2025-07-28",
    },
    {
      id: 25,
      item: "ใส่จุกลดเสียงท่อ",
      price: 500,
      category: "engine",
      date: "2025-08-01",
    },
    {
      id: 26,
      item: "สลับกันตกดำ PDC",
      price: 800,
      category: "body",
      date: "2025-08-01",
    },
    {
      id: 27,
      item: "กรองเลส",
      price: 400,
      category: "engine",
      date: "2025-09-26",
    },
    {
      id: 28,
      item: "ชุดสี บังโคลนหน้า, ฝาครอบไฟหน้า",
      price: 1244,
      category: "body",
      date: "2025-09-27",
    },
    {
      id: 29,
      item: "สปริงทอร์ค",
      price: 600,
      category: "engine",
      date: "2025-10-09",
    },
    {
      id: 30,
      item: "ค่าประกอบชุดหน้า",
      price: 200,
      category: "other",
      date: "2025-10-09",
    },
  ];

  const { expenses, setExpenses } = useExpenseStore();

  const { fuelRecords, setFuelRecords } = useFuelStore();

  const {
    maintenanceRecords,

    setMaintenanceRecords,
  } = useMaintenanceStore();

  //
  // 🕘 SERVICE HISTORY
  //

  const [serviceHistory, setServiceHistory] = useState(() => {
    const saved = localStorage.getItem("giorno-service-history");

    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return [];
      }
    }

    return [
      {
        type: "Engine Oil",

        icon: "🛢️",

        title: "เปลี่ยนน้ำมันเครื่อง",

        date: "2026-04-22",

        odo: 10020,

        note: "Motul 7100",
      },

      {
        type: "airFilter",

        icon: "🌬️",

        title: "เปลี่ยนกรองอากาศ",

        date: "2026-04-05",

        odo: 9147,

        note: "Honda OEM",
      },

      {
        type: "tires",

        icon: "🛞",

        title: "เปลี่ยนยาง",

        date: "2025-03-29",

        odo: 0,

        note: "Pirelli Angel Scooter",
      },
    ];
  });

  const { totalExpense, partsExpense, categoryTotals, monthlyData, stats } =
    useExpenseManager(expenses);

  const [newItem, setNewItem] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [newDate, setNewDate] = useState(
    new Date().toISOString().split("T")[0],
  );
  const [editingId, setEditingId] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [newNote, setNewNote] = useState("");

  const {
    view,
    setView,

    searchTerm,
    setSearchTerm,

    loading,
    setLoading,
  } = useUIStore();

  const {
    notification,
    setNotification,

    showSuccess,
    showError,
    showWarning,

    hideNotification,
  } = useNotification();

  const {
    loadExpenses,
    loadFuelRecords,

    saveExpenses,
    saveFuelRecords,

    backupData,
  } = useLocalBackup({
    STORAGE_KEY,
    FUEL_STORAGE_KEY,

    initialExpenses,

    expenses,
    fuelRecords,

    setNotification,
  });

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, authLoading } = useAuth();

  //
  // ☁️ CLOUD SYNC
  //

  useCloudSync({
    user,
    loading,
    expenses,
    fuelRecords,
    maintenanceRecords,
    setExpenses,
    setFuelRecords,
    setMaintenanceRecords,
  });

  //const {

  //data: cloudExpenses,

  //isLoading: expensesLoading,

  //error: expensesError

  //} = useExpensesQuery(user);

  const saveExpensesMutation = useSaveExpensesMutation(user);

  const saveExpensesWithSync = async (data) => {
    // local backup
    saveExpenses(data);

    // cloud sync
    saveExpensesMutation.mutate(data);
  };

  const saveFuelWithSync = async (data) => {
    // local backup
    saveFuelRecords(data);
  };

  const saveServiceHistoryWithSync = async (data) => {
    //
    // local
    //

    localStorage.setItem("giorno-service-history", JSON.stringify(data));

    //
    // cloud
    //

    const safeExpenses = JSON.parse(JSON.stringify(expenses));
    const safeFuel = JSON.parse(JSON.stringify(fuelRecords));
    const safeService = JSON.parse(JSON.stringify(maintenanceRecords));

    await saveUserData(user.uid, safeExpenses, safeFuel, safeService);
  };

  useEffect(() => {
    localStorage.setItem(
      "giorno-service-history",
      JSON.stringify(serviceHistory),
    );
  }, [serviceHistory]);

  const { login, register, logout } = useAuthActions({
    email,
    password,

    showError,
  });

  const [showAccountCenter, setShowAccountCenter] = useState(false);

  // Fuel form states
  const [fuelDate, setFuelDate] = useState(
    new Date().toISOString().split("T")[0],
  );
  const [fuelOdometer, setFuelOdometer] = useState("");
  const [fuelLiters, setFuelLiters] = useState("");
  const [fuelPricePerLiter, setFuelPricePerLiter] = useState("");
  const [fuelType, setFuelType] = useState("91");
  const [editingFuelId, setEditingFuelId] = useState(null);

  const {
    showAddModal,
    setShowAddModal,

    showFuelModal,
    setShowFuelModal,

    showExportModal,
    setShowExportModal,

    showImportModal,
    setShowImportModal,

    showExportMenu,
    setShowExportMenu,
  } = useModalManager();

  const [showMaintenanceModal, setShowMaintenanceModal] = useState(false);

  const isAnyModalOpen = showFuelModal || showAddModal || showMaintenanceModal;

  const { addExpense, deleteExpense, startEdit, cancelEdit } = useExpenseCRUD({
    expenses,
    setExpenses,
    saveExpenses: saveExpenses,
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
    setNewNote,
  });

  useEffect(() => {
    const init = async () => {
      //
      // 🔥 IndexedDB First
      //

      let expenseData = await getExpensesFromDB();

      let fuelData = await getFuelFromDB();

      //
      // ☁️ fallback Firebase/local
      //

      if (!expenseData || expenseData.length === 0) {
        expenseData = await loadExpenses();
      }

      if (!fuelData || fuelData.length === 0) {
        fuelData = await loadFuelRecords();
      }

      // 🔥 fallback ถ้า localStorage หลักพัง
      if (!expenseData || expenseData.length === 0) {
        const backup = localStorage.getItem("giorno-auto-backup");
        if (backup) {
          try {
            const parsed = JSON.parse(backup);
            expenseData = parsed.expenses || initialExpenses;
            fuelData = parsed.fuelRecords || [];
          } catch (e) {
            console.error("Backup parse error:", e);
          }
        }
      }

      if (expenseData && expenseData.length > 0) {
        setExpenses(expenseData);
      }

      if (fuelData && fuelData.length > 0) {
        setFuelRecords(fuelData);
      }
      setLoading(false);
    };
    init();
  }, []);

  useEffect(() => {
    if (notification.show) {
      const timer = setTimeout(() => {
        hideNotification();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [notification.show]);

  // Auto-calculate fuel total price
  const fuelTotalPrice = useMemo(() => {
    if (!fuelLiters || !fuelPricePerLiter) return "";
    return (parseFloat(fuelLiters) * parseFloat(fuelPricePerLiter)).toFixed(2);
  }, [fuelLiters, fuelPricePerLiter]);

  const { addFuelRecord, deleteFuelRecord, startEditFuel, resetFuelForm } =
    useFuelCRUD({
      fuelRecords,
      setFuelRecords,

      saveFuelRecords: saveFuelWithSync,

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

      setShowFuelModal,
    });

  const [importText, setImportText] = useState("");

  const { exportedData, exportData, handleImportFromText } = useImportExport({
    expenses,
    setExpenses,

    fuelRecords,
    setFuelRecords,

    maintenanceRecords,
    setMaintenanceRecords,

    saveExpenses,
    saveFuelRecords,

    setNotification,

    setShowImportModal,
    setImportText,
  });

  const { copyToClipboard, downloadAsFile } = useExportHelpers({
    exportedData,

    setNotification,
  });

  const { resetData } = useResetData({
    initialExpenses,

    setExpenses,
    setFuelRecords,

    saveExpenses,
    saveFuelRecords,

    setNotification,
  });

  const filteredExpenses = useMemo(() => {
    const safeExpenses = Array.isArray(expenses) ? expenses : [];

    return safeExpenses
      .filter((exp) =>
        exp.item?.toLowerCase().includes(searchTerm.toLowerCase()),
      )
      .sort((a, b) => new Date(b.date) - new Date(a.date));
  }, [expenses, searchTerm]);

  const fuelStats = useFuelAnalytics(fuelRecords);

  //
  // 💾 IndexedDB Auto Sync
  //

  useEffect(() => {
    if (Array.isArray(expenses) && expenses.length > 0) {
      saveExpensesToDB(expenses);
    }
  }, [expenses]);

  //
  // 🌐 Replay queue when online
  //

  useEffect(() => {
    const handleOnline = async () => {
      await replayMutations(async (mutation) => {
        switch (mutation.type) {
          case "SAVE_EXPENSES":
            await saveExpensesMutation.mutateAsync(mutation.payload);

            break;

          default:
            break;
        }
      });
    };

    window.addEventListener("online", handleOnline);

    return () => {
      window.removeEventListener("online", handleOnline);
    };
  }, []);

  useEffect(() => {
    if (Array.isArray(fuelRecords) && fuelRecords.length > 0) {
      saveFuelToDB(fuelRecords);
    }
  }, [fuelRecords]);

  if (loading || authLoading) {
    return (
      <div className="min-h-screen animated-bg flex items-center justify-center text-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto"></div>
          <p className="mt-4 text-gray-400">กำลังโหลดข้อมูล...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <AuthPage
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        login={login}
        register={register}
      />
    );
  }

  const vehicleMood = getVehicleMood(stats?.vehicleHealth || 82);

  return (
    <div
      className="
      min-h-screen
      animated-bg
      text-white

      

      p-4 sm:p-6
      pb-24

      relative
    "
    >
      {showAccountCenter && (
        <>
          {/* BACKDROP */}

          <div
            onClick={() => setShowAccountCenter(false)}
            className="
        fixed
        inset-0
        bg-black/50
        backdrop-blur-sm
        z-[90]
      "
          />

          {/* BOTTOM SHEET */}

          <div
            className="
        fixed
        bottom-0
        left-0
        right-0

        z-[100]

        max-w-md
        mx-auto

        rounded-t-[32px]

        border
        border-white/10

        bg-gradient-to-b
        from-[#37217d]
        to-[#2a145e]

        shadow-2xl

        p-5

        max-h-[85vh]
        overflow-y-auto

        animate-slide-up
      "
          >
            <AccountCenter
              user={user}
              logout={logout}
              onClose={() => setShowAccountCenter(false)}
              maintenanceScore={82}
              averageKmPerLiter={42}
              nextServiceDays={8}
              totalExpense={totalExpense}
              exportData={exportData}
              openImportModal={() => setShowImportModal(true)}
            />
          </div>
        </>
      )}
      {/* PREMIUM GLOW */}
      <div
        className={`
            fixed
            inset-0

            overflow-hidden
            pointer-events-none

            bg-gradient-to-br

            ${vehicleMood.glow}
          `}
      >
        <div className="absolute top-[-120px] left-[10%] w-[420px] h-[420px] ${vehicleMood.orb} blur-3xl rounded-full animate-float" />

        <div className="absolute bottom-[-150px] right-[5%] w-[380px] h-[380px] ${vehicleMood.orb} blur-3xl rounded-full animate-float" />
      </div>
      {/* APP CONTENT */}
      <div className="relative z-10"></div>
      {/* Notification */}
      <NotificationToast notification={notification} />

      {/* Expense Modal */}
      <ExpenseModal
        showAddModal={showAddModal}
        setShowAddModal={setShowAddModal}
        editingId={editingId}
        newItem={newItem}
        setNewItem={setNewItem}
        newPrice={newPrice}
        setNewPrice={setNewPrice}
        newCategory={newCategory}
        setNewCategory={setNewCategory}
        newDate={newDate}
        setNewDate={setNewDate}
        addExpense={addExpense}
        cancelEdit={cancelEdit}
        categories={categories}
        newNote={newNote}
        setNewNote={setNewNote}
      />

      {/* Import Modal */}
      <ImportModal
        showImportModal={showImportModal}
        setShowImportModal={setShowImportModal}
        importText={importText}
        setImportText={setImportText}
        handleImportFromText={handleImportFromText}
      />

      {/* Export Modal */}
      <ExportModal
        showExportModal={showExportModal}
        setShowExportModal={setShowExportModal}
        exportedData={exportedData}
        copyToClipboard={copyToClipboard}
        downloadAsFile={downloadAsFile}
      />

      {/* Fuel Modal */}
      <FuelModal
        showFuelModal={showFuelModal}
        setShowFuelModal={setShowFuelModal}
        editingFuelId={editingFuelId}
        fuelDate={fuelDate}
        setFuelDate={setFuelDate}
        fuelOdometer={fuelOdometer}
        setFuelOdometer={setFuelOdometer}
        fuelLiters={fuelLiters}
        setFuelLiters={setFuelLiters}
        fuelPricePerLiter={fuelPricePerLiter}
        setFuelPricePerLiter={setFuelPricePerLiter}
        fuelType={fuelType}
        setFuelType={setFuelType}
        fuelTotalPrice={fuelTotalPrice}
        fuelTypes={fuelTypes}
        addFuelRecord={addFuelRecord}
        resetFuelForm={resetFuelForm}
      />

      <MaintenanceModal
        isOpen={showMaintenanceModal}
        onClose={() => setShowMaintenanceModal(false)}
        currentOdo={
          fuelRecords.length > 0
            ? Math.max(
                ...fuelRecords.map((record) => Number(record.odometer || 0)),
              )
            : 0
        }
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 animate-fadeUp">
        {/* Header */}
        <Header
          user={user}
          logout={logout}
          stats={stats}
          showExportMenu={showExportMenu}
          setShowExportMenu={setShowExportMenu}
          exportAllData={exportData}
          backupData={backupData}
          setShowImportModal={setShowImportModal}
          resetData={resetData}
          formatThaiDate={formatThaiDate}
          onAccountClick={() => setShowAccountCenter(true)}
        />

        {/* View Tabs */}
        <div
          className="
          sticky
          top-3
          z-50

          mb-8

          grid grid-cols-4 gap-2

          p-2

          rounded-3xl

          backdrop-blur-2xl
          backdrop-saturate-150
          bg-black/10

          border ${vehicleMood.border}

          shadow-[0_10px_40px_rgba(0,0,0,0.35)]

          overflow-hidden

          supports-[backdrop-filter]:bg-black/10
          "
        >
          {[
            { id: "dashboard", icon: Activity, label: "Dashboard" },
            { id: "fuel", icon: Gauge, label: "ระยะทาง/น้ำมัน" },
            { id: "timeline", icon: Calendar, label: "Timeline" },
            { id: "list", icon: Package, label: "รายการ" },
          ].map((tab) => {
            const isActive = view === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => setView(tab.id)}
                className={`
                  relative

                  flex items-center justify-center gap-2

                  px-2 sm:px-4
                  py-3 sm:py-4

                  rounded-2xl

                  font-semibold

                  text-xs sm:text-sm lg:text-base

                  transition-all duration-300 ease-out

                  overflow-hidden

                  ${
                    isActive
                      ? `
                      bg-gradient-to-r
                      from-orange-400
                      via-orange-500
                      to-pink-500

                      text-white

                      shadow-[0_0_30px_rgba(255,120,80,0.45)]

                      scale-[1.02]
                    `
                      : `
                      text-white/70

                      hover:text-white

                      hover:bg-white/5

                      hover:scale-[1.01]
                    `
                  }
                `}
              >
                {/* Glow Layer */}
                {isActive && (
                  <div
                    className="
                    absolute inset-0

                    bg-white/10

                    animate-float

                    pointer-events-none
                    "
                  />
                )}

                {/* Icon */}
                <tab.icon
                  size={16}
                  className="
                  relative z-10
                  sm:w-5 sm:h-5
                  "
                />

                {/* Label */}
                <span
                  className="
                  relative z-10

                  hidden md:inline
                  "
                >
                  {tab.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* Fuel/Distance View */}
        {view === "fuel" && (
          <FuelView
            fuelStats={fuelStats}
            fuelRecords={fuelRecords}
            fuelTypes={fuelTypes}
            formatThaiDate={formatThaiDate}
            setShowFuelModal={setShowFuelModal}
            startEditFuel={startEditFuel}
            deleteFuelRecord={deleteFuelRecord}
          />
        )}

        {/* Dashboard View */}
        {view === "dashboard" && (
          <DashboardView
            BIKE_BASE_PRICE={BIKE_BASE_PRICE}
            stats={stats}
            partsExpense={partsExpense}
            totalExpense={totalExpense}
            monthlyData={monthlyData}
            categoryTotals={categoryTotals}
            categories={categories}
            expenses={expenses}
            fuelRecords={fuelRecords}
            serviceHistory={maintenanceRecords}
            setServiceHistory={setMaintenanceRecords}
            user={user}
            saveServiceHistoryWithSync={saveServiceHistoryWithSync}
          />
        )}

        {/* 🔥 FORCE DEBUG */}
        {/*         <DashboardView
          BIKE_BASE_PRICE={BIKE_BASE_PRICE}
          stats={stats}
          partsExpense={partsExpense}
          totalExpense={totalExpense}
          monthlyData={monthlyData}
          categoryTotals={categoryTotals}
          categories={categories}
          expenses={expenses}
          fuelRecords={fuelRecords}
          serviceHistory={serviceHistory}
          setServiceHistory={setServiceHistory}
          user={user}
          saveServiceHistoryWithSync={saveServiceHistoryWithSync}
        /> */}

        {/* Timeline & List views remain the same */}
        {view === "list" && (
          <ListView
            filteredExpenses={filteredExpenses}
            categories={categories}
            formatThaiDate={formatThaiDate}
            startEdit={startEdit}
            deleteExpense={deleteExpense}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
        )}

        {view === "timeline" && (
          <TimelineView
            monthlyData={monthlyData}
            categories={categories}
            formatMonthYear={formatMonthYear}
            formatThaiDate={formatThaiDate}
            startEdit={startEdit}
            deleteExpense={deleteExpense}
          />
        )}
      </div>

      {/* Floating Action Buttons */}
      <FloatingActionButtons
        view={view}
        setShowFuelModal={setShowFuelModal}
        setShowAddModal={setShowAddModal}
        setShowMaintenanceModal={setShowMaintenanceModal}
        isAnyModalOpen={isAnyModalOpen}
      />
    </div>
  );
};

export default ExpenseTracker;
