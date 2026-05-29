export const btnPrimary =
  "px-3 py-2 text-xs sm:text-sm rounded-xl bg-cyan-500/20 border border-cyan-400/20 text-cyan-200 hover:bg-cyan-500/30 transition-all";

export const btnDanger =
  "px-3 py-2 text-xs sm:text-sm rounded-xl bg-red-500/20 border border-red-500/30 text-red-300 hover:bg-red-500/30 transition-all";

export const cardStyle = `
  rounded-3xl

  border border-white/10

  bg-gradient-to-br
  from-white/[0.08]
  to-white/[0.03]

  backdrop-blur-2xl

  shadow-[0_8px_40px_rgba(0,0,0,0.25)]

  relative
  overflow-hidden
`;

export const hoverCard = `
  transition-all
  duration-500

  hover:-translate-y-1
  hover:scale-[1.015]

  hover:shadow-[0_10px_50px_rgba(168,85,247,0.25)]
`;

export const glassOverlay = `
  before:absolute
  before:inset-0
  before:bg-gradient-to-br
  before:from-white/10
  before:to-transparent
  before:pointer-events-none
`;