import { BentoCard, TileHeader } from '@/components/bento/BentoCard';
import { Layout } from '@/components/layout/Layout.component';
import { Reveal, StaggerItem, StaggerList } from '@/components/motion/Reveal';
import { profileName } from '@/components/pages/profileName';
import { SectionHeading } from '@/components/SectionHeading';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { en } from '@/i18n';
import { cn } from '@/lib/utils';
import { breadcrumbLd, Seo } from '@/utils/seo';
import { ValidationError, useForm } from '@formspree/react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import {
  ArrowUpRight,
  CheckCircle2,
  Loader2,
  MessageCircle,
  Send,
  Share2,
  X,
} from 'lucide-react';
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

const { contact, profiles, form } = en.contact;

/** "MAIL" → "Mail" */
const sentence = (s: string) => s.charAt(0) + s.slice(1).toLowerCase();

const ContactPage = () => (
  <Layout>
    <ContactSeo />
    <SectionHeading>{contact.heading}</SectionHeading>

    <div className="grid grid-cols-1 gap-3 sm:gap-4 lg:grid-cols-12">
      <BentoCard delay={0.05} className="beam p-4 sm:p-6 md:p-8 lg:col-span-7">
        <FormHeader />
        {formId ? (
          <ContactForm />
        ) : (
          <div className="bento-well mt-6 p-4 text-sm text-muted-foreground">
            <p>
              Contact form is not configured. Set{' '}
              <code className="font-mono text-foreground">
                VITE_FORMSPREE_FORM_ID
              </code>{' '}
              to enable it.
            </p>
          </div>
        )}
      </BentoCard>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:col-span-5">
        <InfoTile
          icon={contact.mail.icon}
          heading={sentence(contact.mail.heading)}
          delay={0.1}
          className="sm:col-span-2"
        >
          {contact.mail.links.map((item) => (
            <a key={item} href={`mailto:${item}`} className={linkClass}>
              {item}
            </a>
          ))}
        </InfoTile>
        <InfoTile
          icon={contact.phone.icon}
          heading={sentence(contact.phone.heading)}
          delay={0.15}
        >
          {contact.phone.links.map((item) => (
            <a
              key={item.href}
              href={item.href}
              target="_blank"
              rel="noreferrer noopener"
              className={linkClass}
            >
              {item.text}
              <ArrowUpRight className="size-4 text-muted-foreground" />
            </a>
          ))}
        </InfoTile>
        <InfoTile
          icon={contact.location.icon}
          heading={sentence(contact.location.heading)}
          delay={0.2}
          pulse
        >
          <p className="flex min-h-11 items-center">
            {contact.location.location}
          </p>
        </InfoTile>

        <BentoCard
          delay={0.25}
          className="flex flex-col justify-center p-4 sm:col-span-2 sm:p-5"
        >
          <TileHeader
            align="start"
            icon={<Share2 />}
            caption={profiles.heading}
          />
          <StaggerList className="mt-3 grid grid-cols-2 gap-2">
            {profiles.profiles.map((item) => (
              <StaggerItem key={item.link}>
                <a
                  href={item.link}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="chip group/row w-full justify-between py-2 pr-3 transition-shadow hover:shadow-[inset_0_0_0_1px_var(--bento-edge-hi)]"
                >
                  <span className="flex min-w-0 items-center gap-2">
                    <span className="chip-icon transition-colors duration-300 group-hover/row:bg-brand group-hover/row:text-brand-foreground">
                      <i className={item.icon} aria-hidden />
                    </span>
                    <span className="truncate">{profileName(item.icon)}</span>
                  </span>
                  <ArrowUpRight className="size-4 shrink-0 text-muted-foreground transition-transform duration-300 ease-[var(--ease-apple)] group-hover/row:-translate-y-0.5 group-hover/row:translate-x-0.5 group-hover/row:text-brand" />
                </a>
              </StaggerItem>
            ))}
          </StaggerList>
        </BentoCard>
      </div>
    </div>
  </Layout>
);

/** Gently bobbing chat bubble + "Let's chat." */
const FormHeader = () => {
  const reduce = useReducedMotion();
  return (
    <div className="flex items-center gap-4">
      <motion.span
        aria-hidden
        className="chip-icon size-14 shrink-0 rounded-2xl [&_svg]:size-7"
        animate={reduce ? undefined : { y: [0, -4, 0], rotate: [0, -6, 0] }}
        transition={{ duration: 4, ease: 'easeInOut', repeat: Infinity }}
      >
        <MessageCircle strokeWidth={1.75} />
      </motion.span>
      <h2
        className="text-4xl font-semibold text-foreground md:text-5xl [&_span]:text-gradient"
        dangerouslySetInnerHTML={{ __html: form.heading }}
      />
    </div>
  );
};

