import PostsListPage from '@/pages/PostsListPage.component';
import { createFileRoute } from '@tanstack/react-router';

type BlogSearch = {
  q?: string;
};

export const Route = createFileRoute('/blog/')({
  component: PostsListPage,
  validateSearch: (search: Record<string, unknown>): BlogSearch => ({
    q: typeof search.q === 'string' && search.q.length > 0 ? search.q : undefined,
  }),
});
