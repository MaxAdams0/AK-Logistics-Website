var formList = []
const EMAIL_WHITELIST = ["max@maxadams.co"]
const ACCESS_CODE = "K1n3T1cS-4-3vR"
const DATA_FILE_NAME = "../datatable.json"
const fs = require('fs');

// ================================================= LOGIN PAGE =================================================
function getLoginInfo()
{
	const info = new Array(2).fill(null);
	info[0] = document.getElementById("name").value;
	info[1] = document.getElementById("access-code").value;

	return info;
}

function loginFormIsComplete()
{
	var form = getLoginInfo();
	for (let i = 0; i < form.length; i++)
	{
		if (form[i] === "") { return true; }
	}
	return false;
}

function submitLoginQuery()
{
	var loginInfo = getLoginInfo()
	if (loginFormIsComplete() || loginInfo[1] == ACCESS_CODE)
	{
		for (let i = 0; i < EMAIL_WHITELIST.length; i++)
		{
			if (loginInfo[0] == EMAIL_WHITELIST[i])
			{
				window.location.href = "./itemlist.html";
				return 0;
			}
		}
	}

	return -1; // Not all requirements met and/or access code is wrong
}


// ================================================= NEWITEM PAGE =================================================
function getMaterialInfo()
{
	const properties = new Array(9).fill(null);
	properties[0] = document.getElementById("name").value;
	properties[1] = document.getElementById("importance").value;
	properties[2] = document.getElementById("needed-by").value;
	properties[3] = document.getElementById("reason").value;
	properties[4] = document.getElementById("link").value;
	properties[5] = document.getElementById("unit-price").value;
	properties[6] = document.getElementById("quantity").value;
	properties[7] = document.getElementById("date-bought").value;
	properties[8] = document.getElementById("funded-by").value;

	return properties;
}

function matFormIsComplete()
{
	var material = getMaterialInfo();
	for (let i = 0; i < material.length; i++)
	{
		if (i!=4 && i!=7) // not required items
		{ 
			if (material[i] === "") { return false; }
		}
	}

	return true;
}

// Success = return 1; Value is Empty = 0; Error = -1;
function submitMaterialQuery()
{
	document.getElementById("required-message").style.visibility = "visible";
	if (matFormIsComplete())
	{
		document.getElementById("required-message").style.color = "green";
		document.getElementById("required-message").textContent = "Query Submitted Successfully!";
		formList.push(getMaterialInfo());
		window.location.href = "./itemlist.html";
		return 0;
	}
	
	return 1;
}

function updateTotalCost()
{
	// Get Price-per-Unit and Quantity of the material
	var unitp = document.getElementById("unit-price").value;
	var quantity = document.getElementById("quantity").value;
	// Update the span to display ppu/quant. multiplied
	document.getElementById("total-cost").textContent = "$" + (unitp * quantity).toFixed(2);
}


// ================================================= ITEMLIST PAGE =================================================
function generateTable()
{
	const data = readDataJson();
	const table = document.getElementById("materials-table");

	data.forEach((row) => {
		const newRow = table.insertRow(-1); // Append row to the end of the table

		row.forEach((cellData) => {
			const cell = newRow.insertCell();
			cell.textContent = cellData;
		});
	});

	const jsonData = JSON.stringify(data);
	writeDataJson(jsonData);
}

function writeDataJson(data)
{
	fs.writeFile(DATA_FILE_NAME, data => {});
}

function readDataJson()
{
	fs.readFile(DATA_FILE_NAME, 'utf8', (data) => {
		return JSON.parse(data);
	});
}