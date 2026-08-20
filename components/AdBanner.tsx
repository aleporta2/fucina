"use client";

import { useEffect, useRef } from "react";

/**
 * Banner AdSense non invasivo.
 *
 * COME ATTIVARLO quando hai l'approvazione AdSense:
 * 1. In app/layout.tsx, aggiungi nell'<head> lo script AdSense ufficiale:
 *    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX" crossOrigin="anonymous" />
 * 2. Sostituisci DATA_AD_CLIENT e DATA_AD_SLOT sotto con i tuoi valori reali.
 * 3. Finché questi placeholder restano vuoti, il componente non renderizza nulla:
 *    così il layout resta pulito anche prima dell'approvazione.
 */
const DATA_AD_CLIENT = ""; // es: "ca-pub-1234567890123456"
const DATA_AD_SLOT = ""; // es: "1234567890"

export default function AdBanner({ className = "" }: { className?: string }) {
  const insRef = useRef<HTMLModElement>(null);

  useEffect(() => {
    if (!DATA_AD_CLIENT || !DATA_AD_SLOT) return;
    try {
      // @ts-expect-error - adsbygoogle è iniettato dallo script esterno Google
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      // Ignora: succede se lo script AdSense non è ancora caricato (es. offline)
    }
  }, []);

  if (!DATA_AD_CLIENT || !DATA_AD_SLOT) {
    return null; // Nessun placeholder visibile finché AdSense non è configurato
  }

  return (
    <ins
      ref={insRef}
      className={`adsbygoogle block ${className}`}
      style={{ display: "block" }}
      data-ad-client={DATA_AD_CLIENT}
      data-ad-slot={DATA_AD_SLOT}
      data-ad-format="auto"
      data-full-width-responsive="true"
    />
  );
}
