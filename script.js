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
