"use client";

type Props = {
  value: string;
  onChange: (value: string) => void;
  resultCount: number;
  totalCount: number;
};

export default function SearchBar({
  value,
  onChange,
  resultCount,
  totalCount,
}: Props) {
  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
        <svg
          className="w-4 h-4 text-slate-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>
      <input
        type="text"
        placeholder="Search countries..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full pl-11 pr-20 py-3 rounded-xl bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500 transition-all"
      />
      {value && (
        <div className="absolute inset-y-0 right-0 flex items-center gap-2 pr-4">
          <span className="text-xs text-slate-400">
            {resultCount}/{totalCount}
          </span>
          <button
            onClick={() => onChange("")}
            className="text-slate-400 hover:text-slate-600 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}
