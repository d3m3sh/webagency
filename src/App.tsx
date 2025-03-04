import { Routes, Route, Navigate } from 'react-router-dom';
import { Hero } from './components/Hero';
import { Portfolio } from './components/Portfolio';
import { Testimonials } from './components/Testimonials';
import { ContactForm } from './components/ContactForm';
import { LanguageSwitch } from './components/LanguageSwitch';
import { Pricing } from './components/Pricing';
import OrderComplete from './components/stripe/OrderComplete';
import GoogleAnalytics from './components/GoogleAnalytics';

function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen">
      <LanguageSwitch />
      {children}
    </div>
  );
}

function HomePage() {
  return (
    <MainLayout>
      <Hero />
      <Pricing />
      <Portfolio />
      {/* <Testimonials /> */}
      <ContactForm />
    </MainLayout>
  );
}

function PricingPage() {
  return (
    <MainLayout>
      <Pricing />
    </MainLayout>
  );
}

function PortfolioPage() {
  return (
    <MainLayout>
      <Portfolio />
    </MainLayout>
  );
}

function ContactPage() {
  return (
    <MainLayout>
      <ContactForm />
    </MainLayout>
  );
}
console.log("GA MEASUREMENT ID->", import.meta.env.VITE_GA_MEASUREMENT_ID)
function App() {
  return (
    <>
      <GoogleAnalytics measurementId={import.meta.env.VITE_GA_MEASUREMENT_ID} />
      <Routes>
        <Route path="/" element={<Navigate to="/fr" replace />} />
        <Route path="/:lang">
          <Route index element={<HomePage />} />
          <Route path="tarifs" element={<PricingPage />} />
          <Route path="portfolio" element={<PortfolioPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="order/complete" element={<OrderComplete />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;