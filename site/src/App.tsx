import Hero from './components/Hero';
import Calculator from './components/Calculator';
import AwardInfo from './components/AwardInfo';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen">
      <Hero />
      <Calculator />
      <AwardInfo />
      <Footer />
    </div>
  );
}
