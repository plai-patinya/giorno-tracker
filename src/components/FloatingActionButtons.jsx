import {
  Fuel,
  PlusCircle
} from "lucide-react";

const FloatingActionButtons = ({
  view,
  setShowFuelModal,
  setShowAddModal
}) => {

  return (
    <div className="fixed bottom-[calc(1.5rem+env(safe-area-inset-bottom))] right-4 sm:right-6 flex flex-col gap-3 z-40">

      {view === 'fuel' && (
        <button
          onClick={() => setShowFuelModal(true)}
          className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 rounded-full shadow-2xl flex items-center justify-center transition-all hover:scale-110"
          title="เพิ่มข้อมูลน้ำมัน"
        >
          <Fuel size={24} className="sm:w-7 sm:h-7" />
        </button>
      )}

      {view !== 'fuel' && (
        <button
          onClick={() => setShowAddModal(true)}
          className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 rounded-full shadow-2xl flex items-center justify-center transition-all hover:scale-110"
          title="เพิ่มรายการใหม่"
        >
          <PlusCircle size={24} className="sm:w-7 sm:h-7" />
        </button>
      )}

    </div>
  );

};

export default FloatingActionButtons;