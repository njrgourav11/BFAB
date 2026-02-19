"use client";

import { FormEvent, useState } from "react";

type FormState = {
  name: string;
  email: string;
  whatsapp: string;
  message: string;
};

const INITIAL_FORM: FormState = {
  name: "",
  email: "",
  whatsapp: "",
  message: "",
};

export default function MaintenancePage() {
  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string>("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(false);
    setError("");

    const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;
    if (!accessKey) {
      setError("Web3Forms access key is missing. Add NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY in .env.");
      return;
    }

    try {
      setSubmitting(true);
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: accessKey,
          subject: "New maintenance inquiry",
          from_name: "BFAB Maintenance Form",
          name: form.name,
          email: form.email,
          whatsapp: form.whatsapp,
          message: form.message,
        }),
      });

      const result = await response.json();
      if (!result.success) {
        throw new Error(result.message || "Submission failed");
      }

      setSubmitted(true);
      setForm(INITIAL_FORM);
    } catch (submitError) {
      setError(
        submitError instanceof Error ? submitError.message : "Something went wrong while submitting."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="relative min-h-screen w-full max-w-full overflow-x-hidden overflow-y-hidden bg-slate-950 px-4 py-10 sm:px-6 sm:py-14">
      <div className="pointer-events-none absolute -left-20 top-0 h-80 w-80 rounded-full bg-orange-500/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 bottom-0 h-96 w-96 rounded-full bg-amber-300/20 blur-3xl" />

      <div className="relative mx-auto grid w-full max-w-6xl overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-4 shadow-2xl backdrop-blur-md lg:grid-cols-2 lg:gap-6 lg:p-6">
        <div className="rounded-2xl border border-orange-300/20 bg-gradient-to-br from-orange-400/20 via-amber-300/10 to-transparent p-5 sm:p-8">
          <p className="inline-flex rounded-full border border-orange-300/30 bg-orange-300/20 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-orange-100">
            Temporary Maintenance
          </p>
          <h1 className="mt-5 break-words text-3xl font-extrabold leading-tight text-white sm:text-5xl">
            We Are Upgrading BFAB
          </h1>
          <p className="mt-4 max-w-xl break-words text-base leading-relaxed text-orange-50/90 sm:text-lg">
            The site is currently under maintenance. Leave your details and we will contact you as
            soon as ordering is available again.
          </p>

          <div className="mt-8 grid gap-3">
            <div className="rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-orange-50">
              Fast callback for purchase assistance
            </div>
            <div className="rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-orange-50">
              Priority updates when the store is live
            </div>
            <div className="rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-orange-50">
              Your details are only used for this follow-up
            </div>
          </div>
        </div>

        <div className="w-full rounded-2xl border border-white/15 bg-white p-5 shadow-xl sm:p-7">
          <h2 className="break-words text-2xl font-bold text-gray-900">Request a Buying Callback</h2>
          <p className="mt-2 text-sm text-gray-600">
            Fill this quick form and our team will connect with you.
          </p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label htmlFor="name" className="mb-1 block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={form.name}
                onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
                required
                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
                placeholder="Your full name"
              />
            </div>

            <div>
              <label htmlFor="email" className="mb-1 block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
                required
                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label htmlFor="whatsapp" className="mb-1 block text-sm font-medium text-gray-700">
                WhatsApp Number
              </label>
              <input
                id="whatsapp"
                name="whatsapp"
                type="tel"
                value={form.whatsapp}
                onChange={(event) =>
                  setForm((prev) => ({ ...prev, whatsapp: event.target.value }))
                }
                required
                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
                placeholder="+91 98765 43210"
              />
            </div>

            <div>
              <label htmlFor="message" className="mb-1 block text-sm font-medium text-gray-700">
                Message (Optional)
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                value={form.message}
                onChange={(event) => setForm((prev) => ({ ...prev, message: event.target.value }))}
                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
                placeholder="Anything you want to share..."
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 px-4 py-3 text-sm font-semibold text-white transition hover:from-orange-600 hover:to-amber-600 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {submitting ? "Submitting..." : "Notify Me"}
            </button>
          </form>

          {error ? (
            <p className="mt-4 break-words rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
              {error}
            </p>
          ) : null}

          {submitted ? (
            <p className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
              Thanks. We received your details and will contact you shortly.
            </p>
          ) : null}
        </div>
      </div>
    </section>
  );
}
