"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginInput } from "@/lib/validators";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/hooks/useAuth";
import { useAuthContext } from "@/context/AuthContext";

export default function LoginPage() {
  const router = useRouter();
  const { setUser, setInitialized } = useAuthContext();
  const { login } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const form = useForm<LoginInput>({ resolver: zodResolver(loginSchema) });

  const onSubmit = form.handleSubmit(async (values) => {
    try {
      setError(null);
      const result = await login.mutateAsync(values);
      setUser(result.user);
      setInitialized(true);

      if (result.user.role === "admin") {
        router.push("/admin/dashboard");
        return;
      }

      router.push("/patient/dashboard");
    } catch {
      setError("Invalid email or password.");
    }
  });

  return (
    <form className="space-y-5" onSubmit={onSubmit}>
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Sign in</h1>
        <p className="mt-2 text-sm text-slate-600">Enter your account credentials to continue.</p>
      </div>

      <div className="space-y-2">
        <label htmlFor="email" className="text-sm font-medium text-slate-700">
          Email
        </label>
        <Input id="email" placeholder="you@example.com" {...form.register("email")} />
      </div>

      <div className="space-y-2">
        <label htmlFor="password" className="text-sm font-medium text-slate-700">
          Password
        </label>
        <Input id="password" type="password" placeholder="Your password" {...form.register("password")} />
      </div>

      {error ? <p className="text-sm text-red-600">{error}</p> : null}

      <Button type="submit" className="w-full" disabled={login.isPending}>
        {login.isPending ? "Signing in..." : "Sign in"}
      </Button>

      <div className="flex items-center justify-between text-sm">
        <Link href="/forgot-password" className="text-sky-700 hover:text-sky-800">
          Forgot password?
        </Link>
        <Link href="/register" className="text-slate-700 hover:text-slate-900">
          Create account
        </Link>
      </div>
    </form>
  );
}
