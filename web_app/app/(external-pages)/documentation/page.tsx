'use client';
import { useState } from 'react';
import {
  BookOpen,
  Rocket,
  Code,
  Sparkles,
  Settings,
  Zap,
  CheckCircle,
  Copy,
  Terminal,
  Layers,
  MousePointer,
  ArrowRight
} from 'lucide-react';
import Link from 'next/link';
import DecryptedText from '@/app/components/animations/decrypted-text/DecryptedText';

export default function DocumentationPage() {
  const [copiedSection, setCopiedSection] = useState('');

  const copyToClipboard = (text: string, section: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(section);
    setTimeout(() => setCopiedSection(''), 2000);
  };

  return (
    <div className="min-h-screen bg-custom-black text-white">
      {/* Hero Section */}
      <section className="pt-32 pb-12 px-4 sm:px-6 lg:px-8 border-b border-custom-gray">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl">
            <div className="inline-block mb-6">
              <DecryptedText
                text="Documentation"
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
              Get Started with
              <span className="text-custom-orange"> Tourify</span>
            </h1>

            <p className="text-xl text-gray-400 leading-relaxed">
              Everything you need to create beautiful, interactive product tours in minutes.
              Follow our step-by-step guide to launch your first tour.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <aside className="lg:col-span-1">
            <nav className="sticky top-24 space-y-1">
              <a href="#getting-started" className="block px-4 py-2 rounded-lg hover:bg-custom-orange/10 hover:text-custom-orange transition-colors">
                Getting Started
              </a>
              <a href="#dashboard" className="block px-4 py-2 rounded-lg hover:bg-custom-orange/10 hover:text-custom-orange transition-colors">
                Dashboard Setup
              </a>
              <a href="#creating-tours" className="block px-4 py-2 rounded-lg hover:bg-custom-orange/10 hover:text-custom-orange transition-colors">
                Creating Tours
              </a>
              <a href="#steps" className="block px-4 py-2 rounded-lg hover:bg-custom-orange/10 hover:text-custom-orange transition-colors">
                Configuring Steps
              </a>
              <a href="#selectors" className="block px-4 py-2 rounded-lg hover:bg-custom-orange/10 hover:text-custom-orange transition-colors">
                Understanding Selectors
              </a>
              <a href="#installation" className="block px-4 py-2 rounded-lg hover:bg-custom-orange/10 hover:text-custom-orange transition-colors">
                Installation
              </a>
              <a href="#examples" className="block px-4 py-2 rounded-lg hover:bg-custom-orange/10 hover:text-custom-orange transition-colors">
                Examples
              </a>
              <a href="#api" className="block px-4 py-2 rounded-lg hover:bg-custom-orange/10 hover:text-custom-orange transition-colors">
                API Reference
              </a>
            </nav>
          </aside>

          {/* Main Content */}
          <main className="lg:col-span-3 space-y-16">

            {/* Getting Started */}
            <section id="getting-started" className="scroll-mt-24">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-custom-orange/10 rounded-lg flex items-center justify-center">
                  <Rocket className="text-custom-orange" size={24} />
                </div>
                <h2 className="text-3xl font-bold">Getting Started</h2>
              </div>

              <div className="prose prose-invert max-w-none">
                <p className="text-gray-400 text-lg leading-relaxed mb-6">
                  Tourify makes it incredibly easy to create engaging product tours that guide your users
                  through your application. In just a few minutes, you'll have a fully functional onboarding
                  experience up and running.
                </p>

                <div className="bg-custom-orange/5 border border-custom-orange/20 rounded-xl p-6 mb-6">
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <Sparkles className="text-custom-orange" size={20} />
                    Quick Overview
                  </h3>
                  <ol className="space-y-3 text-gray-400">
                    <li className="flex gap-3">
                      <span className="text-custom-orange font-bold">1.</span>
                      <span>Sign up and access your dashboard</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-custom-orange font-bold">2.</span>
                      <span>Create a tour with a name and description</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-custom-orange font-bold">3.</span>
                      <span>Add at least 5 steps with CSS selectors</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-custom-orange font-bold">4.</span>
                      <span>Copy the generated script tag</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-custom-orange font-bold">5.</span>
                      <span>Paste it into your website's HTML</span>
                    </li>
                  </ol>
                </div>
              </div>
            </section>

            {/* Dashboard Setup */}
            <section id="dashboard" className="scroll-mt-24 border-t border-custom-gray pt-16">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center">
                  <Layers className="text-purple-400" size={24} />
                </div>
                <h2 className="text-3xl font-bold">Dashboard Setup</h2>
              </div>

              <p className="text-gray-400 text-lg leading-relaxed mb-6">
                Your dashboard is mission control for all your product tours. Here's where you'll create,
                manage, and monitor the performance of your onboarding experiences.
              </p>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="bg-[#1a1a1a] rounded-xl p-6 border border-custom-gray">
                  <CheckCircle className="text-green-400 mb-4" size={24} />
                  <h3 className="text-xl font-bold mb-2">Create Tours</h3>
                  <p className="text-gray-400">Design multi-step walkthroughs with our intuitive interface</p>
                </div>
                <div className="bg-[#1a1a1a] rounded-xl p-6 border border-custom-gray">
                  <Settings className="text-blue-400 mb-4" size={24} />
                  <h3 className="text-xl font-bold mb-2">Configure Steps</h3>
                  <p className="text-gray-400">Set up each step with selectors, positions, and content</p>
                </div>
                <div className="bg-[#1a1a1a] rounded-xl p-6 border border-custom-gray">
                  <Code className="text-custom-orange mb-4" size={24} />
                  <h3 className="text-xl font-bold mb-2">Get Your Script</h3>
                  <p className="text-gray-400">Generate a unique embed code for each tour</p>
                </div>
                <div className="bg-[#1a1a1a] rounded-xl p-6 border border-custom-gray">
                  <Zap className="text-yellow-400 mb-4" size={24} />
                  <h3 className="text-xl font-bold mb-2">Track Analytics</h3>
                  <p className="text-gray-400">Monitor completion rates and user engagement</p>
                </div>
              </div>

              <div className="flex gap-4">
                <Link
                  href="/get-started"
                  className="bg-custom-orange text-white px-6 py-3 rounded-lg hover:bg-custom-orange-dark transition-colors font-medium inline-flex items-center gap-2"
                >
                  Go to Dashboard
                  <ArrowRight size={18} />
                </Link>
              </div>
            </section>

            {/* Creating Tours */}
            <section id="creating-tours" className="scroll-mt-24 border-t border-custom-gray pt-16">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-custom-orange/10 rounded-lg flex items-center justify-center">
                  <BookOpen className="text-custom-orange" size={24} />
                </div>
                <h2 className="text-3xl font-bold">Creating Your First Tour</h2>
              </div>

              <p className="text-gray-400 text-lg leading-relaxed mb-8">
                Every tour in Tourify consists of two main components: <strong className="text-white">tour metadata</strong> and
                <strong className="text-white"> individual steps</strong>. Let's break down how to set up each one.
              </p>

              <div className="bg-linear-to-r from-custom-orange/10 to-transparent border-l-4 border-custom-orange rounded-r-xl p-6 mb-8">
                <h3 className="text-xl font-bold mb-4">Tour Properties</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-custom-orange mb-2">Name</h4>
                    <p className="text-gray-400">
                      A descriptive title for your tour (e.g., "Welcome Tour", "Feature Discovery", "New User Onboarding").
                      This helps you organize multiple tours in your dashboard.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-custom-orange mb-2">Description</h4>
                    <p className="text-gray-400">
                      A brief explanation of what this tour covers. This is for your internal reference and won't be
                      shown to end users unless you choose to display it.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-[#0f0f0f] rounded-xl p-6 border border-custom-gray mb-6">
                <h4 className="font-semibold mb-4 flex items-center justify-between">
                  <span>Example Tour Configuration</span>
                </h4>
                <div className="bg-[#1a1a1a] rounded-lg p-4 font-mono text-sm">
                  <div className="text-gray-500">// Tour Details</div>
                  <div className="text-white mt-2">
                    <span className="text-purple-400">Name:</span> <span className="text-green-400">"Welcome to Your Dashboard"</span>
                  </div>
                  <div className="text-white">
                    <span className="text-purple-400">Description:</span> <span className="text-green-400">"A quick walkthrough of key features"</span>
                  </div>
                  <div className="text-white">
                    <span className="text-purple-400">Steps:</span> <span className="text-yellow-400">5</span> (minimum required)
                  </div>
                </div>
              </div>
            </section>

            {/* Configuring Steps */}
            <section id="steps" className="scroll-mt-24 border-t border-custom-gray pt-16">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center">
                  <Settings className="text-blue-400" size={24} />
                </div>
                <h2 className="text-3xl font-bold">Configuring Steps</h2>
              </div>

              <p className="text-gray-400 text-lg leading-relaxed mb-8">
                Each tour must contain <strong className="text-custom-orange">at least 5 steps</strong>. Steps are the individual
                tooltips or modals that appear to guide users through your product. Here's what you can configure for each step:
              </p>

              <div className="space-y-6 mb-8">
                <div className="bg-[#1a1a1a] rounded-xl p-6 border border-custom-gray">
                  <h3 className="text-xl font-bold mb-4 text-custom-orange">1. Selector (Required)</h3>
                  <p className="text-gray-400 mb-4">
                    The most critical property of any step. This tells Tourify which element on your page to highlight
                    and attach the tooltip to. Selectors use standard CSS syntax.
                  </p>
                  <div className="bg-[#0f0f0f] rounded-lg p-4 font-mono text-sm">
                    <div className="text-green-400">// ID Selector</div>
                    <div className="text-white mb-3">#signup-button</div>

                    <div className="text-green-400">// Class Selector</div>
                    <div className="text-white mb-3">.dashboard-header</div>

                    <div className="text-green-400">// More Specific Selector</div>
                    <div className="text-white">.sidebar .nav-item:first-child</div>
                  </div>
                  <div className="mt-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
                    <p className="text-yellow-400 text-sm flex items-start gap-2">
                      <span className="text-xl">⚠️</span>
                      <span>
                        <strong>Important:</strong> Make sure these selectors exist in your codebase before launching the tour.
                        If Tourify can't find the element, that step will be skipped.
                      </span>
                    </p>
                  </div>
                </div>

                <div className="bg-[#1a1a1a] rounded-xl p-6 border border-custom-gray">
                  <h3 className="text-xl font-bold mb-4 text-purple-400">2. Position (Optional)</h3>
                  <p className="text-gray-400 mb-4">
                    Control where the tooltip appears relative to the selected element. Choose from:
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {['top', 'bottom', 'left', 'right'].map((pos) => (
                      <div key={pos} className="bg-[#0f0f0f] rounded-lg p-3 text-center border border-custom-gray">
                        <code className="text-custom-orange">{pos}</code>
                      </div>
                    ))}
                  </div>
                  <p className="text-gray-400 text-sm mt-4">
                    If not specified, Tourify will automatically choose the best position based on available screen space.
                  </p>
                </div>

                <div className="bg-[#1a1a1a] rounded-xl p-6 border border-custom-gray">
                  <h3 className="text-xl font-bold mb-4 text-green-400">3. Title</h3>
                  <p className="text-gray-400 mb-4">
                    A short, attention-grabbing headline for this step.
                  </p>
                  <div className="bg-[#0f0f0f] rounded-lg p-4 font-mono text-sm">
                    <span className="text-green-400">"Welcome to your dashboard!"</span>
                  </div>
                </div>

                <div className="bg-[#1a1a1a] rounded-xl p-6 border border-custom-gray">
                  <h3 className="text-xl font-bold mb-4 text-blue-400">4. Description (Recommended)</h3>
                  <p className="text-gray-400 mb-4">
                    The main content of your tooltip. Explain what this element does and why it matters.
                    Keep it concise—2-3 sentences work best.
                  </p>
                  <div className="bg-[#0f0f0f] rounded-lg p-4 font-mono text-sm">
                    <span className="text-green-400">
                      "This is your main navigation. Click any menu item to explore different sections of your account."
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-[#0f0f0f] rounded-xl p-6 border border-custom-gray">
                <h4 className="font-semibold mb-4">Complete Step Example</h4>
                <div className="bg-[#1a1a1a] rounded-lg p-4 font-mono text-sm overflow-x-auto">
                  <pre className="text-white">
                    {`{
                      "selector": "#create-tour-button",
                      "position": "bottom",
                      "title": "Create Your First Tour",
                      "description": "Click here to start building your first product tour. You'll be guided through each step of the process."
                }`}
                  </pre>
                </div>
              </div>
            </section>

            {/* Understanding Selectors */}
            <section id="selectors" className="scroll-mt-24 border-t border-custom-gray pt-16">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-custom-orange/10 rounded-lg flex items-center justify-center">
                  <MousePointer className="text-custom-orange" size={24} />
                </div>
                <h2 className="text-3xl font-bold">Understanding Selectors</h2>
              </div>

              <p className="text-gray-400 text-lg leading-relaxed mb-8">
                Selectors are the foundation of your tours. They tell Tourify exactly which elements to highlight.
                Here's everything you need to know to use them effectively.
              </p>

              <div className="space-y-6">
                <div className="bg-linear-to-r from-custom-orange/5 to-transparent border-l-4 border-custom-orange rounded-r-xl p-6">
                  <h3 className="text-xl font-bold mb-4">How to Find Selectors</h3>
                  <ol className="space-y-4 text-gray-400">
                    <li className="flex gap-3">
                      <span className="text-custom-orange font-bold shrink-0">1.</span>
                      <div>
                        <strong className="text-white">Open Developer Tools</strong>
                        <p className="text-sm mt-1">Right-click any element and select "Inspect" (or press F12)</p>
                      </div>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-custom-orange font-bold shrink-0">2.</span>
                      <div>
                        <strong className="text-white">Look for ID or Class</strong>
                        <p className="text-sm mt-1">Find <code className="bg-[#0f0f0f] px-2 py-1 rounded text-custom-orange">id="..."</code> or <code className="bg-[#0f0f0f] px-2 py-1 rounded text-custom-orange">class="..."</code> attributes</p>
                      </div>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-custom-orange font-bold shrink-0">3.</span>
                      <div>
                        <strong className="text-white">Format for Tourify</strong>
                        <p className="text-sm mt-1">
                          Use <code className="bg-[#0f0f0f] px-2 py-1 rounded text-custom-orange">#</code> for IDs,
                          <code className="bg-[#0f0f0f] px-2 py-1 rounded text-custom-orange ml-1">.</code> for classes
                        </p>
                      </div>
                    </li>
                  </ol>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-green-500/5 border border-green-500/20 rounded-xl p-6">
                    <h4 className="font-bold text-green-400 mb-4 flex items-center gap-2">
                      <CheckCircle size={20} />
                      Good Selectors
                    </h4>
                    <ul className="space-y-2 text-sm font-mono">
                      <li className="text-green-400">#user-profile</li>
                      <li className="text-green-400">.dashboard-nav</li>
                      <li className="text-green-400">#settings-button</li>
                      <li className="text-green-400">.card-header h2</li>
                    </ul>
                  </div>
                  <div className="bg-red-500/5 border border-red-500/20 rounded-xl p-6">
                    <h4 className="font-bold text-red-400 mb-4 flex items-center gap-2">
                      <span className="text-xl">❌</span>
                      Avoid These
                    </h4>
                    <ul className="space-y-2 text-sm">
                      <li className="text-red-400">div (too generic)</li>
                      <li className="text-red-400">.btn (too common)</li>
                      <li className="text-red-400">#random-123 (non-existent)</li>
                      <li className="text-red-400">body &gt; div &gt; div (too fragile)</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* Installation */}
            <section id="installation" className="scroll-mt-24 border-t border-custom-gray pt-16">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center">
                  <Terminal className="text-purple-400" size={24} />
                </div>
                <h2 className="text-3xl font-bold">Installation</h2>
              </div>

              <p className="text-gray-400 text-lg leading-relaxed mb-8">
                Once you've created your tour in the dashboard, you'll receive a unique script tag.
                Adding it to your website takes just seconds.
              </p>

              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold mb-4">Step 1: Copy Your Script Tag</h3>
                  <p className="text-gray-400 mb-4">
                    After creating your tour, the dashboard will generate a unique embed code that looks like this:
                  </p>
                  <div className="bg-[#0f0f0f] rounded-xl p-6 border border-custom-gray">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm text-gray-500 font-mono">HTML</span>
                      <button
                        onClick={() => copyToClipboard('<script src="https://cdn.tourify.app/embed.js" data-tour-id="your-unique-tour-id"></script>', 'install1')}
                        className="text-custom-orange hover:text-custom-orange-dark transition-colors flex items-center gap-2 text-sm"
                      >
                        {copiedSection === 'install1' ? (
                          <>
                            <CheckCircle size={16} />
                            Copied!
                          </>
                        ) : (
                          <>
                            <Copy size={16} />
                            Copy
                          </>
                        )}
                      </button>
                    </div>
                    <pre className="text-green-400 text-sm overflow-x-auto">
                      {`<script 
  src="https://cdn.tourify.app/embed.js" 
  data-tour-id="your-unique-tour-id"
></script>`}
                    </pre>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold mb-4">Step 2: Add to Your HTML</h3>
                  <p className="text-gray-400 mb-4">
                    Paste the script tag before the closing <code className="bg-[#0f0f0f] px-2 py-1 rounded text-custom-orange">&lt;/body&gt;</code> tag
                    in your HTML file. This ensures all page elements are loaded before the tour starts.
                  </p>
                  <div className="bg-[#0f0f0f] rounded-xl p-6 border border-custom-gray">
                    <pre className="text-sm overflow-x-auto">
                      {`<!DOCTYPE html>
<html>
<head>
  <title>Your App</title>
</head>
<body>
  
  <!-- Your app content -->
  
  `}<span className="text-custom-orange">{`<!-- Add Tourify script here -->`}</span>{`
  `}<span className="text-green-400">{`<script 
    src="https://cdn.tourify.app/embed.js" 
    data-tour-id="your-unique-tour-id"
  ></script>`}</span>{`
</body>
</html>`}
                    </pre>
                  </div>
                </div>

                <div className="bg-custom-orange/5 border border-custom-orange/20 rounded-xl p-6">
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <Zap className="text-custom-orange" size={20} />
                    That's it!
                  </h4>
                  <p className="text-gray-400">
                    Your tour will automatically start when users visit your page for the first time.
                    The script is lightweight (less than 30KB) and won't impact your page load speed.
                  </p>
                </div>
              </div>
            </section>

            {/* Examples */}
            <section id="examples" className="scroll-mt-24 border-t border-custom-gray pt-16">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center">
                  <Code className="text-green-400" size={24} />
                </div>
                <h2 className="text-3xl font-bold">Real-World Examples</h2>
              </div>

              <p className="text-gray-400 text-lg leading-relaxed mb-8">
                Here are some common tour scenarios to inspire your implementation:
              </p>

              <div className="space-y-8">
                <div className="bg-[#1a1a1a] rounded-xl p-6 border border-custom-gray">
                  <h3 className="text-xl font-bold mb-4 text-custom-orange">Welcome Tour for New Users</h3>
                  <div className="bg-[#0f0f0f] rounded-lg p-4">
                    <pre className="text-sm overflow-x-auto text-gray-300">
                      {`// Tour: "Welcome to Dashboard"
Steps:
1. #user-avatar → "This is your profile"
2. .sidebar-menu → "Navigate through sections"
3. #create-button → "Create your first item"
4. .notification-bell → "Stay updated"
5. #settings-link → "Customize your experience"`}
                    </pre>
                  </div>
                </div>

                <div className="bg-[#1a1a1a] rounded-xl p-6 border border-custom-gray">
                  <h3 className="text-xl font-bold mb-4 text-purple-400">Feature Announcement Tour</h3>
                  <div className="bg-[#0f0f0f] rounded-lg p-4">
                    <pre className="text-sm overflow-x-auto text-gray-300">
                      {`// Tour: "New Analytics Dashboard"
Steps:
1. .analytics-tab → "Check out our new analytics"
2. #chart-container → "Visual insights"
3. .export-button → "Export your data"
4. .date-filter → "Filter by date range"
5. .share-button → "Share with your team"`}
                    </pre>
                  </div>
                </div>
              </div>
            </section>

            {/* API Reference */}
            <section id="api" className="scroll-mt-24 border-t border-custom-gray pt-16">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center">
                  <Terminal className="text-blue-400" size={24} />
                </div>
                <h2 className="text-3xl font-bold">API Reference</h2>
              </div>

              <p className="text-gray-400 text-lg leading-relaxed mb-8">
                Advanced users can programmatically control tours using the Tourify JavaScript API.
              </p>

            </section>
          </main>
        </div>
      </div>
    </div>
  );
}