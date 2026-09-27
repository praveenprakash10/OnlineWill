"use client";

import { useEffect, useState, type ReactNode } from "react";

type ArticleShareProps = {
  title: string;
  description: string;
  url: string;
};

type ShareTarget = {
  id: string;
  label: string;
  href: string;
  icon: ReactNode;
};

function IconWhatsApp() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 fill-current">
      <path d="M17.47 14.38c-.28-.14-1.64-.81-1.9-.9-.25-.1-.44-.14-.62.14-.18.27-.71.9-.87 1.08-.16.18-.32.2-.6.07-.28-.14-1.17-.43-2.23-1.37-.82-.73-1.38-1.64-1.54-1.92-.16-.27-.02-.42.12-.56.13-.12.28-.32.42-.48.14-.16.18-.27.28-.45.09-.18.05-.34-.02-.48-.07-.14-.62-1.5-.85-2.05-.22-.53-.45-.46-.62-.47h-.53c-.18 0-.48.07-.73.34-.25.27-.96.94-.96 2.3 0 1.35.98 2.66 1.12 2.84.14.18 1.93 2.95 4.68 4.13.65.28 1.16.45 1.56.58.66.21 1.25.18 1.72.11.53-.08 1.64-.67 1.87-1.32.23-.65.23-1.2.16-1.32-.07-.11-.25-.18-.53-.32z" />
      <path d="M12.04 2C6.5 2 2.01 6.49 2.01 12.02c0 1.77.46 3.45 1.28 4.92L2 22l5.2-1.36A9.98 9.98 0 0 0 12.04 22C17.57 22 22 17.51 22 11.98 22 6.49 17.57 2 12.04 2zm0 18.15c-1.6 0-3.12-.43-4.42-1.18l-.32-.19-3.09.81.83-3.01-.2-.33a8.13 8.13 0 0 1-1.25-4.33c0-4.5 3.66-8.16 8.17-8.16 4.5 0 8.16 3.66 8.16 8.16 0 4.5-3.66 8.23-8.16 8.23z" />
    </svg>
  );
}

function IconX() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 fill-current">
      <path d="M18.9 2H22l-6.78 7.75L22.67 22h-6.59l-5.16-6.74L5.2 22H2.09l7.25-8.29L1.5 2h6.76l4.66 6.17L18.9 2zm-1.16 18h1.83L7.4 3.9H5.44L17.74 20z" />
    </svg>
  );
}

function IconFacebook() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 fill-current">
      <path d="M14 9h3V6h-3c-1.66 0-3 1.34-3 3v2H8v3h3v7h3v-7h3l1-3h-4V9c0-.55.45-1 1-1z" />
    </svg>
  );
}

function IconLinkedIn() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 fill-current">
      <path d="M6.94 8.5H3.56V20h3.38V8.5zM5.25 3A1.97 1.97 0 1 0 5.26 6.94 1.97 1.97 0 0 0 5.25 3zM20.44 20h-3.37v-5.6c0-1.34-.02-3.05-1.86-3.05-1.86 0-2.15 1.45-2.15 2.95V20h-3.37V8.5h3.23v1.57h.05c.45-.85 1.55-1.75 3.19-1.75 3.41 0 4.04 2.24 4.04 5.16V20z" />
    </svg>
  );
}

function IconTelegram() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 fill-current">
      <path d="M9.78 13.65 9.5 17.4c.4 0 .57-.17.78-.37l1.87-1.79 3.88 2.85c.71.39 1.22.19 1.41-.66l2.56-12.04h.01c.23-1.05-.38-1.46-1.07-1.2L3.6 9.85c-1.02.4-.98.95-.17 1.2l3.96 1.24 9.2-5.8c.43-.28.83-.13.5.15L9.78 13.65z" />
    </svg>
  );
}

function IconEmail() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-4 w-4 fill-none stroke-current stroke-[1.8]"
    >
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m4 7 8 6 8-6" />
    </svg>
  );
}

function IconSms() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-4 w-4 fill-none stroke-current stroke-[1.8]"
    >
      <path d="M4 5h16a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H9l-5 3v-3H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2z" />
      <path d="M8 10h8M8 14h5" />
    </svg>
  );
}

