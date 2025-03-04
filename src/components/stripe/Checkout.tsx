import { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";

const initStripe = async () => {
    const response = await fetch('https://payment.web-solutions.pro/api/publishable-key', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
    });
    const res = await response.json();
    return await loadStripe(res.publishable_key);
};

const Checkout = ({ amount, isOpen, onClose, planName }: { 
  amount: number; 
  isOpen: boolean; 
  onClose: () => void;
  planName: string;
}) => {
  const [stripePromise] = useState(() => initStripe());
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    if (!amount || !isOpen) return;

    // const new_amount = 15.00
    async function createPaymentIntent() {
      const response = await fetch('https://payment.web-solutions.pro/api/create-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount:amount*100 }),
      });
      const data = await response.json();
      setClientSecret(data.client_secret);
    }

    createPaymentIntent();
  }, [amount, isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg max-w-md w-full relative">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
        
        <div className="mb-6 border-b pb-4">
          <h3 className="text-xl font-semibold mb-2">Récapitulatif de la commande</h3>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">{planName}</span>
            <span className="text-lg font-medium">{amount}€</span>
          </div>
        </div>

        {clientSecret && stripePromise ? (
          <Elements 
            stripe={stripePromise} 
            options={{ clientSecret }}
          >
            <CheckoutForm onSuccess={onClose} />
          </Elements>
        ) : (
          <div className="text-center py-4">Loading...</div>
        )}
      </div>
    </div>
  );
};

export default Checkout;
