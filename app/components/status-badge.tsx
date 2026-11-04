type StatusBadgeProps = {
  label: string;
  isOk: boolean;
};

export const StatusBadge = ({label, isOk}: StatusBadgeProps) => (
  <span
    className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm ${
      isOk ? 'bg-green-100 text-green-800' : 'bg-gray-200 text-gray-700'
    }`}
  >
    <span className={`size-2 rounded-full ${isOk ? 'bg-green-600' : 'bg-gray-500'}`} />
    {label}
  </span>
);
