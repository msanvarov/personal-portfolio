import LandingPage from '@/pages/LandingPage.component';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  component: LandingPage,
});
