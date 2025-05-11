"use client";

import React, { useEffect, useState } from "react";

interface Invoice {
  id: number;
  quote_id: number;
  invoice_number: string;
  issue_date: string;
  due_date: string;
  status: string;
}

export default function InvoicesPage() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchInvoices() {
      try {
        const res = await fetch("/api/v1/invoices");
        if (!res.ok) throw new Error("Failed to fetch invoices");
        const data = await res.json();
        setInvoices(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    fetchInvoices();
  }, []);

  if (loading) return <div>Loading invoices...</div>;

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Invoices</h2>
      <table className="w-full border-collapse border border-gray-300 dark:border-gray-700">
        <thead>
          <tr className="bg-gray-100 dark:bg-gray-800">
            <th className="border border-gray-300 dark:border-gray-700 p-2 text-left">Invoice Number</th>
            <th className="border border-gray-300 dark:border-gray-700 p-2 text-left">Quote ID</th>
            <th className="border border-gray-300 dark:border-gray-700 p-2 text-left">Issue Date</th>
            <th className="border border-gray-300 dark:border-gray-700 p-2 text-left">Due Date</th>
            <th className="border border-gray-300 dark:border-gray-700 p-2 text-left">Status</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map((invoice) => (
            <tr key={invoice.id} className="hover:bg-gray-50 dark:hover:bg-gray-900">
              <td className="border border-gray-300 dark:border-gray-700 p-2">{invoice.invoice_number}</td>
              <td className="border border-gray-300 dark:border-gray-700 p-2">{invoice.quote_id}</td>
              <td className="border border-gray-300 dark:border-gray-700 p-2">{new Date(invoice.issue_date).toLocaleDateString()}</td>
              <td className="border border-gray-300 dark:border-gray-700 p-2">{new Date(invoice.due_date).toLocaleDateString()}</td>
              <td className="border border-gray-300 dark:border-gray-700 p-2">{invoice.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
