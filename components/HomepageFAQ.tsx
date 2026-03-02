"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import Button from "./Button";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function HomepageFAQ({ dict }: any) {
  const t = dict.homepage.faq;
  const [openIndex, setOpenIndex] = useState<number>(0);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <section className="bg-background py-20 px-4">
      <div className="w-full px-4 lg:px-40">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-start">
          
          {/* Left Column - Title & CTA */}
          <div className="lg:w-1/3 flex flex-col items-start">
            <span className="text-primary font-bold uppercase tracking-wider mb-4 block text-sm">
              {t.badge}
            </span>
            <h2 className="text-3xl lg:text-5xl font-bold text-foreground leading-tight mb-8 whitespace-pre-line">
              {t.title}
            </h2>
            <Button text={t.cta} showArrow={true} />
          </div>

          {/* Right Column - Accordion */}
          <div className="lg:w-2/3 w-full border-t border-gray-200">
            {t.questions.map((faq: any, index: number) => {
              const isOpen = openIndex === index;

              return (
                <div 
                  key={index} 
                  className="border-b border-gray-200 py-6"
                >
                  <button
                    className="w-full flex justify-between items-center text-left focus:outline-none group"
                    onClick={() => toggleAccordion(index)}
                  >
                    <span className={`text-base font-bold pr-8 transition-colors ${isOpen ? 'text-primary' : 'text-foreground group-hover:text-primary'}`}>
                      {faq.question}
                    </span>
                    <span className="text-foreground-light flex-shrink-0">
                      {isOpen ? (
                        <ChevronUp className="w-5 h-5 text-primary" />
                      ) : (
                        <ChevronDown className="w-5 h-5" />
                      )}
                    </span>
                  </button>
                  
                  {/* Accordion Content */}
                  <div 
                    className={`grid transition-all duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100 mt-4' : 'grid-rows-[0fr] opacity-0'}`}
                  >
                    <div className="overflow-hidden">
                      <p className="text-foreground-light text-sm leading-relaxed opacity-80">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
