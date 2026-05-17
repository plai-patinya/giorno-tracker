import {
  CheckCircle,
  AlertCircle,
  Info,
  XCircle
} from "lucide-react";

const NotificationToast = ({
  notification
}) => {

  if (!notification.show) return null;

  const icons = {
    success: <CheckCircle size={22} />,
    error: <XCircle size={22} />,
    warning: <AlertCircle size={22} />,
    info: <Info size={22} />
  };

  const colors = {
    success: "from-green-500 to-emerald-600",
    error: "from-red-500 to-pink-600",
    warning: "from-yellow-500 to-orange-500",
    info: "from-blue-500 to-cyan-600"
  };

  return (
    <div className="fixed top-5 right-5 z-[100] animate-slideInRight">

      <div className={`bg-gradient-to-r ${colors[notification.type]} shadow-2xl rounded-2xl px-5 py-4 flex items-center gap-3 min-w-[300px] border border-white/20`}>

        <div className="text-white">
          {icons[notification.type]}
        </div>

        <div className="flex-1">

          <div className="font-bold text-white">
            {notification.title}
          </div>

          <div className="text-sm text-white/90">
            {notification.message}
          </div>

        </div>

      </div>

    </div>
  );

};

export default NotificationToast;