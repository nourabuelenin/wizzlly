import Image from "next/image";
import DevelopImage from "@/public/images/workstats.png";
import {
  CheckCircle,
  Clock10,
  Cloud,
  Code2,
  Globe,
  PhoneCall,
} from "lucide-react";

export default function WorkStats() {
  return (
    <section className="bg-white py-20">
      <div className="grid grid-cols-3 gap-4 container mx-auto px-10">
        <div>
          <Image
            src={DevelopImage}
            width={600}
            height={600}
            alt="design-develop-image"
          />
        </div>
        <div>
          <h3>Web</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Perferendis nisi laboriosam esse quibusdam quas porro explicabo
            error doloribus perspiciatis animi.
          </p>
          <div className="flex gap-4 mt-4">
            <Globe className="w-6 h-6 text-gray-700" />
            <PhoneCall className="w-6 h-6 text-gray-700" />
            <Cloud className="w-6 h-6 text-gray-700" />
          </div>
        </div>
        <div>
          <h3>500+</h3>
          <p>Projects</p>
          <span>
            Delivered <CheckCircle />
          </span>
        </div>
        <div>
          <Clock10 />
          <span>15+</span>
          <span>Years of Experience</span>
        </div>
        <div>
          <Code2 />
          <span>1M+</span>
          <span>Coding Hours</span>
        </div>
      </div>
    </section>
  );
}
