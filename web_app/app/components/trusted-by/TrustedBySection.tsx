"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import CountUp from "../animations/count-up/CountUp";

const TrustedBySection = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const companies = ["Amazon", "Meta", "Microsoft", "Apple", "IBM", "Google"];

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const scrollWidth = container.scrollWidth;
    gsap.to(container, {
      x: -(scrollWidth / 2),
      duration: 20,
      ease: "none",
      repeat: -1,
    });

    return () => {
      gsap.killTweensOf(container);
    };
  }, []);

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 border-t border-custom-gray overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <p className="text-center lg:text-lg text-gray-500 text-sm mb-20 uppercase tracking-wider">
          Trusted by{" "}
          <span className="text-custom-orange font-bold">Leading</span>{" "}
          Companies
        </p>

        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-linear-to-r from-custom-black to-transparent z-10"></div>
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-linear-to-l from-custom-black to-transparent z-10"></div>

          <div ref={scrollRef} className="flex gap-16 items-center">
            {companies.map((company, i) => (
              <div
                key={`first-${i}`}
                className="text-custom-orange font-bold text-2xl whitespace-nowrap hover:scale-110 transition-transform cursor-pointer"
              >
                {company}
              </div>
            ))}
            {companies.map((company, i) => (
              <div
                key={`second-${i}`}
                className="text-custom-orange font-bold text-2xl whitespace-nowrap hover:scale-110 transition-transform cursor-pointer"
              >
                {company}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-center md:justify-between gap-3 md:gap-5 mt-20 max-w-7xl mx-auto">
        <div>
          <CountUp
            from={0}
            to={1000}
            separator=","
            direction="up"
            duration={0.5}
            className="count-up-text text-2xl font-bold mb-1.5"
          />
          +<p className="text-sm text-gray-400 mt-2">Active Companies</p>
        </div>
        <div className="h-12 w-px bg-gray-700"></div>
        <div>
          <CountUp
            from={0}
            to={10}
            separator=","
            direction="up"
            duration={2}
            className="count-up-text text-2xl font-bold mb-1.5"
          />
          M+
          <p className="text-sm text-gray-400 mt-2">Tours Completed</p>
        </div>
        <div className="h-12 w-px bg-gray-700"></div>
        <div>
          <CountUp
            from={0}
            to={95}
            separator=","
            direction="up"
            duration={2}
            className="count-up-text text-2xl font-bold mb-1.5"
          />
          %<p className="text-sm text-gray-400 mt-2">Satisfaction</p>
        </div>
      </div>
    </section>
  );
};
export default TrustedBySection;
