hideSpinner();

let universityData = [];

function hideSpinner() {
    $("#loader-container").hide();
}

function showSpinner() {
    $("#loader-container").show();
}

async function loadTable() {
    showSpinner();

    $("#statusMsg").text("Fetching data...");
    $("#tableBody").html(`
        <tr>
            <td colspan="7" class="text-center empty-msg">Loading data...</td>
        </tr>
    `);

    const url = "https://universities.hipolabs.com/search?country=Cambodia";

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const resData = await response.json();

        if (!Array.isArray(resData) || resData.length === 0) {
            $("#tableBody").html(`
                <tr>
                    <td colspan="7" class="text-center empty-msg">No data found.</td>
                </tr>
            `);
            $("#statusMsg").text("No universities found.");
            hideSpinner();
            return;
        }

        universityData = resData.map((item, index) => {
            return {
                id: index + 1,
                name: item.name || "N/A",
                website:
                    item.web_pages && item.web_pages.length > 0
                        ? item.web_pages[0]
                        : "#",
                country: item.country || "Cambodia",
                isOn: true
            };
        });

        loadTableData(universityData);
        $("#statusMsg").text(
            `Loaded ${universityData.length} universities successfully.`
        );
        hideSpinner();
    } catch (error) {
        console.error(error.message);

        $("#tableBody").html(`
            <tr>
                <td colspan="7" class="text-center empty-msg">
                    Error: Could not connect to the server.
                </td>
            </tr>
        `);

        $("#statusMsg").text("Please check internet connection or try again.");
        setTimeout(hideSpinner, 1000);
    }
}

function loadTableData(jsonData) {
    $("#tableBody").empty();

    $.each(jsonData, function (index, item) {
        let websiteText = item.website === "#" ? "No website" : item.website;

        let newRow = `
            <tr data-index="${index}">
                <td class="text-center">${index + 1}</td>
                <td class="text-left">${escapeHtml(item.name)}</td>
                <td class="text-left">
                    ${
                        item.website === "#"
                            ? "No website"
                            : `<a class="website-link" href="${escapeAttribute(
                                  item.website
                              )}" target="_blank">${escapeHtml(websiteText)}</a>`
                    }
                </td>
                <td class="text-center">${escapeHtml(item.country)}</td>
                <td class="text-center">
                    <button type="button" class="btn-xs-custom btnToggle ${
                        item.isOn ? "btn-on" : "btn-off"
                    }">
                        ${item.isOn ? "ON" : "OFF"}
                    </button>
                </td>
                <td class="text-center">
                    <button type="button" class="btn-xs-custom btn-delete btnDelete">
                        Delete
                    </button>
                </td>
                <td class="text-center">
                    <button type="button" class="btn-xs-custom btn-edit btnEdit">
                        Edit
                    </button>
                </td>
            </tr>
        `;

        $("#tableBody").append(newRow);
    });
}

function escapeHtml(text) {
    return String(text).replace(/[&<>"']/g, function (char) {
        const map = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;"
        };
        return map[char];
    });
}

function escapeAttribute(text) {
    return String(text).replace(/"/g, "&quot;");
}

$(document).ready(function () {
    $("#BtShow").click(function () {
        loadTable();
    });

    $(document).on("click", ".btnDelete", function () {
        const rowIndex = $(this).closest("tr").data("index");

        universityData.splice(rowIndex, 1);

        if (universityData.length === 0) {
            $("#tableBody").html(`
                <tr>
                    <td colspan="7" class="text-center empty-msg">No data left.</td>
                </tr>
            `);
            $("#statusMsg").text("All rows deleted.");
            return;
        }

        loadTableData(universityData);
        $("#statusMsg").text("Row deleted successfully.");
    });

    $(document).on("click", ".btnToggle", function () {
        const rowIndex = $(this).closest("tr").data("index");

        universityData[rowIndex].isOn = !universityData[rowIndex].isOn;
        loadTableData(universityData);
    });

    $(document).on("click", ".btnEdit", function () {
        const rowIndex = $(this).closest("tr").data("index");
        const rowData = universityData[rowIndex];

        const newName = prompt("Edit university name:", rowData.name);
        if (newName === null) return;

        const newWebsite = prompt("Edit website:", rowData.website);
        if (newWebsite === null) return;

        const newCountry = prompt("Edit country:", rowData.country);
        if (newCountry === null) return;

        universityData[rowIndex].name =
            newName.trim() !== "" ? newName.trim() : rowData.name;
        universityData[rowIndex].website =
            newWebsite.trim() !== "" ? newWebsite.trim() : rowData.website;
        universityData[rowIndex].country =
            newCountry.trim() !== "" ? newCountry.trim() : rowData.country;

        loadTableData(universityData);
        $("#statusMsg").text("Row updated successfully.");
    });
});