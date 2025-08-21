import React from "react";
import styles from "./HowItWorksSection.module.css";

export type Step = {
  number: number | string;
  title: string;
  description: string;
  badges: string[];
  icon: React.ReactNode;
};

export type HowItWorksSectionProps = {
  steps?: Step[];
  heading?: string;
};

const defaultSteps: Step[] = [
  {
    number: 1,
    title: "Post or Find",
    description:
      "Whether you have cargo to ship or you're looking for loads to transport, get started in seconds. Post your shipment details or browse thousands of available cargo opportunities.",
    badges: ["Post Cargo Fast", "Find Loads", "Marketplace"],
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" data-lucide="search" className="lucide lucide-search w-4 h-4 text-gray-400" style={{ strokeWidth: 1.5 }}><path d="m21 21-4.34-4.34"></path><circle cx="11" cy="11" r="8"></circle></svg>
    ),
  },
  {
    number: 2,
    title: "Connect & Quote",
    description:
      "Connect with verified partners and send competitive quotes. Use our built-in chat system to negotiate terms and finalize details before accepting any deal.",
    badges: ["Send Quote", "My Quotes", "Chat Interface"],
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" data-lucide="dollar-sign" className="lucide lucide-dollar-sign w-4 h-4 text-gray-400" style={{ strokeWidth: 1.5 }}><line x1="12" x2="12" y1="2" y2="22"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
    ),
  },
  {
    number: 3,
    title: "Track & Complete",
    description:
      "Monitor shipments in real-time with GPS tracking, automated status updates, and seamless communication. Complete transactions securely with integrated payment processing.",
    badges: ["Live Tracking", "Status Updates", "Active Deals", "Secure Payment"],
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" data-lucide="map-pin" className="lucide lucide-map-pin w-4 h-4 text-gray-400" style={{ strokeWidth: 1.5 }}><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"></path><circle cx="12" cy="10" r="3"></circle></svg>
    ),
  },
];

export const HowItWorksSection: React.FC<HowItWorksSectionProps> = ({
  steps = defaultSteps,
  heading = "How It Works",
}) => {
  return (
    <section id="projects" className={`${styles.section} pt-24 pb-24`}>
      <div className="max-w-5xl mx-auto px-6">
        <div className="flex items-center gap-3 mb-12 animate-on-scroll in-view">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" data-lucide="play-circle" className="lucide lucide-play-circle w-5 h-5 text-gray-400" style={{ strokeWidth: 1.5 }}><path d="M9 9.003a1 1 0 0 1 1.517-.859l4.997 2.997a1 1 0 0 1 0 1.718l-4.997 2.997A1 1 0 0 1 9 14.996z"></path><circle cx="12" cy="12" r="10"></circle></svg>
          <h2 className="text-xl font-medium text-gray-400">{heading}</h2>
        </div>
        <div className="space-y-6">
          {steps.map((step, idx) => (
            <div key={idx} className="glass-card p-6 rounded-xl hover:bg-white/5 transition-all group animate-on-scroll in-view">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gray-400/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-xl font-medium text-gray-400">{step.number}</span>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-400 mb-1">{step.title}</h3>
                    <p className="text-sm text-gray-400">{step.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-gray-400/10 rounded-lg">{step.icon}</div>
                </div>
              </div>
              <div className="flex gap-2">
                {step.badges.map((b, i) => (
                  <span key={i} className="text-xs text-gray-400 bg-gray-400/10 px-2 py-1 rounded">
                    {b}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};


