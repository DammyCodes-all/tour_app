import {
  ArrowRight,
  File,
  Check,
  Zap,
  Users,
  Target,
  BarChart,
  Play,
} from "lucide-react";
import Link from "next/link";
// import { createClient } from "@/lib/supabase/server";
import RotatingText from "../components/animations/rotating-text/RotatingText";
import DecryptedText from "../components/animations/decrypted-text/DecryptedText";
import TrustedBySection from "../components/trusted-by/TrustedBySection";
import gsap from "gsap";
import useGsap from "@gsap/react";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-custom-black text-white font-sans">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-block">
                <DecryptedText
                  text=" Product Onboarding Made Simple"
                  speed={90}
                  maxIterations={20}
                  characters="ABCD1234!?"
                  className="revealed"
                  parentClassName="all-letters bg-custom-orange/10 text-custom-orange px-4 py-2 rounded-full text-sm font-medium"
                  encryptedClassName="encrypted"
                  animateOn="view"
                />
              </div>

              <h1 className="text-xl sm:text-3xl lg:text-4xl font-bold leading-tight">
                Drive Product Growth with
                <RotatingText
                  texts={["Guided Tours", "Walkthroughs", "Discovery!"]}
                  mainClassName="text-custom-orange text-black overflow-hidden py-0.5 sm:py-1 md:py-2 justify-start rounded-lg"
                  staggerFrom={"last"}
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  exit={{ y: "-120%" }}
                  staggerDuration={0.035}
                  splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
                  transition={{ type: "spring", damping: 30, stiffness: 400 }}
                  rotationInterval={3500}
                />
              </h1>

              <p className="text-lg text-gray-400 leading-relaxed">
                Create interactive product tours that help users discover value
                faster. Increase activation, boost engagement, and reduce
                support tickets.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href={"/tour-dashboard"}
                  className="bg-custom-orange text-white px-8 py-4 rounded hover:bg-custom-orange-dark transition-all font-medium flex items-center justify-center gap-2 group"
                >
                  Get Started for Free
                  <ArrowRight
                    className="group-hover:translate-x-1 transition-transform"
                    size={20}
                  />
                </Link>
                <Link
                  href={"/documentation"}
                  className="border border-gray-600 text-white px-8 py-4 rounded hover:border-custom-orange hover:text-custom-orange transition-all font-medium flex items-center justify-center gap-2"
                >
                  <File size={20} />
                  Docs
                </Link>
              </div>
            </div>

            {/* Hero Image/Demo */}
            <div className="relative">
              <div className="bg-linear-to-br from-custom-orange/20 to-cusfrom-custom-orange/5 rounded-2xl p-8 border border-custom-orange/20">
                <div className="bg-[#0f0f0f] rounded-lg p-6 shadow-2xl">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <div className="space-y-4">
                    <div className="h-4 bg-gray-800 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-800 rounded w-full"></div>
                    <div className="h-4 bg-gray-800 rounded w-5/6"></div>
                    <div className="mt-6 p-4 bg-custom-orange/10 border-2 border-custom-orange rounded-lg">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-full bg-custom-orange flex items-center justify-center shrink-0">
                          <Zap size={20} />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium mb-1">
                            Welcome to Tourify!
                          </p>
                          <p className="text-sm text-gray-400">
                            Let&apos;s get you started with a quick tour of the
                            key features.
                          </p>
                          <div className="flex gap-2 mt-3">
                            <button className="bg-custom-orange text-white px-4 py-1.5 rounded text-sm hover:bg-custom-orange-dark transition-colors">
                              Start Tour
                            </button>
                            <button className="text-gray-400 px-4 py-1.5 rounded text-sm hover:text-white transition-colors">
                              Skip
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-custom-orange/20 rounded-full blur-3xl"></div>
              <div className="absolute -top-4 -left-4 w-32 h-32 bg-custom-orange/20 rounded-full blur-3xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Trusted By Section */}
      <TrustedBySection />

      {/* Features Section */}
      <section id="features" className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              Everything You Need to
              <span className="text-custom-orange"> Onboard Users</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Powerful features designed to create delightful product
              experiences
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Target size={24} />,
                title: "Interactive Tours",
                description:
                  "Create step-by-step walkthroughs that guide users through your product's key features.",
              },
              {
                icon: <Users size={24} />,
                title: "User Segmentation",
                description:
                  "Target specific user groups with personalized onboarding experiences based on behavior.",
              },
              {
                icon: <BarChart size={24} />,
                title: "Analytics Dashboard",
                description:
                  "Track completion rates, drop-off points, and user engagement metrics in real-time.",
              },
              {
                icon: <Zap size={24} />,
                title: "Easy Integration",
                description:
                  "Add Tourify to your website with just a few lines of code. No complex setup required.",
              },
              {
                icon: <Check size={24} />,
                title: "No-Code Editor",
                description:
                  "Design beautiful tours without writing code. Our visual editor makes it simple.",
              },
              {
                icon: <Play size={24} />,
                title: "Multi-Step Flows",
                description:
                  "Create complex onboarding journeys with branching logic and conditional steps.",
              },
            ].map((feature, i) => (
              <div
                key={i}
                className="bg-[#1a1a1a] p-8 rounded-xl border border-custom-gray hover:border-custom-orange/50 transition-all group"
              >
                <div className="w-12 h-12 bg-custom-orange/10 rounded-lg flex items-center justify-center text-custom-orange mb-4 group-hover:bg-custom-orange/20 transition-colors">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="bg-linear-to-r from-custom-orange to-custom-orange-dark rounded-2xl p-12 text-center">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              Ready to Transform Your User Onboarding?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Join 1,000+ companies creating better product experiences
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href={"/get-started"}
                className="bg-white text-custom-orange px-8 py-4 rounded hover:bg-gray-100 transition-colors font-medium flex items-center justify-center gap-2"
              >
                Get Started Now
                <ArrowRight size={20} />
              </Link>
              <Link
                href={"/documentation"}
                className="bg-transparent border-2 border-white text-white px-8 py-4 rounded hover:bg-white/10 transition-colors font-medium"
              >
                Docs
              </Link>
            </div>
            <p className="mt-6 text-sm opacity-75">
              No credit card required • 14-days free trial
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
export default LandingPage;
