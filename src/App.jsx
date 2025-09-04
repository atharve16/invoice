import React, { useState } from "react";
import "./App.css";

const App = () => {
  const [isEditable, setIsEditable] = useState(false);
  const [invoiceData, setInvoiceData] = useState({
    invoiceNo: "ME/2023-24/256",
    date: "15-09-2023",
    placeOfSupply: "Madhya Pradesh (23)",
    reverseCharge: "N"
  });

  const [billingDetails, setBillingDetails] = useState({
    billedTo: {
      name: "Fashion Paradise",
      address: "32, New Market, Bhopal, MP - 462001",
      gstin: "23AABCF7621R1Z7"
    },
    shippedTo: {
      name: "Fashion Paradise", 
      address: "32, New Market, Bhopal, MP - 462001",
      gstin: "23AABCF7621R1Z7"
    }
  });

  const [items, setItems] = useState([
    {
      sn: 1,
      description: "Chikankari Embroidered Salwar Suit (Pink)",
      size: "S, M, L, XL",
      hsn: "6204",
      quantity: 24.0,
      unit: "PCS",
      rate: 1899.0,
      amount: 45576.0,
    },
    {
      sn: 2,
      description: "Anarkali Style Cotton Suit (Blue)",
      size: "M, L, XL",
      hsn: "6204",
      quantity: 12.0,
      unit: "PCS",
      rate: 1499.0,
      amount: 17988.0,
    },
    {
      sn: 3,
      description: "Designer Palazzo Suit (Mint Green)",
      size: "S, M, L",
      hsn: "6204",
      quantity: 18.0,
      unit: "PCS",
      rate: 2199.0,
      amount: 39582.0,
    },
    {
      sn: 4,
      description: "Heavy Work Patiala Suit (Maroon)",
      size: "M, L, XL",
      hsn: "6204",
      quantity: 6.0,
      unit: "PCS",
      rate: 2399.0,
      amount: 14394.0,
    },
    {
      sn: 5,
      description: "Printed Cotton Daily Wear Suit (Yellow)",
      size: "XS, S, M, L, XL",
      hsn: "6204",
      quantity: 30.0,
      unit: "PCS",
      rate: 999.0,
      amount: 29970.0,
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

  const calculateRoundOff = () => {
    const total = calculateTaxableAmount() + calculateCGST() + calculateSGST();
    const rounded = Math.round(total);
    return total - rounded;
  };

  const calculateGrandTotal = () => {
    const total = calculateTaxableAmount() + calculateCGST() + calculateSGST();
    return Math.round(total);
  };

  const numberToWords = (num) => {
    const ones = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
    const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
    const thousands = ['', 'Thousand', 'Lakh', 'Crore'];

    if (num === 0) return 'Zero';

    const convertGroup = (n) => {
      let result = '';
      if (n > 99) {
        result += ones[Math.floor(n / 100)] + ' Hundred ';
        n %= 100;
      }
      if (n > 19) {
        result += tens[Math.floor(n / 10)] + ' ';
        n %= 10;
      }
      if (n > 0) {
        result += ones[n] + ' ';
      }
      return result;
    };

    let result = '';
    let groupIndex = 0;
    
    while (num > 0) {
      const group = num % (groupIndex === 0 ? 1000 : 100);
      if (group !== 0) {
        result = convertGroup(group) + thousands[groupIndex] + ' ' + result;
      }
      num = Math.floor(num / (groupIndex === 0 ? 1000 : 100));
      groupIndex++;
    }

    return result.trim() + ' Only';
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

  const updateInvoiceData = (field, value) => {
    if (!isEditable) return;
    setInvoiceData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const updateBillingData = (type, field, value) => {
    if (!isEditable) return;
    setBillingDetails(prev => ({
      ...prev,
      [type]: {
        ...prev[type],
        [field]: value
      }
    }));
  };

  return (
    <div className="invoice-container">
      <button className="print-btn" onClick={handlePrint}>
        🖨️ Print
      </button>

      <div className="header">
        <div className="company-info">
          <div className="company-name">MAHAKALI ETHNIC COLLECTION</div>
          <div className="company-details">
            Shop No. 25, sadhua via, Indore, MP - 452001 • 758XXXX006 •
            mahakaliethnic@gmail.com<br />
            <span style={{ color: "#4b4d54", fontWeight: 600, fontSize: "12px" }}>
              GSTIN: 23AAXCF7253H1Z7
            </span>
          </div>
        </div>
        <div>
          <div className="mec">
            <span className="big">M</span><span className="small">EC</span>
          </div>
          <div className="tax-invoice-box">TAX INVOICE</div>
        </div>
      </div>

      <div className="invoice-info-row">
        <div className="invoice-info-left">
          <div className="info-item">
            <span className="info-label">Invoice No.</span>
            <span className="info-value">
              : {isEditable ? (
                <input
                  type="text"
                  value={invoiceData.invoiceNo}
                  onChange={(e) => updateInvoiceData('invoiceNo', e.target.value)}
                  style={{ border: '1px solid #ddd', padding: '2px 4px' }}
                />
              ) : (
                invoiceData.invoiceNo
              )}
            </span>
          </div>
          <div className="info-item">
            <span className="info-label">Dated</span>
            <span className="info-value">
              : {isEditable ? (
                <input
                  type="date"
                  value={invoiceData.date}
                  onChange={(e) => updateInvoiceData('date', e.target.value)}
                  style={{ border: '1px solid #ddd', padding: '2px 4px' }}
                />
              ) : (
                invoiceData.date
              )}
            </span>
          </div>
        </div>
        <div className="invoice-info-right">
          <div className="info-item">
            <span className="info-label">Place of Supply</span>
            <span className="info-value">: {invoiceData.placeOfSupply}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Reverse Charge</span>
            <span className="info-value">: {invoiceData.reverseCharge}</span>
          </div>
        </div>
      </div>

      <div className="billing-strip">
        <span className="vbar vbar-left" aria-hidden="true"></span>

        <div className="party">
          <div className="party-title">Billed to:</div>
          <div className="party-name">
            {isEditable ? (
              <input
                type="text"
                value={billingDetails.billedTo.name}
                onChange={(e) => updateBillingData('billedTo', 'name', e.target.value)}
                style={{ border: '1px solid #ddd', padding: '2px 4px', width: '100%' }}
              />
            ) : (
              billingDetails.billedTo.name
            )}
          </div>
          <div className="party-addr">
            {isEditable ? (
              <input
                type="text"
                value={billingDetails.billedTo.address}
                onChange={(e) => updateBillingData('billedTo', 'address', e.target.value)}
                style={{ border: '1px solid #ddd', padding: '2px 4px', width: '100%' }}
              />
            ) : (
              billingDetails.billedTo.address
            )}
          </div>
          <div className="party-gst">
            <span>GSTIN / UIN :</span> {billingDetails.billedTo.gstin}
          </div>
        </div>

        <span className="vbar vbar-mid" aria-hidden="true"></span>

        <div className="party">
          <div className="party-title">Shipped to:</div>
          <div className="party-name">
            {isEditable ? (
              <input
                type="text"
                value={billingDetails.shippedTo.name}
                onChange={(e) => updateBillingData('shippedTo', 'name', e.target.value)}
                style={{ border: '1px solid #ddd', padding: '2px 4px', width: '100%' }}
              />
            ) : (
              billingDetails.shippedTo.name
            )}
          </div>
          <div className="party-addr">
            {isEditable ? (
              <input
                type="text"
                value={billingDetails.shippedTo.address}
                onChange={(e) => updateBillingData('shippedTo', 'address', e.target.value)}
                style={{ border: '1px solid #ddd', padding: '2px 4px', width: '100%' }}
              />
            ) : (
              billingDetails.shippedTo.address
            )}
          </div>
          <div className="party-gst">
            <span>GSTIN / UIN :</span> {billingDetails.shippedTo.gstin}
          </div>
        </div>
      </div>

      <div className="items-section">
        <table className="items-table">
          <thead>
            <tr>
              <th style={{ width: "4%" }}>S.N.</th>
              <th>DESCRIPTION OF GOODS</th>
              <th>SIZE</th>
              <th>HSN/SAC</th>
              <th>QTY.</th>
              <th>UNIT</th>
              <th>PRICE</th>
              <th>AMOUNT(₹)</th>
              {isEditable && <th>Action</th>}
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={index}>
                <td>{item.sn}</td>
                <td>
                  {isEditable ? (
                    <input
                      type="text"
                      value={item.description}
                      onChange={(e) => updateItem(index, "description", e.target.value)}
                      style={{ width: "100%", border: "1px solid #ddd", padding: "4px" }}
                    />
                  ) : (
                    item.description
                  )}
                </td>
                <td>
                  {isEditable ? (
                    <input
                      type="text"
                      value={item.size}
                      onChange={(e) => updateItem(index, "size", e.target.value)}
                      style={{ width: "100%", border: "1px solid #ddd", padding: "4px" }}
                    />
                  ) : (
                    item.size
                  )}
                </td>
                <td>
                  {isEditable ? (
                    <input
                      type="text"
                      value={item.hsn}
                      onChange={(e) => updateItem(index, "hsn", e.target.value)}
                      style={{ width: "100%", border: "1px solid #ddd", padding: "4px" }}
                    />
                  ) : (
                    item.hsn
                  )}
                </td>
                <td>
                  {isEditable ? (
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) => updateItem(index, "quantity", parseFloat(e.target.value) || 0)}
                      style={{ width: "100%", border: "1px solid #ddd", padding: "4px" }}
                      min="0"
                      step="0.01"
                    />
                  ) : (
                    item.quantity.toFixed(2)
                  )}
                </td>
                <td>
                  {isEditable ? (
                    <input
                      type="text"
                      value={item.unit}
                      onChange={(e) => updateItem(index, "unit", e.target.value)}
                      style={{ width: "100%", border: "1px solid #ddd", padding: "4px" }}
                    />
                  ) : (
                    item.unit
                  )}
                </td>
                <td>
                  {isEditable ? (
                    <input
                      type="number"
                      value={item.rate}
                      onChange={(e) => updateItem(index, "rate", parseFloat(e.target.value) || 0)}
                      style={{ width: "100%", border: "1px solid #ddd", padding: "4px" }}
                      min="0"
                      step="0.01"
                    />
                  ) : (
                    item.rate.toFixed(2)
                  )}
                </td>
                <td>{item.amount.toFixed(2)}</td>
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
                      }}
                    >
                      ×
                    </button>
                  </td>
                )}
              </tr>
            ))}
            <tr className="total-row">
              <td colSpan="4" style={{ textAlign: "right" }}>Total</td>
              <td>{calculateTotalQty().toFixed(2)}</td>
              <td>PCS</td>
              <td></td>
              <td>{calculateSubtotal().toFixed(2)}</td>
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
            <div style={{ padding: "20px 10px" }}>
              <div className="summary-row">
                <span className="label">Less</span>
                <span className="desc">:Discount</span>
                <span className="at">@</span>
                <span className="percent">10 %</span>
                <span className="amount">{calculateDiscount().toFixed(2)}</span>
              </div>
              <div className="summary-row">
                <span className="label">Add</span>
                <span className="desc">:SGST</span>
                <span className="at">@</span>
                <span className="percent">6.000 %</span>
                <span className="amount">{calculateSGST().toFixed(2)}</span>
              </div>
              <div className="summary-row">
                <span className="label">Add</span>
                <span className="desc">:CGST</span>
                <span className="at">@</span>
                <span className="percent">6.000 %</span>
                <span className="amount">{calculateCGST().toFixed(2)}</span>
              </div>
              <div className="summary-row">
                <span className="label">Less</span>
                <span className="desc">:Rounded Off (-)</span>
                <span className="at"></span>
                <span className="percent"></span>
                <span className="amount">{Math.abs(calculateRoundOff()).toFixed(2)}</span>
              </div>
              <hr />
              <div className="grand-total">
                <span>Grand Total</span>
                <span>₹ {calculateGrandTotal().toFixed(2)}</span>
              </div>
            </div>
          </div>
          <div className="amount-words">
            Rupees {numberToWords(calculateGrandTotal())}
          </div>
        </div>

        <div className="summary-right">
          <div className="summary-box">
            <div className="summary-header">Tax Summary</div>
            <div className="summary-content">
              <div className="tax-summary-grid tax-summary-header-row" style={{ color: "#2b4c85" }}>
                <span>Tax Rate</span>
                <span>Taxable</span>
                <span>CGST</span>
                <span>SGST</span>
                <span>Total Tax</span>
              </div>
              <div className="tax-summary-grid tax-summary-data-row">
                <span>12%</span>
                <span>{calculateTaxableAmount().toFixed(2)}</span>
                <span>{calculateCGST().toFixed(2)}</span>
                <span>{calculateSGST().toFixed(2)}</span>
                <span>{(calculateCGST() + calculateSGST()).toFixed(2)}</span>
              </div>
            </div>
          </div>
          <div className="bottom-section">
            <div className="bank-details">
              <h4>Bank Details</h4>
              <div className="bank-details-content">
                <div><strong>Name:</strong> MAHAKALI ETHNIC COLLECTION</div>
                <div><strong>A/C:</strong> 1234567890123456</div>
                <div><strong>IFSC:</strong> SBIN0012345</div>
                <div><strong>Bank:</strong> State Bank of India</div>
                <div><strong>Branch:</strong> M.G. Road, Indore</div>
              </div>
            </div>

            <div className="qr-section">
              <img src="qr.png" alt="QR Code" className="qr-code" />
              <div className="qr-label">Scan to pay via UPI</div>
              <div className="upi-id">mahakali.ethnic@upi</div>
            </div>
          </div>
        </div>
      </div>

      <hr />
      <div className="footer-section">
        <div className="terms">
          <h4>Terms & Conditions:</h4>
          <ol className="terms-content">
            <li>E & O.E.</li>
            <li>Goods once sold will not be taken back.</li>
            <li>Interest @ 18% p.a. will be charged if the payment is not made within the stipulated time.</li>
            <li>All disputes are subject to 'Indore, Madhya Pradesh' Jurisdiction only.</li>
            <li>Returns accepted only within 7 days of delivery with original packaging.</li>
          </ol>
        </div>

        <div className="signature">
          <h4>Receiver's Signature:</h4>
          <div className="signature-area"></div>
          <div className="terms-note">
            I/We hereby confirm that I/we have received the goods as per the invoice.
          </div>
          <div className="company-signature">For MAHAKALI ETHNIC COLLECTION</div>
          <div className="signature-label">Authorised Signatory</div>
        </div>
      </div>

      {!isEditable ? (
        <div className="no-print" style={{ textAlign: "center", padding: "20px" }}>
          <button
            onClick={handleEdit}
            style={{
              background: "#f59e0b",
              color: "white",
              border: "none",
              padding: "10px 20px",
              borderRadius: "6px",
              cursor: "pointer",
              marginRight: "10px"
            }}
          >
            Edit Invoice
          </button>
          <button
            onClick={handlePrint}
            style={{
              background: "#2b4c85",
              color: "white",
              border: "none",
              padding: "10px 20px",
              borderRadius: "6px",
              cursor: "pointer"
            }}
          >
            Print Invoice
          </button>
        </div>
      ) : (
        <div className="no-print" style={{ textAlign: "center", padding: "20px" }}>
          <button
            onClick={handleSave}
            style={{
              background: "#10b981",
              color: "white",
              border: "none",
              padding: "10px 20px",
              borderRadius: "6px",
              cursor: "pointer"
            }}
          >
            Save Changes
          </button>
        </div>
      )}
    </div>
  );
};

export default App;
