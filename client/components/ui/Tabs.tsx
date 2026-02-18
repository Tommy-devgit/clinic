"use client";

import { useState } from "react";

export function Tabs({ tabs }: { tabs: string[] }) {
  const [active, setActive] = useState(tabs[0]);

  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActive(tab)}
            className={`rounded px-3 py-1 text-sm ${active === tab ? "bg-sky-600 text-white" : "bg-slate-200"}`}
          >
            {tab}
          </button>
        ))}
      </div>
      <p className="text-sm text-slate-600">Current tab: {active}</p>
    </div>
  );
}
