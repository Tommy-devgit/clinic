"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, type RegisterInput } from "@/lib/validators";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/hooks/useAuth";
import { useAuthContext } from "@/context/AuthContext";

export default function RegisterPage() {
  const router = useRouter();
  const { setUser, setInitialized } = useAuthContext();
  const { register, login } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const form = useForm<RegisterInput>({ resolver: zodResolver(registerSchema) });

  const onSubmit = form.handleSubmit(async (values) => {
    try {
      setError(null);
      await register.mutateAsync(values);
      const result = await login.mutateAsync({ email: values.email, password: values.password });
      setUser(result.user);
      setInitialized(true);
      router.push("/patient/dashboard");
    } catch {
      setError("Unable to create account with those details.");
    }
  });

  return (
    <form className="space-y-5" onSubmit={onSubmit}>
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Create account</h1>
        <p className="mt-2 text-sm text-slate-600">Register to manage appointments and your patient portal.</p>
      </div>

      <div className="space-y-2">
        <label htmlFor="name" className="text-sm font-medium text-slate-700">
          Full name
        </label>
        <Input id="name" placeholder="John Smith" {...form.register("name")} />
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
        <Input id="password" type="password" placeholder="Create a secure password" {...form.register("password")} />
      </div>

      {error ? <p className="text-sm text-red-600">{error}</p> : null}

      <Button type="submit" className="w-full" disabled={register.isPending || login.isPending}>
        {register.isPending || login.isPending ? "Creating account..." : "Create account"}
      </Button>

      <p className="text-sm text-slate-600">
        Already have an account?{" "}
        <Link href="/login" className="font-medium text-sky-700 hover:text-sky-800">
          Sign in
        </Link>
      </p>
    </form>
  );
}
