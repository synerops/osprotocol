import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import Image from "next/image";

import LogoDark from "public/logo-dark.svg";
import LogoLight from "public/logo-light.svg";

export const logo = (
  <div className="flex items-center">
    <Image
      alt="OSP logo"
      src={LogoDark}
      className="hidden dark:block w-8"
      aria-label="OSP logo"
    />
    <Image
      alt="OSP logo"
      src={LogoLight}
      className="block dark:hidden w-8"
      aria-label="OSP logo"
    />
    <div className="font-mono pl-2">os://</div>
  </div>
);

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: <>{logo}</>,
    },
  };
}
