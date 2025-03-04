import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { CheckCircle, XCircle } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

const OrderComplete = () => {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const { t } = useLanguage();
  
  useEffect(() => {
    const paymentIntent = searchParams.get('payment_intent');
    const redirectStatus = searchParams.get('redirect_status');
    
    if (redirectStatus === 'succeeded') {
      setStatus('success');
    } else {
      setStatus('error');
    }
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        {status === 'loading' && (
          <div className="animate-pulse">
            <div className="h-12 w-12 mx-auto mb-4 rounded-full bg-gray-200" />
            <div className="h-4 w-3/4 mx-auto bg-gray-200 rounded" />
          </div>
        )}

        {status === 'success' && (
          <>
            <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Paiement réussi !
            </h2>
            <p className="text-gray-600 mb-6">
              Merci pour votre commande.
            </p>
          </>
        )}

        {status === 'error' && (
          <>
            <XCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Erreur de paiement
            </h2>
            <p className="text-gray-600 mb-6">
              Une erreur est survenue lors du traitement de votre paiement. Veuillez réessayer.
            </p>
          </>
        )}

        <Link
          to="/"
          className="inline-block bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
        >
          Retour à l'accueil
        </Link>
      </div>
    </div>
  );
};

export default OrderComplete; 