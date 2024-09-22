import React from "react";
import InvoiceCard from "../components/InvoiceCard";
import { FiPlusCircle } from "react-icons/fi";
import { Link } from "react-router-dom";

const HomePage = () => {
  const invoices = [
    { id: 1, client: "Client A", total: "$500", status: "Paid" },
    { id: 2, client: "Client B", total: "$1200", status: "Unpaid" },
    { id: 3, client: "Client C", total: "$300", status: "Pending" },
  ];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-semibold mb-4">Your Invoices</h2>
        <Link to={"new_invoice"} className="fixed bottom-24 right-6 flex text-xl items-center bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
          <FiPlusCircle className="mr-2" size={25} />
          New Invoice
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {invoices.map((invoice) => (
          <InvoiceCard key={invoice.id} invoice={invoice} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
