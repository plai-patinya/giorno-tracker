import { Download, X, Check } from "lucide-react";

const ExportModal = ({
  showExportModal,
  setShowExportModal,

  exportedData,

  copyToClipboard,
  downloadAsFile
}) => {

  if (!showExportModal) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn"
      onClick={(e) =>
        e.target === e.currentTarget &&
        setShowExportModal(false)
      }
    >
      <div className="bg-slate-800/95 backdrop-blur-xl rounded-2xl p-6 w-full max-w-2xl border border-white/20 shadow-2xl animate-scaleIn max-h-[90vh] overflow-y-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-6">

          <div className="flex items-center gap-3">
            <Download className="text-green-400" size={24} />
            <h3 className="text-2xl font-bold">
              ส่งออกข้อมูล
            </h3>
          </div>

          <button
            onClick={() => setShowExportModal(false)}
            className="p-2 hover:bg-white/10 rounded-lg transition-all"
          >
            <X size={24} />
          </button>

        </div>

        {/* Content */}
        <div className="space-y-4">

          {/* iPhone Guide */}
          <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4">

            <div className="text-sm font-semibold text-blue-300 mb-2">
              📱 สำหรับ iPhone/iPad:
            </div>

            <ol className="text-sm text-gray-300 space-y-2 ml-4 list-decimal">
              <li>กดปุ่ม "คัดลอกข้อมูล"</li>
              <li>เปิด Notes หรือ Files</li>
              <li>สร้างไฟล์ใหม่</li>
              <li>Paste ข้อมูล</li>
              <li>บันทึกลง iCloud</li>
            </ol>

          </div>

          {/* Computer Guide */}
          <div className="bg-orange-500/10 border border-orange-500/30 rounded-xl p-4">

            <div className="text-sm font-semibold text-orange-300 mb-2">
              💻 สำหรับคอมพิวเตอร์:
            </div>

            <ol className="text-sm text-gray-300 space-y-2 ml-4 list-decimal">
              <li>กดปุ่มดาวน์โหลดไฟล์</li>
              <li>หรือคัดลอกเป็น .json</li>
            </ol>

          </div>

          {/* JSON */}
          <div>

            <div className="flex items-center justify-between mb-2">

              <label className="block text-sm font-medium text-gray-300">
                ข้อมูล JSON:
              </label>

              <span className="text-xs text-gray-500">
                {exportedData.length} ตัวอักษร
              </span>

            </div>

            <textarea
              value={exportedData}
              readOnly
              className="w-full h-64 bg-black/30 border border-white/10 rounded-xl px-4 py-3 font-mono text-xs text-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
              onClick={(e) => e.target.select()}
            />

          </div>

          {/* Buttons */}
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

          {/* Footer */}
          <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4">

            <div className="text-xs text-yellow-300 flex items-start gap-2">

              <span>💡</span>

              <span>
                <strong>เคล็ดลับ:</strong>
                บันทึกลง iCloud Drive เพื่อเข้าถึงได้ทุกอุปกรณ์
              </span>

            </div>

          </div>

        </div>
      </div>
    </div>
  );

};

export default ExportModal;