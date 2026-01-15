"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { AnchorHTMLAttributes, PropsWithChildren } from "react";

type LocaleLinkProps = PropsWithChildren<
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
  }
>;

export function LocaleLink({ href, children, ...props }: LocaleLinkProps) {
  const params = useParams();
  const lang = params.lang as string | undefined;

  if (!lang) {
    throw new Error("LocaleLink used outside of /[lang] route");
  }

  const localizedHref = href.startsWith("/")
    ? `/${lang}${href}`
    : `/${lang}/${href}`;

  return (
    <Link href={localizedHref} {...props}>
      {children}
    </Link>
  );
}
