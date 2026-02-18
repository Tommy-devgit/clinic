export function Sidebar({ items, title }: { items: string[]; title: string }) {
  return (
    <aside className="rounded-lg border border-slate-200 bg-white p-4">
      <h2 className="mb-3 font-semibold">{title}</h2>
      <ul className="space-y-2 text-sm text-slate-700">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </aside>
  );
}
