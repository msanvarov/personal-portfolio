import BioPage from '@/pages/BioPage.component';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/bio')({
  component: BioPage,
});
