import { KPI_VARIANTS } from "../../constants/designSystem";
const KpiCard = ({
  icon,
  label,
  value,
  subtitle,
  valueColor = "text-white",
  className = "",
  variant = "default",
  colorVariant = "default",
}) => {
  const variants = {
    default: `
    rounded-3xl
    border
    border-white/10
    bg-white/[0.04]
    backdrop-blur-xl
    p-5
  `,

    compact: `
    rounded-2xl
    border
    border-white/10
    bg-white/[0.05]
    backdrop-blur-xl
    p-4
  `,

    premium: `
    rounded-3xl
    border
    border-cyan-500/20
    bg-gradient-to-br
    from-cyan-500/10
    to-purple-500/10
    backdrop-blur-xl
    p-5
    shadow-lg
  `,
  };
  const colorConfig = KPI_VARIANTS[colorVariant] || KPI_VARIANTS.default;
  return (
    <div
      className={`
            ${variants[variant]}

            ${className}
        `}
    >
      <div
        className="
          flex
          items-center
          gap-2

          text-sm
          text-white/60
        "
      >
        {icon}

        {label}
      </div>

      <div
        className={`
          mt-3

          ${variant === "compact" ? "text-2xl" : "text-3xl"}

          font-black

          ${colorConfig.value}
        `}
      >
        {value}
      </div>

      {subtitle && (
        <div
          className="
            text-sm
            text-white/50
            mt-1
          "
        >
          {subtitle}
        </div>
      )}
    </div>
  );
};

export default KpiCard;
