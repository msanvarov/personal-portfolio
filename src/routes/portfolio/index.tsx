import PortfolioListPage from '@/pages/PortfolioListPage.component';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/portfolio/')({
  component: PortfolioListPage,
});
