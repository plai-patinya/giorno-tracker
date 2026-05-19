import {

  useState,
  useMemo,
  useEffect

} from "react";
import {

  PieChart,
  Pie,
  Cell,

  ResponsiveContainer,

  BarChart,
  Bar,

  XAxis,
  YAxis,
  Tooltip,

  CartesianGrid

} from "recharts";

    //
    // 🛠️ MAINTENANCE ENGINE
    //

    const calculateService = (

    currentOdo,
    lastOdo,
    intervalKm

    ) => {

    const nextKm =
        lastOdo + intervalKm;

    const remainingKm =

        Math.max(
        nextKm - currentOdo,
        0
        );

    const usedKm =

        currentOdo - lastOdo;

    const progress =

        Math.min(

        Math.max(
            (usedKm / intervalKm) * 100,
            0
        ),

        100
        );

    const status =

        remainingKm <= 300

        ? "critical"

        : remainingKm <= 800

        ? "warning"

        : "healthy";

    return {

        nextKm,

        remainingKm,

        progress,

        status

    };

    };

    const CATEGORY_CONFIG = {

    engine: {
        label: "เครื่องยนต์",
        color: "#8b5cf6",
        glow: "shadow-purple-500/30",
        icon: "🔧"
    },

    suspension: {
        label: "ช่วงล่าง/ยาง",
        color: "#3b82f6",
        glow: "shadow-blue-500/30",
        icon: "🛞"
    },

    body: {
        label: "ตัวถัง/อุปกรณ์",
        color: "#22c55e",
        glow: "shadow-green-500/30",
        icon: "🎨"
    },

    electrical: {
        label: "ไฟฟ้า",
        color: "#f59e0b",
        glow: "shadow-orange-500/30",
        icon: "⚡"
    },

    other: {
        label: "อื่นๆ",
        color: "#ec4899",
        glow: "shadow-pink-500/30",
        icon: "📦"
    }

    };

    const AnalyticsCharts = ({

        categoryTotals,
        monthlyData,

        fuelRecords = [],

        serviceHistory = [],
        setServiceHistory,

        user

    }) => {

    //
    // 🎛️ INTERACTIVE STATES
    //

    const [

    activeCategory,

    setActiveCategory

    ] = useState(null);

    const [

    range,

    setRange

    ] = useState("ALL");

    //
    // 🛠️ SERVICE MODAL
    //

    const [

    showServiceModal,

    setShowServiceModal

    ] = useState(false);

    const [

    selectedService,

    setSelectedService

    ] = useState("oil");

    const [

        serviceForm,

        setServiceForm

        ] = useState({

        date: "",

        odo: "",

        note: ""

        });

        const [

    editingIndex,

    setEditingIndex

    ] = useState(null);

    const [isSaving, setIsSaving] = useState(false);


//
// CATEGORY DATA
//

    const rawCategoryData =

    Array.isArray(categoryTotals)

        ? categoryTotals.map(
            (item) => ({

            key:
                item.category,

            name:
                CATEGORY_CONFIG[
                item.category
                ]?.label ||

                item.category,

            color:
                CATEGORY_CONFIG[
                item.category
                ]?.color ||

                "#8b5cf6",

            glow:
                CATEGORY_CONFIG[
                item.category
                ]?.glow,

            icon:
                CATEGORY_CONFIG[
                item.category
                ]?.icon ||

                "📦",

            value:
                Number(
                item.total || 0
                )

            })
        )

        : Object.entries(
            categoryTotals || {}
        ).map(
            ([key, value]) => ({

            key,

            name:
                CATEGORY_CONFIG[key]
                ?.label || key,

            color:
                CATEGORY_CONFIG[key]
                ?.color ||

                "#8b5cf6",

            glow:
                CATEGORY_CONFIG[key]
                ?.glow,

            icon:
                CATEGORY_CONFIG[key]
                ?.icon ||

                "📦",

            value:
                typeof value ===
                "number"

                ? Number(value)

                : Number(
                    value?.total || 0
                    )

            })
        );

//
// 🔥 SORT HIGHEST → LOWEST
//

    const categoryChartData =
    rawCategoryData.sort(
        (a, b) =>
        b.value - a.value
    );

  //
  // MONTHLY DATA
  //

    const allMonthlyData =

    Object.entries(monthlyData || {})

        .map(
        ([month, expenses]) => ({

            month,

            total:
            expenses.reduce(
                (sum, exp) =>
                sum + exp.price,
                0
            )

        })
        );

    //
    // 📊 FILTER RANGE
    //

    const monthlyChartData =
    useMemo(() => {

        if (range === "ALL")
        return allMonthlyData;

        const limit =
        Number(range);

        return allMonthlyData.slice(
        -limit
        );

    }, [

        allMonthlyData,
        range

    ]);

  //
  // TOTAL
  //

  const total =
    categoryChartData.reduce(

      (sum, item) =>

        sum + Number(item.value),

      0

    );

    //
    // 📈 TOP MONTH
    //

    const topMonth =

    monthlyChartData.reduce(

        (max, item) =>

        item.total >
        (max?.total || 0)

            ? item

            : max,

        null

    );

    //
    // 📊 MONTHLY AVG
    //

    const averageMonthly =

    monthlyChartData.length > 0

        ? total /
        monthlyChartData.length

        : 0;

    //
    // 🧠 SMART INSIGHTS
    //

    const topCategory =

    categoryChartData[0];

    const totalMonths =
    monthlyChartData.length;

    const recentMonth =
    monthlyChartData[
        monthlyChartData.length - 1
    ];

    const previousMonth =
    monthlyChartData[
        monthlyChartData.length - 2
    ];

    //
    // 📈 MONTHLY TREND
    //

    const recentTotal =
    recentMonth?.total || 0;

    const previousTotal =
    previousMonth?.total || 0;

    const monthlyTrend =

    previousTotal > 0

        ? (
            (
            (
                recentTotal -
                previousTotal
            ) /

            previousTotal
            ) * 100
        ).toFixed(1)

        : 0;

    const trendUp =
    Number(monthlyTrend) > 0;
    
    //
    // 🔮 PREDICTIVE ANALYTICS
    //

    // forecast next month

    const forecastNextMonth =

    monthlyChartData.length >= 3

        ? Math.round(

            monthlyChartData

            .slice(-3)

            .reduce(
                (sum, item) =>
                sum + item.total,
                0
            ) / 3

        )

        : 0;

    // overspending warning

    const overspendingCategory =

    categoryChartData.find(

        (item) =>

        (
            item.value / total
        ) > 0.5

    );

    // maintenance estimation

    const estimatedMaintenance =

    total >= 30000

        ? "ควรตรวจเช็คใหญ่"

        : total >= 15000

        ? "ใกล้ถึงรอบเซอร์วิส"

        : "สภาพค่าใช้จ่ายปกติ";

    // spending behavior

    const spendingBehavior =

    trendUp

        ? "ค่าใช้จ่ายกำลังเพิ่มขึ้น"

        : "ค่าใช้จ่ายเริ่มคงที่";

    //
    // ⛽ FUEL ANALYTICS
    //

    const safeFuel = Array.isArray(fuelRecords)
    ? fuelRecords
    : [];

    const fuelAnalytics =
    safeFuel
        .filter(
        (record) =>
            Number(record.distance) > 0 &&
            Number(record.liters) > 0
        )
        .map((record) => {
        const distance = Number(record.distance);
        const liters = Number(record.liters);
        const totalPrice = Number(record.totalPrice);

        return {
            ...record,
            kmPerLiter: distance / liters,
            costPerKm: totalPrice / distance
        };
        });

    //
    // AVG KM/L
    //

    const averageKmPerLiter =

    fuelAnalytics.length > 0

        ? (
            fuelAnalytics.reduce(
            (sum, item) =>
                sum + item.kmPerLiter,
            0
            ) /

            fuelAnalytics.length
        ).toFixed(1)

        : "0.0";

    //
    // AVG COST/KM
    //

    const averageCostPerKm =

    fuelAnalytics.length > 0

        ? (
            fuelAnalytics.reduce(
            (sum, item) =>
                sum + item.costPerKm,
            0
            ) /

            fuelAnalytics.length
        ).toFixed(2)

        : "0.00";

    //
    // BEST RECORD
    //

    const bestFuelRecord =

    fuelAnalytics.length > 0

        ? fuelAnalytics.reduce(

            (best, item) =>

            item.kmPerLiter >
            best.kmPerLiter

                ? item

                : best

        )

        : null;

    //
    // FUEL TREND
    //

    const fuelTrend =

    Number(averageCostPerKm) > 1.5

        ? "ค่าเชื้อเพลิงสูงขึ้น"

        : "อัตราสิ้นเปลืองดี";
        
    //
    // 🛠️ MAINTENANCE AI
    //

    //
    // 🛠️ MAINTENANCE RECORDS
    //

    //
    // 🛠️ DYNAMIC MAINTENANCE
    //

    const safeService = Array.isArray(serviceHistory)
    ? serviceHistory
    : [];

    const getLatestService = (type) => {

    return safeService
        .filter((item) => item.type === type)
        .sort((a, b) =>
        new Date(b.date) - new Date(a.date)
        )[0];
    };

    const oilLatest =
    getLatestService("oil");

    const airLatest =
    getLatestService("airFilter");

    const tireLatest =
    getLatestService("tires");

    const maintenanceRecords = {

    oil: {

        lastDate:
        oilLatest?.date ||

        "ยังไม่มีข้อมูล",

        lastOdo:
        oilLatest?.odo || 0,

        intervalKm: 3000,

        intervalMonths: 3

    },

    airFilter: {

        lastDate:
        airLatest?.date ||

        "ยังไม่มีข้อมูล",

        lastOdo:
        airLatest?.odo || 0,

        intervalKm: 5000

    },

    tires: {

        lastDate:
        tireLatest?.date ||

        "ยังไม่มีข้อมูล",

        lastOdo:
        tireLatest?.odo || 0,

        intervalKm: 20000,

        intervalMonths: 24

    }

    };

    //
    // 🚗 CURRENT ODO
    //

    const latestFuelRecord =

    [...safeFuel]
        .sort((a, b) =>
        new Date(b.date) - new Date(a.date)
        )[0];

    const currentOdo =

    Number(
        latestFuelRecord?.odometer || 0
    ) || 0;

    //
    // 💾 SAVE HISTORY
    //



    //
    // 🛠️ SERVICE ENGINE
    //

    const oilService =

    calculateService(

        currentOdo,

        maintenanceRecords.oil.lastOdo,

        maintenanceRecords.oil.intervalKm

    );

    const airService =

    calculateService(

        currentOdo,

        maintenanceRecords.airFilter.lastOdo,

        maintenanceRecords.airFilter.intervalKm

    );

    const tireService =

    calculateService(

        currentOdo,

        maintenanceRecords.tires.lastOdo,

        maintenanceRecords.tires.intervalKm

    );

    //
    // 🔧 HEALTH SCORE
    //

    const maintenanceScore = Math.max(

        100 -

        Math.floor(

            (
            oilService.progress * 0.5 +
            airService.progress * 0.3 +
            tireService.progress * 0.2
            )

        ),

        0
    );

    //
    // ⚠️ STATUS
    //

    const serviceStatus =

    oilService.status === "critical" ||
    airService.status === "critical"

        ? "ควรเข้าศูนย์ทันที"

        : oilService.status === "warning"

        ? "ใกล้ถึงรอบเซอร์วิส"

        : "สภาพการใช้งานปกติ";

    //
    // 🔔 SMART ALERT ENGINE
    //

    const notifications = [];

    //
    // 🛢️ OIL ALERT
    //

    if (oilService.remainingKm <= 500) {

    notifications.push({

        type: "warning",

        title:

        oilService.remainingKm <= 150

        ? "ถึงรอบเปลี่ยนน้ำมันเครื่อง"

        : "ใกล้ถึงรอบเปลี่ยนน้ำมันเครื่อง",

        description:

        `เหลืออีก ${oilService.remainingKm.toLocaleString()} km`,

        icon: "🛢️",

        color:

        oilService.remainingKm <= 150

        ? "red"

        : "yellow"

    });

    }

    //
    // 🌬️ AIR FILTER
    //

    if (airService.remainingKm <= 800) {

    notifications.push({

        type: "info",

        title:

        "ควรตรวจไส้กรองอากาศ",

        description:

        `เหลืออีก ${airService.remainingKm.toLocaleString()} km`,

        icon: "🌬️",

        color: "cyan"

    });

    }

    //
    // 🛞 TIRES
    //

    if (tireService.remainingKm <= 2000) {

    notifications.push({

        type: "warning",

        title:

        "อายุยางใกล้ครบระยะ",

        description:

        `เหลืออีก ${tireService.remainingKm.toLocaleString()} km`,

        icon: "🛞",

        color: "purple"

    });

    }

    //
    // ⛽ FUEL COST ALERT
    //

    if (Number(averageCostPerKm) >= 2.0) {

    notifications.push({

        type: "alert",

        title:

        "ต้นทุนเชื้อเพลิงสูงขึ้น",

        description:

        `ปัจจุบัน ${averageCostPerKm} บาท/km`,

        icon: "⛽",

        color: "orange"

    });

    }

    //
    // ✏️ EDIT SERVICE
    //

    const handleEditService = (

    item,
    index

    ) => {

    setSelectedService(
        item.type
    );

    setServiceForm({

        date: item.date,

        odo: item.odo,

        note: item.note

    });

    setEditingIndex(index);

    setShowServiceModal(true);

    };

    //
    // 🗑️ DELETE SERVICE
    //

    const handleDeleteService = (index) => {

    const confirmDelete = window.confirm("ลบรายการนี้ ?");
    if (!confirmDelete) return;

    const updated = serviceHistory.filter((_, i) => i !== index);

    setServiceHistory(updated);

    };
 

  return (

    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-6">

    {/* ================================= */}
    {/* SMART INSIGHTS */}
    {/* ================================= */}

    <div className="xl:col-span-2 relative overflow-hidden rounded-[32px] border border-white/10 bg-white/5 backdrop-blur-2xl p-6 shadow-2xl">

    <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />

    {/* HEADER */}

    <div className="flex items-center gap-4 mb-6 relative z-10">

        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-400/30 to-blue-500/20 border border-white/10 flex items-center justify-center text-2xl backdrop-blur-xl">

        🧠

        </div>

        <div>

        <h3 className="text-3xl font-black text-white">
            Smart Insights
        </h3>

        <div className="text-sm text-gray-300">
            วิเคราะห์ข้อมูลค่าใช้จ่ายอัตโนมัติ
        </div>

        <div className="mt-2 inline-flex items-center gap-2 rounded-2xl border border-cyan-400/20 bg-cyan-500/10 px-3 py-1 text-sm text-cyan-200 backdrop-blur-xl">

        <span>
            🚗
        </span>

        <span className="font-bold">

            {(currentOdo || 0).toLocaleString()} km

        </span>

        <span className="text-white/50">
            อ้างอิงจากการเติมน้ำมันล่าสุด
        </span>

        </div>

        </div>

    </div>

    {/* ================================= */}
    {/* SMART NOTIFICATIONS */}
    {/* ================================= */}

    {

    notifications.length > 0 && (

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">

    {

        notifications.map(

        (alert, index) => (

            <div

            key={index}

            className={`

                relative overflow-hidden
                rounded-3xl
                border
                p-5
                backdrop-blur-2xl
                transition-all duration-300
                hover:scale-[1.01]

                ${

                alert.color === "red"

                ? `
                    border-red-400/20
                    bg-gradient-to-br from-red-500/15 to-orange-500/10
                `

                : alert.color === "yellow"

                ? `
                    border-yellow-400/20
                    bg-gradient-to-br from-yellow-500/15 to-orange-500/10
                `

                : alert.color === "cyan"

                ? `
                    border-cyan-400/20
                    bg-gradient-to-br from-cyan-500/15 to-blue-500/10
                `

                : alert.color === "purple"

                ? `
                    border-purple-400/20
                    bg-gradient-to-br from-purple-500/15 to-pink-500/10
                `

                : `
                    border-orange-400/20
                    bg-gradient-to-br from-orange-500/15 to-red-500/10
                `
                }

            `}

            >

            {/* Glow */}

            <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent opacity-40" />

            <div className="relative flex items-start gap-4">

                <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-3xl backdrop-blur-xl">

                {alert.icon}

                </div>

                <div className="flex-1">

                <div className="text-xl font-black text-white">

                    {alert.title}

                </div>

                <div className="mt-1 text-sm text-white/70">

                    {alert.description}

                </div>

                </div>

            </div>

            </div>

        )

        )

    }

    </div>

    )
    }

    {/* INSIGHT GRID */}

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-4">

        {/* TOP CATEGORY */}

        <div className="rounded-3xl bg-white/5 border border-white/10 p-5 backdrop-blur-xl">

        <div className="text-sm text-gray-300">
            ใช้จ่ายสูงสุด
        </div>

        <div className="text-2xl font-black text-orange-300 mt-2">

            {topCategory?.name}

        </div>

        <div className="text-sm text-white/70 mt-1">

            ฿{Number(
            topCategory?.value || 0
            ).toLocaleString()}

        </div>

        </div>

        {/* MONTH TREND */}

        <div className="rounded-3xl bg-white/5 border border-white/10 p-5 backdrop-blur-xl">

        <div className="text-sm text-gray-300">
            แนวโน้มเดือนล่าสุด
        </div>

        <div className={`text-2xl font-black mt-2 ${
            trendUp
            ? "text-red-300"
            : "text-green-300"
        }`}>

            {trendUp ? "📈" : "📉"}

            {" "}

            {

                Math.abs(monthlyTrend) > 999

                    ? "999+"

                    : Math.abs(monthlyTrend)

            }%

        </div>

        <div className="text-sm text-white/70 mt-1">

            เทียบเดือนก่อนหน้า

        </div>

        </div>

        {/* TOTAL MONTHS */}

        <div className="rounded-3xl bg-white/5 border border-white/10 p-5 backdrop-blur-xl">

        <div className="text-sm text-gray-300">
            จำนวนเดือนที่ติดตาม
        </div>

        <div className="text-2xl font-black text-cyan-300 mt-2">

            {totalMonths}

        </div>

        <div className="text-sm text-white/70 mt-1">

            เดือน

        </div>

        </div>

        {/* AVERAGE */}

        <div className="rounded-3xl bg-white/5 border border-white/10 p-5 backdrop-blur-xl">

        <div className="text-sm text-gray-300">
            ค่าเฉลี่ยต่อเดือน
        </div>

        <div className="text-2xl font-black text-purple-300 mt-2">

            ฿{Math.round(
            averageMonthly
            ).toLocaleString()}

        </div>

        <div className="text-sm text-white/70 mt-1">

            Monthly Average

        </div>

        </div>

    </div>

        {/* ================================= */}
        {/* PREDICTIVE INSIGHTS */}
        {/* ================================= */}

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mt-4">

        {/* FORECAST */}

        <div className="rounded-3xl bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-400/20 p-5 backdrop-blur-xl">

            <div className="text-sm text-cyan-200">
            🔮 คาดการณ์เดือนถัดไป
            </div>

            <div className="text-2xl font-black text-cyan-300 mt-2">

            ฿{forecastNextMonth.toLocaleString()}

            </div>

            <div className="text-sm text-white/70 mt-1">

            จากค่าเฉลี่ย 3 เดือนล่าสุด

            </div>

        </div>

        {/* WARNING */}

        <div className="rounded-3xl bg-gradient-to-br from-red-500/10 to-orange-500/10 border border-red-400/20 p-5 backdrop-blur-xl">

            <div className="text-sm text-red-200">
            ⚠️ Overspending
            </div>

            <div className="text-xl font-black text-red-300 mt-2">

            {
                overspendingCategory?.name ||
                "ไม่มี"
            }

            </div>

            <div className="text-sm text-white/70 mt-1">

            {
                overspendingCategory

                ? "ใช้จ่ายเกิน 50%"
                : "สมดุลดี"
            }

            </div>

        </div>

        {/* MAINTENANCE */}

            <div

                className={`

                    rounded-3xl
                    border
                    p-5
                    backdrop-blur-xl

                    ${
                    oilService.status === "critical"

                        ? "bg-gradient-to-br from-red-500/20 to-orange-500/20 border-red-400/30"

                        : oilService.status === "warning"

                        ? "bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border-yellow-400/20"

                        : "bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-green-400/20"
                    }

                `}

            >

            <div className="text-sm text-yellow-200">
            🛠️ Maintenance
            </div>

            <div className="text-xl font-black text-yellow-300 mt-2">

            {estimatedMaintenance}

            </div>

            <div className="text-sm text-white/70 mt-1">

            วิเคราะห์จากค่าใช้จ่ายรวม

            </div>

        </div>

        {/* BEHAVIOR */}

        <div className="rounded-3xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-400/20 p-5 backdrop-blur-xl">

            <div className="text-sm text-purple-200">
            📈 Spending Trend
            </div>

            <div className="text-xl font-black text-purple-300 mt-2">

            {trendUp ? "เพิ่มขึ้น" : "คงที่"}

            </div>

            <div className="text-sm text-white/70 mt-1">

            {spendingBehavior}

            </div>

        </div>

        </div>

        {/* ================================= */}
        {/* FUEL AI ANALYTICS */}
        {/* ================================= */}

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mt-6">

        {/* KM/L */}

        <div className="rounded-3xl bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-400/20 p-5 backdrop-blur-xl">

            <div className="text-sm text-green-200">
            ⛽ อัตราสิ้นเปลืองเฉลี่ย
            </div>

            <div className="text-3xl font-black text-green-300 mt-2">

            {averageKmPerLiter}

            <span className="text-lg ml-1">
                km/L
            </span>

            </div>

            <div className="text-sm text-white/70 mt-1">

            Average Efficiency

            </div>

        </div>

        {/* COST/KM */}

        <div className="rounded-3xl bg-gradient-to-br from-orange-500/10 to-red-500/10 border border-orange-400/20 p-5 backdrop-blur-xl">

            <div className="text-sm text-orange-200">
            💸 ค่าใช้จ่ายต่อกิโล
            </div>

            <div className="text-3xl font-black text-orange-300 mt-2">

            ฿{averageCostPerKm}

            </div>

            <div className="text-sm text-white/70 mt-1">

            Cost per KM

            </div>

        </div>

        {/* BEST */}

        <div className="rounded-3xl bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-400/20 p-5 backdrop-blur-xl">

            <div className="text-sm text-cyan-200">
            🏆 เติมคุ้มที่สุด
            </div>

            <div className="text-3xl font-black text-cyan-300 mt-2">

            {bestFuelRecord?.kmPerLiter?.toFixed(1) || 0}

            <span className="text-lg ml-1">
                km/L
            </span>

            </div>

            <div className="text-sm text-white/70 mt-1">

            Best Fuel Record

            </div>

        </div>

        {/* TREND */}

        <div className="rounded-3xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-400/20 p-5 backdrop-blur-xl">

            <div className="text-sm text-purple-200">
            📈 Fuel Trend
            </div>

            <div className="text-xl font-black text-purple-300 mt-2">

            {fuelTrend}

            </div>

            <div className="text-sm text-white/70 mt-1">

            วิเคราะห์จากต้นทุนเชื้อเพลิง

            </div>

        </div>

        </div>  

            {/* ================================= */}
            {/* MAINTENANCE AI */}
            {/* ================================= */}

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mt-6">

            {/* OIL */}

            <div className="rounded-3xl bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border border-yellow-400/20 p-5 backdrop-blur-xl">

                <div className="text-sm text-yellow-200">
                🛢️ น้ำมันเครื่อง
                </div>

                <div className="text-3xl font-black text-yellow-300 mt-2">

                {oilService.remainingKm.toLocaleString()}

                <span className="text-lg ml-1">
                    km
                </span>

                </div>

                <div className="text-sm text-white/70 mt-1">

                เปลี่ยนอีกที่ {oilService.nextKm.toLocaleString()} km

                </div>

                <div className="text-xs text-white/50 mt-1">

                ล่าสุด:
                {maintenanceRecords.oil.lastDate}

                •

                {maintenanceRecords.oil.lastOdo.toLocaleString()} km

                </div>

            </div>

            {/* AIR FILTER */}

            <div className="rounded-3xl bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-400/20 p-5 backdrop-blur-xl">

                <div className="text-sm text-cyan-200">
                🌬️ ไส้กรองอากาศ
                </div>

                <div className="text-3xl font-black text-cyan-300 mt-2">

                {airService.remainingKm.toLocaleString()}

                <span className="text-lg ml-1">
                    km
                </span>

                </div>

                <div className="text-sm text-white/70 mt-1">

                เปลี่ยนอีกที่ {airService.nextKm.toLocaleString()} km

                </div>

                <div className="text-xs text-white/50 mt-1">

                ล่าสุด:
                {maintenanceRecords.airFilter.lastDate}

                •

                {maintenanceRecords.airFilter.lastOdo.toLocaleString()} km

                </div>

            </div>

            {/* TIRES */}

            <div className="rounded-3xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-400/20 p-5 backdrop-blur-xl">

                <div className="text-sm text-purple-200">
                🛞 ยางรถ
                </div>

                <div className="text-3xl font-black text-purple-300 mt-2">

                {tireService.remainingKm.toLocaleString()}

                <span className="text-lg ml-1">
                    km
                </span>

                </div>

                <div className="text-sm text-white/70 mt-1">

                อายุยาง 20,000 km

                </div>

                <div className="text-xs text-white/50 mt-1">

                ล่าสุด:
                {maintenanceRecords.tires.lastDate}

                •

                {maintenanceRecords.tires.lastOdo.toLocaleString()} km

                </div>

            </div>

            {/* SCORE */}

            <div className="rounded-3xl bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-400/20 p-5 backdrop-blur-xl">

                <div className="text-sm text-green-200">
                🔧 Vehicle Health
                </div>

                <div className="text-3xl font-black text-green-300 mt-2">

                {maintenanceScore}%

                </div>

                <div className="text-sm text-white/70 mt-1">

                {serviceStatus}

                </div>

            </div>

            </div>

            {/* ================================= */}
            {/* SERVICE TIMELINE */}
            {/* ================================= */}

            <div className="mt-8 rounded-[32px] border border-white/10 bg-white/5 p-6 backdrop-blur-2xl">

            {/* HEADER */}

            <div className="flex items-center justify-between mb-6">

                <div>

                <h2 className="text-2xl font-black text-white">

                    🕘 ประวัติการ Service

                </h2>

                <p className="text-sm text-white/50 mt-1">

                    ประวัติการดูแลรักษารถย้อนหลัง

                </p>

                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/60">

                <div className="flex items-center gap-3">

                <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/60">

                    {serviceHistory.length} records

                </div>

                <button

                    onClick={() =>
                    setShowServiceModal(true)
                    }

                    className="rounded-2xl bg-cyan-500/20 border border-cyan-400/20 px-4 py-2 text-sm font-semibold text-cyan-200 hover:bg-cyan-500/30 transition-all"

                >

                    + เพิ่มรายการ

                </button>

                </div>

                </div>

            </div>

            {/* TIMELINE */}

            <div className="space-y-4">

                {

                serviceHistory
                    .slice() // clone แบบ safe
                    .sort((a, b) =>
                    new Date(b.date) - new Date(a.date)
                    )

                .map(

                    (item, index) => (

                    <div

                        key={item.id || index}

                        className="group relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.03] p-5 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.07]"

                    >

                        {/* Glow */}

                        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-400/5 to-purple-500/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                        <div className="relative flex items-center justify-between">

                        {/* LEFT */}

                        <div className="flex items-center gap-4">

                            <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-2xl backdrop-blur-xl">

                            {item.icon}

                            </div>

                            <div>

                            <div className="text-lg font-bold text-white">

                                {item.title}

                            </div>

                            <div className="mt-1 text-sm text-white/50">

                                {item.note}

                            </div>

                            </div>

                        </div>

                        {/* RIGHT */}

                        <div className="text-right">

                            <div className="text-lg font-black text-cyan-300">

                            {item.odo.toLocaleString()} km

                            </div>

                            <div className="mt-1 text-sm text-white/50">

                            {item.date}

                            </div>

                            <div className="flex items-center justify-end gap-2 mt-3">

                                <button

                                    onClick={() =>

                                    handleEditService(
                                        item,
                                        index
                                    )

                                    }

                                    className="rounded-xl border border-cyan-400/20 bg-cyan-500/10 px-3 py-1 text-xs font-semibold text-cyan-200 transition-all hover:bg-cyan-500/20"

                                >

                                    ✏️ Edit

                                </button>

                                <button

                                    onClick={() =>
                                    handleDeleteService(index)
                                    }

                                    className="rounded-xl border border-red-400/20 bg-red-500/10 px-3 py-1 text-xs font-semibold text-red-200 transition-all hover:bg-red-500/20"

                                >

                                    🗑 Delete

                                </button>

                                </div>

                        </div>

                        </div>

                    </div>

                    )

                )

                }

            </div>

            </div>

            {/* ================================= */}
            {/* SERVICE MODAL */}
            {/* ================================= */}

            {

            showServiceModal && (

            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-md p-4">

            <div className="w-full max-w-xl rounded-[32px] border border-white/10 bg-[#2b124c]/95 p-6 backdrop-blur-2xl shadow-2xl">

                {/* HEADER */}

                <div className="flex items-center justify-between mb-6">

                <div>

                    <h2 className="text-2xl font-black text-white">

                    {

                    editingIndex !== null

                    ? "แก้ไข Service"

                    : "เพิ่มประวัติ Service"

                    }

                    </h2>

                    <div className="text-sm text-white/50 mt-1">

                    บันทึกการดูแลรักษารถ

                    </div>

                </div>

                <button

                    onClick={() =>
                    setShowServiceModal(false)
                    }

                    className="text-white/50 hover:text-white"

                >

                    ✕

                </button>

                </div>

                {/* TYPE */}

                <div className="grid grid-cols-3 gap-3 mb-5">

                {[

                    {
                    key: "oil",
                    label: "น้ำมันเครื่อง",
                    icon: "🛢️"
                    },

                    {
                    key: "airFilter",
                    label: "กรองอากาศ",
                    icon: "🌬️"
                    },

                    {
                    key: "tires",
                    label: "ยาง",
                    icon: "🛞"
                    }

                ].map((item) => (

                    <button

                    key={item.key}

                    onClick={() =>
                        setSelectedService(
                        item.key
                        )
                    }

                    className={`

                        rounded-2xl
                        border
                        p-4
                        text-sm
                        transition-all

                        ${

                        selectedService === item.key

                        ? `
                            border-cyan-400/30
                            bg-cyan-500/20
                            text-cyan-200
                        `

                        : `
                            border-white/10
                            bg-white/5
                            text-white/70
                        `
                        }

                    `}

                    >

                    <div className="text-2xl mb-2">

                        {item.icon}

                    </div>

                    {item.label}

                    </button>

                ))}

                </div>

                {/* FORM */}

                <div className="space-y-4">

                <div>

                    <div className="text-sm text-white/70 mb-2">

                    วันที่

                    </div>

                    <input

                    type="date"

                    value={serviceForm.date}

                    onChange={(e) =>

                        setServiceForm({

                        ...serviceForm,

                        date: e.target.value

                        })

                    }

                    className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none"

                    />

                </div>

                <div>

                    <div className="text-sm text-white/70 mb-2">

                    เลขไมล์

                    </div>

                    <input

                    type="number"

                    value={serviceForm.odo}

                    onChange={(e) =>

                        setServiceForm({

                        ...serviceForm,

                        odo: e.target.value

                        })

                    }

                    className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none"

                    />

                </div>

                <div>

                    <div className="text-sm text-white/70 mb-2">

                    หมายเหตุ

                    </div>

                    <textarea

                    rows={3}

                    value={serviceForm.note}

                    onChange={(e) =>

                        setServiceForm({

                        ...serviceForm,

                        note: e.target.value

                        })

                    }

                    className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none resize-none"

                    />

                </div>

                </div>

                {/* ACTION */}

                <button
                type="button"
                onClick={(e) => {

                e.preventDefault();

                if (isSaving) return; // 🔥 กันยิงซ้ำ
                setIsSaving(true);

                if (!serviceForm.date || !serviceForm.odo) {
                    alert("กรอกข้อมูลให้ครบก่อน");
                    setIsSaving(false);
                    return;
                }

                const config = {
                    oil: { icon: "🛢️", title: "เปลี่ยนน้ำมันเครื่อง" },
                    airFilter: { icon: "🌬️", title: "เปลี่ยนกรองอากาศ" },
                    tires: { icon: "🛞", title: "เปลี่ยนยาง" }
                };

                const item = config[selectedService];

                const newRecord = {
                    id: Date.now(),
                    type: selectedService,
                    icon: item.icon,
                    title: item.title,
                    date: serviceForm.date,
                    odo: Number(serviceForm.odo),
                    note: serviceForm.note
                };

                const exists = serviceHistory.some(
                    (s) =>
                    s.type === newRecord.type &&
                    s.date === newRecord.date &&
                    s.odo === newRecord.odo
                );

                if (exists) {
                    alert("รายการนี้มีอยู่แล้ว");
                    setIsSaving(false);
                    return;
                }

                let updated = [...serviceHistory];

                if (editingIndex !== null) {
                    updated[editingIndex] = newRecord;
                } else {
                    updated.unshift(newRecord);
                }
            
                setServiceHistory(updated);

                setServiceForm({ date: "", odo: "", note: "" });
                setShowServiceModal(false);
                setEditingIndex(null);
                
                setTimeout(() => setIsSaving(false), 300); // reset flag
                }}

                className="mt-6 w-full rounded-2xl bg-cyan-500/20 border border-cyan-400/20 py-4 font-bold text-cyan-200 transition-all hover:bg-cyan-500/30"

                >

                {

                    editingIndex !== null

                    ? "💾 บันทึกการแก้ไข"

                    : "💾 บันทึก Service"

                }

                </button>

            </div>

            </div>

            )
            }

    </div>  

      {/* ================================= */}
      {/* PIE CHART */}
      {/* ================================= */}

      <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-white/5 backdrop-blur-2xl p-6 shadow-2xl">

        {/* Glow */}

        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />

        {/* HEADER */}

        <div className="flex items-center gap-4 mb-8 relative z-10">

          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-400/30 to-pink-500/20 border border-white/10 flex items-center justify-center text-2xl backdrop-blur-xl">

            🥧

          </div>

          <div>

            <h3 className="text-3xl font-black text-white">
              สัดส่วนค่าใช้จ่าย
            </h3>

            <div className="text-sm text-gray-300">
              วิเคราะห์ค่าใช้จ่ายแต่ละหมวดหมู่
            </div>

            {activeCategory && (

            <div className="mt-2 text-sm text-orange-300">

                กำลังดู:
                {" "}

                {
                CATEGORY_CONFIG[
                    activeCategory
                ]?.label
                }

            </div>

            )}

          </div>

        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">

          {/* PIE */}

          <div className="h-[340px] relative">

            <ResponsiveContainer>

              <PieChart>

                <defs>

                  <filter
                    id="glassGlow"
                    x="-50%"
                    y="-50%"
                    width="200%"
                    height="200%"
                    >

                    <feGaussianBlur
                        stdDeviation="18"
                        result="blur"
                    />

                    <feColorMatrix
                        in="blur"
                        type="matrix"
                        values="
                        1 0 0 0 0
                        0 1 0 0 0
                        0 0 1 0 0
                        0 0 0 18 -7
                        "
                        result="glow"
                    />

                    <feBlend
                        in="SourceGraphic"
                        in2="glow"
                    />

                    </filter>

                </defs>

                <Pie
                    data={categoryChartData}

                    dataKey="value"

                    innerRadius={88}

                    outerRadius={128}

                    paddingAngle={4}

                    cornerRadius={999}

                    stroke="rgba(255,255,255,0.15)"

                    strokeWidth={2}
                >

                  {categoryChartData.map(
                    (entry, index) => (

                      <Cell
                        key={index}

                        fill={entry.color}

                        filter="url(#glassGlow)"

                        opacity={

                            activeCategory &&
                            activeCategory !==
                            entry.key

                            ? 0.25

                            : 1

                        }

                        onClick={() =>

                            setActiveCategory(

                            activeCategory ===
                            entry.key

                                ? null

                                : entry.key

                            )

                        }

                        style={{
                            cursor: "pointer",

                            transition:
                            "all 0.35s ease"
                        }}
                        />

                    )
                  )}

                </Pie>

                <Tooltip

                  contentStyle={{

                    background:
                      "rgba(20,20,40,0.85)",

                    border:
                      "1px solid rgba(255,255,255,0.1)",

                    borderRadius: 16,

                    backdropFilter:
                      "blur(20px)",

                    color: "white"

                  }}

                  formatter={(value) =>

                    `฿${Number(
                      value
                    ).toLocaleString()}`

                  }

                />

              </PieChart>

            </ResponsiveContainer>

            {/* CENTER */}

            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">

              <div className="text-sm text-gray-300">
                รวมทั้งหมด
              </div>

              <div className="text-4xl font-black text-white drop-shadow-lg">

                ฿{total.toLocaleString()}

              </div>

            </div>

          </div>

          {/* LEGEND */}

          <div className="space-y-4">

            {categoryChartData

            .filter((item) =>

                activeCategory

                ? item.key ===
                    activeCategory

                : true

            )

            .map(
              (item) => {

                const percentage =

                  (
                    (item.value /
                      total) *

                    100
                  ).toFixed(1);

                return (

                  <div
                    key={item.key}

                    className={`group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-5 transition-all duration-300 hover:scale-[1.02] hover:bg-white/10 ${item.glow}`}
                  >

                    <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent opacity-50" />

                    <div className="relative z-10 flex items-center justify-between">

                      <div className="flex items-center gap-4">

                        <div
                        className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shadow-2xl border border-white/10 backdrop-blur-xl"
                        style={{

                            background:
                            `${item.color}25`,

                            boxShadow:
                            `0 0 25px ${item.color}40`

                        }}
                        >

                        {item.icon}

                        </div>

                        <div>

                          <div className="font-bold text-lg text-white">
                            {item.name}
                          </div>

                          <div className="text-sm text-gray-300">

                            {percentage}%

                          </div>
                          <div className="mt-3 w-full h-2 rounded-full bg-white/10 overflow-hidden">

                            <div
                                className="h-full rounded-full transition-all duration-700"
                                style={{

                                width: `${percentage}%`,

                                background:
                                    item.color

                                }}
                            />

                            </div>

                        </div>

                      </div>

                      <div className="text-right">

                        <div className="text-2xl font-black text-white">

                          ฿{Number(
                            item.value
                          ).toLocaleString()}

                        </div>

                      </div>

                    </div>

                  </div>

                );

              }
            )}

          </div>

        </div>

      </div>

      {/* ================================= */}
      {/* BAR CHART */}
      {/* ================================= */}

      <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-white/5 backdrop-blur-2xl p-6 shadow-2xl">

        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />

        {/* HEADER */}

        <div className="flex items-center gap-4 mb-6 relative z-10">

        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-400/30 to-cyan-500/20 border border-white/10 flex items-center justify-center text-2xl backdrop-blur-xl">

            📊

        </div>

        <div>

            <h3 className="text-3xl font-black text-white">
            ค่าใช้จ่ายรายเดือน
            </h3>

            <div className="text-sm text-gray-300">
            ภาพรวมค่าใช้จ่ายรายเดือน
            </div>

        </div>

        </div>

        {/* INSIGHT CARDS */}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">

        {/* TOP MONTH */}

        <div className="rounded-3xl bg-white/5 border border-white/10 p-5 backdrop-blur-xl">

            <div className="text-sm text-gray-300">
            เดือนใช้สูงสุด
            </div>

            <div className="text-2xl font-black text-orange-300 mt-2">

            {topMonth?.month || "-"}

            </div>

            <div className="text-sm text-white/70 mt-1">

            ฿{Number(
                topMonth?.total || 0
            ).toLocaleString()}

            </div>

        </div>

        {/* AVG */}

        <div className="rounded-3xl bg-white/5 border border-white/10 p-5 backdrop-blur-xl">

            <div className="text-sm text-gray-300">
            เฉลี่ยต่อเดือน
            </div>

            <div className="text-2xl font-black text-cyan-300 mt-2">

            ฿{Math.round(
                averageMonthly
            ).toLocaleString()}

            </div>

            <div className="text-sm text-white/70 mt-1">

            Monthly Average

            </div>

        </div>

        </div>

        {/* RANGE FILTER */}

        <div className="flex flex-wrap gap-3 mb-6">

        {[
            "3",
            "6",
            "12",
            "ALL"
        ].map((item) => (

            <button
            key={item}

            onClick={() =>
                setRange(item)
            }

            className={`

                px-5 py-3 rounded-2xl
                border border-white/10
                backdrop-blur-xl
                transition-all duration-300
                font-semibold

                ${
                range === item

                    ? `
                    bg-orange-500/30
                    text-white
                    shadow-lg shadow-orange-500/20
                    `

                    : `
                    bg-white/5
                    text-gray-300
                    hover:bg-white/10
                    `
                }

            `}
            >

            {item === "ALL"

                ? "ทั้งหมด"

                : `${item} เดือน`
            }

            </button>

        ))}

        </div>

        {/* CHART */}

        <div className="h-[340px] min-h-[340px] w-full">

          <ResponsiveContainer width="100%" height="100%">

            <BarChart
              data={monthlyChartData}
            >

              <defs>

                <linearGradient
                  id="barGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >

                  <stop
                    offset="0%"
                    stopColor="#fb923c"
                  />

                  <stop
                    offset="100%"
                    stopColor="#f97316"
                  />

                </linearGradient>

              </defs>

              <CartesianGrid
                strokeDasharray="4 4"
                opacity={0.08}
              />

              <XAxis
                dataKey="month"
                stroke="#c4b5fd"
                tick={{
                  fill: "#ddd6fe"
                }}
              />

              <YAxis
                stroke="#c4b5fd"
                tick={{
                  fill: "#ddd6fe"
                }}
              />

              <Tooltip

                contentStyle={{

                  background:
                    "rgba(20,20,40,0.85)",

                  border:
                    "1px solid rgba(255,255,255,0.1)",

                  borderRadius: 16,

                  backdropFilter:
                    "blur(20px)",

                  color: "white"

                }}

                formatter={(value) =>

                  `฿${Number(
                    value
                  ).toLocaleString()}`

                }

              />

              <Bar
                dataKey="total"

                radius={[14, 14, 0, 0]}

                fill="url(#barGradient)" animationDuration={1200}
              />

            </BarChart>

          </ResponsiveContainer>

        </div>

      </div>

    </div>

  );

};

export default AnalyticsCharts;