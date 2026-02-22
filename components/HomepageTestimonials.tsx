"use client";

import { useState } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function HomepageTestimonials({ dict }: any) {
  const t = dict.homepage.testimonials;

  // We are going to display 3 cards at a time on large screens.
  // The items array has 6 testimonials.
  const [activeIndex, setActiveIndex] = useState(0);

  const itemsLength = t.items.length;

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % itemsLength);
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + itemsLength) % itemsLength);
  };

  return (
    <section className="bg-surface-muted py-20 px-4 overflow-hidden">
      <div className="w-full px-4 lg:px-40">
        {/* Header Section */}
        <div className="text-center mb-16">
          <span className="text-primary font-bold uppercase tracking-wider mb-4 block text-sm">
            {t.badge}
          </span>
          <h2 className="text-3xl lg:text-5xl font-bold text-foreground leading-tight">
            {t.title}
          </h2>
        </div>

        {/* Carousel Container */}
        <div className="relative flex items-center justify-center mb-12">
          
          {/* Left Arrow */}
          <button 
            onClick={prevSlide}
            className="hidden lg:flex absolute -left-12 xl:-left-16 z-20 w-12 h-12 bg-white rounded-full shadow-md items-center justify-center text-foreground hover:text-primary transition-colors focus:outline-none"
            aria-label="Previous Testimonials"
          >
            <ChevronLeft className="w-6 h-6 rtl:rotate-180" />
          </button>

          {/* Cards Grid List for transition */}
          <div className="flex justify-center items-center gap-6 w-full py-8">
            {/* Displaying 3 cards centered around activeIndex */}
            {[-1, 0, 1].map((offset) => {
              const index = (activeIndex + offset + itemsLength) % itemsLength;
              const testimonial = t.items[index];
              const isActive = offset === 0;

              return (
                <div 
                  key={offset}
                  // Hide outer cards on smaller screens and strictly show 1
                  className={`bg-white p-8 lg:p-10 rounded-[30px] flex flex-col transition-all duration-500 h-full min-h-[400px] w-full flex-1 border ${
                    isActive 
                      ? "shadow-lg border-gray-100 z-10 block" 
                      : "shadow-sm border-gray-100 hidden lg:flex hover:shadow-md"
                  }`}
                >
                  <h3 className="text-xl font-bold mb-3 text-foreground leading-snug">
                    {testimonial.title}
                  </h3>
                  <p className="text-sm text-foreground-light opacity-60 mb-6">
                    {testimonial.date}
                  </p>
                  
                  <div className="flex items-center gap-2 mb-6 text-yellow-400">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-current" />
                      ))}
                    </div>
                    <span className="text-sm font-semibold text-foreground-light opacity-80 ml-1">
                      {testimonial.rating.toFixed(1)}
                    </span>
                  </div>

                  <p className="text-foreground-light opacity-80 leading-relaxed text-[15px] mb-8 flex-grow italic">
                    {testimonial.content}
                  </p>

                  <div className="mt-auto">
                    <h4 className="font-bold text-foreground text-lg mb-1">
                      {testimonial.author}
                    </h4>
                    <p className="text-sm text-foreground-light opacity-70">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Arrow */}
          <button 
            onClick={nextSlide}
            className="hidden lg:flex absolute -right-12 xl:-right-16 z-20 w-12 h-12 bg-white rounded-full shadow-md items-center justify-center text-foreground hover:text-primary transition-colors focus:outline-none"
            aria-label="Next Testimonials"
          >
            <ChevronRight className="w-6 h-6 rtl:rotate-180" />
          </button>
        </div>

        {/* Pagination Indicators */}
        <div className="flex items-center justify-center gap-2 lg:gap-3 mt-4">
          {t.items.map((_: any, idx: number) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`transition-all duration-300 rounded-full cursor-pointer h-1.5 w-8 sm:w-12 lg:w-16 ${
                activeIndex === idx
                  ? "bg-primary"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
              aria-label={`Go to testimonial ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
