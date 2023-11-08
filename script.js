document.addEventListener("DOMContentLoaded", function () {
    const addRowButton = document.getElementById("addRow");
    const table = document.querySelector("table");
    const totalAmount = document.getElementById("totalAmount");

    addRowButton.addEventListener("click", () => {
        const newRow = table.insertRow(table.rows.length - 1);
        const contentCell = newRow.insertCell(0);
        contentCell.innerHTML = '<input type="text" class="content">';
        const priceCell = newRow.insertCell(1);
        priceCell.innerHTML = '<input type="number" class="price" min="0" step="0.01">';
        const qtyCell = newRow.insertCell(2);
        qtyCell.innerHTML = '<input type="number" class="qty" min="0" step="0.001">';
        const totalCell = newRow.insertCell(3);
        totalCell.innerHTML = '<span class="total">0</span>';
    });

    table.addEventListener("input", function (e) {
        if (e.target.className === "price" || e.target.className === "qty") {
            const row = e.target.parentElement.parentElement;
            const price = parseFloat(row.querySelector(".price").value) || 0;
            const qty = parseFloat(row.querySelector(".qty").value) || 0;
            const total = (price * qty).toFixed(2);
            row.querySelector(".total").textContent = total;
            updateTotal();
        }
    });

    function updateTotal() {
        const totalCells = document.querySelectorAll(".total");
        let sum = 0;
        totalCells.forEach((cell) => {
            sum += parseFloat(cell.textContent);
        });
        totalAmount.textContent = sum.toFixed(2);
    }
});

// Add an event listener for the "Print" button
const printButton = document.getElementById("printButton");
printButton.addEventListener("click", () => {
    // Create a printable format
    const printContent = createPrintableContent();
    
    // Open a new window for printing
    const printWindow = window.open("", "", "width=600,height=600");
    
    // Write the printable content to the new window
    printWindow.document.open();
    printWindow.document.write('<html><head><title>Print</title></head><body>');
    printWindow.document.write(printContent);
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    
    // Wait for the content to load before printing
    printWindow.addEventListener("load", () => {
        printWindow.print();
        printWindow.close();
    });
});

function createPrintableContent() {
    // Extract data from the table and format it for printing
    const rows = document.querySelectorAll("table tr");
    let printableContent = '<table>';
    rows.forEach((row) => {
        const cells = row.querySelectorAll("td");
        printableContent += '<tr>';
        cells.forEach((cell) => {
            printableContent += `<td>${cell.innerHTML}</td>`;
        });
        printableContent += '</tr>';
    });
    printableContent += '</table>';
    
    return printableContent;
}

// ... (rest of the JavaScript code) ...
