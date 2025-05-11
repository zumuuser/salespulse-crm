"use client";

import React, { useEffect, useState } from "react";

interface Quote {
  id: number;
  opportunity_id: number;
  quote_number: string;
  issue_date: string;
  expiry_date: string;
  status: string;
  subtotal: number;
  tax: number;
  total: number;
}

export default function QuotesPage() {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchQuotes() {
      try {
        const res = await fetch("/api/v1/quotes");
        if (!res.ok) throw new Error("Failed to fetch quotes");
        const data = await res.json();
        setQuotes(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    fetchQuotes();
  }, []);

  if (loading) return <div>Loading quotes...</div>;

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Quotes</h2>
      <table className="w-full border-collapse border border-gray-300 dark:border-gray-700">
        <thead>
          <tr className="bg-gray-100 dark:bg-gray-800">
            <th className="border border-gray-300 dark:border-gray-700 p-2 text-left">Quote Number</th>
            <th className="border border-gray-300 dark:border-gray-700 p-2 text-left">Opportunity ID</th>
            <th className="border border-gray-300 dark:border-gray-700 p-2 text-left">Issue Date</th>
            <th className="border border-gray-300 dark:border-gray-700 p-2 text-left">Expiry Date</th>
            <th className="border border-gray-300 dark:border-gray-700 p-2 text-left">Status</th>
            <th className="border border-gray-300 dark:border-gray-700 p-2 text-left">Total</th>
          </tr>
        </thead>
        <tbody>
          {quotes.map((quote) => (
            <tr key={quote.id} className="hover:bg-gray-50 dark:hover:bg-gray-900">
              <td className="border border-gray-300 dark:border-gray-700 p-2">{quote.quote_number}</td>
              <td className="border border-gray-300 dark:border-gray-700 p-2">{quote.opportunity_id}</td>
              <td className="border border-gray-300 dark:border-gray-700 p-2">{new Date(quote.issue_date).toLocaleDateString()}</td>
              <td className="border border-gray-300 dark:border-gray-700 p-2">{new Date(quote.expiry_date).toLocaleDateString()}</td>
              <td className="border border-gray-300 dark:border-gray-700 p-2">{quote.status}</td>
              <td className="border border-gray-300 dark:border-gray-700 p-2">{quote.total.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
