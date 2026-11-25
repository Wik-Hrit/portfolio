import Image from "next/image";
import { siteConfig } from "@/data/site.config";

export function Avatar({ size = 40 }: { size?: number }) {
  if (siteConfig.photo) {
    return (
      <Image
        src={siteConfig.photo}
        alt={siteConfig.name}
        width={size}
        height={size}
        className="rounded-full object-cover ring-1 ring-line"
        priority
      />
    );
  }
  return (
    <span
      aria-hidden="true"
      style={{ width: size, height: size }}
      className="grid shrink-0 place-items-center rounded-full bg-ink font-mono text-[13px] font-medium tracking-tight text-bg"
    >
      {siteConfig.initials}
    </span>
  );
}
