import { ArrowLeft, ArrowRight } from "lucide-react";

export default function LoginTestimonial() {
  return (
    <div className="flex flex-col items-center justify-end pb-24 h-full p-8 max-w-md text-center font-sans tracking-tight">
      <h2 className="text-[28px] md:text-[32px] font-semibold text-gray-800 leading-snug mb-12">
        “We’ve been using enablr to kick start every new campaign and can’t imagine working without it.”
      </h2>
      
      <div className="flex items-center justify-center gap-8 mt-4 w-full">
        {/* Left Arrow */}
        <button className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-full border border-primary/30 text-primary hover:bg-primary/10 transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </button>
        
        {/* Author Info */}
        <div className="flex flex-col items-center">
          <p className="text-xl font-bold text-gray-900 mb-1">Amélie Laurent</p>
          <p className="text-[13px] font-medium text-gray-500 tracking-wide">Lead Designer, Layers</p>
          <p className="text-[13px] font-medium text-gray-500 tracking-wide">Web Development Agency</p>
        </div>
        
        {/* Right Arrow */}
        <button className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-full border border-primary/30 text-primary hover:bg-primary/10 transition-colors">
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
