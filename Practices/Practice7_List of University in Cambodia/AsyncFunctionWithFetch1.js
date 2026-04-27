$(document).ready(function () {
  hideSpinner();

  $("#BtShow").click(function () {
    loadTable();
  });
});

function hideSpinner() {
  $("#loader-container").hide();
}

function showSpinner() {
  $("#loader-container").show();
}

async function loadTable() {
  showSpinner();

  const url = "https://universities.hipolabs.com/search?country=Cambodia";

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const resData = await response.json();
    loadTableData(resData);

  } catch (error) {
    console.error("Fetch error:", error.message);
    alert("Cannot load data. Please check internet or API URL.");
  } finally {
    hideSpinner();
  }
}

function loadTableData(jsonData) {
  let i = 0;

  $("#tableBody").empty();

  $.each(jsonData, function (index, arrayItem) {
    i++;

    let website = arrayItem.web_pages && arrayItem.web_pages.length > 0
      ? arrayItem.web_pages[0]
      : "No website";

    let newRow = `
      <tr>
        <td class="text-center">${i}</td>
        <td class="text-left">${arrayItem.name}</td>
        <td class="text-left">
          <a href="${website}" target="_blank">${website}</a>
        </td>
        <td class="text-center">${arrayItem.country}</td>
        <td class="text-center">
          <button class="btn btn-primary btn-sm">On/Off</button>
        </td>
        <td class="text-center">
          <button class="btn btn-danger btn-sm">Delete</button>
        </td>
        <td class="text-center">
          <button class="btn btn-warning btn-sm">Edit</button>
        </td>
      </tr>
    `;

    $("#tableBody").append(newRow);
  });
}