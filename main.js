function materialPropertiesIsEmpty() {
    // Get all the variables
    const properties = new Array(9).fill(null);
    properties[0] = document.getElementById("mat-name").value;
    properties[1] = document.getElementById("mat-importance").value;
    properties[2] = document.getElementById("mat-needed-by").value;
    properties[3] = document.getElementById("mat-reason").value;
    properties[4] = document.getElementById("mat-link").value;
    properties[5] = document.getElementById("mat-unit-price").value;
    properties[6] = document.getElementById("mat-quantity").value;
    properties[7] = document.getElementById("mat-date-bought").value;
    properties[8] = document.getElementById("mat-funded-by").value;
    for (let i=0; i<properties.length; i++) {
        if (properties[i] === "") {return true;}
    }
    return false;
}

// Success = return 1; Value is Empty = 0; Error = -1;
function submitQuery() {
    document.getElementById("required-message").style.visibility = "visible";
    if (materialPropertiesIsEmpty()) {
        return 0;
    }
    document.getElementById("required-message").style.color = "green";
    document.getElementById("required-message").textContent = "Query Submitted Successfully!";
    console.log("Submitted!")
    return 1;
}

function updateTotalCost() {
    // Get Price-per-Unit and Quantity of the material
    var unitp = document.getElementById("mat-unit-price").value;
    var quantity = document.getElementById("mat-quantity").value;
    // Update the span to display ppu/quant. multiplied
    document.getElementById("mat-total-cost").textContent = "$" + (unitp*quantity).toFixed(2);
}