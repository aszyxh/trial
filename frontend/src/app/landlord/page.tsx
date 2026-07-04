"use client";

import { useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Modal } from "@/components/ui/modal";
import { Skeleton } from "@/components/ui/skeleton";

const alerts = [
  {
    id: 1,
    severity: "critical",
    title: "Urgent: Burst Water Pipe at 123 Smith St",
    detail: "SLA: 14 hours remaining",
    accent: "border-red-200 bg-red-50 text-red-700"
  },
  {
    id: 2,
    severity: "warning",
    title: "Rent Overdue: John Doe",
    detail: "3 days late",
    accent: "border-amber-200 bg-amber-50 text-amber-800"
  }
] as const;

const steps = ["Address", "Tenant Info", "Rent Details"] as const;

export default function LandlordDashboardPage() {
  const [isLoading] = useState(false);
  const [wizardOpen, setWizardOpen] = useState(true);
  const [step, setStep] = useState(0);

  const bannerText = useMemo(() => "System Status: Everything is on track", []);

  if (isLoading) {
    return <LandlordSkeleton />;
  }

  return (
    <div className="min-h-screen bg-dashboard text-ink-900 lg:flex">
      <aside className="fixed inset-y-0 left-0 hidden w-72 border-r border-slate-200 bg-white/90 px-6 py-8 shadow-soft backdrop-blur lg:flex lg:flex-col">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-sage-700">Automated Property Manager</p>
          <h1 className="mt-3 text-2xl font-semibold">Landlord Dashboard</h1>
          <p className="mt-2 text-sm leading-6 text-slate-500">Exception-based visibility for Australian property portfolios.</p>
        </div>

        <nav className="mt-10 space-y-2 text-sm font-medium">
          {["Dashboard", "Properties", "Tenants", "Maintenance"].map((item, index) => (
            <a
              key={item}
              href="#"
              className={`flex items-center rounded-2xl px-4 py-3 transition ${index === 0 ? "bg-ink-900 text-white" : "text-slate-600 hover:bg-slate-100"}`}
            >
              {item}
            </a>
          ))}
        </nav>

        <div className="mt-auto rounded-3xl bg-sage-50 p-5 ring-1 ring-sage-100">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-sage-700">Portfolio Health</p>
          <p className="mt-3 text-sm leading-6 text-slate-700">Quiet by default. Loud only when there is a compliance or maintenance exception.</p>
        </div>
      </aside>

      <main className="flex-1 lg:pl-72">
        <div className="mx-auto flex min-h-screen max-w-7xl flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
          <section className="rounded-3xl border border-emerald-200 bg-sage-50 px-5 py-5 shadow-soft animate-fadeUp">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-sage-700">System Status</p>
            <h2 className="mt-2 text-xl font-semibold text-sage-700">{bannerText}</h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">No active incidents require your attention. The dashboard stays quiet until a tenant, SLA, or payment exception needs intervention.</p>
          </section>

          <section className="grid gap-4 lg:grid-cols-2">
            {alerts.map((alert) => (
              <Card key={alert.id} className={`border px-5 py-5 ${alert.accent}`}>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] opacity-80">
                  {alert.severity === "critical" ? "Critical exception" : "Attention required"}
                </p>
                <h3 className="mt-3 text-lg font-semibold text-ink-900">{alert.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{alert.detail}</p>
                <div className="mt-5 flex gap-3">
                  <Button variant={alert.severity === "critical" ? "danger" : "secondary"}>Review</Button>
                  <Button variant="ghost">Snooze</Button>
                </div>
              </Card>
            ))}
          </section>

          <section className="grid gap-4 xl:grid-cols-[1.35fr_0.9fr]">
            <Card className="p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-sage-700">Property Setup Wizard</p>
                  <h3 className="mt-2 text-2xl font-semibold">Add a property without a heavy form</h3>
                  <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">Use a guided, step-by-step flow to collect only the essentials.</p>
                </div>
                <Button onClick={() => setWizardOpen(true)}>Open Wizard</Button>
              </div>

              <div className="mt-6 rounded-3xl bg-slate-50 p-5 ring-1 ring-slate-200">
                <div className="flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
                  {steps.map((label, index) => (
                    <div
                      key={label}
                      className={`rounded-full px-3 py-2 ${index === step ? "bg-ink-900 text-white" : "bg-white text-slate-500 ring-1 ring-slate-200"}`}
                    >
                      {index + 1}. {label}
                    </div>
                  ))}
                </div>

                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  <div className="space-y-3 rounded-2xl bg-white p-4 ring-1 ring-slate-200">
                    <p className="text-sm font-semibold">Step {step + 1}: {steps[step]}</p>
                    <p className="text-sm text-slate-500">
                      {step === 0 ? "Collect the property address and state." : step === 1 ? "Capture tenant contact details and occupancy basics." : "Set rent amount, frequency, and the first due date."}
                    </p>
                  </div>
                  <div className="space-y-3 rounded-2xl bg-white p-4 ring-1 ring-slate-200">
                    <p className="text-sm font-semibold">Preview</p>
                    <p className="text-sm text-slate-500">The wizard stays focused on the current step, keeping the rest of the setup hidden until needed.</p>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-sage-700">What stays hidden</p>
              <h3 className="mt-2 text-2xl font-semibold">No full property list on the landing page</h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">The dashboard intentionally shows only the exceptions that demand action. This keeps the experience calm and aligned with the automation-first philosophy.</p>
              <div className="mt-6 space-y-3 rounded-3xl bg-slate-50 p-5 ring-1 ring-slate-200">
                <div className="h-3 w-2/3 rounded-full bg-slate-200" />
                <div className="h-3 w-1/2 rounded-full bg-slate-200" />
                <div className="h-3 w-5/6 rounded-full bg-slate-200" />
              </div>
            </Card>
          </section>
        </div>
      </main>

      {wizardOpen ? (
        <Modal
          title={step === 0 ? "Property address" : step === 1 ? "Tenant information" : "Rent details"}
          stepLabel={`Step ${step + 1} of 3`}
          onClose={() => setWizardOpen(false)}
          onBack={step > 0 ? () => setStep((current) => current - 1) : undefined}
          onNext={step < steps.length - 1 ? () => setStep((current) => current + 1) : undefined}
          onSubmit={() => setWizardOpen(false)}
          isLastStep={step === steps.length - 1}
        >
          <div className="grid gap-4 md:grid-cols-2">
            {step === 0 ? (
              <>
                <Field label="Street address" placeholder="123 Smith St" />
                <Field label="State" placeholder="NSW" />
                <Field label="Suburb" placeholder="Surry Hills" />
                <Field label="Postcode" placeholder="2010" />
              </>
            ) : null}
            {step === 1 ? (
              <>
                <Field label="Tenant name" placeholder="John Doe" />
                <Field label="Tenant email" placeholder="john@example.com" />
                <Field label="Move-in date" placeholder="2026-07-15" />
                <Field label="Lease term" placeholder="12 months" />
              </>
            ) : null}
            {step === 2 ? (
              <>
                <Field label="Rent amount" placeholder="$450.00" />
                <Field label="Frequency" placeholder="Weekly" />
                <Field label="First due date" placeholder="2026-07-11" />
                <Field label="Bond amount" placeholder="$1,800.00" />
              </>
            ) : null}
          </div>
        </Modal>
      ) : null}
    </div>
  );
}

