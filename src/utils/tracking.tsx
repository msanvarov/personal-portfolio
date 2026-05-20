import Hotjar from '@hotjar/browser';
import { Analytics } from '@vercel/analytics/react';
import { useEffect } from 'react';

const env = import.meta.env;

export const trackingEnabled = env.VITE_ENABLE_TRACKING === 'true';

export const registerHotjar = () => {
  if (!trackingEnabled) return;
  const siteId = Number(env.VITE_HOTJAR_WEBSITE_UID);
  const version = Number(env.VITE_HOTJAR_VERSION);
  if (!Number.isFinite(siteId) || !Number.isFinite(version)) return;
  Hotjar.init(siteId, version);
};

const injectScript = ({
  src,
  inline,
  id,
  async = true,
}: {
  src?: string;
  inline?: string;
  id?: string;
  async?: boolean;
}) => {
  if (typeof document === 'undefined') return;
  if (id && document.getElementById(id)) return;
  const el = document.createElement('script');
  if (id) el.id = id;
  if (src) el.src = src;
  if (inline) el.textContent = inline;
  el.async = async;
  document.head.appendChild(el);
};

const registerGTM = () => {
  if (!trackingEnabled) return;
  const id = env.VITE_GOOGLE_TAG_MANAGER_UID;
  if (!id) return;
  injectScript({
    id: 'gtm-loader',
    src: `https://www.googletagmanager.com/gtag/js?id=${id}`,
  });
  injectScript({
    id: 'gtm-init',
    inline: `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${id}');
    `,
  });
};

const registerMicrosoftClarity = () => {
  if (!trackingEnabled) return;
  const id = env.VITE_MICROSOFT_CLARITY_UID;
  if (!id) return;
  injectScript({
    id: 'ms-clarity',
    inline: `(function(c,l,a,r,i,t,y){
      c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
      t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
      y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", "${id}");`,
  });
};

const registerDebugBearRUM = () => {
  if (!trackingEnabled) return;
  const id = env.VITE_DEBUGBEAR_RUM_UID;
  if (!id) return;
  injectScript({
    id: 'debugbear-rum',
    src: `https://cdn.debugbear.com/${id}.js`,
  });
};

export const TrackingProvider = () => {
  useEffect(() => {
    registerHotjar();
    registerGTM();
    registerMicrosoftClarity();
    registerDebugBearRUM();
  }, []);

  if (!trackingEnabled) return null;
  return <Analytics />;
};
