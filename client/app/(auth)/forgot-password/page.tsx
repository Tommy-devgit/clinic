"use client";

import Link from "next/link";
import { useState } from "react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  return (
    <form
      className="space-y-5"
      onSubmit={(event) => {
        event.preventDefault();
        setSubmitted(true);
      }}
    >
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Forgot password</h1>
        <p className="mt-2 text-sm text-slate-600">
          Enter your account email and we will send password reset instructions.
        </p>
      </div>

      <div className="space-y-2">
        <label htmlFor="email" className="text-sm font-medium text-slate-700">
          Email
        </label>
        <Input id="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" required />
      </div>

      <Button type="submit" className="w-full">
        Send reset link
      </Button>

      {submitted ? (
        <p className="rounded-md border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-800">
          If this email exists, reset instructions have been sent.
        </p>
      ) : null}

      <p className="text-sm text-slate-600">
        Remembered your password?{" "}
        <Link href="/login" className="font-medium text-sky-700 hover:text-sky-800">
          Back to sign in
        </Link>
      </p>
    </form>
  );
}
