import { Link } from 'react-router-dom';

const benefits = [
  {
    title: 'Color-coded Destiny',
    description: 'Daily lucky shades tuned to your Mulank energy.',
  },
  {
    title: 'Aligned Identity',
    description: 'Perfect your name vibrations for prosperity.',
  },
  {
    title: 'Career Compass',
    description: 'Step-by-step guidance to climb your dharma path.',
  },
  {
    title: 'Heart Harmony',
    description: 'Understand relationship karma & compatible partners.',
  },
];

const LandingPage = () => {
  return (
    <div className="space-y-16">
      <section className="grid gap-12 rounded-3xl bg-white/80 p-10 shadow-lg shadow-emerald/10 lg:grid-cols-2">
        <div className="space-y-6">
          <p className="inline-block rounded-full bg-emerald/10 px-4 py-1 text-sm font-semibold text-emerald">
            Your life. Aligned by numbers.
          </p>
          <h1 className="font-display text-4xl font-bold text-slate-900 lg:text-5xl">
            Unlock your Nepali numerology blueprint with Vidhira.
          </h1>
          <p className="text-lg text-slate-600">
            Vidhira blends Chaldean numerology with Vedic astrology wisdom to craft soulful, actionable reports personalised for
            Nepalese seekers.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              to="/onboarding"
              className="rounded-full bg-emerald px-6 py-3 text-base font-semibold text-white shadow-lg shadow-emerald/40 transition hover:bg-emerald/90"
            >
              Get My Fortune Report
            </Link>
            <Link
              to="/dashboard"
              className="rounded-full border border-emerald px-6 py-3 text-base font-semibold text-emerald transition hover:bg-emerald hover:text-white"
            >
              Login to My Account
            </Link>
          </div>
        </div>
        <div className="flex flex-col justify-between gap-8 rounded-3xl border border-emerald/20 bg-gradient-to-br from-white to-emerald/10 p-8">
          <div className="space-y-3">
            <h2 className="font-display text-2xl text-slate-900">Inside your Vidhira report</h2>
            <ul className="space-y-3 text-slate-600">
              <li>✨ Mulank, Bhagyank &amp; Name Number decoding</li>
              <li>🌿 Lucky colors, numbers and mantra rituals</li>
              <li>💼 Career roadmap, love alignment &amp; business clarity</li>
              <li>🔮 Brand name &amp; baby name suggestions on demand</li>
            </ul>
          </div>
          <div className="rounded-2xl bg-emerald/15 p-6 text-sm text-slate-700">
            “When my Mulank 3 energy met Vidhira, I finally felt seen. The report showed me auspicious dates for my cafe launch – and
            it worked!”
            <p className="mt-3 font-semibold text-emerald">— Sita, Kathmandu</p>
          </div>
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {benefits.map((benefit) => (
          <div key={benefit.title} className="rounded-2xl border border-emerald/20 bg-white/80 p-6 shadow-sm">
            <h3 className="font-display text-xl text-slate-900">{benefit.title}</h3>
            <p className="mt-2 text-sm text-slate-600">{benefit.description}</p>
          </div>
        ))}
      </section>

      <section className="rounded-3xl border border-emerald/20 bg-white/70 p-10 text-center shadow-lg shadow-emerald/10">
        <h2 className="font-display text-3xl text-slate-900">Plans designed for every spiritual journey</h2>
        <p className="mt-3 text-slate-600">Choose the energy exchange that fits your intention.</p>
        <div className="mt-10 flex flex-col gap-6 lg:flex-row">
          <div className="flex-1 rounded-2xl border border-emerald/20 bg-white p-8">
            <p className="text-sm font-semibold uppercase tracking-wide text-emerald">Curious Seeker</p>
            <h3 className="mt-2 font-display text-2xl text-slate-900">Monthly Plan</h3>
            <p className="text-4xl font-bold text-emerald">NPR 399</p>
            <p className="mt-3 text-sm text-slate-600">Light report + daily lucky color whispers.</p>
            <Link to="/pricing" className="mt-6 inline-block rounded-full bg-emerald px-5 py-2 text-white">
              View details
            </Link>
          </div>
          <div className="flex-1 rounded-2xl border border-emerald/20 bg-white p-8">
            <p className="text-sm font-semibold uppercase tracking-wide text-emerald">Life Planner</p>
            <h3 className="mt-2 font-display text-2xl text-slate-900">Full Report</h3>
            <p className="text-4xl font-bold text-emerald">NPR 699</p>
            <p className="mt-3 text-sm text-slate-600">Downloadable PDF with full life mapping.</p>
            <Link to="/pricing" className="mt-6 inline-block rounded-full bg-emerald px-5 py-2 text-white">
              View details
            </Link>
          </div>
          <div className="flex-1 rounded-2xl border border-emerald/20 bg-white p-8">
            <p className="text-sm font-semibold uppercase tracking-wide text-emerald">Business Mystic</p>
            <h3 className="mt-2 font-display text-2xl text-slate-900">Combo Report</h3>
            <p className="text-4xl font-bold text-emerald">NPR 999</p>
            <p className="mt-3 text-sm text-slate-600">Full report + brand &amp; compatibility insights.</p>
            <Link to="/pricing" className="mt-6 inline-block rounded-full bg-emerald px-5 py-2 text-white">
              View details
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
