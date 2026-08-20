"use client";

import { useEffect, useState } from "react";
import CopyButton from "@/components/CopyButton";
import AdBanner from "@/components/AdBanner";
import { generatePassword, estimateEntropy, PasswordOptions } from "@/lib/generators";

const defaultOptions: PasswordOptions = {
  length: 16,
  useLower: true,
  useUpper: true,
  useDigits: true,
  useSymbols: true,
};

function strengthLabel(bits: number): { label: string; color: string } {
  if (bits < 40) return { label: "Debole", color: "text-red-500" };
  if (bits < 60) return { label: "Discreta", color: "text-amber-500" };
  if (bits < 80) return { label: "Forte", color: "text-teal-600" };
  return { label: "Molto forte", color: "text-violet" };
}

export default function PasswordTool() {
  const [options, setOptions] = useState<PasswordOptions>(defaultOptions);
  const [password, setPassword] = useState("");

  function regenerate(opts: PasswordOptions) {
    setPassword(generatePassword(opts));
  }

  useEffect(() => {
    regenerate(defaultOptions);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function update(partial: Partial<PasswordOptions>) {
    const next = { ...options, ...partial };
    // Non permettere di deselezionare tutti i set di caratteri
    if (!next.useLower && !next.useUpper && !next.useDigits && !next.useSymbols) {
      return;
    }
    setOptions(next);
    regenerate(next);
  }

  const bits = estimateEntropy(options);
  const strength = strengthLabel(bits);

  return (
    <div>
      <h1 className="text-2xl font-bold">Generatore di password</h1>
      <p className="mt-2 text-muted">
        Creata con crypto.getRandomValues, l&apos;API di casualità sicura del browser.
      </p>

      <div className="readout mt-8 flex items-center justify-between gap-3">
        <span className="break-all">{password || "—"}</span>
        <CopyButton value={password} />
      </div>

      <div className="mt-3 flex items-center gap-2 text-sm">
        <span className="text-muted">Robustezza stimata:</span>
        <span className={`font-medium ${strength.color}`}>
          {strength.label} (~{bits} bit)
        </span>
      </div>

      <div className="neu-surface mt-8 flex flex-col gap-6 p-6">
        <div>
          <div className="mb-2 flex items-center justify-between">
            <label htmlFor="length" className="font-medium">
              Lunghezza
            </label>
            <span className="font-mono text-muted">{options.length}</span>
          </div>
          <input
            id="length"
            type="range"
            min={6}
            max={64}
            value={options.length}
            onChange={(e) => update({ length: Number(e.target.value) })}
            className="w-full accent-violet"
          />
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <ToggleChip
            label="a-z"
            active={options.useLower}
            onClick={() => update({ useLower: !options.useLower })}
          />
          <ToggleChip
            label="A-Z"
            active={options.useUpper}
            onClick={() => update({ useUpper: !options.useUpper })}
          />
          <ToggleChip
            label="0-9"
            active={options.useDigits}
            onClick={() => update({ useDigits: !options.useDigits })}
          />
          <ToggleChip
            label="!@#$"
            active={options.useSymbols}
            onClick={() => update({ useSymbols: !options.useSymbols })}
          />
        </div>

        <button onClick={() => regenerate(options)} className="btn-brand self-start">
          Rigenera
        </button>
      </div>

      <AdBanner className="mt-10" />
    </div>
  );
}

function ToggleChip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      aria-pressed={active}
      className={`rounded-xl px-3 py-2.5 font-mono text-sm transition-all duration-150 ${
        active ? "neu-pressed text-violet" : "neu-surface text-muted"
      }`}
    >
      {label}
    </button>
  );
}
