const showBtn = document.getElementById("showBtn");
const tableBody = document.getElementById("tableBody");
const statusMsg = document.getElementById("statusMsg");

const apiUrl = "https://universities.hipolabs.com/search?country=Cambodia";
const corsProxyUrl = "https://api.allorigins.win/raw?url=";

showBtn.addEventListener("click", async () => {
  tableBody.innerHTML = "";
  statusMsg.textContent = "Fetching data... please wait.";

  try {
    console.log('Fetching from:', apiUrl);
    
    // Create abort controller with 30 second timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000);
    
    // Try fetching with CORS proxy
    const proxyUrl = corsProxyUrl + encodeURIComponent(apiUrl);
    let response = await fetch(proxyUrl, {
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    let data = await response.json();

    console.log('Data received:', data);

    // Check if data is empty
    if (!Array.isArray(data) || data.length === 0) {
      statusMsg.textContent = "No universities found.";
      return;
    }

    displayData(data);
    statusMsg.textContent = "";

  } catch (error) {
    console.error("Fetch Error:", error);
    let msg = error.message;
    if (error.name === 'AbortError') {
      msg = 'Request timed out - API is too slow. Please try again.';
    }
    statusMsg.textContent = `Error: ${msg}`;
  }
});

function displayData(data) {
  tableBody.innerHTML = "";
  data.forEach((uni, index) => {
    const row = document.createElement("tr");
    const website = uni.web_pages && uni.web_pages[0] ? uni.web_pages[0] : "#";
    const websiteLink = website === "#" ? "N/A" : `<a href="${website}" target="_blank" style="color: #4e73df; text-decoration: none;">Visit</a>`;

    row.innerHTML = `
                <td>${index + 1}</td>
                <td><strong>${uni.name}</strong></td>
                <td>${websiteLink}</td>
                <td>${uni.country}</td>
                <td><button class="btn btn-on" onclick="toggleStatus(this)">Active</button></td>
                <td><button class="btn btn-delete" onclick="this.closest('tr').remove()">Delete</button></td>
                <td><button class="btn btn-edit" onclick="alert('Editing: ' + '${uni.name}')">Edit</button></td>
            `;
    tableBody.appendChild(row);
  });
  statusMsg.textContent = "";
}

function toggleStatus(btn) {
  if (btn.textContent === "Active") {
    btn.textContent = "Inactive";
    btn.style.backgroundColor = "#d32f2f"; // Red for Inactive
  } else {
    btn.textContent = "Active";
    btn.style.backgroundColor = "#2d7a32"; // Green for Active
  }
}