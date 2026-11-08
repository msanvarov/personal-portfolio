import { cn } from '@/lib/utils';
import { useLocation, useNavigate } from '@tanstack/react-router';
import { Search } from 'lucide-react';
import { useEffect, useState, type FormEvent } from 'react';

const readQ = (locationSearch: unknown): string =>
  typeof locationSearch === 'string'
    ? (new URLSearchParams(locationSearch).get('q') ?? '')
    : '';

type BlogSearchProps = {
  className?: string;
  /** ?q= values (case-insensitive) that leave the input empty, e.g. categories shown as tabs. */
  skip?: string[];
};

/** Search field that submits to /blog?q=…; stays in sync with the URL. */
export const BlogSearch = ({ className, skip = [] }: BlogSearchProps) => {
  const location = useLocation();
  const navigate = useNavigate();

  const fromUrl = () => {
    const q = readQ(location.searchStr);
    return skip.some((s) => s.toLowerCase() === q.toLowerCase()) ? '' : q;
  };

  // Keep the input in sync with the current ?q= so deep-linking and the
  // back button feel right.
  const [query, setQuery] = useState<string>(fromUrl);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => setQuery(fromUrl()), [location.searchStr]);

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmed = query.trim();
    navigate({ to: '/blog', search: trimmed ? { q: trimmed } : {} });
  };

  return (
    <form onSubmit={submit} role="search" className={cn('relative', className)}>
      <Search
        aria-hidden
        className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
      />
      <input
        type="search"
        enterKeyHint="search"
        placeholder="Find blog by name or category"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        aria-label="Find blog by name or category"
        // 16px on phones so iOS doesn't zoom into the field.
        className="h-11 w-full rounded-full bg-[var(--chip)] pl-10 pr-4 text-base text-foreground shadow-[inset_0_0_0_1px_var(--bento-edge)] outline-none transition-shadow duration-300 placeholder:text-muted-foreground focus-visible:shadow-[inset_0_0_0_1px_var(--brand),0_0_0_4px_var(--glow)] md:h-10 md:text-sm"
      />
    </form>
  );
};
