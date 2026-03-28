"use client";

import { useState, useRef } from "react";

interface ExtractedEvent {
  day: number;
  eventFa: string;
  eventEn: string;
  type: string;
}

interface ExtractedData {
  month: string;
  year: number;
  hijriMonth?: string;
  events: ExtractedEvent[];
  prayerTimes: Array<{
    day: number;
    fajr: string;
    sunrise: string;
    dhuhr: string;
    asr: string;
    maghrib: string;
    isha: string;
  }>;
}

export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [uploading, setUploading] = useState(false);
  const [extracted, setExtracted] = useState<ExtractedData | null>(null);
  const [extractError, setExtractError] = useState("");
  const [preview, setPreview] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoginError("");
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    if (res.ok) {
      setAuthed(true);
    } else {
      setLoginError("Invalid password");
    }
  }

  async function handleUpload() {
    const file = fileRef.current?.files?.[0];
    if (!file) return;

    setUploading(true);
    setExtractError("");
    setExtracted(null);

    // Show preview
    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target?.result as string);
    reader.readAsDataURL(file);

    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await fetch("/api/admin/extract", {
        method: "POST",
        body: formData,
      });
      const json = await res.json();
      if (res.ok && json.success) {
        setExtracted(json.data);
      } else {
        setExtractError(json.error || "Extraction failed");
      }
    } catch {
      setExtractError("Network error. Please try again.");
    } finally {
      setUploading(false);
    }
  }

  // Login screen
  if (!authed) {
    return (
      <div className="min-h-screen bg-[var(--bg)] flex items-center justify-center px-4">
        <div className="w-full max-w-[400px]">
          <div className="text-center mb-8">
            <h1 className="font-[family-name:var(--font-display)] text-3xl font-medium text-[var(--text)] mb-2">
              IMAN Admin
            </h1>
            <p
              className="font-[family-name:var(--font-farsi)] text-lg text-[var(--gold)]"
              dir="rtl"
              lang="fa"
            >
              پنل مدیریت ایمان
            </p>
          </div>
          <form
            onSubmit={handleLogin}
            className="bg-[var(--surface)] border border-[var(--line)] rounded-lg p-6 shadow-md"
          >
            <label className="block text-sm font-medium text-[var(--text)] mb-2">
              Admin Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[var(--bg)] border border-[var(--line)] rounded px-4 py-3 text-[var(--text)] focus:border-[var(--accent)] focus:outline-none mb-4"
              placeholder="Enter admin password"
              autoFocus
            />
            {loginError && (
              <p className="text-sm text-[var(--madder)] mb-4">{loginError}</p>
            )}
            <button
              type="submit"
              className="w-full bg-[var(--accent)] text-white py-3 rounded font-semibold hover:bg-[var(--accent-hover)] transition-colors"
            >
              Sign In
            </button>
          </form>
          <p className="text-center text-xs text-[var(--muted)] mt-4">
            This area is for IMAN administrators only.
          </p>
        </div>
      </div>
    );
  }

  // Admin dashboard
  return (
    <div className="min-h-screen bg-[var(--bg)]">
      {/* Header */}
      <div className="bg-[var(--surface)] border-b border-[var(--line)] px-6 py-4 flex items-center justify-between">
        <div className="flex items-baseline gap-3">
          <span className="font-[family-name:var(--font-display)] text-xl font-medium text-[var(--text)] tracking-widest">
            IMAN Admin
          </span>
          <span
            className="font-[family-name:var(--font-farsi)] text-sm text-[var(--gold)]"
            dir="rtl"
            lang="fa"
          >
            پنل مدیریت
          </span>
        </div>
        <a
          href="/"
          className="text-sm text-[var(--accent)] font-medium hover:underline"
        >
          View Site &rarr;
        </a>
      </div>

      <div className="max-w-[900px] mx-auto px-6 py-10">
        {/* Upload Section */}
        <div className="mb-10">
          <h2 className="font-[family-name:var(--font-display)] text-2xl font-medium text-[var(--text)] mb-2">
            Upload Monthly Prayer Schedule
          </h2>
          <p className="text-sm text-[var(--text-secondary)] mb-6">
            Upload the monthly prayer times image (like the Ramadan schedule).
            Gemini AI will extract prayer times, events, and translate Farsi
            content automatically.
          </p>

          <div className="bg-[var(--surface)] border border-[var(--line)] rounded-lg p-6">
            <div className="flex items-center gap-4 mb-4">
              <input
                ref={fileRef}
                type="file"
                accept="image/*,.pdf"
                className="text-sm text-[var(--text-secondary)] file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-[var(--accent)] file:text-white hover:file:bg-[var(--accent-hover)] file:cursor-pointer"
                onChange={() => {
                  setExtracted(null);
                  setExtractError("");
                  setPreview(null);
                }}
              />
              <button
                onClick={handleUpload}
                disabled={uploading}
                className="bg-[var(--gold)] text-white px-6 py-2 rounded font-semibold text-sm hover:bg-[var(--gold-light)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {uploading ? "Extracting with Gemini AI..." : "Extract Data"}
              </button>
            </div>

            {extractError && (
              <div className="bg-[var(--madder)]/10 border border-[var(--madder)] rounded px-4 py-3 text-sm text-[var(--madder)]">
                {extractError}
              </div>
            )}
          </div>
        </div>

        {/* Preview + Results side by side */}
        {(preview || extracted) && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Image Preview */}
            {preview && (
              <div>
                <h3 className="text-sm font-semibold text-[var(--text)] mb-3 uppercase tracking-widest">
                  Uploaded Image
                </h3>
                <div className="border border-[var(--line)] rounded-lg overflow-hidden">
                  <img
                    src={preview}
                    alt="Uploaded prayer schedule"
                    className="w-full"
                  />
                </div>
              </div>
            )}

            {/* Extracted Data */}
            {extracted && (
              <div>
                <h3 className="text-sm font-semibold text-[var(--text)] mb-3 uppercase tracking-widest">
                  Extracted Data
                </h3>

                {/* Month info */}
                <div className="bg-[var(--surface)] border border-[var(--line)] rounded-lg p-4 mb-4">
                  <p className="font-semibold text-[var(--text)]">
                    {extracted.month} {extracted.year}
                    {extracted.hijriMonth && (
                      <span className="text-[var(--gold)] ml-2">
                        ({extracted.hijriMonth})
                      </span>
                    )}
                  </p>
                  <p className="text-sm text-[var(--muted)]">
                    {extracted.prayerTimes?.length || 0} days extracted,{" "}
                    {extracted.events?.length || 0} events found
                  </p>
                </div>

                {/* Events */}
                {extracted.events && extracted.events.length > 0 && (
                  <div className="bg-[var(--surface)] border border-[var(--line)] rounded-lg p-4 mb-4">
                    <h4 className="text-sm font-semibold text-[var(--accent)] mb-3">
                      Events & Special Occasions
                    </h4>
                    <div className="space-y-2 max-h-[400px] overflow-y-auto">
                      {extracted.events.map((event, i) => (
                        <div
                          key={i}
                          className="flex items-start gap-3 py-2 border-b border-[var(--line-light)] last:border-0"
                        >
                          <span className="text-xs font-mono bg-[var(--accent)]/10 text-[var(--accent)] px-2 py-0.5 rounded min-w-[32px] text-center">
                            {event.day}
                          </span>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-[var(--text)]">
                              {event.eventEn}
                            </p>
                            <p
                              className="text-xs text-[var(--gold)] font-[family-name:var(--font-farsi)]"
                              dir="rtl"
                              lang="fa"
                            >
                              {event.eventFa}
                            </p>
                          </div>
                          <span
                            className={`text-xs px-2 py-0.5 rounded ${
                              event.type === "holiday"
                                ? "bg-[var(--gold)]/10 text-[var(--gold)]"
                                : event.type === "special"
                                ? "bg-[var(--lapis)]/10 text-[var(--lapis)]"
                                : "bg-[var(--muted)]/10 text-[var(--muted)]"
                            }`}
                          >
                            {event.type}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Prayer times sample */}
                {extracted.prayerTimes && extracted.prayerTimes.length > 0 && (
                  <div className="bg-[var(--surface)] border border-[var(--line)] rounded-lg p-4">
                    <h4 className="text-sm font-semibold text-[var(--accent)] mb-3">
                      Prayer Times (first 5 days)
                    </h4>
                    <div className="overflow-x-auto">
                      <table className="w-full text-xs">
                        <thead>
                          <tr className="text-[var(--muted)] border-b border-[var(--line-light)]">
                            <th className="px-2 py-1 text-left">Day</th>
                            <th className="px-2 py-1">Fajr</th>
                            <th className="px-2 py-1">Sunrise</th>
                            <th className="px-2 py-1">Dhuhr</th>
                            <th className="px-2 py-1">Asr</th>
                            <th className="px-2 py-1">Maghrib</th>
                            <th className="px-2 py-1">Isha</th>
                          </tr>
                        </thead>
                        <tbody>
                          {extracted.prayerTimes.slice(0, 5).map((pt) => (
                            <tr
                              key={pt.day}
                              className="border-b border-[var(--line-light)] last:border-0"
                            >
                              <td className="px-2 py-1 font-medium text-[var(--text)]">
                                {pt.day}
                              </td>
                              <td className="px-2 py-1 text-center tabular-nums">
                                {pt.fajr}
                              </td>
                              <td className="px-2 py-1 text-center tabular-nums">
                                {pt.sunrise}
                              </td>
                              <td className="px-2 py-1 text-center tabular-nums">
                                {pt.dhuhr}
                              </td>
                              <td className="px-2 py-1 text-center tabular-nums">
                                {pt.asr}
                              </td>
                              <td className="px-2 py-1 text-center tabular-nums">
                                {pt.maghrib}
                              </td>
                              <td className="px-2 py-1 text-center tabular-nums">
                                {pt.isha}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <p className="text-xs text-[var(--muted)] mt-2">
                      Showing 5 of {extracted.prayerTimes.length} days
                    </p>
                  </div>
                )}

                {/* JSON download */}
                <button
                  onClick={() => {
                    const blob = new Blob(
                      [JSON.stringify(extracted, null, 2)],
                      { type: "application/json" }
                    );
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement("a");
                    a.href = url;
                    a.download = `iman-schedule-${extracted.month}-${extracted.year}.json`;
                    a.click();
                    URL.revokeObjectURL(url);
                  }}
                  className="mt-4 w-full bg-[var(--accent)] text-white py-2 rounded font-semibold text-sm hover:bg-[var(--accent-hover)] transition-colors"
                >
                  Download Extracted JSON
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
