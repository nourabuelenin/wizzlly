import CaseStudyImage from "@/public/images/case-studies.jpg";
import MockLogoImage from "@/public/images/mock-logo.png";
import Image from "next/image";

export default function HomepageCaseStudies() {
  return (
    <section className="relative">
      <div className="bg-primary p-10">
        <div className="container p-10 mx-auto flex justify-between items-center ">
          <Image src={MockLogoImage} alt="Mock Logo" height={150} width={150} />
          <Image src={MockLogoImage} alt="Mock Logo" height={150} width={150} />
          <Image src={MockLogoImage} alt="Mock Logo" height={150} width={150} />
          <Image src={MockLogoImage} alt="Mock Logo" height={150} width={150} />
          <Image src={MockLogoImage} alt="Mock Logo" height={150} width={150} />
          <Image src={MockLogoImage} alt="Mock Logo" height={150} width={150} />
        </div>
      </div>
      <div className="relative h-[80vh] ">
        <Image
          src={CaseStudyImage}
          alt="Case Studies"
          className="w-full h-full object-cover"
          fill
        />
        {/* Black overlay */}
        <div className="absolute inset-0 bg-black/60"></div>

        {/* Button in center */}
        <div className="absolute inset-0 flex items-center justify-center">
          <button className="bg-white text-black px-14 py-4 rounded-full font-medium text-lg hover:bg-gray-100 transition-colors">
            View Case Studies
          </button>
        </div>
      </div>
    </section>
  );
}
