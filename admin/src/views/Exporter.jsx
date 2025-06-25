import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";

export const exportData = (data, format, fileName = "export") => {
  if (!data || data.length === 0) {
    alert("No data to export");
    return;
  }

  const headers = Object.keys(data[0]);
  switch (format) {
    case "pdf": {
      const doc = new jsPDF({ orientation: "landscape" });
      doc.text(fileName, 14, 10);

      const tableRows = data.map((item) =>
        headers.map((header) => item[header])
      );

      autoTable(doc, {
        head: [headers],
        body: tableRows,
        startY: 20,
        headStyles: { fillColor: "#900C3F", fontSize: 7, halign: 'center' },
        styles: { fontSize: 7, cellPadding: 1.5, overflow: 'linebreak' },
        alternateRowStyles: { fillColor: "#f2f2f2" },
      });

      doc.save(`${fileName}.pdf`);
      break;
    }

    case "csv": {
      const csvContent = [
        headers.join(","), // Header row
        ...data.map((item) =>
          headers.map((header) => `"${item[header]}"`).join(",")
        ), // Data rows
      ].join("\n");

      const blob = new Blob([csvContent], { type: "text/csv" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${fileName}.csv`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      break;
    }

    case "excel": {
      const worksheet = XLSX.utils.json_to_sheet(data);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
      XLSX.writeFile(workbook, `${fileName}.xlsx`);
      break;
    }

    default:
      alert("Invalid format");
  }
};
