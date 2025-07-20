type StatsCardProps = {
  title: string;
  value: string;
  subtext?: string;
  icon?: React.ReactNode;
};

export default function StatsCard({
  title,
  value,
  subtext,
  icon,
}: StatsCardProps) {
  return (
    <div className="bg-white shadow border rounded-md px-6 py-5 text-center flex-1">
      <div className="flex items-center justify-center gap-2 text-base font-semibold text-gray-700 mb-2">
        {icon && <span className="text-lg">{icon}</span>}
        <span>{title}</span>
      </div>
      <div className="text-3xl font-bold text-gray-900">{value}</div>
      {subtext && <div className="text-sm text-gray-500 mt-1">{subtext}</div>}
    </div>
  );
}
