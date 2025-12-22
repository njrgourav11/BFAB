import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Order } from './types';

export const generateInvoice = (order: Order) => {
    const doc = new jsPDF();

    // -- Header --
    doc.setFontSize(22);
    doc.setFont("helvetica", "bold");
    doc.text("BFAB", 14, 20); // Logo text

    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text("Pet Store & Care", 14, 26);
    doc.text("Bhubaneswar, Odisha", 14, 31);
    doc.text("Email: support@bfab.com", 14, 36);

    // -- Invoice Info --
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text("INVOICE", 140, 20);

    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text(`Invoice #: ${order.id.substring(0, 8).toUpperCase()}`, 140, 28);
    const dateStr = order.createdAt && typeof order.createdAt === 'object' && 'seconds' in order.createdAt
        ? new Date(order.createdAt.seconds * 1000).toLocaleDateString()
        : order.createdAt ? new Date(order.createdAt).toLocaleDateString() : new Date().toLocaleDateString();
    doc.text(`Date: ${dateStr}`, 140, 33);
    doc.text(`Status: ${(order.status || 'PENDING').toUpperCase()}`, 140, 38);

    // -- Divider --
    doc.setLineWidth(0.5);
    doc.line(14, 45, 196, 45);

    // -- Billing/Shipping Info --
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text("Bill To:", 14, 55);

    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text(`${order.billingInfo.firstName} ${order.billingInfo.lastName}`, 14, 61);
    doc.text(`${order.billingInfo.address}`, 14, 66);
    doc.text(`${order.billingInfo.city}, ${order.billingInfo.state} ${order.billingInfo.zipCode}`, 14, 71);
    doc.text(`Phone: ${order.billingInfo.phone || 'N/A'}`, 14, 76);

    // -- Order Items Table --
    const tableColumn = ["Item", "Unit Price", "Quantity", "Total"];
    const tableRows: (string | number)[][] = [];

    order.items.forEach(item => {
        const itemData = [
            item.name,
            `Rs. ${item.price}`,
            item.quantity,
            `Rs. ${parseInt(item.price) * item.quantity}`
        ];
        tableRows.push(itemData);
    });

    autoTable(doc, {
        startY: 85,
        head: [tableColumn],
        body: tableRows,
        theme: 'striped',
        headStyles: { fillColor: [59, 130, 246] }, // Blue-500
        footStyles: { fillColor: [240, 240, 240], textColor: [0, 0, 0], fontStyle: 'bold' },
        showFoot: 'lastPage'
    });

    // -- Totals --
    interface JsPDFWithAutoTable extends jsPDF {
        lastAutoTable: { finalY: number };
    }
    const finalY = (doc as unknown as JsPDFWithAutoTable).lastAutoTable.finalY + 10;
    const totalAmount = order.totalAmount || order.amount; // Use totalAmount if available, else amount

    doc.setFontSize(10);
    doc.text(`Subtotal:`, 140, finalY);
    doc.text(`Rs. ${totalAmount}`, 170, finalY, { align: 'right' });

    doc.text(`Shipping:`, 140, finalY + 5);
    doc.text(`Rs. 0`, 170, finalY + 5, { align: 'right' });

    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text(`Total:`, 140, finalY + 12);
    doc.text(`Rs. ${totalAmount}`, 170, finalY + 12, { align: 'right' });

    // -- Footer --
    doc.setFontSize(10);
    doc.setFont("helvetica", "italic");
    doc.setTextColor(100);
    doc.text("Thank you for choosing BFAB for your furry friends!", 105, 280, { align: 'center' });

    doc.save(`Invoice_${order.id}.pdf`);
};
