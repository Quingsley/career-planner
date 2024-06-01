import { AboutSection } from "../components/custom/about-section";
import { CallToActionSection } from "../components/custom/cta-section";
import { HeroSection } from "../components/custom/hero-section";
import { Testimonials } from "../components/custom/testimonial";

export function LandingPage() {
  return (
    <div className="flex flex-col min-h-[100dvh]">
      <main className="flex-1">
        <HeroSection />
        <AboutSection />
        <Testimonials />
        <CallToActionSection />
      </main>
    </div>
  );
}
