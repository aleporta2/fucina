"use client";

import { useEffect, useState } from "react";
import CopyButton from "@/components/CopyButton";
import AdBanner from "@/components/AdBanner";
import { generateUUID } from "@/lib/generators";

export default function UUIDTool() {
  const [count, setCount] = useState(5);
  const [uuids, setUuids] = useState<string[]>([]);

  function regenerate(n: number) {
    setUuids(Array.from({ length: n }, () => generateUUID()));
  }

  useEffect(() => {
    regenerate(5);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold">Generatore UUID</h1>
      <p className="mt-2 text-muted">
        Identificatori univoci versione 4, generati con crypto.randomUUID.
      </p>

      <div className="mt-8 flex flex-col gap-3">
        {uuids.map((id, i) => (
          <div key={i} className="readout flex items-center justify-between gap-3 text-base">
            <span className="break-all">{id}</span>
            <CopyButton value={id} />
          </div>
        ))}
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-4">
        <label className="flex items-center gap-2 text-sm text-muted">
          Quantità
          <input
            type="number"
            min={1}
            max={50}
            value={count}
            onChange={(e) => setCount(Math.min(50, Math.max(1, Number(e.target.value))))}
            className="neu-pressed w-20 rounded-xl px-3 py-1.5 font-mono text-ink outline-none"
          />
        </label>
        <button onClick={() => regenerate(count)} className="btn-brand">
          Genera
        </button>
        <CopyButton value={uuids.join("\n")} />
      </div>

      <AdBanner className="mt-10" />
    </div>
  );
}
