import { Navbar } from "@/components/layout/navbar";
import { Hero } from "@/components/sections/hero";
import { MarqueeStrip } from "@/components/sections/marquee-strip";
import { Services } from "@/components/sections/services";
import { Stats } from "@/components/sections/stats";
import { HowItWorks } from "@/components/sections/how-it-works";
import { WhyTolum } from "@/components/sections/why-tolum";
import { Testimonials } from "@/components/sections/testimonials";
import { Coverage } from "@/components/sections/coverage";
import { CTA } from "@/components/sections/cta";
import { Footer } from "@/components/sections/footer";
import { SectionParticles } from "@/components/ui/section-particles";

export default function Home() {
  return (
    <main className="bg-black relative">
      <Navbar />
      <Hero />
      <div className="relative z-0">
        <SectionParticles />
        <MarqueeStrip />
        <Services />
        <Stats />
        <HowItWorks />
        <WhyTolum />
        <Testimonials />
        <Coverage />
        <CTA />
        <Footer />
      </div>
    </main>
  );
}
