import { Toaster } from 'sonner';
import { Navbar } from './components/navbar';
import { Hero } from './components/hero';
import { CategoryTags } from './components/category-tags';
import { Services } from './components/services';
import { Updates } from './components/updates';
import { Founder } from './components/founder';
import { VisionMission } from './components/vision-mission';
import { WhyChooseUs } from './components/why-choose-us';
import { Testimonials } from './components/testimonials';
import { Contact } from './components/contact';
import { Footer } from './components/footer';
import { Chatbot } from './components/chatbot';

export default function App() {
  return (
    <div className="min-h-screen">
      <Toaster position="top-right" richColors />
      <Navbar />
      <Hero />
      <CategoryTags />
      <Services />
      <Updates />
      <Founder />
      <VisionMission />
      <WhyChooseUs />
      <Testimonials />
      <Contact />
      <Footer />

      {/* Floating Chatbot Widget */}
      <Chatbot />
    </div>
  );
}