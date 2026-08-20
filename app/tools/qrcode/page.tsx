"use client";

import { useEffect, useState } from "react";
import QRCode from "qrcode";
import AdBanner from "@/components/AdBanner";

export default function QRCodeTool() {
  const [text, setText] = useState("https://");
  const [dataUrl, setDataUrl] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!text) {
      setDataUrl("");
      return;
    }
    QRCode.toDataURL(text, {
      width: 320,
      margin: 1,
      color: { dark: "#2D2B55", light: "#00000000" },
    })
      .then((url) => {
        setDataUrl(url);
        setError("");
      })
      .catch(() => setError("Impossibile generare il QR per questo testo."));
  }, [text]);

  function download() {
    if (!dataUrl) return;
    const a = document.createElement("a");
    a.href = dataUrl;
    a.download = "qrcode.png";
    a.click();
  }

  return (
    <div>
      <h1 className="text-2xl font-bold">Generatore QR Code</h1>
      <p className="mt-2 text-muted">
        Incolla un link o un testo: il QR si aggiorna mentre scrivi.
      </p>

      <label htmlFor="qr-input" className="sr-only">
        Testo o link da trasformare in QR code
      </label>
      <textarea
        id="qr-input"
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={2}
        className="neu-pressed mt-8 w-full resize-none rounded-2xl px-5 py-4 font-mono text-base outline-none placeholder:text-muted"
        placeholder="https://esempio.it"
      />

      {error && <p className="mt-2 text-sm text-red-500">{error}</p>}

      <div className="neu-surface mt-8 flex flex-col items-center gap-6 p-8">
        {dataUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={dataUrl} alt="QR code generato dal testo inserito" width={240} height={240} />
        ) : (
          <div className="flex h-60 w-60 items-center justify-center text-sm text-muted">
            Scrivi qualcosa per generare il QR
          </div>
        )}
        <button onClick={download} disabled={!dataUrl} className="btn-brand disabled:opacity-40">
          Scarica PNG
        </button>
      </div>

      <AdBanner className="mt-10" />
    </div>
  );
}
