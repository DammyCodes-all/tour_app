"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { UserMetadata, Session } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/client";
import { useRouter, usePathname } from "next/navigation";

type AuthContextType = {
  user: UserMetadata | null;
  session: Session | null;
  isLoading: boolean;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  isLoading: true,
});

export const useAuth = () => {
  return useContext(AuthContext);
};

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<UserMetadata | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  const [supabase] = useState(() => createClient());

  useEffect(() => {
    const getUser = async () => {
      if (!user) setIsLoading(true);

      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (session) {
          setSession(session);
          setUser(session.user.user_metadata);
        } else {
          setSession(null);
          setUser(null);
        }
      } catch (error) {
        console.error("Error loading auth session:", error);
        setSession(null);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    getUser();
  }, [supabase, pathname, user]);

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
      setUser(session?.user?.user_metadata ?? null);
      setIsLoading(false);

      if (event === "SIGNED_IN" || event === "SIGNED_OUT") {
        router.refresh();
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [supabase, router]);

  const value = {
    user,
    session,
    isLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
