import React, { useState } from "react";
import "./App.css";

const App = () => {
  const [isEditable, setIsEditable] = useState(false);
  const [items, setItems] = useState([
    {
      sn: 1,
      description: "Chikankari Embroidered Salwar Suit (Pink)",
      size: "S, M, L, XL",
      hsn: "6204",
      quantity: 24.0,
      unit: "PCS",
      rate: 1869.0,
      amount: 45576.0,
    },
    {
      sn: 2,
      description: "Zardoshi Style Gown Set (Blue)",
      size: "S, M, L",
      hsn: "6204",
      quantity: 12.0,
      unit: "PCS",
      rate: 2069.0,
      amount: 24828.0,
    },
    {
      sn: 3,
      description: "Designer Palazzo Suit (Mint Green)",
      size: "S, M, L",
      hsn: "6204",
      quantity: 18.0,
      unit: "PCS",
      rate: 2179.0,
      amount: 39242.0,
    },
    {
      sn: 4,
      description: "Heavy Work Festive Suit (Maroon)",
      size: "M, L, XL",
      hsn: "6204",
      quantity: 6.0,
      unit: "PCS",
      rate: 2389.0,
      amount: 14334.0,
    },
    {
      sn: 5,
      description: "Premium Cotton Long Wear Suit Set (Navy)",
      size: "S, M, L, XL",
      hsn: "6204",
      quantity: 20.0,
      unit: "PCS",
      rate: 1485.0,
      amount: 29700.0,
    },
  ]);

  const addRow = () => {
    if (isEditable) {
      const newSn = items.length + 1;
      setItems([
        ...items,
        {
          sn: newSn,
          description: "",
          size: "",
          hsn: "",
          quantity: 0,
          unit: "PCS",
          rate: 0,
          amount: 0,
        },
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
      updatedItems.forEach((item, i) => {
        item.sn = i + 1;
      });
      setItems(updatedItems);
    }
  };

  const calculateSubtotal = () => {
    return items.reduce((sum, item) => sum + item.amount, 0);
  };

  const calculateTotalQty = () => {
    return items.reduce((sum, item) => sum + item.quantity, 0);
  };

  const calculateDiscount = () => {
    return calculateSubtotal() * 0.1;
  };

  const calculateTaxableAmount = () => {
    return calculateSubtotal() - calculateDiscount();
  };

  const calculateCGST = () => {
    return calculateTaxableAmount() * 0.06;
  };

  const calculateSGST = () => {
    return calculateTaxableAmount() * 0.06;
  };

  const calculateGrandTotal = () => {
    return calculateTaxableAmount() + calculateCGST() + calculateSGST();
  };

  const numberToWords = (num) => {
    const grandTotal = Math.floor(calculateGrandTotal());
    return `Rupees ${grandTotal.toLocaleString()} Only`;
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
      <button className="print-btn no-print" onClick={handlePrint}>
        Print
      </button>

      <div class="header">
        <div class="company-info">
          <div class="company-name">MAHAKALI ETHNIC COLLECTION</div>
          <div class="company-details">
            Shop No. 24, sadhua via - 141203 • sadhuav@gmail.com
            <br />
            GSTIN: 23AAXCF7253H1Z7
          </div>
        </div>
        <div>
          <div class="mec">MEC</div>
          <div class="tax-invoice-box">TAX INVOICE</div>
        </div>
      </div>

      <div class="invoice-info-row">
        <div class="invoice-info-left">
          <div class="info-item">
            <span class="info-label">Invoice No.</span>
            <span class="info-value">: ME/2023-24/256</span>
          </div>
          <div class="info-item">
            <span class="info-label">Dated</span>
            <span class="info-value">: 15-09-2023</span>
          </div>
        </div>
        <div class="invoice-info-right">
          <div class="info-item">
            <span class="info-label">Place of Supply</span>
            <span class="info-value">: Madhya Pradesh (23)</span>
          </div>
          <div class="info-item">
            <span class="info-label">Reverse Charge</span>
            <span class="info-value">: N</span>
          </div>
        </div>
      </div>

      <div class="billing-section">
        <div class="billing-box">
          <div class="billing-title">Billed to</div>
          <div class="billing-content">
            <div class="company-name-billing">Fashion Republik</div>
            12, New Market Road, Indore, Madhya
            <br />
            Pradesh - 452001
            <br />
            <br />
            GSTIN / UIN : 23AAXCF7253H1Z7
          </div>
        </div>
        <div class="billing-box">
          <div class="billing-title">Shipped to</div>
          <div class="billing-content">
            <div class="company-name-billing">Fashion Republik</div>
            12, New Market Road, Indore, Madhya
            <br />
            Pradesh - 452001
            <br />
            <br />
            GSTIN / UIN : 23AAXCF7253H1Z7
          </div>
        </div>
      </div>

      <div className="items-section">
        <table className="items-table">
          <thead>
            <tr>
              <th style={{ width: "8%" }}>S.N.</th>
              <th className="desc-col" style={{ width: "35%" }}>
                DESCRIPTION OF GOODS
              </th>
              <th className="size-col" style={{ width: "12%" }}>
                SIZE
              </th>
              <th className="hsn-col" style={{ width: "8%" }}>
                HSN/SAC
              </th>
              <th className="qty-col" style={{ width: "8%" }}>
                QTY
              </th>
              <th className="unit-col" style={{ width: "8%" }}>
                UNIT
              </th>
              <th className="price-col" style={{ width: "12%" }}>
                PRICE
              </th>
              <th className="amount-col" style={{ width: "13%" }}>
                AMOUNT(₹)
              </th>
              {isEditable && <th style={{ width: "8%" }}>Action</th>}
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={index}>
                <td>{item.sn}</td>
                <td className="desc-col">
                  {isEditable ? (
                    <input
                      type="text"
                      value={item.description}
                      onChange={(e) =>
                        updateItem(index, "description", e.target.value)
                      }
                      style={{
                        width: "100%",
                        border: "1px solid #ddd",
                        padding: "4px 6px",
                        fontSize: "11px",
                        borderRadius: "3px",
                        textAlign: "left",
                        background: "white",
                      }}
                    />
                  ) : (
                    item.description
                  )}
                </td>
                <td className="size-col">
                  {isEditable ? (
                    <input
                      type="text"
                      value={item.size}
                      onChange={(e) =>
                        updateItem(index, "size", e.target.value)
                      }
                      style={{
                        width: "100%",
                        border: "1px solid #ddd",
                        padding: "4px 6px",
                        fontSize: "11px",
                        borderRadius: "3px",
                        textAlign: "center",
                        background: "white",
                      }}
                    />
                  ) : (
                    item.size
                  )}
                </td>
                <td className="hsn-col">
                  {isEditable ? (
                    <input
                      type="text"
                      value={item.hsn}
                      onChange={(e) => updateItem(index, "hsn", e.target.value)}
                      style={{
                        width: "100%",
                        border: "1px solid #ddd",
                        padding: "4px 6px",
                        fontSize: "11px",
                        borderRadius: "3px",
                        textAlign: "center",
                        background: "white",
                      }}
                    />
                  ) : (
                    item.hsn
                  )}
                </td>
                <td className="qty-col">
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
                      style={{
                        width: "100%",
                        border: "1px solid #ddd",
                        padding: "4px 6px",
                        fontSize: "11px",
                        borderRadius: "3px",
                        textAlign: "center",
                        background: "white",
                      }}
                      min="0"
                      step="0.01"
                    />
                  ) : (
                    item.quantity.toFixed(2)
                  )}
                </td>
                <td className="unit-col">
                  {isEditable ? (
                    <input
                      type="text"
                      value={item.unit}
                      onChange={(e) =>
                        updateItem(index, "unit", e.target.value)
                      }
                      style={{
                        width: "100%",
                        border: "1px solid #ddd",
                        padding: "4px 6px",
                        fontSize: "11px",
                        borderRadius: "3px",
                        textAlign: "center",
                        background: "white",
                      }}
                    />
                  ) : (
                    item.unit
                  )}
                </td>
                <td className="price-col">
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
                      style={{
                        width: "100%",
                        border: "1px solid #ddd",
                        padding: "4px 6px",
                        fontSize: "11px",
                        borderRadius: "3px",
                        textAlign: "right",
                        background: "white",
                      }}
                      min="0"
                      step="0.01"
                    />
                  ) : (
                    item.rate.toFixed(2)
                  )}
                </td>
                <td className="amount-col">{item.amount.toFixed(2)}</td>
                {isEditable && (
                  <td>
                    <button
                      onClick={() => removeRow(index)}
                      disabled={items.length === 1}
                      style={{
                        background: items.length === 1 ? "#6c757d" : "#dc3545",
                        color: "white",
                        border: "none",
                        padding: "4px 8px",
                        borderRadius: "3px",
                        cursor: items.length === 1 ? "not-allowed" : "pointer",
                        fontSize: "10px",
                      }}
                    >
                      ×
                    </button>
                  </td>
                )}
              </tr>
            ))}

            <tr className="total-row">
              <td></td>
              <td className="desc-col">
                <strong>Total</strong>
              </td>
              <td></td>
              <td></td>
              <td className="qty-col">
                <strong>{calculateTotalQty().toFixed(2)}</strong>
              </td>
              <td className="unit-col">
                <strong>PCS</strong>
              </td>
              <td></td>
              <td className="amount-col">
                <strong>{calculateSubtotal().toFixed(2)}</strong>
              </td>
              {isEditable && <td></td>}
            </tr>
          </tbody>
        </table>

        {isEditable && (
          <button
            onClick={addRow}
            style={{
              background: "#2b4c85",
              color: "white",
              border: "none",
              padding: "8px 16px",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "12px",
              marginTop: "10px",
            }}
          >
            + Add Row
          </button>
        )}
      </div>

      <div className="summary-section">
        <div className="summary-left">
          <div className="summary-box">
            <div className="summary-header">Invoice Summary</div>
            <div className="summary-content">
              <div className="summary-row">
                <span>Subtotal:</span>
                <span>₹{calculateSubtotal().toFixed(2)}</span>
              </div>
              <div className="summary-row">
                <span>Discount (10%):</span>
                <span>-₹{calculateDiscount().toFixed(2)}</span>
              </div>
              <hr />
              <div className="summary-row">
                <span>
                  <strong>Taxable Amount:</strong>
                </span>
                <span>
                  <strong>₹{calculateTaxableAmount().toFixed(2)}</strong>
                </span>
              </div>
              <div className="summary-row">
                <span>CGST (6%):</span>
                <span>₹{calculateCGST().toFixed(2)}</span>
              </div>
              <div className="summary-row">
                <span>SGST (6%):</span>
                <span>₹{calculateSGST().toFixed(2)}</span>
              </div>
              <div className="grand-total">
                <strong>
                  Grand Total: ₹{calculateGrandTotal().toFixed(2)}
                </strong>
              </div>
            </div>
          </div>
        </div>
        <div className="summary-right">
          <div className="summary-box">
            <div className="summary-header">Tax Summary</div>
            <div className="summary-content">
              <div className="tax-summary-grid">
                <div className="tax-summary-header-row">
                  <strong>Tax Rate</strong>
                </div>
                <div className="tax-summary-header-row">
                  <strong>Taxable</strong>
                </div>
                <div className="tax-summary-header-row">
                  <strong>CGST</strong>
                </div>
                <div className="tax-summary-header-row">
                  <strong>SGST</strong>
                </div>
                <div className="tax-summary-header-row">
                  <strong>Total Tax</strong>
                </div>
                <div className="tax-summary-data-row">12%</div>
                <div className="tax-summary-data-row">
                  ₹{calculateTaxableAmount().toFixed(2)}
                </div>
                <div className="tax-summary-data-row">
                  ₹{calculateCGST().toFixed(2)}
                </div>
                <div className="tax-summary-data-row">
                  ₹{calculateSGST().toFixed(2)}
                </div>
                <div className="tax-summary-data-row">
                  ₹{(calculateCGST() + calculateSGST()).toFixed(2)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="amount-words">
        <strong>Amount in Words:</strong> {numberToWords(calculateGrandTotal())}
      </div>

      <div className="bottom-section">
        <div className="bank-details">
          <h4>Bank Details</h4>
          <div className="bank-details-content">
            <strong>Bank Name:</strong> HDFC Bank Ltd.
            <br />
            <strong>Account Holder Name:</strong> Meher Exports
            <br />
            <strong>Account No:</strong> 50100123456789
            <br />
            <strong>IFSC Code:</strong> HDFC0001234
            <br />
            <strong>Branch:</strong> Sector 14, Gurgaon
            <br />
            <strong>UPI ID:</strong> meherexports@hdfcbank
          </div>
        </div>
        <div className="qr-section">
          <div className="qr-code">
            <div className="qr-pattern"></div>
          </div>
          <div className="qr-label">Scan to Pay</div>
        </div>
      </div>

      <div className="footer-section">
        <div className="terms">
          <h4>Terms & Conditions</h4>
          <div className="terms-content">
            1. Payment due within 30 days from the date of invoice.
            <br />
            2. Interest @ 24% per annum will be charged on delayed payments.
            <br />
            3. Subject to Gurgaon Jurisdiction only.
            <br />
            4. Goods once sold will not be taken back.
            <br />
            5. Delivery subject to strikes, accidents & other unforeseen
            circumstances.
            <br />
            6. All disputes are subject to Gurgaon jurisdiction only.
          </div>
          <div className="terms-note">
            This is a computer generated invoice and does not require physical
            signature.
          </div>
          <div className="company-signature">For Meher Exports</div>
        </div>
        <div className="signature">
          <h4>Authorized Signatory</h4>
          <div className="signature-area"></div>
          <div className="signature-label">Signature & Stamp</div>
        </div>
      </div>

      <div
        className="no-print"
        style={{
          display: "flex",
          gap: "15px",
          justifyContent: "center",
          padding: "20px",
          background: "#f8f9fa",
          borderTop: "1px solid #e5e7eb",
        }}
      >
        {isEditable ? (
          <button
            onClick={handleSave}
            style={{
              padding: "10px 20px",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              fontWeight: "600",
              fontSize: "14px",
              background: "#10b981",
              color: "white",
            }}
          >
            Save Invoice
          </button>
        ) : (
          <button
            onClick={handleEdit}
            style={{
              padding: "10px 20px",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              fontWeight: "600",
              fontSize: "14px",
              background: "#f59e0b",
              color: "white",
            }}
          >
            Edit Invoice
          </button>
        )}
        <button
          onClick={handlePrint}
          style={{
            padding: "10px 20px",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontWeight: "600",
            fontSize: "14px",
            background: "#2b4c85",
            color: "white",
          }}
        >
          Print Invoice
        </button>
      </div>
    </div>
  );
};

export default App;
