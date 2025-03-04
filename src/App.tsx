import { Routes, Route, Navigate } from 'react-router-dom';
import { Hero } from './components/Hero';
import { Portfolio } from './components/Portfolio';
import { Testimonials } from './components/Testimonials';
import { ContactForm } from './components/ContactForm';
import { LanguageSwitch } from './components/LanguageSwitch';
import { Pricing } from './components/Pricing';
import OrderComplete from './components/stripe/OrderComplete';

function MainContent() {
  return (
    <div className="min-h-screen">
      <LanguageSwitch />
      <Hero />
      <Pricing />
      <Portfolio />
      {/* <Testimonials /> */}
      <ContactForm />
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="fr" replace />} />
      <Route path="/:lang/*" element={<MainContent />} />
      <Route path="/:lang/order/complete" element={<OrderComplete />} />
    </Routes>
  );
}

export default App;