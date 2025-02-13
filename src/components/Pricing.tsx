import React from 'react';
import { Check, AlertCircle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { loadStripe } from '@stripe/stripe-js';
import toast from 'react-hot-toast';

// Replace with your Stripe publishable key
const stripePromise = loadStripe('your_publishable_key');

export function Pricing() {
  const { t } = useLanguage();

  const handlePayment = async (priceId: string, amount: number) => {
    try {
      const stripe = await stripePromise;
      if (!stripe) throw new Error('Stripe failed to load');

      // Create a checkout session
      const response = await fetch('https://your-backend-url/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          priceId,
          amount,
        }),
      });

      const session = await response.json();

      // Redirect to Stripe Checkout
      const result = await stripe.redirectToCheckout({
        sessionId: session.id,
      });

      if (result.error) {
        toast.error(result.error.message || 'Payment failed');
      }
    } catch (error) {
      console.error('Payment error:', error);
      toast.error('Payment failed. Please try again.');
    }
  };

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const plans = [
    {
      name: t('pricing.starter.name'),
      price: '980',
      priceId: 'price_starter',
      features: [
        t('pricing.starter.feature1'),
        t('pricing.starter.feature2'),
        t('pricing.starter.feature3'),
        t('pricing.starter.feature4'),
        t('pricing.starter.feature5'),
      ],
      description: t('pricing.starter.description'),
      cta: t('pricing.starter.cta')
    },
    {
      name: t('pricing.professional.name'),
      price: '1500',
      priceId: 'price_professional',
      features: [
        t('pricing.professional.feature1'),
        t('pricing.professional.feature2'),
        t('pricing.professional.feature3'),
        t('pricing.professional.feature4'),
        t('pricing.professional.feature5'),
        t('pricing.professional.feature6')
      ],
      description: t('pricing.professional.description'),
      cta: t('pricing.professional.cta'),
      popular: true
    },
    {
      name: t('pricing.business.name'),
      price: '1950',
      priceId: 'price_business',
      features: [
        t('pricing.business.feature1'),
        t('pricing.business.feature2'),
        t('pricing.business.feature3'),
        t('pricing.business.feature4'),
        t('pricing.business.feature5'),
        t('pricing.business.feature6'),
        t('pricing.business.feature7')
      ],
      description: t('pricing.business.description'),
      cta: t('pricing.business.cta')
    },
    {
      name: t('pricing.enterprise.name'),
      price: t('pricing.enterprise.price'),
      features: [
        t('pricing.enterprise.feature1'),
        t('pricing.enterprise.feature2'),
        t('pricing.enterprise.feature3'),
        t('pricing.enterprise.feature4'),
        t('pricing.enterprise.feature5'),
        t('pricing.enterprise.feature6'),
        t('pricing.enterprise.feature7'),
        t('pricing.enterprise.feature8')
      ],
      description: t('pricing.enterprise.description'),
      cta: t('pricing.enterprise.cta'),
      custom: true
    }
  ];

  return (
    <section className="py-20 bg-gray-50 min-h-screen" id="pricing">
      <div className="container mx-auto my-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">{t('pricing.title')}</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">{t('pricing.subtitle')}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`bg-white rounded-2xl shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300 ${
                plan.popular ? 'ring-2 ring-purple-500' : ''
              }`}
            >
              {plan.popular && (
                <div className="bg-purple-500 text-white text-center py-1 text-sm">
                  {t('pricing.popularChoice')}
                </div>
              )}
              <div className="p-8">
                <h3 className="text-xl font-bold mb-4">{plan.name}</h3>
                <div className="mb-6">
                  <div className="flex items-baseline">
                    <span className="text-4xl font-bold">€{plan.price}</span>
                    {!plan.custom && <span className="text-gray-500 ml-2">{t('pricing.oneTime')}</span>}
                  </div>
                  <p className="text-gray-600 mt-2 text-sm">{plan.description}</p>
                </div>
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-2">
                      <Check className="text-green-500 mt-1 flex-shrink-0" size={18} />
                      <span className="text-gray-600 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <button 
                  className="absolute bottom-2 w-4/5 bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-semibold transition-colors"
                  onClick={() => {
                    if (plan.custom) {
                      scrollToContact();
                    } else {
                      handlePayment(plan.priceId, parseInt(plan.price));
                    }
                  }}
                >
                  {plan.cta}
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-purple-50 rounded-xl p-8 flex items-start gap-4">
          <AlertCircle className="text-purple-600 flex-shrink-0" size={24} />
          <div>
            <h4 className="font-semibold mb-2">{t('pricing.note.title')}</h4>
            <p className="text-gray-600">{t('pricing.note.content')}</p>
          </div>
        </div>
      </div>
    </section>
  );
}