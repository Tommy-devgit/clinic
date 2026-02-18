"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginInput } from "@/lib/validators";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

export default function LoginPage() {
  const form = useForm<LoginInput>({ resolver: zodResolver(loginSchema) });

  return (
    <form className="w-full max-w-sm space-y-4" onSubmit={form.handleSubmit(() => undefined)}>
      <h1 className="text-2xl font-semibold">Login</h1>
      <Input placeholder="Email" {...form.register("email")} />
      <Input type="password" placeholder="Password" {...form.register("password")} />
      <Button type="submit">Sign in</Button>
    </form>
  );
}
