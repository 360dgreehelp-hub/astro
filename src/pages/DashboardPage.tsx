import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import type { NumerologyResult } from '../utils/numerology';

type ReportHistory = {
  id: string;
  created_at: string;
  plan: string;
  numerology: NumerologyResult;
};

const DashboardPage = () => {
  const [reports, setReports] = useState<ReportHistory[]>([]);
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    const loadReports = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setEmail(session?.user.email ?? null);

      if (session) {
        const { data } = await supabase.from('reports').select('*').eq('user_id', session.user.id).order('created_at', { ascending: false });
        if (data) {
          setReports(
            data.map((row) => ({
              id: row.id,
              created_at: row.created_at,
              plan: row.plan,
              numerology: row.numerology as NumerologyResult,
            })),
          );
        }
      }
    };

    void loadReports();
  }, []);

  return (
    <div className="space-y-10">
      <header className="rounded-3xl border border-emerald/20 bg-white p-8 shadow-sm">
        <h1 className="font-display text-3xl text-slate-900">Welcome back, {email ?? 'Seeker'}!</h1>
        <p className="mt-2 text-sm text-slate-600">
          Access your purchased reports, download PDFs, and continue aligning your life with numerology.
        </p>
        <Link
          to="/onboarding"
          className="mt-6 inline-block rounded-full bg-emerald px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald/30 transition hover:bg-emerald/90"
        >
          Generate another report
        </Link>
      </header>

      <section className="rounded-3xl border border-emerald/20 bg-white/80 p-8">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-2xl text-slate-900">Your Reports</h2>
          <Link to="/pricing" className="text-sm font-semibold text-emerald hover:underline">
            Upgrade plan
          </Link>
        </div>
        {reports.length === 0 ? (
          <p className="mt-6 text-sm text-slate-500">No reports yet. Start your first reading from the onboarding flow.</p>
        ) : (
          <div className="mt-6 space-y-4">
            {reports.map((report) => (
              <div key={report.id} className="flex flex-col justify-between gap-4 rounded-2xl border border-emerald/20 bg-white p-6 md:flex-row md:items-center">
                <div>
                  <h3 className="font-display text-xl text-slate-900">{report.plan}</h3>
                  <p className="text-sm text-slate-500">Generated on {new Date(report.created_at).toLocaleString()}</p>
                </div>
                <div className="flex gap-3">
                  <Link
                    to="/report"
                    state={{ numerology: report.numerology, fromHistory: true }}
                    className="rounded-full border border-emerald px-4 py-2 text-sm font-semibold text-emerald transition hover:bg-emerald hover:text-white"
                  >
                    View report
                  </Link>
                  <button
                    type="button"
                    className="rounded-full border border-emerald px-4 py-2 text-sm font-semibold text-emerald transition hover:bg-emerald hover:text-white"
                  >
                    Download PDF
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default DashboardPage;
