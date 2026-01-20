import CaseStudyImage from "@/public/images/case-studies.jpg";
import MockLogoImage from "@/public/images/mock-logo.png";
import Image from "next/image";
import Button from "@/components/Button";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function HomepageCaseStudies({ dict }: any) {
  return (
    <section className="relative">
      <div className="bg-primary p-4 md:p-10">
        <div className="container px-4 md:px-10 py-6 md:py-10 mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 md:gap-10 justify-items-center items-center">
          {[1, 2, 3, 4, 5, 6].map((idx) => (
            <div
              key={idx}
              className="w-20 h-20 md:w-32 md:h-32 flex items-center justify-center"
            >
              <Image
                src={MockLogoImage}
                alt={`Mock Logo ${idx}`}
                width={150}
                height={150}
                className="w-full h-full object-contain"
              />
            </div>
          ))}
        </div>
      </div>
      <div className="relative h-[50vh] sm:h-[60vh] md:h-[80vh]">
        <Image
          src={CaseStudyImage}
          alt="Case Studies"
          className="w-full h-full object-cover"
          fill
        />
        {/* Black overlay */}
        <div className="absolute inset-0 bg-black/60"></div>

        {/* Button in center */}
        <div className="absolute inset-0 flex items-center justify-center px-4">
          <Button
            text={dict.homepage.caseStudies.buttonText}
            ShowArrow={false}
            variant="tertiary"
            className="px-8 md:px-14"
          />
        </div>
      </div>
    </section>
  );
}
