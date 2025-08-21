import React from "react";
import styles from "./TestimonialsSection.module.css";

export type Testimonial = {
  name: string;
  role: string;
  quote: string;
  avatarIcon: React.ReactNode;
  rating?: number; // 1-5
};

export type TestimonialsSectionProps = {
  heading?: string;
  testimonials?: Testimonial[];
};

const defaultTestimonials: Testimonial[] = [
  {
    name: "Michael Rodriguez",
    role: "Fleet Owner",
    quote:
      "\"Fleetopia has revolutionized how we find loads. The AI matching system connects us with perfect cargo opportunities, and we've increased our efficiency by 40%.\"",
    avatarIcon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" data-lucide="truck" className="lucide lucide-truck w-5 h-5 text-gray-400" style={{ strokeWidth: 1.5 }}><path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"></path><path d="M15 18H9"></path><path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14"></path><circle cx="17" cy="18" r="2"></circle><circle cx="7" cy="18" r="2"></circle></svg>
    ),
    rating: 5,
  },
  {
    name: "Sarah Chen",
    role: "Logistics Manager",
    quote:
      "\"The speed of posting cargo and receiving quotes is incredible. What used to take hours now takes minutes. Our supply chain has never been more efficient.\"",
    avatarIcon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" data-lucide="package" className="lucide lucide-package w-5 h-5 text-gray-400" style={{ strokeWidth: 1.5 }}><path d="M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z"></path><path d="M12 22V12"></path><polyline points="3.29 7 12 12 20.71 7"></polyline><path d="m7.5 4.27 9 5.15"></path></svg>
    ),
    rating: 5,
  },
  {
    name: "David Thompson",
    role: "Independent Trucker",
    quote:
      "\"As an independent driver, Fleetopia helps me stay competitive. The transparent pricing and easy communication make every deal smooth and profitable.\"",
    avatarIcon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" data-lucide="users" className="lucide lucide-users w-5 h-5 text-gray-400" style={{ strokeWidth: 1.5 }}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><path d="M16 3.128a4 4 0 0 1 0 7.744"></path><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><circle cx="9" cy="7" r="4"></circle></svg>
    ),
    rating: 5,
  },
];

const Star = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-yellow-400"><polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26 12,2"></polygon></svg>
);

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({
  heading = "What Our Users Say",
  testimonials = defaultTestimonials,
}) => {
  return (
    <section id="testimonials" className={`${styles.section} pt-24 pb-24`}>
      <div className="max-w-6xl mr-auto ml-auto pr-6 pl-6">
        <div className="flex items-center gap-3 mb-12 animate-on-scroll in-view">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" data-lucide="star" className="lucide lucide-star w-5 h-5 text-gray-400" style={{ strokeWidth: 1.5 }}><path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"></path></svg>
          <h2 className="text-xl font-medium text-white">{heading}</h2>
        </div>
        <div className="testimonial-slider animate-on-scroll in-view">
          <div className="testimonial-track">
            {testimonials.map((t, idx) => (
              <div key={idx} className="testimonial-card glass-card p-6 rounded-xl">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-gray-400/10 rounded-full flex items-center justify-center">
                    {t.avatarIcon}
                  </div>
                  <div>
                    <h4 className="font-medium text-white">{t.name}</h4>
                    <p className="text-sm text-gray-400">{t.role}</p>
                  </div>
                </div>
                <p className="text-sm text-gray-300 mb-4">{t.quote}</p>
                <div className="flex gap-1">
                  {Array.from({ length: t.rating ?? 5 }).map((_, i) => (
                    <Star key={i} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};


