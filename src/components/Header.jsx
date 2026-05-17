import {
  Download,
  Upload,
  MoreVertical,
  LogOut
} from "lucide-react";

const Header = ({
  user,
  logout,

  stats,

  showExportMenu,
  setShowExportMenu,

  exportAllData,
  backupData,

  setShowImportModal,

  resetData,

  formatThaiDate
}) => {

  return (
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

          <div className="flex-1 flex justify-end items-center gap-3">

            <div className="text-sm text-gray-400 hidden sm:block">
              {user?.email}
            </div>

            <button
              onClick={logout}
              className="px-4 py-2 rounded-xl bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 text-red-300 transition-all flex items-center gap-2"
            >
              <LogOut size={18} />
              Logout
            </button>

            <div className="relative">

              <button
                onClick={() => setShowExportMenu(!showExportMenu)}
                className="p-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all"
              >
                <MoreVertical size={20} />
              </button>

              {showExportMenu && (

                <div className="absolute right-0 mt-2 w-64 bg-slate-800/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-50">

                  <button
                    onClick={exportAllData}
                    className="w-full px-4 py-3 text-left hover:bg-white/5 transition-all flex items-center gap-3"
                  >
                    <Download size={18} className="text-green-400" />
                    <span>Export JSON</span>
                  </button>

                  <button
                    onClick={backupData}
                    className="w-full px-4 py-3 text-left hover:bg-white/5 transition-all flex items-center gap-3"
                  >
                    <Download size={18} className="text-blue-400" />
                    <span>Backup to File</span>
                  </button>

                  <button
                    onClick={() => {
                      setShowImportModal(true);
                      setShowExportMenu(false);
                    }}
                    className="w-full px-4 py-3 text-left hover:bg-white/5 transition-all flex items-center gap-3"
                  >
                    <Upload size={18} className="text-yellow-400" />
                    <span>Import Data</span>
                  </button>

                  <button
                    onClick={resetData}
                    className="w-full px-4 py-3 text-left hover:bg-red-500/10 transition-all flex items-center gap-3 text-red-300"
                  >
                    ⚠️ Reset Data
                  </button>

                </div>

              )}

            </div>

          </div>

        </div>

        <p className="text-gray-300 text-base sm:text-lg">
          Track Your Dream Build
        </p>

        <div className="flex items-center justify-center gap-2 sm:gap-4 mt-3 text-xs sm:text-sm text-gray-400 flex-wrap">

          <span>
            📅 รับรถ {formatThaiDate('2025-02-21')}
          </span>

          <span>•</span>

          <span>
            ⏱️ {stats.daysSinceReceived} วัน
          </span>

          <span>•</span>

          <span className="text-yellow-400">
            💾 v1.0
          </span>

        </div>

      </div>

    </div>
  );

};

export default Header;