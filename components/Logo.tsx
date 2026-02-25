import Image from "next/image";
import { LocaleLink } from "./LocaleLink";
import logoImage from "@/public/images/enablr_logo.webp";
import logoLightImage from "@/public/images/enablr_logo_sec.webp";

type logoProps = {
  lightMode?: boolean;
  className?: string;
};

export default function Logo({
  className = "w-16 h-16 xl:w-22 xl:h-22",
  lightMode,
}: logoProps) {
  return (
    <LocaleLink href="/">
      <Image
        src={lightMode ? logoLightImage : logoImage}
        alt="Enablr Logo"
        className={`${className}`}
      />
    </LocaleLink>
  );
}
