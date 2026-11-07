import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";

const variants = {
  primary: "bg-lime text-ink hover:bg-[#e8f79a]",
  secondary: "border border-ink/15 bg-white text-ink hover:border-ink/40",
  ghost: "bg-transparent text-ink hover:bg-ink/5",
};

const base =
  "inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition duration-200 disabled:cursor-not-allowed disabled:opacity-60";

type Common = {
  children: ReactNode;
  variant?: keyof typeof variants;
  className?: string;
};

type AsButton = Common &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
  };

type AsLink = Common & {
  href: string;
};

export function PrimaryButton(props: AsButton | AsLink) {
  const className = `${base} ${variants[props.variant ?? "primary"]} ${props.className ?? ""}`;
  if ("href" in props && props.href) {
    return (
      <Link href={props.href} className={className}>
        {props.children}
      </Link>
    );
  }
  const buttonProps = props as AsButton;
  const { children, variant: _variant, className: _className, ...rest } = buttonProps;
  return (
    <button className={className} {...rest}>
      {children}
    </button>
  );
}
