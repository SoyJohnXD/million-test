import React, { Ref } from "react";
import Link from "next/link";
import { concat } from "@/utils/text";

const buttonVariants = {
  variant: {
    primary: "bg-primary text-white hover:bg-primary/90",
    secondary: "bg-secondary text-white hover:bg-secondary/90",
    outline:
      "border border-border bg-transparent hover:bg-accent hover:text-secondary",
    ghost: "hover:bg-accent hover:text-secondary",
  },
  size: {
    default: "h-10 px-4 py-2",
    sm: "h-9 rounded-md px-3",
    lg: "h-11 rounded-md px-8",
    icon: "h-10 w-10",
  },
};

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof buttonVariants.variant;
  size?: keyof typeof buttonVariants.size;
  href?: string;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant = "primary", size = "default", href, ...props },
    ref,
  ) => {
    const baseClasses =
      "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 disabled:pointer-events-none disabled:opacity-50";

    const classes = concat(
      baseClasses,
      buttonVariants.variant[variant],
      buttonVariants.size[size],
      className,
    );

    if (href) {
      return (
        <Link
          href={href}
          className={classes}
          ref={ref as Ref<HTMLAnchorElement> | undefined}
          {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
        >
          {props.children}
        </Link>
      );
    }

    return <button className={classes} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button };
