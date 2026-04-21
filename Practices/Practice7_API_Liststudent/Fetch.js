const showBtn = document.getElementById("showBtn");
const tableBody = document.getElementById("tableBody");
const statusMsg = document.getElementById("statusMsg");
const loaderOverlay = document.getElementById("loader-overlay");

// FIX: Changed http to https
const apiUrl = "http://universities.hipolabs.com/search?country=Cambodia";

showBtn.addEventListener("click", async () => {
  // 1. Reset table and SHOW the Blur Overlay
  tableBody.innerHTML = "";
  statusMsg.textContent = "Loading universities...";
  loaderOverlay.style.display = "flex";

  try {
    // 2. Fetch data
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();

    // 3. Build the table rows
    data.forEach((uni, index) => {
      const row = document.createElement("tr");

      row.innerHTML = `
                <td>${index + 1}</td>
                <td><strong>${uni.name}</strong></td>
                <td><a href="${uni.web_pages[0]}" target="_blank" style="color: #4e73df; text-decoration: none;">Visit</a></td>
                <td>${uni.country}</td>
                <td><button class="btn btn-on" onclick="toggleStatus(this)">Active</button></td>
                <td><button class="btn btn-delete" onclick="this.closest('tr').remove()">Delete</button></td>
                <td><button class="btn btn-edit" onclick="alert('Editing: ' + '${uni.name.replace(/'/g, "\\'")}')">Edit</button></td>
            `;
      tableBody.appendChild(row);
    });

    statusMsg.textContent = "";
  } catch (error) {
    statusMsg.textContent = "Error: Could not connect to the server.";
    console.error("Fetch error:", error);
  } finally {
    // 4. HIDE the Blur Overlay when finished
    loaderOverlay.style.display = "none";
  }
});

// Toggle Function for Active/Inactive
function toggleStatus(btn) {
  if (btn.textContent === "Active") {
    btn.textContent = "Inactive";
    btn.style.backgroundColor = "#d32f2f"; // Red
  } else {
    btn.textContent = "Active";
    btn.style.backgroundColor = "#2d7a32"; // Green
  }
}