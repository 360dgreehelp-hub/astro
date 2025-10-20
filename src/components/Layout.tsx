import { Link, Outlet } from 'react-router-dom';
import AuthButton from './auth/AuthButton';

const Layout = () => {
  return (
    <div className="min-h-screen bg-creamWhite text-slate-900">
      <header className="border-b border-emerald/20 bg-white/80 backdrop-blur sticky top-0 z-20">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link to="/" className="font-display text-2xl font-semibold text-emerald">
            Vidhira
          </Link>
          <div className="flex items-center gap-4 text-sm font-medium">
            <Link to="/pricing" className="text-slate-700 hover:text-emerald">
              Pricing
            </Link>
            <Link to="/onboarding" className="text-slate-700 hover:text-emerald">
              Get Report
            </Link>
            <Link to="/dashboard" className="text-slate-700 hover:text-emerald">
              Dashboard
            </Link>
            <AuthButton />
          </div>
        </nav>
      </header>
      <main className="mx-auto max-w-6xl px-6 py-12">
        <Outlet />
      </main>
      <footer className="border-t border-emerald/20 bg-white/70 py-6 text-center text-sm text-slate-600">
        © {new Date().getFullYear()} Vidhira. Your life. Aligned by numbers.
      </footer>
    </div>
  );
};

export default Layout;
