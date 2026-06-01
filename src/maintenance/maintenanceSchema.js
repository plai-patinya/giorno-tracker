export const createMaintenanceRecord = () => ({

  //
  // 🔑 IDENTITY
  //

  id: crypto.randomUUID(),

  //
  // 🛠️ SERVICE INFO
  //

  type: "",

  category: "",

  title: "",

  //
  // 📅 DATE
  //

  date: "",

  serviceOdometer: 0,
  nextServiceKm: "",

  //
  // 💰 COST
  //

  laborCost: 0,

  partsCost: 0,

  totalCost: 0,

  //
  // 🧩 PARTS
  //

  parts: [],

  //
  // 🏪 SHOP
  //

  shop: "",

  technician: "",

  //
  // 🏷️ BRAND
  //

  brand: "",

  //
  // 🔁 NEXT SERVICE
  //

  nextDueOdo: 0,

  nextDueDate: "",

  //
  // 🧾 WARRANTY
  //

  warrantyDays: 0,

  warrantyKm: 0,

  //
  // 📝 NOTE
  //

  note: "",

  //
  // 📷 ATTACHMENTS
  //

  images: [],

  //
  // ⏱️ SYSTEM
  //

  createdAt:
    new Date().toISOString(),

  updatedAt:
    new Date().toISOString()

});