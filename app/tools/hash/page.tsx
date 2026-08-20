"use client";

import { useEffect, useState } from "react";
import CopyButton from "@/components/CopyButton";
import AdBanner from "@/components/AdBanner";
import { computeHash, HashAlgorithm } from "@/lib/generators";

const algorithms: HashAlgorithm[] = ["SHA-1", "SHA-256", "SHA-384", "SHA-512"];

export default function HashTool() {
  const [text, setText] = useState("");
  const [algorithm, setAlgorithm] = useState<HashAlgorithm>("SHA-256");
  const [hash, setHash] = useState("");

  useEffect(() => {
    if (!text) {
      setHash("");
      return;
    }
    let cancelled = false;
    computeHash(text, algorithm).then((result) => {
      if (!cancelled) setHash(result);
    });
    return () => {
      cancelled = true;
    };
  }, [text, algorithm]);

  return (
    <div>
      <h1 className="text-2xl font-bold">Calcolatore Hash</h1>
      <p className="mt-2 text-muted">
        Calcolato con SubtleCrypto, l&apos;API crittografica nativa del browser.
      </p>

      <label htmlFor="hash-input" className="sr-only">
        Testo da trasformare in hash
      </label>
      <textarea
        id="hash-input"
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={3}
        className="neu-pressed mt-8 w-full resize-none rounded-2xl px-5 py-4 font-mono text-base outline-none placeholder:text-muted"
        placeholder="Scrivi o incolla il testo da hashare"
      />

      <div className="mt-4 flex flex-wrap gap-2">
        {algorithms.map((algo) => (
          <button
            key={algo}
            onClick={() => setAlgorithm(algo)}
            aria-pressed={algorithm === algo}
            className={`rounded-xl px-4 py-2 font-mono text-sm transition-all duration-150 ${
              algorithm === algo ? "neu-pressed text-violet" : "neu-surface text-muted"
            }`}
          >
            {algo}
          </button>
        ))}
      </div>

      <div className="readout mt-6 flex items-center justify-between gap-3 text-base">
        <span className="break-all">{hash || "—"}</span>
        <CopyButton value={hash} />
      </div>

      <AdBanner className="mt-10" />
    </div>
  );
}
