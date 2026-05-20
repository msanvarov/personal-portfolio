import PostPage from '@/pages/PostPage.component';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/blog/$post')({
  component: PostPage,
});
