import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';

type Profile = {
  email: string | null;
};

const AuthButton = () => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        setProfile({ email: data.session.user.email });
      }
      setLoading(false);
    };

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setProfile(session ? { email: session.user.email } : null);
    });

    void getSession();

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const handleGoogleLogin = async () => {
    setLoading(true);
    await supabase.auth.signInWithOAuth({ provider: 'google' });
    setLoading(false);
  };

  const handleLogout = async () => {
    setLoading(true);
    await supabase.auth.signOut();
    setLoading(false);
  };

  if (loading) {
    return <span className="text-sm text-slate-500">Loading...</span>;
  }

  if (profile) {
    return (
      <button
        type="button"
        onClick={handleLogout}
        className="rounded-full border border-emerald px-4 py-2 text-sm font-semibold text-emerald transition hover:bg-emerald hover:text-white"
      >
        Logout ({profile.email})
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={handleGoogleLogin}
      className="rounded-full border border-emerald px-4 py-2 text-sm font-semibold text-emerald transition hover:bg-emerald hover:text-white"
    >
      Login with Google
    </button>
  );
};

export default AuthButton;
