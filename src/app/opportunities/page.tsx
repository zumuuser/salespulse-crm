"use client";

import React, { useEffect, useState } from "react";

interface Opportunity {
  id: number;
  name: string;
  contact_id: number;
  value: number;
  currency: string;
  probability: number;
  stage: string;
  close_date: string;
  created_by: number;
  created_at: string;
  updated_at: string;
}

export default function OpportunitiesPage() {
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchOpportunities() {
      try {
        const res = await fetch("/api/v1/opportunities");
        if (!res.ok) throw new Error("Failed to fetch opportunities");
        const data = await res.json();
        setOpportunities(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    fetchOpportunities();
  }, []);

  if (loading) return <div>Loading opportunities...</div>;

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Opportunities</h2>
      <table className="w-full border-collapse border border-gray-300 dark:border-gray-700">
        <thead>
          <tr className="bg-gray-100 dark:bg-gray-800">
            <th className="border border-gray-300 dark:border-gray-700 p-2 text-left">Name</th>
            <th className="border border-gray-300 dark:border-gray-700 p-2 text-left">Value</th>
            <th className="border border-gray-300 dark:border-gray-700 p-2 text-left">Currency</th>
            <th className="border border-gray-300 dark:border-gray-700 p-2 text-left">Probability</th>
            <th className="border border-gray-300 dark:border-gray-700 p-2 text-left">Stage</th>
            <th className="border border-gray-300 dark:border-gray-700 p-2 text-left">Close Date</th>
          </tr>
        </thead>
        <tbody>
          {opportunities.map((opp) => (
            <tr key={opp.id} className="hover:bg-gray-50 dark:hover:bg-gray-900">
              <td className="border border-gray-300 dark:border-gray-700 p-2">{opp.name}</td>
              <td className="border border-gray-300 dark:border-gray-700 p-2">{opp.value.toFixed(2)}</td>
              <td className="border border-gray-300 dark:border-gray-700 p-2">{opp.currency}</td>
              <td className="border border-gray-300 dark:border-gray-700 p-2">{(opp.probability * 100).toFixed(0)}%</td>
              <td className="border border-gray-300 dark:border-gray-700 p-2">{opp.stage}</td>
              <td className="border border-gray-300 dark:border-gray-700 p-2">{new Date(opp.close_date).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
