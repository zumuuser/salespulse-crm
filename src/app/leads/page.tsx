"use client";

import React, { useEffect, useState } from "react";

interface Lead {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  source?: string;
  status?: string;
  assigned_to?: number;
  created_at: string;
  updated_at: string;
}

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchLeads() {
      try {
        const res = await fetch("/api/v1/leads");
        if (!res.ok) throw new Error("Failed to fetch leads");
        const data = await res.json();
        setLeads(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    fetchLeads();
  }, []);

  if (loading) return <div>Loading leads...</div>;

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Leads</h2>
      <table className="w-full border-collapse border border-gray-300 dark:border-gray-700">
        <thead>
          <tr className="bg-gray-100 dark:bg-gray-800">
            <th className="border border-gray-300 dark:border-gray-700 p-2 text-left">Name</th>
            <th className="border border-gray-300 dark:border-gray-700 p-2 text-left">Email</th>
            <th className="border border-gray-300 dark:border-gray-700 p-2 text-left">Phone</th>
            <th className="border border-gray-300 dark:border-gray-700 p-2 text-left">Status</th>
            <th className="border border-gray-300 dark:border-gray-700 p-2 text-left">Source</th>
          </tr>
        </thead>
        <tbody>
          {leads.map((lead) => (
            <tr key={lead.id} className="hover:bg-gray-50 dark:hover:bg-gray-900">
              <td className="border border-gray-300 dark:border-gray-700 p-2">{lead.first_name} {lead.last_name}</td>
              <td className="border border-gray-300 dark:border-gray-700 p-2">{lead.email}</td>
              <td className="border border-gray-300 dark:border-gray-700 p-2">{lead.phone || "-"}</td>
              <td className="border border-gray-300 dark:border-gray-700 p-2">{lead.status || "-"}</td>
              <td className="border border-gray-300 dark:border-gray-700 p-2">{lead.source || "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
