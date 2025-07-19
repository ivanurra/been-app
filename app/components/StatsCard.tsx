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
    <div className="bg-white shadow border rounded-lg px-6 py-4 text-center flex-1">
      <div className="text-sm font-medium text-gray-500 mb-1">
        {icon && <span className="mr-1">{icon}</span>}
        {title}
      </div>
      <div className="text-2xl font-semibold text-gray-800">{value}</div>
      {subtext && <div className="text-sm text-gray-500">{subtext}</div>}
    </div>
  );
}
