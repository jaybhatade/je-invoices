import React, { useRef, useState } from "react";
import { FiSun, FiMoon, FiPlus, FiTrash } from "react-icons/fi";
import { useReactToPrint } from "react-to-print";

const InvoicePage = () => {

  const [items, setItems] = useState([{ description: "", qty: "", unit: "Nos", rate: "" }]);
  const [clientName, setClientName] = useState("");
  const [clientAddress, setClientAddress] = useState("");
  const [date, setDate] = useState("");
  const [note, setNote] = useState("");

  const invoiceRef = useRef();

  const addItem = () => setItems([...items, { description: "", qty: "", unit: "Nos", rate: "" }]);

  const removeItem = (index) => {
    const newItems = [...items];
    newItems.splice(index, 1);
    setItems(newItems);
  };

  // Calculate total
  const total = items.reduce((sum, item) => sum + item.qty * item.rate, 0);

  const gst = total * 0.09;

  const gdTotal = Math.floor(total + gst * 2);

  // Print Invoice
  const handlePrint = useReactToPrint({
    content: () => invoiceRef.current,
    documentTitle: `Invoice-${clientName}`,
  });

  return (
    <div>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-4 pb-24">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">Create Invoice</h1>
        </div>

        {/* Client Details and Items */}
        <div className="space-y-4">
          {/* Client Details Form */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-800 dark:text-gray-100">Client Name</label>
              <input
                type="text"
                className="w-full p-2 mt-1 border border-gray-300 dark:border-gray-700 rounded dark:bg-gray-800 dark:text-gray-100"
                placeholder="Enter client name"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-gray-800 dark:text-gray-100">Client Address</label>
              <textarea
                className="w-full p-2 mt-1 border border-gray-300 dark:border-gray-700 rounded dark:bg-gray-800 dark:text-gray-100"
                placeholder="Enter client address"
                value={clientAddress}
                onChange={(e) => setClientAddress(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-gray-800 dark:text-gray-100">Date</label>
              <input
                type="date"
                className="w-full p-2 mt-1 border border-gray-300 dark:border-gray-700 rounded dark:bg-gray-800 dark:text-gray-100"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
          </div>

          {/* Invoice Items */}
          <h2 className="text-lg font-medium text-gray-800 dark:text-gray-100">Invoice Items</h2>
          {items.map((item, index) => (
            <div key={index} className="grid grid-cols-1 sm:grid-cols-5 gap-4 mb-4">
              <div className="col-span-2">
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded dark:bg-gray-800 dark:text-gray-100"
                  placeholder="Item description"
                  value={item.description}
                  onChange={(e) => {
                    const newItems = [...items];
                    newItems[index].description = e.target.value;
                    setItems(newItems);
                  }}
                />
              </div>
              <div>
                <input
                  type="number"
                  className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded dark:bg-gray-800 dark:text-gray-100"
                  placeholder="Qty"
                  value={item.qty}
                  onChange={(e) => {
                    const newItems = [...items];
                    newItems[index].qty = e.target.value;
                    setItems(newItems);
                  }}
                />
              </div>
              <div>
                <select
                  className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded dark:bg-gray-800 dark:text-gray-100"
                  value={item.unit}
                  onChange={(e) => {
                    const newItems = [...items];
                    newItems[index].unit = e.target.value;
                    setItems(newItems);
                  }}
                >
                  <option value="Nos">Nos</option>
                  <option value="Pcs">Pcs</option>
                  <option value="Mtr">Mtr</option>
                </select>
              </div>
              <div>
                <input
                  type="number"
                  className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded dark:bg-gray-800 dark:text-gray-100"
                  placeholder="Rate"
                  value={item.rate}
                  onChange={(e) => {
                    const newItems = [...items];
                    newItems[index].rate = e.target.value;
                    setItems(newItems);
                  }}
                />
              </div>
              <div className="flex items-center">
                <button
                  onClick={() => removeItem(index)}
                  className="bg-red-500 text-white p-2 rounded hover:bg-red-600"
                >
                  <FiTrash />
                </button>
              </div>
            </div>
          ))}

          <button
            onClick={addItem}
            className="flex items-center justify-center bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            <FiPlus className="mr-2" />
            Add Item
          </button>

          {/* Additional Note */}
          <div>
            <label className="block text-gray-800 dark:text-gray-100">Note</label>
            <textarea
              className="w-full p-2 mt-1 border border-gray-300 dark:border-gray-700 rounded dark:bg-gray-800 dark:text-gray-100"
              placeholder="Additional notes (optional)"
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
          </div>

          {/* Invoice Preview */}
          <div ref={invoiceRef} className=" bg-white dark:bg-gray-800 shadow-md rounded p-4 overflow-auto">
            {/* Header Image */}
            <div className="text-center mb-4">
              <img src="./src/pages/header.png" alt="Header" className="mx-auto w-full" style={{ maxWidth: '100%' }} />
            </div>

            {/* Invoice Details Table */}
            <h2 className="text-xl text-center font-semibold mb-4 text-gray-800 dark:text-gray-100">Invoice</h2>
            <table className="w-[90%]  text-left border-collapse mx-auto">
              <tbody>
              <tr >
                <td colSpan="2" className="w-[50%] border p-2 text-gray-800 dark:text-gray-100 font-bold">Form, Jay Enterprises</td>
                <td colSpan="4" className="w-[50%] border p-2 text-gray-800 dark:text-gray-100 font-bold">To, {clientName}</td>
              </tr>
              <tr >
                <td colSpan="2" className="border p-2 text-gray-800 dark:text-gray-100">
                B28, RBI GOKUL SOC, KULVAIBHAV NAGAR,
                ACHOLE ROAD, NALLASOPA EAST, MUMBAI,
                MAHARASHTRA - 401209
                </td>
                <td colSpan="4" className="border p-2 text-gray-800 dark:text-gray-100 align-text-top">{clientAddress}</td>
              </tr>
              
              <tr >
                <td colSpan="2" className=" border p-2 text-gray-800 dark:text-gray-100">
                  <b>GSTIN: </b>27ATFPB1797D1ZU
                </td>
                <td colSpan="2" className="w-[20%] border p-2 text-gray-800 dark:text-gray-100 font-bold">
                  INVOICE No.
                </td>
                <td colSpan="2" className="w-[30%] border p-2 text-gray-800 dark:text-gray-100 font-bold">
                  P.O No.
                </td>
              </tr>

              <tr >
                <td colSpan="2" className=" border p-2 text-gray-800 dark:text-gray-100">
                  <b>Date: </b> {date}
                </td>
                <td colSpan="2" className="w-[20%] border p-2 text-gray-800 dark:text-gray-100 font-bold">
                  -
                </td>
                <td colSpan="2" className="w-[30%] border p-2 text-gray-800 dark:text-gray-100 font-bold">
                  -
                </td>
              </tr>

                <tr>
                  <th className="border text-center p-2 text-gray-800 dark:text-gray-100">Sr. No.</th>
                  <th className="border text-center p-2 text-gray-800 dark:text-gray-100">Particulars</th>
                  <th className="border text-center p-2 text-gray-800 dark:text-gray-100">Qty</th>
                  <th className="border text-center p-2 text-gray-800 dark:text-gray-100">Unit</th>
                  <th className="border text-center p-2 text-gray-800 dark:text-gray-100">Rate</th>
                  <th className="border text-center p-2 text-gray-800 dark:text-gray-100">Amount</th>
                </tr>
                {items.map((item, index) => (
                  <tr key={index}>
                    <td className="w-[10%] text-center border p-2">{index + 1}</td>
                    <td className="w-[40%] border p-2 text-gray-800 dark:text-gray-100">{item.description || "N/A"}</td>
                    <td className="text-center border p-2 text-gray-800 dark:text-gray-100">{item.qty || 0}</td>
                    <td className="text-center border p-2 text-gray-800 dark:text-gray-100">{item.unit}</td>
                    <td className="text-right border p-2 text-gray-800 dark:text-gray-100">{item.rate || 0}</td>
                    <td className="text-right border p-2 text-gray-800 dark:text-gray-100">{item.qty * item.rate || 0}</td>
                  </tr>
                ))}

                <tr>
                  <td colSpan="5" className="font-bold border p-2 text-right text-gray-800 dark:text-gray-100">Taxable Amount:</td>
                  <td className="text-right border p-2 text-gray-800 dark:text-gray-100">{total}</td>
                </tr>

                <tr>
                  <td colSpan="5" className="font-bold border p-2 text-right text-gray-800 dark:text-gray-100">9% CGST:</td>
                  <td className="text-right border p-2 text-gray-800 dark:text-gray-100">{gst}</td>
                </tr>

                <tr>
                  <td colSpan="5" className="font-bold border p-2 text-right text-gray-800 dark:text-gray-100">9% SGST:</td>
                  <td className="text-right border p-2 text-gray-800 dark:text-gray-100">{gst}</td>
                </tr>

                <tr>
                  <td colSpan="5" className="font-bold border p-2 text-right text-gray-800 dark:text-gray-100">Total Amount:</td>
                  <td className="text-right border p-2 text-gray-800 dark:text-gray-100">{gdTotal}</td>
                </tr>

              </tbody>
              
              
            </table>

            {/* Note Section */}
            {note && (
              <div className="mt-4">
                <strong className="text-gray-800 dark:text-gray-100">Note:</strong>
                <p className="text-gray-800 dark:text-gray-100">{note}</p>
              </div>
            )}
          </div>

          {/* Print Button */}
          <div className="mt-4">
            <button
              onClick={handlePrint}
              className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600"
            >
              Create Invoice (PDF)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoicePage;
