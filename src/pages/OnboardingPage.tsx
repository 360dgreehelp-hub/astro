import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { calculateNumerology } from '../utils/numerology';
import type { OnboardingFormValues } from '../types/forms';
import { downloadReportPdf, generateReport } from '../lib/reportGenerator';

const focusOptions = ['Love', 'Career', 'Business', 'Full'] as const;

const OnboardingPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [reportPreview, setReportPreview] = useState<string>('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<OnboardingFormValues>({
    defaultValues: {
      focus: 'Full',
    },
  });

  const dateOfBirth = watch('dateOfBirth');
  const fullName = watch('fullName');

  const numerologyPreview = useMemo(() => {
    if (!dateOfBirth || !fullName) return null;
    return calculateNumerology({ fullName, dateOfBirth });
  }, [dateOfBirth, fullName]);

  const onSubmit = handleSubmit(async (values) => {
    setLoading(true);
    const numerology = calculateNumerology({ fullName: values.fullName, dateOfBirth: values.dateOfBirth });
    const sections = await generateReport({
      numerology,
      fullName: values.fullName,
      focusArea: values.focus,
      vedicDetails: { rashi: values.rashi, nakshatra: values.nakshatra, lagna: values.lagna },
    });

    const html = `
      <div id="preview-report" class="space-y-4">
        <h2 class="font-display text-2xl">${values.fullName} – Vidhira Blueprint</h2>
        <p><strong>Mulank:</strong> ${numerology.mulank.value} (${numerology.mulank.planet})</p>
        <p><strong>Bhagyank:</strong> ${numerology.bhagyank.value} (${numerology.bhagyank.planet})</p>
        <p><strong>Name Number:</strong> ${numerology.nameNumber.value} (${numerology.nameNumber.planet})</p>
        <section>
          <h3 class="font-display text-xl">Personality</h3>
          <p>${sections.personality}</p>
        </section>
        <section>
          <h3 class="font-display text-xl">Career Guidance</h3>
          <p>${sections.career}</p>
        </section>
        <section>
          <h3 class="font-display text-xl">Relationship Tendency</h3>
          <p>${sections.relationships}</p>
        </section>
        <section>
          <h3 class="font-display text-xl">Lucky Guidance</h3>
          <p>${sections.luckyGuidance}</p>
        </section>
        <section>
          <h3 class="font-display text-xl">Name Fix Suggestions</h3>
          <p>${sections.nameFixes}</p>
        </section>
      </div>
    `;

    setReportPreview(html);
    setLoading(false);
    navigate('/report', { state: { reportHtml: html, values, numerology, sections } });
  });

  const handleDownload = () => {
    downloadReportPdf('report-preview-container', fullName || 'vidhira-report');
  };

  return (
    <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
      <div className="rounded-3xl border border-emerald/20 bg-white p-8 shadow-sm">
        <h1 className="font-display text-3xl text-slate-900">Tell us your cosmic coordinates</h1>
        <p className="mt-2 text-sm text-slate-600">We use your details to calculate Mulank, Bhagyank and Name Number.</p>

        <form className="mt-8 space-y-6" onSubmit={onSubmit}>
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-slate-700">Full Name</label>
            <input
              {...register('fullName', { required: 'Name is required' })}
              type="text"
              className="w-full rounded-xl border border-emerald/30 bg-white px-4 py-3 focus:border-emerald focus:outline-none"
              placeholder="e.g. Sita Sharma"
            />
            {errors.fullName && <p className="text-xs text-red-500">{errors.fullName.message}</p>}
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-slate-700">Date of Birth</label>
              <input
                {...register('dateOfBirth', { required: 'DOB is required' })}
                type="date"
                className="w-full rounded-xl border border-emerald/30 bg-white px-4 py-3 focus:border-emerald focus:outline-none"
              />
              {errors.dateOfBirth && <p className="text-xs text-red-500">{errors.dateOfBirth.message}</p>}
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-slate-700">Time of Birth (optional)</label>
              <input
                {...register('timeOfBirth')}
                type="time"
                className="w-full rounded-xl border border-emerald/30 bg-white px-4 py-3 focus:border-emerald focus:outline-none"
              />
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-slate-700">Place of Birth</label>
              <input
                {...register('placeOfBirth', { required: 'Place is required' })}
                type="text"
                className="w-full rounded-xl border border-emerald/30 bg-white px-4 py-3 focus:border-emerald focus:outline-none"
                placeholder="e.g. Pokhara, Nepal"
              />
              {errors.placeOfBirth && <p className="text-xs text-red-500">{errors.placeOfBirth.message}</p>}
              <p className="text-xs text-slate-500">Timezone auto-detected via map integration (coming soon).</p>
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-slate-700">Your Focus</label>
              <select
                {...register('focus', { required: 'Pick a focus' })}
                className="w-full rounded-xl border border-emerald/30 bg-white px-4 py-3 focus:border-emerald focus:outline-none"
              >
                {focusOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-slate-700">Rashi (optional)</label>
              <input {...register('rashi')} type="text" className="w-full rounded-xl border border-emerald/30 px-4 py-3" />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-slate-700">Nakshatra (optional)</label>
              <input {...register('nakshatra')} type="text" className="w-full rounded-xl border border-emerald/30 px-4 py-3" />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-slate-700">Lagna (optional)</label>
              <input {...register('lagna')} type="text" className="w-full rounded-xl border border-emerald/30 px-4 py-3" />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-emerald px-6 py-3 text-base font-semibold text-white shadow-lg shadow-emerald/40 transition hover:bg-emerald/90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? 'Preparing your cosmic PDF...' : 'Generate My Fortune Blueprint'}
          </button>
        </form>
      </div>

      <div className="space-y-6">
        <div className="rounded-3xl border border-emerald/20 bg-white/80 p-6 shadow-inner">
          <h2 className="font-display text-2xl text-slate-900">Live Numerology Preview</h2>
          {numerologyPreview ? (
            <div className="mt-4 space-y-4 text-sm text-slate-600">
              <div>
                <h3 className="font-semibold text-slate-800">Mulank {numerologyPreview.mulank.value}</h3>
                <p>Ruling planet: {numerologyPreview.mulank.planet}</p>
                <p>Traits: {numerologyPreview.mulank.traits.join(', ')}</p>
              </div>
              <div>
                <h3 className="font-semibold text-slate-800">Bhagyank {numerologyPreview.bhagyank.value}</h3>
                <p>Ruling planet: {numerologyPreview.bhagyank.planet}</p>
                <p>Traits: {numerologyPreview.bhagyank.traits.join(', ')}</p>
              </div>
              <div>
                <h3 className="font-semibold text-slate-800">Name Number {numerologyPreview.nameNumber.value}</h3>
                <p>Ruling planet: {numerologyPreview.nameNumber.planet}</p>
                <p>Traits: {numerologyPreview.nameNumber.traits.join(', ')}</p>
              </div>
            </div>
          ) : (
            <p className="mt-4 text-sm text-slate-500">Enter your name and birthdate to preview insights.</p>
          )}
        </div>

        <div className="rounded-3xl border border-emerald/20 bg-white/70 p-6 shadow-inner">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-2xl text-slate-900">Report Preview</h2>
            <button
              type="button"
              onClick={handleDownload}
              className="rounded-full border border-emerald px-4 py-2 text-sm font-semibold text-emerald transition hover:bg-emerald hover:text-white"
            >
              Download PDF
            </button>
          </div>
          <div id="report-preview-container" className="mt-4 max-h-[480px] overflow-y-auto text-sm text-slate-600" dangerouslySetInnerHTML={{ __html: reportPreview }} />
          {!reportPreview && <p className="mt-4 text-sm text-slate-500">Generate a report to preview &amp; download your PDF.</p>}
        </div>
      </div>
    </div>
  );
};

export default OnboardingPage;
