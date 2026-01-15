import CaseStudyImage from "@/public/images/case-studies.jpg";
import MockLogoImage from "@/public/images/mock-logo.png";
import Image from "next/image";
import Button from "@/components/Button";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function HomepageCaseStudies({ dict }: any) {
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
          <Button
            text={dict.homepage.caseStudies.buttonText}
            ShowArrow={false}
            variant="tertiary"
            className="px-14"
          />
        </div>
      </div>
    </section>
  );
}
