import PostsListPage from '@/pages/PostsListPage.component';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/blog/')({
  component: PostsListPage,
});
