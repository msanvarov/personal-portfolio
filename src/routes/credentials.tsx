import CredentialsPage from '@/pages/CredentialsPage.component';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/credentials')({
  component: CredentialsPage,
});
