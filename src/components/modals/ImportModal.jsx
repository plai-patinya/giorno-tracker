import { Upload, X } from "lucide-react";

const ImportModal = ({
  showImportModal,
  setShowImportModal,
  importText,
  setImportText,
  handleImportFromText
}) => {

  if (!showImportModal) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn"
      onClick={(e) =>
        e.target === e.currentTarget &&
        (setShowImportModal(false), setImportText(''))
      }
    >

      <div className="bg-slate-800/95 backdrop-blur-xl rounded-2xl p-4 w-full max-w-2xl border border-white/20 shadow-2xl animate-scaleIn max-h-[90vh] overflow-y-auto">

        <div className="flex items-center justify-between mb-6">

          <div className="flex items-center gap-3">
            <Upload className="text-blue-400" size={24} />
            <h3 className="text-2xl font-bold">
              นำเข้าข้อมูล
            </h3>
          </div>

          <button
            onClick={() => {
              setShowImportModal(false);
              setImportText('');
            }}
            className="p-2 hover:bg-white/10 rounded-lg transition-all"
          >
            <X size={24} />
          </button>

        </div>

        <div className="space-y-4">

          <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4">

            <div className="text-sm font-semibold text-blue-300 mb-2">
              วิธีใช้งาน:
            </div>

            <ol className="text-sm text-gray-300 space-y-2 ml-4 list-decimal">
              <li>เปิดไฟล์สำรองจาก Notes/Files</li>
              <li>คัดลอกข้อความ JSON ทั้งหมด</li>
              <li>วางในช่องด้านล่าง</li>
              <li>กดปุ่ม "นำเข้าข้อมูล"</li>
            </ol>

          </div>

          <div>

            <label className="block text-sm font-medium mb-2 text-gray-300">
              วางข้อมูล JSON ที่นี่:
            </label>

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
              onClick={() => {
                setShowImportModal(false);
                setImportText('');
              }}
              className="px-6 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl py-3 font-bold transition-all"
            >
              ยกเลิก
            </button>

          </div>

          <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4">

            <div className="text-xs text-yellow-300 flex items-start gap-2">

              <span>⚠️</span>

              <span>
                <strong>คำเตือน:</strong> การนำเข้าข้อมูลจะแทนที่ข้อมูลปัจจุบันทั้งหมด กรุณาส่งออกข้อมูลปัจจุบันก่อนถ้าต้องการเก็บไว้
              </span>

            </div>

          </div>

        </div>

      </div>

    </div>
  );

};

export default ImportModal;