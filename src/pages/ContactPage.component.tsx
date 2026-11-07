import { BentoCard } from '@/components/bento/BentoCard';
import { Layout } from '@/components/layout/Layout.component';
import { Reveal, SplitWords } from '@/components/motion/Reveal';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { en } from '@/i18n';
import { breadcrumbLd, Seo } from '@/utils/seo';
import { ValidationError, useForm } from '@formspree/react';
import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle2, Send, X } from 'lucide-react';
import { useEffect, useState, type ReactNode } from 'react';

const formId = import.meta.env.VITE_FORMSPREE_FORM_ID;

const ContactSeo = () => (
  <Seo
    title="Contact"
    description="Reach out to Sal Anvarov — drop a message via the contact form, email, or schedule a chat on Calendly. Available for consulting and full stack engagements."
    path="/contact"
    jsonLd={breadcrumbLd([
      { name: 'Home', path: '/' },
      { name: 'Contact', path: '/contact' },
    ])}
  />
);

const ContactPage = () => {
  if (!formId) {
    return (
      <Layout>
        <ContactSeo />
        <BentoCard className="p-8 text-muted-foreground">
          <p>
            Contact form is not configured. Set{' '}
            <code className="font-mono text-foreground">
              VITE_FORMSPREE_FORM_ID
            </code>{' '}
            to enable it.
          </p>
        </BentoCard>
      </Layout>
    );
  }
  return <ContactForm />;
};

const InfoTile = ({
  icon,
  heading,
  delay,
  children,
}: {
  icon: string;
  heading: string;
  delay: number;
  children: ReactNode;
}) => (
  <BentoCard delay={delay} className="flex items-center gap-5 p-5">
    <span className="bento-well grid size-14 shrink-0 place-items-center text-2xl text-brand transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110">
      <i className={icon} />
    </span>
    <div className="min-w-0">
      <span className="text-[0.7rem] font-medium uppercase tracking-[0.2em] text-muted-foreground">
        {heading}
      </span>
      <div className="mt-1 space-y-0.5 break-words font-heading text-lg font-medium text-foreground">
        {children}
      </div>
    </div>
  </BentoCard>
);

const linkClass = 'transition-colors hover:text-brand';
const fieldError = 'mt-1.5 block text-sm text-destructive';

const ContactForm = () => {
  const [state, handleSubmit] = useForm(formId as string);
  const [displayBanner, setDisplayBanner] = useState(false);

  useEffect(() => {
    if (state.submitting) setDisplayBanner(false);
    if (state.succeeded) setDisplayBanner(true);
  }, [state]);

  const { contact, profiles, form } = en.contact;

  return (
    <Layout>
      <ContactSeo />
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-6">
        <div className="lg:col-span-5">
          <h3 className="mb-6 text-5xl font-semibold uppercase text-foreground md:text-6xl">
            <SplitWords text={contact.heading} />
          </h3>
          <div className="space-y-4">
            <InfoTile
              icon={contact.mail.icon}
              heading={contact.mail.heading}
              delay={0}
            >
              {contact.mail.links.map((item) => (
                <p key={item}>
                  <a href={`mailto:${item}`} className={linkClass}>
                    {item}
                  </a>
                </p>
              ))}
            </InfoTile>
            <InfoTile
              icon={contact.phone.icon}
              heading={contact.phone.heading}
              delay={0.08}
            >
              {contact.phone.links.map((item) => (
                <p key={item.href}>
                  <a href={item.href} className={linkClass}>
                    {item.text}
                  </a>
                </p>
              ))}
            </InfoTile>
            <InfoTile
              icon={contact.location.icon}
              heading={contact.location.heading}
              delay={0.16}
            >
              <p>{contact.location.location}</p>
            </InfoTile>
          </div>

          <Reveal delay={0.2}>
            <h3 className="mb-4 mt-10 text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
              {profiles.heading}
            </h3>
            <ul className="flex items-center gap-3">
              {profiles.profiles.map((item) => (
                <li key={item.link}>
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label={item.icon.replace('iconoir-', '')}
                    className="bento grid size-14 place-items-center text-2xl text-foreground transition-all duration-300 hover:-translate-y-1 hover:text-brand"
                  >
                    <i className={item.icon} />
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <BentoCard tilt={0} delay={0.1} className="p-6 md:p-10 lg:col-span-7">
          <img
            src="/assets/icons/icon3.png"
            alt="Icon"
            className="h-16 w-auto animate-float invert dark:invert-0"
          />
          <h1
            className="mt-6 text-5xl font-semibold text-foreground md:text-6xl [&_span]:font-serif [&_span]:font-normal [&_span]:italic [&_span]:text-brand"
            dangerouslySetInnerHTML={{ __html: form.heading }}
          />
          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            <AnimatePresence>
              {displayBanner ? (
                <motion.div
                  initial={{ opacity: 0, y: -8, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: 'auto' }}
                  exit={{ opacity: 0, y: -8, height: 0 }}
                >
                  <Alert
                    role="alert"
                    className="border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                  >
                    <CheckCircle2 />
                    <AlertDescription className="flex items-center justify-between gap-4 text-current">
                      {form.onCompletion}
                      <button
                        type="button"
                        aria-label="Dismiss"
                        onClick={() => setDisplayBanner(false)}
                        className="rounded-full p-1 transition-colors hover:bg-emerald-500/15"
                      >
                        <X className="size-4" />
                      </button>
                    </AlertDescription>
                  </Alert>
                </motion.div>
              ) : null}
            </AnimatePresence>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Input
                  type="text"
                  name="name"
                  id="name"
                  required
                  placeholder="Name *"
                  aria-label="Name"
                  className="h-12 rounded-2xl bg-background/50 px-4"
                />
                <ValidationError
                  prefix="Name"
                  field="name"
                  errors={state.errors}
                  className={fieldError}
                />
              </div>
              <div>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  required
                  placeholder="Email *"
                  aria-label="Email"
                  className="h-12 rounded-2xl bg-background/50 px-4"
                />
                <ValidationError
                  prefix="Email"
                  field="email"
                  errors={state.errors}
                  className={fieldError}
                />
              </div>
            </div>
            <div>
              <Input
                type="text"
                name="topic"
                id="topic"
                required
                placeholder="Topic *"
                aria-label="Topic"
                className="h-12 rounded-2xl bg-background/50 px-4"
              />
              <ValidationError
                prefix="topic"
                field="topic"
                errors={state.errors}
                className={fieldError}
              />
            </div>
            <div>
              <Textarea
                name="message"
                id="message"
                required
                placeholder="Message *"
                aria-label="Message"
                className="min-h-40 rounded-2xl bg-background/50 px-4 py-3"
              />
              <ValidationError
                prefix="Message"
                field="message"
                errors={state.errors}
                className={fieldError}
              />
            </div>
            <Button
              type="submit"
              disabled={state.submitting}
              className="group/btn h-12 w-full rounded-full bg-brand text-base text-brand-foreground hover:bg-brand/90"
            >
              {form.button.text}
              <Send className="size-4 transition-transform duration-300 group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-1" />
            </Button>
          </form>
        </BentoCard>
      </div>
    </Layout>
  );
};

export default ContactPage;
