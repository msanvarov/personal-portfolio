import { Globe, Smartphone } from 'lucide-react';

/** Category chip with a purple icon square (phone for mobile work). */
export const CategoryChip = ({ category }: { category?: string }) => {
  const Icon = category?.includes('Mobile') ? Smartphone : Globe;
  return (
    <span className="chip py-1 pl-1 pr-2.5 text-xs">
      <span className="chip-icon size-6 rounded-md">
        <Icon className="size-3.5" />
      </span>
      {category}
    </span>
  );
};
