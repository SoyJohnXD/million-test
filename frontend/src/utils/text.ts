export const concat = (...classes: (string | undefined | false)[]) =>
  classes.filter(Boolean).join(" ");
