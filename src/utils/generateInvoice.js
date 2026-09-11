import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export const generateInvoice = (order, settings) => {
  const doc = new jsPDF();
  
  // Basic Settings
  const pageWidth = doc.internal.pageSize.width;
  
  // Header: Logo / Company Name
  doc.setFontSize(22);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(211, 47, 47); // red #d32f2f
  doc.text(settings.companyName || "COMPANY NAME", pageWidth / 2, 20, { align: "center" });
  
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(100, 100, 100);
  doc.text(settings.address || "Address", pageWidth / 2, 26, { align: "center" });
  doc.text(`Phone: ${settings.phone || 'N/A'} | Email: ${settings.email || 'N/A'}`, pageWidth / 2, 31, { align: "center" });

  // Divider Line
  doc.setDrawColor(200, 200, 200);
  doc.line(14, 36, pageWidth - 14, 36);

  // Invoice Details & Customer Details (Left & Right)
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(0, 0, 0);
  
  // Left side: Customer details
  doc.text("Billed To:", 14, 45);
  doc.setFont("helvetica", "normal");
  doc.text(`Name: ${order.customerName}`, 14, 52);
  doc.text(`Phone: ${order.customerPhone || 'N/A'}`, 14, 58);
  doc.text(`Location: ${order.customerLocation}`, 14, 64);

  // Right side: Invoice details
  doc.setFont("helvetica", "bold");
  doc.text("Invoice Details:", pageWidth - 70, 45);
  doc.setFont("helvetica", "normal");
  doc.text(`Invoice No: #${order.id}`, pageWidth - 70, 52);
  doc.text(`Date: ${new Date(order.date).toLocaleDateString('en-IN')}`, pageWidth - 70, 58);
  doc.text(`Status: ${order.status}`, pageWidth - 70, 64);

  // Table Data Preparation
  const tableColumn = ["S.No", "Product Name", "Packing", "Quantity", "Unit Price", "Total"];
  const tableRows = [];

  order.items.forEach((item, index) => {
    const itemData = [
      index + 1,
      item.name,
      item.packing,
      item.quantity,
      `Rs. ${item.referencePrice}`,
      `Rs. ${item.quantity * item.referencePrice}`
    ];
    tableRows.push(itemData);
  });

  // Generate Table using jspdf-autotable
  autoTable(doc, {
    startY: 75,
    head: [tableColumn],
    body: tableRows,
    theme: 'grid',
    headStyles: { fillColor: [11, 22, 65], textColor: [255, 255, 255], fontStyle: 'bold' },
    styles: { fontSize: 10, cellPadding: 4 },
    columnStyles: {
      0: { cellWidth: 15, halign: 'center' },
      3: { halign: 'center' },
      4: { halign: 'right' },
      5: { halign: 'right' }
    }
  });

  // Calculate Grand Total position
  const finalY = doc.lastAutoTable.finalY || 75;

  // Total Summary Box
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text("Grand Total:", pageWidth - 70, finalY + 10);
  
  doc.setFontSize(14);
  doc.setTextColor(211, 47, 47);
  doc.text(`Rs. ${order.totalValue}`, pageWidth - 14, finalY + 10, { align: "right" });

  // Terms and conditions / Footer
  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(0, 0, 0);
  doc.text("Terms & Conditions:", 14, finalY + 30);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  
  if (settings.terms && Array.isArray(settings.terms)) {
    settings.terms.forEach((term, idx) => {
      if (term.trim()) {
        doc.text(term, 14, finalY + 36 + (idx * 5));
      }
    });
  }

  // Save the PDF
  doc.save(`Invoice_${order.id}.pdf`);
};
