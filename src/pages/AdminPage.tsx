import { useEffect, useMemo, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import type { NumerologyResult } from '../utils/numerology';

interface AdminReportRow {
  id: string;
  created_at: string;
  plan: string;
  user_email: string;
  numerology: NumerologyResult;
}

const AdminPage = () => {
  const [rows, setRows] = useState<AdminReportRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAdminData = async () => {
      setLoading(true);
      const { data } = await supabase.from('admin_reports').select('*').order('created_at', { ascending: false });
      if (data) {
        setRows(
          data.map((row) => ({
            id: row.id,
            created_at: row.created_at,
            plan: row.plan,
            user_email: row.user_email,
            numerology: row.numerology as NumerologyResult,
          })),
        );
      }
      setLoading(false);
    };

    void loadAdminData();
  }, []);

  const downloadCsv = () => {
    const headers = ['ID', 'User Email', 'Plan', 'Created At', 'Mulank', 'Bhagyank', 'Name Number'];
    const csvRows = rows.map((row) => [
      row.id,
      row.user_email,
      row.plan,
      row.created_at,
      row.numerology.mulank.value,
      row.numerology.bhagyank.value,
      row.numerology.nameNumber.value,
    ]);

    const csvContent = [headers, ...csvRows].map((r) => r.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `vidhira-users-${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const totalReports = rows.length;
  const uniqueUsers = useMemo(() => new Set(rows.map((row) => row.user_email)).size, [rows]);

  return (
    <div className="space-y-10">
      <header className="rounded-3xl border border-emerald/20 bg-white p-8 shadow-sm">
        <h1 className="font-display text-3xl text-slate-900">Admin Insights</h1>
        <p className="mt-2 text-sm text-slate-600">Monitor user sign-ups, payments, and report generations.</p>
        <div className="mt-6 flex flex-wrap gap-4 text-sm">
          <div className="rounded-2xl border border-emerald/20 bg-emerald/10 px-5 py-3">
            <p className="text-xs uppercase tracking-wide text-emerald">Total Reports</p>
            <p className="text-xl font-semibold text-slate-900">{totalReports}</p>
          </div>
          <div className="rounded-2xl border border-emerald/20 bg-emerald/10 px-5 py-3">
            <p className="text-xs uppercase tracking-wide text-emerald">Unique Users</p>
            <p className="text-xl font-semibold text-slate-900">{uniqueUsers}</p>
          </div>
        </div>
      </header>

      <section className="rounded-3xl border border-emerald/20 bg-white/80 p-8">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-2xl text-slate-900">Report Activity</h2>
          <button
            type="button"
            onClick={downloadCsv}
            className="rounded-full border border-emerald px-4 py-2 text-sm font-semibold text-emerald transition hover:bg-emerald hover:text-white"
          >
            Download CSV
          </button>
        </div>

        {loading ? (
          <p className="mt-6 text-sm text-slate-500">Loading admin data...</p>
        ) : rows.length === 0 ? (
          <p className="mt-6 text-sm text-slate-500">No reports generated yet.</p>
        ) : (
          <div className="mt-6 overflow-x-auto">
            <table className="min-w-full divide-y divide-emerald/20 text-left text-sm text-slate-600">
              <thead className="bg-emerald/10 text-xs uppercase tracking-wide text-slate-700">
                <tr>
                  <th className="px-4 py-3">User</th>
                  <th className="px-4 py-3">Plan</th>
                  <th className="px-4 py-3">Mulank</th>
                  <th className="px-4 py-3">Bhagyank</th>
                  <th className="px-4 py-3">Name Number</th>
                  <th className="px-4 py-3">Created</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-emerald/10">
                {rows.map((row) => (
                  <tr key={row.id}>
                    <td className="px-4 py-3 font-medium text-slate-800">{row.user_email}</td>
                    <td className="px-4 py-3">{row.plan}</td>
                    <td className="px-4 py-3">{row.numerology.mulank.value}</td>
                    <td className="px-4 py-3">{row.numerology.bhagyank.value}</td>
                    <td className="px-4 py-3">{row.numerology.nameNumber.value}</td>
                    <td className="px-4 py-3">{new Date(row.created_at).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
};

export default AdminPage;