function IconLink() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-4 w-4 fill-none stroke-current stroke-[1.8]"
    >
      <path d="M10 13a5 5 0 0 0 7.07 0l1.41-1.41a5 5 0 0 0-7.07-7.07L10 5.93" />
      <path d="M14 11a5 5 0 0 0-7.07 0L5.52 12.4a5 5 0 0 0 7.07 7.07L14 18.07" />
    </svg>
  );
}

function IconNativeShare() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-4 w-4 fill-none stroke-current stroke-[1.8]"
    >
      <circle cx="18" cy="5" r="2.5" />
      <circle cx="6" cy="12" r="2.5" />
      <circle cx="18" cy="19" r="2.5" />
      <path d="M8.4 13.2 15.6 17.3M15.6 6.7 8.4 10.8" />
    </svg>
  );
}

export function ArticleShare({ title, description, url }: ArticleShareProps) {
  const [copied, setCopied] = useState(false);
  const [canNativeShare, setCanNativeShare] = useState(false);

  useEffect(() => {
    setCanNativeShare(typeof navigator !== "undefined" && !!navigator.share);
  }, []);

  const text = `${title} — ${description}`;
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const encodedText = encodeURIComponent(text);
  const smsBody = encodeURIComponent(`${title}\n\n${url}`);

  const targets: ShareTarget[] = [
    {
      id: "whatsapp",
      label: "WhatsApp",
      href: `https://api.whatsapp.com/send?text=${encodedText}%20${encodedUrl}`,
      icon: <IconWhatsApp />,
    },
    {
      id: "x",
      label: "X",
      href: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
      icon: <IconX />,
    },
    {
      id: "facebook",
      label: "Facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      icon: <IconFacebook />,
    },
    {
      id: "linkedin",
      label: "LinkedIn",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      icon: <IconLinkedIn />,
    },
    {
      id: "telegram",
      label: "Telegram",
      href: `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`,
      icon: <IconTelegram />,
    },
    {
      id: "email",
      label: "Email",
      href: `mailto:?subject=${encodedTitle}&body=${encodedText}%0A%0A${encodedUrl}`,
      icon: <IconEmail />,
    },
    {
      id: "sms",
      label: "SMS",
      href: `sms:?&body=${smsBody}`,
      icon: <IconSms />,
    },
  ];

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  async function nativeShare() {
    try {
      await navigator.share({ title, text: description, url });
    } catch {
      // User cancelled or share failed — ignore.
    }
  }

  const buttonClass =
    "inline-flex items-center gap-2 rounded-lg border border-line bg-surface px-3.5 py-2.5 text-sm font-medium text-foreground shadow-[0_1px_0_rgba(20,36,40,0.04)] transition-colors hover:border-accent hover:bg-accent-soft hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

  return (
    <section
      className="mt-12 rounded-2xl border border-line bg-surface/70 px-5 py-6 backdrop-blur-sm sm:px-6"
      aria-labelledby="share-heading"
    >
      <h2
        id="share-heading"
        className="brand-mark text-xl tracking-tight text-foreground"
      >
        Share this article
      </h2>
      <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted">
        Pass it along on social networks, WhatsApp, email, or SMS—or copy the
        link to send anyone.
      </p>

      <div className="mt-5 flex flex-wrap gap-2.5">
        {canNativeShare ? (
          <button
            type="button"
            onClick={nativeShare}
            className={buttonClass}
            aria-label="Share using device share sheet"
          >
            <IconNativeShare />
            Share
          </button>
        ) : null}

        {targets.map((target) => {
          const isDirect =
            target.id === "email" || target.id === "sms";

          return (
            <a
              key={target.id}
              href={target.href}
              target={isDirect ? undefined : "_blank"}
              rel={isDirect ? undefined : "noopener noreferrer"}
              className={buttonClass}
              aria-label={`Share on ${target.label}`}
            >
              {target.icon}
              {target.label}
            </a>
          );
        })}

        <button
          type="button"
          onClick={copyLink}
          className={buttonClass}
          aria-label={copied ? "Link copied" : "Copy article link"}
        >
          <IconLink />
          {copied ? "Copied" : "Copy link"}
        </button>
      </div>
    </section>
  );
}
