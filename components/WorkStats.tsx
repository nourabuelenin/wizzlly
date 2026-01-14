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
    <section className="bg-surface-muted py-20">
      <div className="grid grid-cols-[auto_1fr] gap-2 container mx-auto px-10">
        {/* Left Side - Image */}
        <div>
          <Image
            src={DevelopImage}
            width={570}
            height={570}
            alt="design-develop-image"
          />
        </div>

        {/* Right Side - Bento Grid */}
        <div className="flex flex-col gap-4">
          {/* Top Row - Web & Projects */}
          <div className="grid grid-cols-2 gap-4">
            {/* Web Lorem Section */}
            <div className="bg-white rounded-2xl p-6 flex flex-col justify-between">
              <div>
                <h3 className="font-bold text-2xl mb-3">Web</h3>
                <p className="text-gray-500 text-lg">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Perferendis nisi laboriosam esse quibusdam quas porro
                  explicabo error doloribus perspiciatis animi.
                </p>
              </div>
              <div className="flex gap-3 mt-4 p-4 items-center justify-between bg-[#f7f2fc] rounded-xl">
                <div className="bg-primary p-3 rounded-xl">
                  <Globe className="w-8 h-8 text-white" />
                </div>
                <div className="bg-white p-3 rounded-xl">
                  <PhoneCall className="w-8 h-8 text-primary" />
                </div>
                <div className="bg-white p-3 rounded-xl">
                  <Cloud className="w-8 h-8 text-primary" />
                </div>
              </div>
            </div>

            {/* Projects Delivered */}
            <div className="bg-primary flex items-center justify-center rounded-2xl p-6 text-white">
              <div className="flex flex-col items-center gap-4">
                <h3 className="text-5xl font-bold">500+</h3>
                <p className="text-2xl">Projects</p>
                <span className="flex gap-3 items-center bg-white text-primary font-semibold py-2 px-4 rounded-full">
                  Delivered
                  <span className="bg-primary text-white rounded-full p-2">
                    <CheckCircle className="w-5 h-5" />
                  </span>
                </span>
              </div>
            </div>
          </div>

          {/* Years of Experience */}
          <div className="flex items-center gap-6 bg-white rounded-2xl p-6">
            <div className="bg-primary/10 p-3 rounded-xl">
              <Clock10 className="w-8 h-8 text-primary" />
            </div>
            <span className="text-6xl font-bold">15+</span>
            <span className="text-2xl font-medium">Years of Experience</span>
          </div>

          {/* Coding Hours */}
          <div className="flex items-center gap-6 bg-white rounded-2xl p-6">
            <div className="bg-primary/10 p-3 rounded-xl">
              <Code2 className="w-8 h-8 text-primary" />
            </div>
            <span className="text-6xl font-bold">1M+</span>
            <span className="text-2xl font-medium">Coding Hours</span>
          </div>
        </div>
      </div>
    </section>
  );
}
