import Image from "next/image";
import adwatLogo from "@/public/images/logos/adwat.png";
import alDonyLogo from "@/public/images/logos/al-dony.png";
import alRefaayLogo from "@/public/images/logos/al-refaay.png";
import alNassefLogo from "@/public/images/logos/Al-nassef.png";
import goCareMenaLogo from "@/public/images/logos/go-care-mena.png";
import ibnAlGazryLogo from "@/public/images/logos/Ibn-Algazry.png";
import yaraLogo from "@/public/images/logos/yara.png";


// Placeholder for now, ideally these would be actual brand logos
const brands = [
  { name: "Al-Nassef", image: alNassefLogo }, 
  { name: "Yara", image: yaraLogo },
  { name: "Al-Dony", image: alDonyLogo },
  { name: "Adwat Information Technology", image: adwatLogo },
  { name: "Al-Refaay", image: alRefaayLogo },
  { name: "Ibn Al-Gazry", image: ibnAlGazryLogo },
];

export default function TrustedBy({ text }: { text: string }) {
  return (
    <div className="flex flex-col gap-6 mt-12">
      <p className="text-xl text-foreground font-medium">{text}</p>
      <div className="flex flex-wrap gap-8 items-center">
        {brands.map((brand, index) => (
          <div
            key={index}
            className={`w-16 h-16 rounded-full flex items-center justify-center shadow-sm ${brand.color}`}
            title={brand.name}
          >
            <Image src={brand.image} alt={brand.name} width={50} height={50} />
          </div>
        ))}
        <Image src={goCareMenaLogo} alt="Go-Care Mena" width={200} height={50} />
      </div>
    </div>
  );
}
