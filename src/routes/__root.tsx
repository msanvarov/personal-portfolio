import { Preloader } from '@/components/Preloader.component';
import { Outlet, createRootRoute } from '@tanstack/react-router';
import { Suspense } from 'react';

export const Route = createRootRoute({
  component: () => (
    <Suspense fallback={<Preloader />}>
      <Outlet />
    </Suspense>
  ),
});
