const showBtn = document.getElementById("showBtn");
const tableBody = document.getElementById("tableBody");
const statusMsg = document.getElementById("statusMsg");

const apiUrl = "https://universities.hipolabs.com/search?country=Cambodia";

showBtn.addEventListener("click", async () => {
  // 1. Clear existing data and show loading status
  tableBody.innerHTML = "";
  statusMsg.textContent = "Fetching data... please wait.";

  try {
    // 2. Get data from API
    const response = await fetch(apiUrl);
    const data = await response.json();

    // 3. Loop through data and create rows
    data.forEach((uni, index) => {
      const row = document.createElement("tr");

      row.innerHTML = `
                <td>${index + 1}</td>
                <td><strong>${uni.name}</strong></td>
                <td><a href="${uni.web_pages[0]}" target="_blank" style="color: #4e73df; text-decoration: none;">Visit</a></td>
                <td>${uni.country}</td>
                <td><button class="btn btn-on" onclick="toggleStatus(this)">Active</button></td>
                <td><button class="btn btn-delete" onclick="this.closest('tr').remove()">Delete</button></td>
                <td><button class="btn btn-edit" onclick="alert('Editing: ' + '${uni.name}')">Edit</button></td>
            `;
      tableBody.appendChild(row);
    });

    statusMsg.textContent = ""; // Hide loading message
  } catch (error) {
    statusMsg.textContent = "Failed to load data. Check your connection.";
    console.error(error);
  }
});

function toggleStatus(btn) {
  if (btn.textContent === "Active") {
    btn.textContent = "Inactive";
    btn.style.backgroundColor = "#d32f2f"; // Red for Inactive
  } else {
    btn.textContent = "Active";
    btn.style.backgroundColor = "#2d7a32"; // Green for Active
  }
}