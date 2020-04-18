import React, {
  useEffect,
  useRef,
  useState,
  forwardRef,
  useLayoutEffect
} from "react";
import {
  Link as RouterLink,
  NavLink as RouterNavLink,
  useLocation
} from "react-router-dom";
import { Helmet } from "react-helmet-async";
import prerender from "@utils/prerender";

// prefetching
const defaultLinkProps = {
  as: RouterLink
};
type LinkProps = {
  as: typeof RouterNavLink;
  to: { pathname: string; hash: string; state: { hashKey: string } };
  prefetch: boolean;
} & typeof defaultLinkProps;

//TODO fix types
export const Link: React.ForwardRefExoticComponent<LinkProps> = forwardRef<
  any,
  LinkProps
>(({ to, prefetch, as: Component, ...props }, ref) => {
  const [shouldPrefetch, setShouldPrefetch] = useState(false);
  const toPathname = to.pathname || to;
  const fullUrl = `${window.location.origin}${toPathname}`;
  const linkRef = useRef<any | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const location = useLocation();
  const prefetchable = prefetch || location.pathname !== toPathname;

  useLayoutEffect(() => {
    if (ref) {
      if (typeof ref === "function") {
        ref(linkRef.current);
      } else {
        (ref as any).current = linkRef.current;
      }
    }
  }, [ref]);

  useEffect(() => {
    const linkElement = linkRef.current!;

    const linkObserver = new IntersectionObserver(([entry], observer) => {
      if (entry.isIntersecting) {
        observer.unobserve(entry.target);
        animationFrameRef.current = requestAnimationFrame(() => {
          setShouldPrefetch(true);
        });
      }
    });

    if (!prerender && prefetchable) {
      linkObserver.observe(linkElement);
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        linkObserver.disconnect();
      }
    };
  }, [prefetchable, linkRef, to]);

  return (
    <>
      <Helmet>
        {shouldPrefetch && <link rel="prefetch" href={fullUrl} as="document" />}
      </Helmet>
      <Component ref={linkRef} to={to} {...props} />
    </>
  );
});

Link.defaultProps = defaultLinkProps;

type NavLinkProps = {
  exact: boolean;
  prefetch: boolean;
  to: { pathname: string; hash: string; state: { hashKey: string } };
} & React.RefAttributes<HTMLAnchorElement>;
export const NavLink = forwardRef<any, NavLinkProps>((props, ref) => (
  <Link as={RouterNavLink} ref={ref} {...props} />
));
