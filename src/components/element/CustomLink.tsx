import Link, {LinkProps} from "next/link";
import {PropsWithChildren} from "react";

export interface CustomLinkProps extends PropsWithChildren<LinkProps> {
  enableActive?: "exact";
  className?: string;
}

export function CustomLink({enableActive, children, ...rest}: CustomLinkProps) {
  return (
    <Link {...rest}>{children}</Link>
  );
}
