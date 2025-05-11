"use client";

import React from "react";
import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import LeadsPage from "./leads/page";
import OpportunitiesPage from "./opportunities/page";
import QuotesPage from "./quotes/page";
import InvoicesPage from "./invoices/page";
import DashboardPage from "./dashboard/page";

export default function Home() {
  const [tab, setTab] = useState("dashboard");

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white">
      <header className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
        <h1 className="text-2xl font-bold">SalesPulse CRM</h1>
        <nav>
          <Tabs value={tab} onValueChange={setTab} className="space-x-4">
            <TabsList>
              <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
              <TabsTrigger value="leads">Leads</TabsTrigger>
              <TabsTrigger value="opportunities">Opportunities</TabsTrigger>
              <TabsTrigger value="quotes">Quotes</TabsTrigger>
              <TabsTrigger value="invoices">Invoices</TabsTrigger>
            </TabsList>
          </Tabs>
        </nav>
      </header>
      <main className="p-6">
        {tab === "dashboard" && <DashboardPage />}
        {tab === "leads" && <LeadsPage />}
        {tab === "opportunities" && <OpportunitiesPage />}
        {tab === "quotes" && <QuotesPage />}
        {tab === "invoices" && <InvoicesPage />}
      </main>
    </div>
  );
}