function Field({ label, placeholder }: { label: string; placeholder: string }) {
  return (
    <label className="space-y-2 text-sm font-medium text-slate-700">
      <span className="block">{label}</span>
      <input
        placeholder={placeholder}
        className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-ink-900 outline-none transition placeholder:text-slate-400 focus:border-sage-600 focus:ring-2 focus:ring-sage-100"
      />
    </label>
  );
}

function LandlordSkeleton() {
  return (
    <div className="min-h-screen bg-dashboard lg:flex">
      <aside className="hidden w-72 border-r border-slate-200 bg-white/90 px-6 py-8 lg:block">
        <Skeleton className="h-4 w-44" />
        <Skeleton className="mt-4 h-8 w-48" />
        <div className="mt-10 space-y-3">
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
        </div>
      </aside>
      <main className="flex-1 px-4 py-6 sm:px-6 lg:pl-72 lg:pr-8 lg:py-8">
        <div className="mx-auto max-w-7xl space-y-6">
          <Skeleton className="h-28 w-full rounded-3xl" />
          <div className="grid gap-4 lg:grid-cols-2">
            <Skeleton className="h-40 w-full rounded-3xl" />
            <Skeleton className="h-40 w-full rounded-3xl" />
          </div>
          <Skeleton className="h-96 w-full rounded-3xl" />
        </div>
      </main>
    </div>
  );
}