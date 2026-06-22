const StatusBadge = ({ icon, label, variant = "default" }) => {
  const variants = {
    success: `
      bg-emerald-500/15
      border-emerald-500/20
      text-emerald-300
    `,

    warning: `
      bg-yellow-500/15
      border-yellow-500/20
      text-yellow-300
    `,

    danger: `
      bg-red-500/15
      border-red-500/20
      text-red-300
    `,

    info: `
      bg-cyan-500/15
      border-cyan-500/20
      text-cyan-300
    `,

    default: `
      bg-white/10
      border-white/10
      text-white
    `,
  };

  return (
    <div
      className={`
        inline-flex
        items-center
        gap-2

        px-3 py-2

        rounded-full

        border

        backdrop-blur-xl

        text-sm
        font-semibold

        ${variants[variant]}
      `}
    >
      {icon}

      {label}
    </div>
  );
};

export default StatusBadge;
