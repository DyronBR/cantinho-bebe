import Header from './components/Header';
import HeroBanner from './components/HeroBanner';
import ProductGrid from './components/ProductGrid';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';

export default function Home() {
  return (
    <main>
      <Header />
      <div className="pt-20">
        <HeroBanner />
      </div>
      <section id="products" className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-8">
          <ProductGrid />
        </div>
      </section>
      <Testimonials />
      <Footer />
    </main>
  );
}