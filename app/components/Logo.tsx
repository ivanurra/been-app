type Props = {
  size?: "sm" | "md" | "lg";
};

const SIZE_CONFIG = {
  sm: { icon: 28, text: "text-lg", gap: "gap-2" },
  md: { icon: 36, text: "text-2xl", gap: "gap-2.5" },
  lg: { icon: 48, text: "text-4xl", gap: "gap-3" },
};

export default function Logo({ size = "md" }: Props) {
  const sizeConfig = SIZE_CONFIG[size];

  return (
    <div className={`flex items-center ${sizeConfig.gap}`}>
      {/* Globe pin icon */}
      <svg
        width={sizeConfig.icon}
        height={sizeConfig.icon}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="flex-shrink-0"
      >
        {/* Pin body */}
        <path
          d="M24 4C16.268 4 10 10.268 10 18c0 10.5 14 26 14 26s14-15.5 14-26c0-7.732-6.268-14-14-14z"
          className="fill-teal-600"
        />
        {/* Globe circle */}
        <circle cx="24" cy="18" r="9" className="fill-white/90" />
        {/* Globe meridians */}
        <ellipse
          cx="24"
          cy="18"
          rx="3.5"
          ry="9"
          className="stroke-teal-600"
          strokeWidth="1.3"
          fill="none"
        />
        <line
          x1="15"
          y1="18"
          x2="33"
          y2="18"
          className="stroke-teal-600"
          strokeWidth="1.3"
        />
        <path
          d="M16.5 13.5Q20 12 24 12t7.5 1.5"
          className="stroke-teal-600"
          strokeWidth="1.1"
          fill="none"
        />
        <path
          d="M16.5 22.5Q20 24 24 24t7.5-1.5"
          className="stroke-teal-600"
          strokeWidth="1.1"
          fill="none"
        />
        {/* Shine */}
        <circle cx="20" cy="14" r="1.5" className="fill-teal-600/20" />
      </svg>

      {/* Wordmark */}
      <div className="flex items-baseline">
        <span
          className={`${sizeConfig.text} font-bold tracking-tight text-slate-900 dark:text-white`}
        >
          been
        </span>
        <span
          className={`${sizeConfig.text} font-light tracking-tight text-teal-600 dark:text-teal-400`}
        >
          .
        </span>
      </div>
    </div>
  );
}
