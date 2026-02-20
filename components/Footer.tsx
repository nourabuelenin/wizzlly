import Image from "next/image";
import Link from "next/link";
import enablrLogo from "@/public/images/enablr_logo.png";
import { Github, Linkedin, Facebook, Twitter } from "lucide-react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function Footer({ dict }: any) {
  const t = dict.footer;

  // Social Icons mapping (using placeholders for now)
  const socialIcons = [
    { icon: Twitter, href: "#" },
    { icon: Linkedin, href: "#" },
    { icon: Facebook, href: "#" },
    { icon: Github, href: "#" },
  ];

  return (
    <footer className="bg-surface-muted text-foreground-light pt-20">
      <div className="w-full px-4 lg:px-40">
        <div className="flex flex-col lg:flex-row justify-between gap-12 lg:gap-20 mb-16">
          {/* Logo & Description */}
          <div className="lg:w-1/3">
            <Link href="/" className="block mb-6">
              <Image src={enablrLogo} alt="ENABLR Logo" height={40} />
            </Link>
            <p className="text-sm opacity-80 leading-relaxed max-w-sm">
              {t.description}
            </p>
          </div>

          {/* Links Columns */}
          <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-8">
            {Object.entries(t.links).map(([key, section]: any) => (
              <div key={key}>
                <h4 className="font-bold text-foreground mb-6">{section.title}</h4>
                <ul className="space-y-4">
                  {section.items.map((item: any, idx: number) => (
                    <li key={idx}>
                      <Link
                        href={item.href}
                        className="text-sm opacity-70 hover:opacity-100 hover:text-primary transition-colors"
                      >
                        {item.text}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-foreground text-white border-t border-border pt-8 pb-8">
        <div className="w-full px-4 lg:px-40 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-xs opacity-60 text-center md:text-left">
            {t.copyright}
          </p>
          
          <div className="flex gap-4">
            {socialIcons.map((social, index) => {
              const Icon = social.icon;
              return (
                <Link
                  key={index}
                  href={social.href}
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-foreground text-white hover:bg-primary hover:text-white transition-colors"
                >
                  <Icon size={16} />
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
}
