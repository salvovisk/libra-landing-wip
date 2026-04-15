import Image from "next/image";

type BrandLogoProps = {
  compact?: boolean;
  className?: string;
};

export function BrandLogo({ compact = false, className = "" }: BrandLogoProps) {
  return (
    <span className={`inline-flex items-center ${className}`.trim()}>
      <Image
        src="/logo-libra.svg"
        alt="Libra Colf"
        width={compact ? 132 : 156}
        height={compact ? 40 : 48}
        className="h-10 w-auto sm:h-11"
        priority
      />
    </span>
  );
}
