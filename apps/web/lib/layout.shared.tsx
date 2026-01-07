import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import { BookIcon } from 'lucide-react';
import Image from "next/image";

import LogoDark from "public/logo-dark.svg";
import LogoLight from "public/logo-light.svg";

export const logo = (
  <div className="flex items-center">
    <Image
      alt="OSP logo"
      src={LogoLight}
      className="w-8"
      aria-label="OSP logo"
    />
    <div className="font-mono pl-2">os://protocol</div>
  </div>
);

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: <>{logo}</>,
    },
  };
}
