type StatsCardProps = {
  title: string;
  value: string;
  subtext?: string;
  icon?: React.ReactNode;
  progress?: number;
  accent?: boolean;
};

export default function StatsCard({
  title,
  value,
  subtext,
  icon,
  progress,
  accent,
}: StatsCardProps) {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl px-6 py-6 flex-1 transition-all duration-200 hover:shadow-lg ${
        accent
          ? "bg-gradient-to-br from-teal-600 to-emerald-700 text-white shadow-lg shadow-teal-500/20"
          : "bg-white dark:bg-slate-800/50 shadow-sm border border-slate-200/60 dark:border-slate-700/50"
      }`}
    >
      {accent && (
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-12 translate-x-12" />
      )}

      <div className="relative">
        <div
          className={`flex items-center gap-2 text-sm font-medium mb-3 ${
            accent ? "text-teal-100" : "text-slate-500 dark:text-slate-400"
          }`}
        >
          {icon && <span className="text-lg">{icon}</span>}
          <span className="uppercase tracking-wider text-xs">{title}</span>
        </div>

        <div
          className={`text-3xl font-bold tracking-tight ${
            accent ? "text-white" : "text-slate-900 dark:text-slate-100"
          }`}
        >
          {value}
        </div>

        {progress !== undefined && (
          <div className="mt-4">
            <div
              className={`h-2 rounded-full overflow-hidden ${
                accent ? "bg-white/20" : "bg-slate-100 dark:bg-slate-700"
              }`}
            >
              <div
                className={`h-full rounded-full animate-progress ${
                  accent
                    ? "bg-white/80"
                    : "bg-gradient-to-r from-teal-500 to-emerald-500"
                }`}
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        {subtext && (
          <div
            className={`text-sm mt-2 ${
              accent ? "text-teal-100" : "text-slate-500 dark:text-slate-400"
            }`}
          >
            {subtext}
          </div>
        )}
      </div>
    </div>
  );
}
