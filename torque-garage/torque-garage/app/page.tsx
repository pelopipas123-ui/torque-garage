import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { Services } from "@/components/services";
import { Process } from "@/components/process";
import { Pricing } from "@/components/pricing";
import { BookingWizard } from "@/components/booking-wizard";
import { Testimonials } from "@/components/testimonials";
import { Faq } from "@/components/faq";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Process />
        <Pricing />
        <BookingWizard />
        <Testimonials />
        <Faq />
      </main>
      <Footer />
    </>
  );
}
