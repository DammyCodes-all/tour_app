import { Users, Target, Zap, Award, TrendingUp, Heart, Rocket, Shield } from 'lucide-react';
import Link from 'next/link';
import DecryptedText from '@/app/components/animations/decrypted-text/DecryptedText';
import RotatingText from '@/app/components/animations/rotating-text/RotatingText';

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-custom-black text-white">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block mb-6">
            <DecryptedText
              text="About Tourify"
              speed={90}
              maxIterations={20}
              characters="ABCD1234!?"
              className="revealed"
              parentClassName="all-letters bg-custom-orange/10 text-custom-orange px-4 py-2 rounded-full text-sm font-medium"
              encryptedClassName="encrypted"
              animateOn="view"
            />
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            We're Building the Future of
            <RotatingText
              texts={['User Onboarding', 'In-App Guidance', 'Product Adoption!']}
              mainClassName="text-custom-orange text-black overflow-hidden py-0.5 sm:py-1 md:py-2 justify-center rounded-lg"
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

          <p className="text-xl text-gray-400 leading-relaxed max-w-3xl mx-auto">
            Tourify was created to solve a simple problem: helping users discover value in products faster.
            We believe great onboarding shouldn't require months of development or a PhD in user experience.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-custom-gray">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Mission */}
            <div className="bg-linear-to-br from-custom-orange/10 to-transparent border border-custom-orange/20 rounded-2xl p-8">
              <div className="w-16 h-16 bg-custom-orange rounded-xl flex items-center justify-center mb-6">
                <Target size={32} />
              </div>
              <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
              <p className="text-gray-400 text-lg leading-relaxed">
                To empower every product team to create delightful onboarding experiences that drive user
                activation, engagement, and long-term retention. We're making world-class user onboarding
                accessible to companies of all sizes.
              </p>
            </div>

            {/* Vision */}
            <div className="bg-linear-to-br from-purple-500/10 to-transparent border border-purple-500/20 rounded-2xl p-8">
              <div className="w-16 h-16 bg-purple-500 rounded-xl flex items-center justify-center mb-6">
                <Rocket size={32} />
              </div>
              <h2 className="text-3xl font-bold mb-4">Our Vision</h2>
              <p className="text-gray-400 text-lg leading-relaxed">
                A world where every user feels confident and excited when trying new products.
                Where confusion is replaced with clarity, and friction is replaced with flow.
                We're building the tools to make that vision a reality.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-8 text-center">Our Story</h2>

          <div className="space-y-6 text-gray-400 text-lg leading-relaxed">
            <p>
              Tourify was born out of frustration. As product developers, we watched countless users
              struggle with products that were actually quite powerful—they just didn't know where to start.
            </p>

            <p>
              Traditional onboarding solutions were either too complex, requiring engineering resources
              we didn't have, or too simple, lacking the features we needed to create truly engaging experiences.
            </p>

            <p>
              So in 2025, we set out to build something different. A platform that combined the power
              and flexibility developers need with the simplicity and speed that product teams crave.
              The result is Tourify—an embeddable onboarding solution that just works.
            </p>

            <p className="text-white font-medium">
              Today, over 1,000 companies use Tourify to help millions of users discover value faster.
              And we're just getting started.
            </p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-custom-gray">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">Our Values</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Users size={28} />,
                title: 'User-First',
                description: 'Every decision we make starts with the question: "How does this help our users?"'
              },
              {
                icon: <Zap size={28} />,
                title: 'Move Fast',
                description: 'Speed matters. We ship quickly, iterate constantly, and learn from real feedback.'
              },
              {
                icon: <Heart size={28} />,
                title: 'Build with Care',
                description: 'Quality isn\'t negotiable. We sweat the details so our users don\'t have to.'
              },
              {
                icon: <Shield size={28} />,
                title: 'Trust & Transparency',
                description: 'We\'re honest about what we can do, clear about our limitations, and open about our roadmap.'
              }
            ].map((value, i) => (
              <div key={i} className="text-center">
                <div className="w-16 h-16 bg-custom-orange/10 rounded-xl flex items-center justify-center text-custom-orange mx-auto mb-4">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                <p className="text-gray-400 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-linear-to-r from-custom-orange/20 to-custom-orange/5 rounded-2xl border border-custom-orange/30 p-12">
            <h2 className="text-4xl font-bold mb-12 text-center">Tourify by the Numbers</h2>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                { number: '1,000+', label: 'Active Companies', icon: <Users size={24} /> },
                { number: '10M+', label: 'Tours Completed', icon: <TrendingUp size={24} /> },
                { number: '95%', label: 'Satisfaction Rate', icon: <Award size={24} /> },
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-custom-orange/20 rounded-lg text-custom-orange mb-4">
                    {stat.icon}
                  </div>
                  <p className="text-5xl font-bold text-custom-orange mb-2">{stat.number}</p>
                  <p className="text-gray-400">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-custom-gray">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">Meet the Team</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              A passionate group of developers, and product enthusiasts
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: 'Fatima Jimoh', role: '@Oyiza', initials: 'FJ' },
              { name: 'Olagunju Alameen', role: '@Aluminate', initials: 'OA' },
              { name: 'Zainab Ibrahim', role: '@Zainab I.', initials: 'ZI' },
            ].map((member, i) => (
              <div key={i} className="text-center group">
                <div className="w-32 h-32 bg-linear-to-br from-custom-orange to-custom-orange-dark rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-4 group-hover:scale-110 transition-transform">
                  {member.initials}
                </div>
                <h3 className="text-lg font-bold">{member.name}</h3>
                <p className="text-gray-400 text-sm">{member.role}</p>
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
              Ready to Get Started?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Join the companies already transforming their user onboarding
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/get-started"
                className="bg-white text-custom-orange px-8 py-4 rounded hover:bg-gray-100 transition-colors font-medium inline-flex items-center justify-center gap-2"
              >
                Start Free Trial
                <Rocket size={20} />
              </Link>
              <Link
                href="/documentation"
                className="bg-transparent border-2 border-white text-white px-8 py-4 rounded hover:bg-white/10 transition-colors font-medium"
              >
                View Documentation
              </Link>
            </div>
            <p className="mt-6 text-sm opacity-75">No credit card required • 14-day free trial</p>
          </div>
        </div>
      </section>
    </div>
  );
}
export default AboutPage;