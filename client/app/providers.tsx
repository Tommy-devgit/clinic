"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { AuthProvider, useAuthContext } from "@/context/AuthContext";
import { getMe, refreshSession } from "@/services/auth";

function AuthBootstrap({ children }: { children: React.ReactNode }) {
  const { setInitialized, setUser } = useAuthContext();

  useEffect(() => {
    let mounted = true;

    async function bootstrapAuth() {
      try {
        await refreshSession();
        const user = await getMe();
        if (mounted) {
          setUser(user);
        }
      } catch {
        if (mounted) {
          setUser(null);
        }
      } finally {
        if (mounted) {
          setInitialized(true);
        }
      }
    }

    void bootstrapAuth();
    return () => {
      mounted = false;
    };
  }, [setInitialized, setUser]);

  return <>{children}</>;
}

export function AppProviders({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <AuthBootstrap>{children}</AuthBootstrap>
      </AuthProvider>
    </QueryClientProvider>
  );
}
