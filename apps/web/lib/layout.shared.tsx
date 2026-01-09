import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import Image from "next/image";

import LogoLight from "public/logo-light.svg";
import { siteConfig } from './metadata';

export const osp = (
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
      title: <>{osp}</>,
    },
    githubUrl: siteConfig.githubUrl
  };
}
