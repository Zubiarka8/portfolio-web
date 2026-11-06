import Link from "next/link";
import type { ReactNode } from "react";

export type ButtonVariant = "primary" | "secondary" | "ghost";

interface ButtonLinkProps {
  /** Empty or missing href renders a disabled, explained placeholder. */
  href?: string;
  children: ReactNode;
  variant?: ButtonVariant;
  /** Opens in a new tab with safe rel attributes. */
  external?: boolean;
  /** Accessible explanation shown when the link is not configured. */
  pendingLabel?: string;
  icon?: ReactNode;
  /** Extra screen-reader context, e.g. the project name for repeated labels. */
  srContext?: string;
  className?: string;
}

const variantClass: Record<ButtonVariant, string> = {
  primary: "btn-primary",
  secondary: "btn-secondary",
  ghost: "btn-ghost",
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
  external = false,
  pendingLabel,
  icon,
  srContext,
  className = "",
}: ButtonLinkProps) {
  const classes = `btn ${variantClass[variant]} ${className}`.trim();
  const content = (
    <>
      {children}
      {srContext ? <span className="sr-only"> ({srContext})</span> : null}
      {!href && pendingLabel ? <span className="sr-only">: {pendingLabel}</span> : null}
      {icon}
    </>
  );

  if (!href) {
    return (
      <span role="link" aria-disabled="true" tabIndex={0} title={pendingLabel} className={classes}>
        {content}
      </span>
    );
  }

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {content}
      </a>
    );
  }

  if (href.startsWith("mailto:") || href.startsWith("#")) {
    return (
      <a href={href} className={classes}>
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {content}
    </Link>
  );
}
