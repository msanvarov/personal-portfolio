import OfferingsPage from '@/pages/OfferingsPage.component';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/offerings')({
  component: OfferingsPage,
});
