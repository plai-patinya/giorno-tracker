import { Download, Upload, MoreVertical, LogOut } from "lucide-react";
import { calculateDuration } from "../utils/dateUtils";

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

  formatThaiDate,
  onAccountClick,
  onClick = { onAccountClick },
}) => {
  const duration = calculateDuration("2025-02-21");
  const APP_VERSION = "1.0.0";

  return (
    <div className="text-center mb-8 relative">
      <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-red-500/20 blur-3xl"></div>

      <div className="relative">
        <div className="relative flex items-start justify-center mb-4">
          {/* 🔥 TITLE CENTER */}
          <div className="text-center">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black mb-2 tracking-tight bg-gradient-to-r from-orange-400 via-red-400 to-pink-400 bg-clip-text text-transparent">
              🏍️ HONDA GIORNO
            </h1>
          </div>

          {/* 🔥 RIGHT SIDE */}
          <div className="absolute right-0 top-0 flex items-center gap-3">
            <div className="text-sm text-gray-400 hidden sm:block">
              {user?.email}
            </div>
            <button
              onClick={onAccountClick}
              className="
                    w-10
                    h-10
                    rounded-2xl
                    border
                    border-white/10
                    bg-white/5
                    overflow-hidden
                  "
            >
              {user?.photoURL ? (
                <img
                  src={user.photoURL}
                  alt="profile"
                  className="
                        w-full
                        h-full
                        object-cover
                      "
                />
              ) : (
                <span>👤</span>
              )}
            </button>
          </div>
        </div>

        <p className="text-gray-400 text-sm sm:text-base">
          Vehicle Intelligence Platform
        </p>

        <div className="flex items-center justify-center gap-2 sm:gap-4 mt-3 text-xs sm:text-sm text-gray-400 flex-wrap">
          <span>📅 รับรถ {formatThaiDate("2025-02-21")}</span>

          <span>•</span>

          <span>
            ⏱️{" "}
            {duration
              ? `${duration.years > 0 ? duration.years + " ปี " : ""}${
                  duration.months > 0 ? duration.months + " เดือน " : ""
                }${duration.days} วัน`
              : "..."}
          </span>

          <span>•</span>

          <span className="text-gray-400">💾 v{APP_VERSION}</span>
        </div>
      </div>
    </div>
  );
};

export default Header;
