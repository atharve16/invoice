import React, { useState } from "react";
import "./App.css";

const App = () => {
  const [isEditable, setIsEditable] = useState(true);
  const [items, setItems] = useState([
    {
      description: "Web Development Services",
      quantity: 1,
      rate: 1500,
      amount: 1500,
    },
    { description: "UI/UX Design", quantity: 2, rate: 800, amount: 1600 },
    { description: "Hosting Setup", quantity: 1, rate: 200, amount: 200 },
  ]);

  const addRow = () => {
    if (isEditable) {
      setItems([
        ...items,
        { description: "", quantity: 0, rate: 0, amount: 0 },
      ]);
    }
  };

  const updateItem = (index, field, value) => {
    if (!isEditable) return;

    const updatedItems = [...items];
    updatedItems[index][field] = value;

    if (field === "quantity" || field === "rate") {
      updatedItems[index].amount =
        updatedItems[index].quantity * updatedItems[index].rate;
    }

    setItems(updatedItems);
  };

  const removeRow = (index) => {
    if (isEditable && items.length > 1) {
      const updatedItems = items.filter((_, i) => i !== index);
      setItems(updatedItems);
    }
  };

  const calculateSubtotal = () => {
    return items.reduce((sum, item) => sum + item.amount, 0);
  };

  const calculateTax = () => {
    return calculateSubtotal() * 0.18;
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateTax();
  };

  const handleSave = () => {
    setIsEditable(false);
  };

  const handleEdit = () => {
    setIsEditable(true);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="invoice-container">
      <div className="invoice" id="invoice">
        {}
        <div className="invoice-header">
          <div className="company-info">
            <h1>INVOICE</h1>
            <div className="company-details">
              <h2>Your Company Name</h2>
              <p>123 Business Street</p>
              <p>City, State 12345</p>
              <p>Phone: (555) 123-4567</p>
              <p>Email: info@company.com</p>
            </div>
          </div>
          <div className="invoice-details">
            <div className="invoice-meta">
              <p>
                <strong>Invoice #:</strong> INV-2025-001
              </p>
              <p>
                <strong>Date:</strong> August 31, 2025
              </p>
              <p>
                <strong>Due Date:</strong> September 30, 2025
              </p>
            </div>
          </div>
        </div>

        {}
        <div className="bill-to-section">
          <div className="bill-to">
            <h3>Bill To:</h3>
            <div className="client-info">
              <p>
                <strong>Client Name</strong>
              </p>
              <p>456 Client Avenue</p>
              <p>Client City, State 67890</p>
              <p>client@email.com</p>
            </div>
          </div>
        </div>

        {}
        <div className="items-section">
          <h3>Description of Goods</h3>
          <table className="items-table">
            <thead>
              <tr>
                <th>Description</th>
                <th>Qty</th>
                <th>Rate</th>
                <th>Amount</th>
                {isEditable && <th>Action</th>}
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr key={index}>
                  <td>
                    {isEditable ? (
                      <input
                        type="text"
                        value={item.description}
                        onChange={(e) =>
                          updateItem(index, "description", e.target.value)
                        }
                        className="table-input description-input"
                      />
                    ) : (
                      <span>{item.description}</span>
                    )}
                  </td>
                  <td>
                    {isEditable ? (
                      <input
                        type="number"
                        value={item.quantity}
                        onChange={(e) =>
                          updateItem(
                            index,
                            "quantity",
                            parseFloat(e.target.value) || 0
                          )
                        }
                        className="table-input number-input"
                        min="0"
                      />
                    ) : (
                      <span>{item.quantity}</span>
                    )}
                  </td>
                  <td>
                    {isEditable ? (
                      <input
                        type="number"
                        value={item.rate}
                        onChange={(e) =>
                          updateItem(
                            index,
                            "rate",
                            parseFloat(e.target.value) || 0
                          )
                        }
                        className="table-input number-input"
                        min="0"
                        step="0.01"
                      />
                    ) : (
                      <span>${item.rate.toFixed(2)}</span>
                    )}
                  </td>
                  <td>${item.amount.toFixed(2)}</td>
                  {isEditable && (
                    <td>
                      <button
                        onClick={() => removeRow(index)}
                        className="remove-btn"
                        disabled={items.length === 1}
                      >
                        ×
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>

          {isEditable && (
            <button onClick={addRow} className="add-row-btn">
              + Add Row
            </button>
          )}
        </div>

        {}
        <div className="totals-section">
          <div className="totals">
            <div className="total-row">
              <span>Subtotal:</span>
              <span>${calculateSubtotal().toFixed(2)}</span>
            </div>
            <div className="total-row">
              <span>Tax (18%):</span>
              <span>${calculateTax().toFixed(2)}</span>
            </div>
            <div className="total-row total-final">
              <span>
                <strong>Total:</strong>
              </span>
              <span>
                <strong>${calculateTotal().toFixed(2)}</strong>
              </span>
            </div>
          </div>
        </div>

        {}
        <div className="invoice-footer">
          <div className="payment-terms">
            <h4>Payment Terms:</h4>
            <p>Payment is due within 30 days of invoice date.</p>
            <p>Late payments may be subject to fees.</p>
          </div>
          <div className="thank-you">
            <p>
              <strong>Thank you for your business!</strong>
            </p>
          </div>
        </div>
      </div>

      {}
      <div className="action-buttons no-print">
        {isEditable ? (
          <button onClick={handleSave} className="save-btn">
            Save Invoice
          </button>
        ) : (
          <button onClick={handleEdit} className="edit-btn">
            Edit Invoice
          </button>
        )}
        <button onClick={handlePrint} className="print-btn">
          Print Invoice
        </button>
      </div>
    </div>
  );
};

export default App;
