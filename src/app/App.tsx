import { Navbar } from './components/navbar';
import { Hero } from './components/hero';
import { Services } from './components/services';
import { StatsBar } from './components/stats-bar';
import { WhyChooseUs } from './components/why-choose-us';
import { Testimonials } from './components/testimonials';
import { Contact } from './components/contact';
import { Footer } from './components/footer';

export default function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <Services />
      <StatsBar />
      <WhyChooseUs />
      <Testimonials />
      <Contact />
      <Footer />
    </div>
  );
}