import { useLocation, useNavigate } from 'react-router-dom';
import { downloadReportPdf } from '../lib/reportGenerator';
import type { NumerologyResult } from '../utils/numerology';
import type { OnboardingFormValues } from '../types/forms';
import type { ReportSections } from '../lib/reportGenerator';

type ReportLocationState = {
  reportHtml?: string;
  numerology?: NumerologyResult;
  values?: OnboardingFormValues;
  sections?: ReportSections;
  fromHistory?: boolean;
};

const ReportPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as ReportLocationState | null;

  if (!state?.reportHtml && !state?.numerology) {
    navigate('/onboarding');
    return null;
  }

  const reportId = 'report-full-view';

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="font-display text-3xl text-slate-900">Your Vidhira Fortune Report</h1>
        <button
          type="button"
          onClick={() => downloadReportPdf(reportId, state?.values?.fullName ?? 'vidhira-report')}
          className="rounded-full border border-emerald px-5 py-2 text-sm font-semibold text-emerald transition hover:bg-emerald hover:text-white"
        >
          Download PDF
        </button>
      </div>

      <div id={reportId} className="space-y-6 rounded-3xl border border-emerald/20 bg-white/80 p-8 shadow-inner">
        {state?.values && (
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <h2 className="font-display text-2xl text-slate-900">{state.values.fullName}</h2>
              <p className="text-sm text-slate-600">Born on {state.values.dateOfBirth}</p>
              {state.values.placeOfBirth && <p className="text-sm text-slate-600">From {state.values.placeOfBirth}</p>}
              <p className="mt-2 text-xs uppercase tracking-wide text-emerald">Focus: {state.values.focus}</p>
            </div>
            {state.numerology && (
              <div className="grid gap-3 text-sm text-slate-600">
                <div>
                  <p className="font-semibold text-slate-800">Mulank {state.numerology.mulank.value}</p>
                  <p>Planet: {state.numerology.mulank.planet}</p>
                  <p>Traits: {state.numerology.mulank.traits.join(', ')}</p>
                </div>
                <div>
                  <p className="font-semibold text-slate-800">Bhagyank {state.numerology.bhagyank.value}</p>
                  <p>Planet: {state.numerology.bhagyank.planet}</p>
                  <p>Traits: {state.numerology.bhagyank.traits.join(', ')}</p>
                </div>
                <div>
                  <p className="font-semibold text-slate-800">Name Number {state.numerology.nameNumber.value}</p>
                  <p>Planet: {state.numerology.nameNumber.planet}</p>
                  <p>Traits: {state.numerology.nameNumber.traits.join(', ')}</p>
                </div>
              </div>
            )}
          </div>
        )}

        {state.sections ? (
          <div className="space-y-6 text-sm text-slate-600">
            <section>
              <h3 className="font-display text-2xl text-slate-900">Personality</h3>
              <p className="mt-2 leading-relaxed">{state.sections.personality}</p>
            </section>
            <section>
              <h3 className="font-display text-2xl text-slate-900">Career Guidance</h3>
              <p className="mt-2 leading-relaxed">{state.sections.career}</p>
            </section>
            <section>
              <h3 className="font-display text-2xl text-slate-900">Relationship Tendency</h3>
              <p className="mt-2 leading-relaxed">{state.sections.relationships}</p>
            </section>
            <section>
              <h3 className="font-display text-2xl text-slate-900">Lucky Numbers, Colors &amp; Days</h3>
              <p className="mt-2 leading-relaxed">{state.sections.luckyGuidance}</p>
            </section>
            <section>
              <h3 className="font-display text-2xl text-slate-900">Name Fix Suggestions</h3>
              <p className="mt-2 leading-relaxed">{state.sections.nameFixes}</p>
            </section>
          </div>
        ) : (
          <div className="text-sm text-slate-500">
            Connect your OpenAI key to view generated sections. Visit onboarding to regenerate the report.
          </div>
        )}
      </div>
    </div>
  );
};

export default ReportPage;
