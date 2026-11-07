import { SmoothScroll } from '@/components/motion/SmoothScroll';
import { Preloader } from '@/components/Preloader.component';
import { Outlet, createRootRoute } from '@tanstack/react-router';
import { Suspense } from 'react';

export const Route = createRootRoute({
  component: () => (
    <>
      <SmoothScroll />
      <Suspense fallback={<Preloader />}>
        <Outlet />
      </Suspense>
    </>
  ),
});
