/**
 * Tutte le funzioni qui girano nel browser (client-side), niente chiamate server.
 * Questo è ciò che rende i tool utilizzabili offline in una PWA.
 */

const CHARSETS = {
  lower: "abcdefghijklmnopqrstuvwxyz",
  upper: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  digits: "0123456789",
  symbols: "!@#$%^&*()_+-=[]{}|;:,.<>?",
};

export interface PasswordOptions {
  length: number;
  useLower: boolean;
  useUpper: boolean;
  useDigits: boolean;
  useSymbols: boolean;
}

/** Genera una password crittograficamente sicura usando crypto.getRandomValues. */
export function generatePassword(opts: PasswordOptions): string {
  let pool = "";
  if (opts.useLower) pool += CHARSETS.lower;
  if (opts.useUpper) pool += CHARSETS.upper;
  if (opts.useDigits) pool += CHARSETS.digits;
  if (opts.useSymbols) pool += CHARSETS.symbols;

  if (!pool) return "";

  const randomValues = new Uint32Array(opts.length);
  crypto.getRandomValues(randomValues);

  let result = "";
  for (let i = 0; i < opts.length; i++) {
    result += pool[randomValues[i] % pool.length];
  }
  return result;
}

/** Stima approssimativa della forza password in bit di entropia. */
export function estimateEntropy(opts: PasswordOptions): number {
  let poolSize = 0;
  if (opts.useLower) poolSize += 26;
  if (opts.useUpper) poolSize += 26;
  if (opts.useDigits) poolSize += 10;
  if (opts.useSymbols) poolSize += CHARSETS.symbols.length;
  if (poolSize === 0) return 0;
  return Math.round(opts.length * Math.log2(poolSize));
}

/** Genera un UUID v4 usando l'API nativa del browser. */
export function generateUUID(): string {
  return crypto.randomUUID();
}

export type HashAlgorithm = "SHA-1" | "SHA-256" | "SHA-384" | "SHA-512";

/** Calcola l'hash di un testo usando SubtleCrypto (nativo, nessuna libreria esterna). */
export async function computeHash(text: string, algorithm: HashAlgorithm): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(text);
  const hashBuffer = await crypto.subtle.digest(algorithm, data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}
