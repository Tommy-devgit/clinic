"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useAuthContext } from "@/context/AuthContext";

export default function AdminSettingsPage() {
  const router = useRouter();
  const { user, setUser } = useAuthContext();
  const { logout } = useAuth();
  const [hospitalName, setHospitalName] = useState("Roha Hospital");
  const [supportEmail, setSupportEmail] = useState("support@roha-hospital.com");
  const [saved, setSaved] = useState(false);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Admin Settings</h1>

      <section className="space-y-3 rounded-lg border border-slate-200 bg-white p-5">
        <h2 className="text-lg font-semibold">Profile</h2>
        <p className="text-sm text-slate-700">Signed in as {user?.name ?? "Admin"} ({user?.email ?? "-"})</p>
      </section>

      <form
        className="space-y-3 rounded-lg border border-slate-200 bg-white p-5"
        onSubmit={(event) => {
          event.preventDefault();
          setSaved(true);
          setTimeout(() => setSaved(false), 2500);
        }}
      >
        <h2 className="text-lg font-semibold">Hospital Preferences</h2>
        <input
          className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
          value={hospitalName}
          onChange={(event) => setHospitalName(event.target.value)}
        />
        <input
          className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
          value={supportEmail}
          onChange={(event) => setSupportEmail(event.target.value)}
        />
        <button className="rounded-md bg-sky-700 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-800">
          Save Settings
        </button>
        {saved ? <p className="text-sm text-emerald-700">Settings saved.</p> : null}
      </form>

      <section className="space-y-3 rounded-lg border border-slate-200 bg-white p-5">
        <h2 className="text-lg font-semibold">Session</h2>
        <button
          className="rounded-md border border-red-300 px-4 py-2 text-sm font-semibold text-red-700 hover:bg-red-50"
          disabled={logout.isPending}
          onClick={async () => {
            await logout.mutateAsync();
            setUser(null);
            router.push("/login");
          }}
        >
          {logout.isPending ? "Signing out..." : "Sign out"}
        </button>
      </section>
    </div>
  );
}
