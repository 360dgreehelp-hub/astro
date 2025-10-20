import { useState } from 'react';
import { initiateMockPayment } from '../lib/payment';
import type { PaymentPlan } from '../lib/payment';

const plans: Array<{
  id: PaymentPlan;
  title: string;
  price: string;
  persona: string;
  description: string;
  features: string[];
}> = [
  {
    id: 'monthly',
    title: 'Monthly Plan',
    price: 'NPR 399/mo',
    persona: 'Curious Seeker',
    description: 'Light report + daily lucky colors to keep your aura in rhythm.',
    features: ['Mini numerology breakdown', 'Daily lucky color SMS/email', 'Weekly check-in rituals'],
  },
  {
    id: 'full',
    title: 'One-time Full Report',
    price: 'NPR 699',
    persona: 'Life Planner',
    description: 'Deep 20-page PDF with life roadmap, perfect for big decisions.',
    features: ['Mulank, Bhagyank, Name Number deep dive', 'Career & relationship blueprint', 'Downloadable PDF'],
  },
  {
    id: 'combo',
    title: 'Combo Plan',
    price: 'NPR 999',
    persona: 'Business Mystic',
    description: 'Ultimate prosperity package with brand naming wisdom.',
    features: ['Everything in Full Report', 'Brand name & logo color suggestions', 'Business compatibility calendar'],
  },
];

const PricingPage = () => {
  const [processing, setProcessing] = useState<PaymentPlan | null>(null);
  const [statusMessage, setStatusMessage] = useState('');

  const handleCheckout = async (plan: PaymentPlan) => {
    setProcessing(plan);
    setStatusMessage('Connecting with Khalti gateway...');
    const result = await initiateMockPayment(plan);
    if (result.success) {
      setStatusMessage(`Payment successful! Reference: ${result.reference}. Your report will arrive in the dashboard.`);
    } else {
      setStatusMessage('Payment failed. Please try again or switch to eSewa.');
    }
    setProcessing(null);
  };

  return (
    <div className="space-y-10">
      <header className="text-center">
        <p className="font-display text-4xl text-slate-900">Invest in your cosmic clarity</p>
        <p className="mt-2 text-slate-600">Pick a plan crafted for your journey. All prices inclusive of Nepali taxes.</p>
      </header>

      <div className="grid gap-8 md:grid-cols-3">
        {plans.map((plan) => (
          <div key={plan.id} className="relative rounded-3xl border border-emerald/20 bg-white/80 p-8 shadow-lg shadow-emerald/10">
            <span className="absolute right-6 top-6 rounded-full bg-emerald/10 px-3 py-1 text-xs font-semibold text-emerald">
              {plan.persona}
            </span>
            <h2 className="font-display text-2xl text-slate-900">{plan.title}</h2>
            <p className="mt-2 text-emerald">{plan.price}</p>
            <p className="mt-3 text-sm text-slate-600">{plan.description}</p>
            <ul className="mt-6 space-y-3 text-sm text-slate-600">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2">
                  <span className="mt-1 inline-block h-2 w-2 rounded-full bg-emerald" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            <button
              type="button"
              onClick={() => handleCheckout(plan.id)}
              disabled={processing === plan.id}
              className="mt-8 w-full rounded-full bg-emerald px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald/30 transition hover:bg-emerald/90 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {processing === plan.id ? 'Processing...' : 'Checkout with Khalti'}
            </button>
          </div>
        ))}
      </div>

      {statusMessage && (
        <div className="rounded-3xl border border-emerald/20 bg-white/80 p-6 text-center text-sm text-slate-600">
          {statusMessage}
        </div>
      )}
    </div>
  );
};

export default PricingPage;
