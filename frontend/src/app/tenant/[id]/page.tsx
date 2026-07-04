"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function TenantPortalPage({ params }: { params: { id: string } }) {
  const [isLoading] = useState(false);
  const tenantName = "Alex Taylor";
  const address = "123 Smith St, Surry Hills NSW 2010";
  const rentDue = "$450 Due Next Tuesday";

  if (isLoading) {
    return <TenantSkeleton />;
  }

  return (
    <main className="min-h-screen bg-tenant px-4 py-5 text-ink-900 sm:px-6 sm:py-8 lg:flex lg:items-center lg:justify-center">
      <div className="mx-auto flex w-full max-w-md flex-col gap-4 lg:max-w-sm">
        <Card className="overflow-hidden p-5 shadow-soft animate-fadeUp">
          <div className="rounded-3xl bg-ink-900 px-5 py-5 text-white shadow-insetGlow">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-sage-100">Tenant Portal</p>
            <h1 className="mt-3 text-2xl font-semibold leading-tight">Welcome, {tenantName}</h1>
            <p className="mt-2 text-sm leading-6 text-slate-200">{address}</p>
            <p className="mt-4 inline-flex rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-sage-100">Property ID: {params.id}</p>
          </div>
        </Card>

        <div className="grid gap-4">
          <Button className="h-24 flex-col items-start justify-center rounded-[1.75rem] px-6 py-5 text-left shadow-soft">
            <span className="text-2xl font-semibold">Pay Rent</span>
            <span className="mt-2 text-sm text-white/80">{rentDue}</span>
          </Button>

          <Button className="h-24 flex-col items-start justify-center rounded-[1.75rem] px-6 py-5 text-left shadow-soft" variant="secondary">
            <span className="text-2xl font-semibold">Report an Issue</span>
            <span className="mt-2 text-sm text-slate-500">Log a maintenance problem in under a minute.</span>
          </Button>
        </div>

        <Card className="p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-sage-700">Maintenance Form</p>
          <h2 className="mt-2 text-xl font-semibold">Describe the issue</h2>
          <p className="mt-2 text-sm leading-6 text-slate-500">Keep it short. Add a photo if it helps the landlord or maintenance team understand the problem faster.</p>

          <div className="mt-5 space-y-4">
            <label className="block space-y-2 text-sm font-medium text-slate-700">
              <span>Describe the issue...</span>
              <textarea
                rows={5}
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-sage-600 focus:ring-2 focus:ring-sage-100"
                placeholder="Describe the issue..."
              />
            </label>

            <label className="flex cursor-pointer items-center justify-center rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 px-4 py-4 text-sm font-semibold text-slate-700 transition hover:border-sage-600 hover:bg-sage-50">
              <span>Take Photo/Upload</span>
              <input type="file" accept="image/*" className="sr-only" />
            </label>

            <Button className="h-14 w-full rounded-2xl">Submit Issue</Button>
          </div>
        </Card>
      </div>
    </main>
  );
}

function TenantSkeleton() {
  return (
    <main className="min-h-screen bg-tenant px-4 py-5 sm:px-6 sm:py-8 lg:flex lg:items-center lg:justify-center">
      <div className="mx-auto flex w-full max-w-md flex-col gap-4">
        <Skeleton className="h-44 w-full rounded-[1.75rem]" />
        <Skeleton className="h-24 w-full rounded-[1.75rem]" />
        <Skeleton className="h-24 w-full rounded-[1.75rem]" />
        <Skeleton className="h-80 w-full rounded-[1.75rem]" />
      </div>
    </main>
  );
}