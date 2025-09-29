// src/contexts/AuthContext.tsx
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import supabase from "../services/supabase";

type AuthUser = { id: string } | null;

type AuthState = {
  user: AuthUser;
  loading: boolean;
};

const AuthContext = createContext<AuthState>({ user: null, loading: true });

function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function initAuth() {
      // 1) Try to get a verified user from the server (reliable)
      const { data: userData, error: getUserError } =
        await supabase.auth.getUser();
      if (getUserError) {
        console.warn(
          "supabase.getUser error (can ignore on first-run)",
          getUserError,
        );
      }
      if (userData?.user) {
        if (!mounted) return;
        setUser({ id: userData.user.id });
        setLoading(false);
        return;
      }

      // 2) Fallback: check stored session quickly (no network)
      const { data: sessionData } = await supabase.auth.getSession();
      if (sessionData?.session?.user) {
        if (!mounted) return;
        setUser({ id: sessionData.session.user.id });
        setLoading(false);
        return;
      }

      // 3) No session — sign in anonymously (only once)
      const { data, error } = await supabase.auth.signInAnonymously();
      if (error) {
        console.error("Anonymous sign-in failed", error);
      } else if (data?.user) {
        if (!mounted) return;
        setUser({ id: data.user.id });
      }
      setLoading(false);
    }

    initAuth();

    // 4) Listen for auth changes (update user on sign-in / sign-out)
    const { data: listener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (session?.user) setUser({ id: session.user.id });
        if (event === "SIGNED_OUT") setUser(null);
      },
    );

    return () => {
      mounted = false;
      listener?.subscription?.unsubscribe?.();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error("Auth context was used outside of provider");
  return context;
}

// eslint-disable-next-line react-refresh/only-export-components
export { AuthProvider, useAuth };
