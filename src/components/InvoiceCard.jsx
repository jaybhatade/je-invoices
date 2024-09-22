import React from "react";

const statusStyles = {
  Paid: "bg-green-100 text-green-700",
  Unpaid: "bg-red-100 text-red-700",
  Pending: "bg-yellow-100 text-yellow-700",
};

const InvoiceCard = ({ invoice }) => {
  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg">
      <h3 className="text-xl font-semibold mb-2">{invoice.client}</h3>
      <p className="text-lg">{invoice.total}</p>
      <span
        className={`px-2 py-1 rounded-full text-sm font-medium ${statusStyles[invoice.status]}`}
      >
        {invoice.status}
      </span>
    </div>
  );
};

export default InvoiceCard;