const InfoTile = ({
  icon,
  heading,
  delay,
  pulse,
  className,
  children,
}: {
  icon: string;
  heading: string;
  delay: number;
  pulse?: boolean;
  className?: string;
  children: ReactNode;
}) => (
  <BentoCard
    delay={delay}
    className={cn('flex items-center gap-4 p-4 sm:p-5', className)}
  >
    <span className="chip-icon relative size-11 shrink-0 rounded-xl text-xl transition-[rotate,scale] duration-500 ease-[var(--ease-apple)] group-hover:-rotate-6 group-hover:scale-110">
      <i className={icon} aria-hidden />
      {pulse ? (
        <span
          aria-hidden
          className="absolute -right-0.5 -top-0.5 flex size-2.5"
        >
          <span className="absolute inline-flex size-full rounded-full bg-brand opacity-70 motion-safe:animate-ping" />
          <span className="relative inline-flex size-2.5 rounded-full bg-brand" />
        </span>
      ) : null}
    </span>
    <div className="min-w-0 flex-1">
      <p className="text-[0.8rem] font-medium text-brand">{heading}</p>
      <div className="flex flex-col break-words font-heading text-base font-medium text-foreground">
        {children}
      </div>
    </div>
  </BentoCard>
);

const linkClass =
  'inline-flex min-h-11 w-fit max-w-full items-center gap-1.5 break-all transition-colors hover:text-brand';
const fieldClass =
  'h-12 rounded-xl border-transparent bg-[var(--chip)] px-4 text-base shadow-[inset_0_0_0_1px_var(--bento-edge)] transition-[box-shadow,border-color] focus-visible:border-brand focus-visible:ring-brand/30 md:text-base dark:bg-[var(--chip)]';
const fieldError = 'mt-1.5 block text-sm text-destructive';

const ContactForm = () => {
  const [state, handleSubmit] = useForm(formId as string);
  const [displayBanner, setDisplayBanner] = useState(false);

  useEffect(() => {
    if (state.submitting) setDisplayBanner(false);
    if (state.succeeded) setDisplayBanner(true);
  }, [state]);

  return (
    <form onSubmit={handleSubmit} className="mt-6 space-y-3 sm:space-y-4">
      <AnimatePresence>
        {displayBanner ? (
          <motion.div
            initial={{ opacity: 0, y: -8, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -8, height: 0 }}
          >
            <Alert
              role="alert"
              className="rounded-xl border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
            >
              <CheckCircle2 />
              <AlertDescription className="flex items-center justify-between gap-4 text-current">
                {form.onCompletion}
                <button
                  type="button"
                  aria-label="Dismiss"
                  onClick={() => setDisplayBanner(false)}
                  className="grid size-8 shrink-0 place-items-center rounded-full transition-colors hover:bg-emerald-500/15"
                >
                  <X className="size-4" />
                </button>
              </AlertDescription>
            </Alert>
          </motion.div>
        ) : null}
      </AnimatePresence>
      <div className="grid gap-3 sm:grid-cols-2 sm:gap-4">
        <Reveal delay={0.1} y={12}>
          <Input
            type="text"
            name="name"
            id="name"
            required
            placeholder="Name *"
            aria-label="Name"
            className={fieldClass}
          />
          <ValidationError
            prefix="Name"
            field="name"
            errors={state.errors}
            className={fieldError}
          />
        </Reveal>
        <Reveal delay={0.15} y={12}>
          <Input
            id="email"
            type="email"
            name="email"
            required
            placeholder="Email *"
            aria-label="Email"
            className={fieldClass}
          />
          <ValidationError
            prefix="Email"
            field="email"
            errors={state.errors}
            className={fieldError}
          />
        </Reveal>
      </div>
      <Reveal delay={0.2} y={12}>
        <Input
          type="text"
          name="topic"
          id="topic"
          required
          placeholder="Topic *"
          aria-label="Topic"
          className={fieldClass}
        />
        <ValidationError
          prefix="topic"
          field="topic"
          errors={state.errors}
          className={fieldError}
        />
      </Reveal>
      <Reveal delay={0.25} y={12}>
        <Textarea
          name="message"
          id="message"
          required
          placeholder="Message *"
          aria-label="Message"
          className={cn(fieldClass, 'h-auto min-h-40 py-3')}
        />
        <ValidationError
          prefix="Message"
          field="message"
          errors={state.errors}
          className={fieldError}
        />
      </Reveal>
      <button
        type="submit"
        disabled={state.submitting}
        className="btn-brand group/btn h-12 w-full px-6 text-base disabled:pointer-events-none disabled:opacity-60 sm:w-auto"
      >
        {form.button.text}
        {state.submitting ? (
          <Loader2 className="size-4 motion-safe:animate-spin" />
        ) : (
          <Send className="size-4 transition-transform duration-300 ease-[var(--ease-apple)] group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-1" />
        )}
      </button>
    </form>
  );
};

export default ContactPage;
