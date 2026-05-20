import PortfolioEntryPage from '@/pages/PortfolioEntryPage.component';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/portfolio/$entry')({
  component: PortfolioEntryPage,
});
