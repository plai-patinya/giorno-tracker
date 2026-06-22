export const KPI_COLORS = {
  success: "text-emerald-300",
  warning: "text-yellow-300",
  danger: "text-red-300",
  info: "text-cyan-300",
  primary: "text-white",
};

export const CARD_STYLES = {
  glass: `
    rounded-3xl
    border
    border-white/10
    bg-white/[0.04]
    backdrop-blur-xl
  `,
};

export const STATUS_COLORS = {
  healthy: {
    text: "text-emerald-300",
    border: "border-emerald-500/20",
  },

  warning: {
    text: "text-yellow-300",
    border: "border-yellow-500/20",
  },

  danger: {
    text: "text-red-300",
    border: "border-red-500/20",
  },
};
export const KPI_VARIANTS = {
  info: {
    value: "text-cyan-300",
    border: "border-cyan-500/20",
    glow: "shadow-cyan-500/10",
  },

  success: {
    value: "text-emerald-300",
    border: "border-emerald-500/20",
    glow: "shadow-emerald-500/10",
  },

  warning: {
    value: "text-yellow-300",
    border: "border-yellow-500/20",
    glow: "shadow-yellow-500/10",
  },

  danger: {
    value: "text-red-300",
    border: "border-red-500/20",
    glow: "shadow-red-500/10",
  },

  money: {
    value: "text-pink-300",
    border: "border-pink-500/20",
    glow: "shadow-pink-500/10",
  },

  default: {
    value: "text-white",
    border: "border-white/10",
    glow: "",
  },
};
