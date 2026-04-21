const API_URL = "https://api.tvmaze.com/shows/30/episodes";
const FETCH_TIMEOUT = 10000;
const MOVIES_PER_PAGE = 10;

let allMoviesData = [];
let filteredMoviesData = [];
let currentPage = 1;
let showAllMovies = false;
let isSearchActive = false;

function showSpinner() {
  const loader = document.getElementById("loader-container");
  if (loader) loader.classList.add("show");
}

function hideSpinner() {
  const loader = document.getElementById("loader-container");
  if (loader) loader.classList.remove("show");
}

function escapeHtml(text) {
  if (text === null || text === undefined) return "";
  const div = document.createElement("div");
  div.textContent = String(text);
  return div.innerHTML;
}

function getCurrentData() {
  return isSearchActive ? filteredMoviesData : allMoviesData;
}

function loadTableData(data) {
  if (!Array.isArray(data)) {
    console.error("Invalid data format");
    return;
  }

  allMoviesData = data;
  filteredMoviesData = data;
  currentPage = 1;
  isSearchActive = false;

  displayMovies();
}

function displayMovies() {
  const tableBody = document.getElementById("tableBody");
  const dataToDisplay = getCurrentData();

  if (!tableBody) return;

  tableBody.innerHTML = "";

  let moviesToDisplay = [];

  if (showAllMovies) {
    moviesToDisplay = dataToDisplay;
  } else {
    const startIndex = (currentPage - 1) * MOVIES_PER_PAGE;
    const endIndex = startIndex + MOVIES_PER_PAGE;
    moviesToDisplay = dataToDisplay.slice(startIndex, endIndex);
  }

  if (moviesToDisplay.length === 0) {
    tableBody.innerHTML = `
      <tr>
        <td colspan="7" class="text-center text-warning">No movies found.</td>
      </tr>
    `;
    updatePagination();
    return;
  }

  moviesToDisplay.forEach((item, index) => {
    const actualIndex = showAllMovies
      ? index + 1
      : (currentPage - 1) * MOVIES_PER_PAGE + index + 1;

    const name = item.name || "N/A";

    // TVMaze episodes do not really have "type", so build one
    const type = `Season ${item.season ?? "?"} / Episode ${item.number ?? "?"}`;

    const imageUrl =
      item.image?.medium || "https://via.placeholder.com/120x160?text=No+Image";

    const airDate = item.airdate || "N/A";
    const runtime = item.runtime ? `${item.runtime} min` : "N/A";
    const rating =
      item.rating && item.rating.average !== null
        ? item.rating.average
        : "N/A";

    const row = `
      <tr>
        <td class="text-center">${actualIndex}</td>
        <td>${escapeHtml(name)}</td>
        <td class="text-center">${escapeHtml(type)}</td>
        <td class="text-center">
          <img src="${imageUrl}" alt="${escapeHtml(name)}">
        </td>
        <td class="text-center">${escapeHtml(airDate)}</td>
        <td class="text-center">${escapeHtml(runtime)}</td>
        <td class="text-center">${escapeHtml(rating)}</td>
      </tr>
    `;

    tableBody.innerHTML += row;
  });

  updatePagination();
}

function updatePagination() {
  const paginationNav = document.getElementById("paginationNav");
  const pageIndicator = document.getElementById("pageIndicator");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");

  const data = getCurrentData();

  if (!paginationNav || !pageIndicator || !prevBtn || !nextBtn) return;

  if (showAllMovies || data.length === 0) {
    paginationNav.style.display = "none";
    return;
  }

  paginationNav.style.display = "block";

  const totalPages = Math.ceil(data.length / MOVIES_PER_PAGE) || 1;

  pageIndicator.textContent = `Page ${currentPage} of ${totalPages}`;
  prevBtn.disabled = currentPage === 1;
  nextBtn.disabled = currentPage === totalPages;
}

function nextPage() {
  if (showAllMovies) return;

  const totalPages = Math.ceil(getCurrentData().length / MOVIES_PER_PAGE);

  if (currentPage < totalPages) {
    currentPage++;
    displayMovies();
  }
}

function previousPage() {
  if (showAllMovies) return;

  if (currentPage > 1) {
    currentPage--;
    displayMovies();
  }
}

async function loadTable() {
  const tableBody = document.getElementById("tableBody");

  showSpinner();

  if (tableBody) {
    tableBody.innerHTML = `
      <tr>
        <td colspan="7" class="text-center text-info">
          <strong>Fetching movies... Please wait.</strong>
        </td>
      </tr>
    `;
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), FETCH_TIMEOUT);

    const response = await fetch(API_URL, { signal: controller.signal });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();

    if (!Array.isArray(data) || data.length === 0) {
      throw new Error("No data received from API");
    }

    loadTableData(data);
  } catch (error) {
    console.error("Fetch error:", error);

    let message = error.message;
    if (error.name === "AbortError") {
      message = "Request timed out. Please try again.";
    }

    if (tableBody) {
      tableBody.innerHTML = `
        <tr>
          <td colspan="7" class="text-center text-danger">
            <strong>Error:</strong> ${escapeHtml(message)}
          </td>
        </tr>
      `;
    }
  } finally {
    hideSpinner();
  }
}

function searchMovies() {
  const searchInput = document.getElementById("searchInput");
  if (!searchInput) return;

  const searchTerm = searchInput.value.trim().toLowerCase();

  if (searchTerm === "") {
    isSearchActive = false;
    filteredMoviesData = allMoviesData;
  } else {
    isSearchActive = true;
    filteredMoviesData = allMoviesData.filter((movie) =>
      movie.name?.toLowerCase().includes(searchTerm)
    );
  }

  currentPage = 1;
  showAllMovies = false;
  displayMovies();
}

function clearSearch() {
  const searchInput = document.getElementById("searchInput");
  if (searchInput) searchInput.value = "";

  isSearchActive = false;
  filteredMoviesData = allMoviesData;
  currentPage = 1;
  showAllMovies = false;
  displayMovies();
}

document.addEventListener("DOMContentLoaded", () => {
  const showButton = document.getElementById("BtShow");
  const showAllButton = document.getElementById("BtShowAll");
  const searchBtn = document.getElementById("searchBtn");
  const clearSearchBtn = document.getElementById("clearSearchBtn");
  const searchInput = document.getElementById("searchInput");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");

  hideSpinner();

  if (showButton) {
    showButton.addEventListener("click", () => {
      showAllMovies = false;
      currentPage = 1;
      loadTable();
    });
  }

  if (showAllButton) {
    showAllButton.addEventListener("click", async () => {
      if (allMoviesData.length === 0) {
        await loadTable();
      }
      showAllMovies = true;
      displayMovies();
    });
  }

  if (searchBtn) {
    searchBtn.addEventListener("click", searchMovies);
  }

  if (clearSearchBtn) {
    clearSearchBtn.addEventListener("click", clearSearch);
  }

  if (searchInput) {
    searchInput.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        searchMovies();
      }
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener("click", previousPage);
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", nextPage);
  }

  // auto load when page opens
  loadTable();
});