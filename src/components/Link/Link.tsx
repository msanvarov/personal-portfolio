import React, { forwardRef, useEffect, useRef, useState } from "react";
import {
  Link as RouterLink,
  NavLink as RouterNavLink,
  useLocation
} from "react-router-dom";
import { Helmet } from "react-helmet-async";
import prerender from "@utils/prerender";

// TODO finish broken component

// prefetching
const defaultLinkProps = {
  as: RouterLink
};
type LinkProps = {
  to: { pathname: string; hash: string; state: { hashKey: string } };
  prefetch: boolean;
} & typeof defaultLinkProps;

//TODO fix ref type
export type Ref = JSX.Element;

export const Link = forwardRef<Ref, LinkProps>(
  ({ to, prefetch, as: Component, ...props }, ref) => {
    const [shouldPrefetch, setShouldPrefetch] = useState(false);
    const toPathname = to.pathname || to;
    const fullUrl = `${window.location.origin}${toPathname}`;
    const linkRef = ref ? useRef(ref.current) : useRef();
    const animationFrameRef = useRef<number>();
    const location = useLocation();
    const prefetchable = prefetch || location.pathname !== toPathname;

    useEffect(() => {
      const linkElement = linkRef.current;

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
        cancelAnimationFrame(animationFrameRef.current);
        linkObserver.disconnect();
      };
    }, [prefetchable, to, linkRef]);

    return (
      <>
        <Helmet>
          {shouldPrefetch && (
            <link rel="prefetch" href={fullUrl} as="document" />
          )}
        </Helmet>
        <Component ref={linkRef} to={to} {...props} />
      </>
    );
  }
);

Link.defaultProps = defaultLinkProps;

export const NavLink = forwardRef((props, ref) => (
  <Link as={RouterNavLink} ref={ref} {...props} />
));
