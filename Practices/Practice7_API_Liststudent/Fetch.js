const showBtn = document.getElementById("showBtn");
const tableBody = document.getElementById("tableBody");
const statusMsg = document.getElementById("statusMsg");

const apiUrl = "https://universities.hipolabs.com/search?country=Cambodia";
// Try multiple CORS proxies
const corsProxies = [
    "https://cors-anywhere.herokuapp.com/",
    "https://api.allorigins.win/raw?url=",
    "https://thingproxy.freeboard.io/fetch/"
];

showBtn.addEventListener("click", async () => {
  // 1. Clear existing data and show loading status
  tableBody.innerHTML = "";
  statusMsg.textContent = "Fetching data... please wait.";

  let error = null;

  // Try direct fetch first
  try {
    console.log('Attempting direct fetch...');
    let response = await fetch(apiUrl, {
      headers: {
        'Accept': 'application/json'
      }
    });

    if (response.ok) {
      let data = await response.json();
      if (Array.isArray(data) && data.length > 0) {
        console.log('Direct fetch succeeded!');
        displayData(data);
        return;
      }
    }
  } catch (e) {
    console.log('Direct fetch failed, trying proxies...');
    error = e;
  }

  // Try CORS proxies as fallback
  for (const proxy of corsProxies) {
    try {
      console.log(`Trying proxy: ${proxy}`);
      let fetchUrl;
      if (proxy.includes('?url=')) {
        fetchUrl = proxy + encodeURIComponent(apiUrl);
      } else {
        fetchUrl = proxy + apiUrl;
      }

      let response = await fetch(fetchUrl, {
        headers: {
          'Accept': 'application/json'
        }
      });

      if (!response.ok) {
        console.log(`Proxy ${proxy} returned status ${response.status}`);
        continue;
      }

      let data = await response.json();

      // Handle string responses from proxy
      if (typeof data === 'string') {
        data = JSON.parse(data);
      }

      if (Array.isArray(data) && data.length > 0) {
        console.log(`Proxy ${proxy} succeeded!`);
        displayData(data);
        return;
      }
    } catch (e) {
      console.log(`Proxy ${proxy} failed:`, e.message);
      error = e;
    }
  }

  // All attempts failed
  statusMsg.textContent = "Failed to load data. Please check your connection and try again later.";
  console.error("All fetch attempts failed:", error);
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