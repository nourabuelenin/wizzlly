import Image from "next/image";

// Placeholder for now, ideally these would be actual brand logos
const brands = [
  { name: "Brand 1", color: "bg-indigo-900" },
  { name: "Brand 2", color: "bg-emerald-100" },
  { name: "Brand 3", color: "bg-rose-200" },
  { name: "Brand 4", color: "bg-white" }, 
  { name: "Brand 5", color: "bg-black" },
  { name: "Brand 6", color: "bg-amber-100" },
  { name: "Brand 7", color: "bg-white" },
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
             {/* Placeholder content - replace with actual Image when available */}
             <div className="text-xs text-center opacity-50 px-1">{brand.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
