"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, type RegisterInput } from "@/lib/validators";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

export default function RegisterPage() {
  const form = useForm<RegisterInput>({ resolver: zodResolver(registerSchema) });

  return (
    <form className="w-full max-w-sm space-y-4" onSubmit={form.handleSubmit(() => undefined)}>
      <h1 className="text-2xl font-semibold">Register</h1>
      <Input placeholder="Full name" {...form.register("name")} />
      <Input placeholder="Email" {...form.register("email")} />
      <Input type="password" placeholder="Password" {...form.register("password")} />
      <Button type="submit">Create account</Button>
    </form>
  );
}
