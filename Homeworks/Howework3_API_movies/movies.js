// Movie App - Improved Version

const API_URL = "https://api.tvmaze.com/shows/30/episodes";
const SPINNER_TIMEOUT = 3000; // 3 seconds
const FETCH_TIMEOUT = 10000; // 10 seconds max for API call
const MOVIES_PER_PAGE = 10;

let loadingTimeout;
let allMoviesData = [];
let filteredMoviesData = [];
let currentPage = 1;
let showAllMovies = false;
let isSearchActive = false;

/**
 * Show the loading spinner
 */
function showSpinner() {
    const loader = document.getElementById('loader-container');
    if (loader) {
        loader.style.display = 'block';
    }
}

/**
 * Hide the loading spinner
 */
function hideSpinner() {
    const loader = document.getElementById('loader-container');
    if (loader) {
        loader.style.display = 'none';
    }
}

/**
 * Populate table with movie data
 * @param {Array} jsonData - Array of movie objects
 */
function LoadTableData(jsonData) {
    if (!jsonData || !Array.isArray(jsonData)) {
        console.error('Invalid data format');
        return;
    }

    allMoviesData = jsonData;
    filteredMoviesData = jsonData;
    currentPage = 1;
    isSearchActive = false;
    displayMovies();
}

/**
 * Display movies based on current pagination state
 */
function displayMovies() {
    const tableBody = document.getElementById('tableBody');
    if (!tableBody) {
        console.error('Table body element not found');
        return;
    }

    tableBody.innerHTML = ''; // Clear existing rows

    // Use filtered data if search is active, otherwise use all movies
    const dataToDisplay = isSearchActive ? filteredMoviesData : allMoviesData;
    let moviesToDisplay;
    
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
                <td colspan="7" class="text-center text-warning">
                    No movies found.
                </td>
            </tr>
        `;
        generatePaginationControls();
        return;
    }

    moviesToDisplay.forEach((arrayItem, index) => {
        // Calculate the actual index in full dataset
        const actualIndex = showAllMovies 
            ? index + 1 
            : (currentPage - 1) * MOVIES_PER_PAGE + index + 1;

        // Safely access properties with defaults
        const name = arrayItem.name || 'N/A';
        const type = arrayItem.type || 'N/A';
        const imageUrl = arrayItem.image?.medium || 'https://via.placeholder.com/210x295?text=No+Image';
        const airDate = arrayItem.airdate || 'N/A';
        const runtime = arrayItem.runtime || 'N/A';
        const rating = arrayItem.rating?.average || 'N/A';

        const newRow = `
            <tr>
                <td class="text-center">${actualIndex}</td>
                <td class="text-left">${escapeHtml(name)}</td>
                <td class="text-center">${escapeHtml(type)}</td>
                <td class="text-center">
                    <img src="${imageUrl}" alt="${escapeHtml(name)}" loading="lazy" style="max-width: 150px; height: auto; border-radius: 4px;">
                </td>
                <td class="text-center">${escapeHtml(airDate)}</td>
                <td class="text-center">${runtime} min</td>
                <td class="text-center">${rating}</td>
            </tr>
        `;
        tableBody.innerHTML += newRow;
    });

    // Update pagination controls
    generatePaginationControls();
}

/**
 * Update pagination controls with simplified design
 */
function generatePaginationControls() {
    const paginationNav = document.getElementById('paginationNav');
    const pageIndicator = document.getElementById('pageIndicator');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    // Use filtered data if search is active, otherwise use all movies
    const dataToUse = isSearchActive ? filteredMoviesData : allMoviesData;

    if (showAllMovies || dataToUse.length === 0) {
        // Hide pagination when showing all or no data
        paginationNav.style.display = 'none';
        return;
    }

    // Show pagination nav when displaying paginated results
    paginationNav.style.display = 'block';

    const totalPages = Math.ceil(dataToUse.length / MOVIES_PER_PAGE);

    // Update page indicator
    if (pageIndicator) {
        pageIndicator.textContent = `Page ${currentPage} of ${totalPages}`;
    }

    // Disable/enable Previous button
    if (prevBtn) {
        prevBtn.disabled = currentPage === 1;
    }

    // Disable/enable Next button
    if (nextBtn) {
        nextBtn.disabled = currentPage === totalPages;
    }
}

/**
 * Navigate to next page
 */
function nextPage(event) {
    event.preventDefault();
    if (showAllMovies) return;
    
    const totalPages = Math.ceil(allMoviesData.length / MOVIES_PER_PAGE);
    if (currentPage < totalPages) {
        currentPage++;
        displayMovies();
    }
}

/**
 * Navigate to previous page
 */
function previousPage(event) {
    event.preventDefault();
    if (showAllMovies) return;
    
    if (currentPage > 1) {
        currentPage--;
        displayMovies();
    }
}

/**
 * Go to specific page
 */
function goToPage(pageNumber, event) {
    event.preventDefault();
    if (showAllMovies) return;
    
    currentPage = pageNumber;
    displayMovies();
}

/**
 * Escape HTML to prevent XSS attacks
 * @param {string} text - Text to escape
 * @returns {string} Escaped text
 */
function escapeHtml(text) {
    if (typeof text !== 'string') return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

/**
 * Fetch and load movie data from API
 */
async function loadTable() {
    if (!API_URL) {
        console.error('API URL not configured');
        return;
    }

    // Clear any previous timeout
    if (loadingTimeout) {
        clearTimeout(loadingTimeout);
    }

    showSpinner();
    
    // Show loading message in table
    const tableBody = document.getElementById('tableBody');
    if (tableBody) {
        tableBody.innerHTML = `
            <tr>
                <td colspan="7" class="text-center text-info">
                    <strong>Fetching movies... This may take a moment.</strong>
                </td>
            </tr>
        `;
    }

    try {
        console.log('Fetching from:', API_URL);
        
        // Create abort controller with timeout
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), FETCH_TIMEOUT);
        
        // Fetch with timeout
        const response = await fetch(API_URL, {
            signal: controller.signal
        });
        
        clearTimeout(timeoutId);
        
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        let resData = await response.json();
        
        console.log('Data received:', resData);
        
        // Validate response
        if (!resData || !Array.isArray(resData) || resData.length === 0) {
            throw new Error('No data received from API');
        }

        console.log(`Successfully loaded ${resData.length} episodes`);
        LoadTableData(resData);
        hideSpinner();

    } catch (error) {
        console.error('Fetch Error:', error);
        
        let errorMsg = error.message;
        if (error.name === 'AbortError') {
            errorMsg = 'Request timed out - API is too slow. Please try again.';
        }
        
        // Show user-friendly error message
        const tableBody = document.getElementById('tableBody');
        if (tableBody) {
            tableBody.innerHTML = `
                <tr>
                    <td colspan="7" class="text-center text-danger">
                        <strong>Error:</strong> ${errorMsg}<br>
                        <small>Please check your internet connection or try again later.</small>
                    </td>
                </tr>
            `;
        }

        hideSpinner();
    }
}

/**
 * Search movies by name
 */
function searchMovies() {
    const searchInput = document.getElementById('searchInput');
    if (!searchInput) return;

    const searchTerm = searchInput.value.toLowerCase().trim();

    if (searchTerm === '') {
        // If search is empty, reset
        isSearchActive = false;
        filteredMoviesData = allMoviesData;
    } else {
        // Filter movies by name
        isSearchActive = true;
        filteredMoviesData = allMoviesData.filter(movie => 
            movie.name && movie.name.toLowerCase().includes(searchTerm)
        );
    }

    currentPage = 1;
    showAllMovies = false;
    displayMovies();
}

/**
 * Clear search and reset to all movies
 */
function clearSearch() {
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.value = '';
    }
    
    isSearchActive = false;
    filteredMoviesData = allMoviesData;
    currentPage = 1;
    showAllMovies = false;
    displayMovies();
}

/**
 * Initialize event listeners when DOM is ready
 */
document.addEventListener('DOMContentLoaded', function() {
    const showButton = document.getElementById('BtShow');
    const showAllButton = document.getElementById('BtShowAll');
    const searchBtn = document.getElementById('searchBtn');
    const clearSearchBtn = document.getElementById('clearSearchBtn');
    const searchInput = document.getElementById('searchInput');
    
    if (showButton) {
        showButton.addEventListener('click', function() {
            showAllMovies = false;
            currentPage = 1;
            isSearchActive = false;
            loadTable();
        });
    } else {
        console.warn('Show button (BtShow) not found in DOM');
    }

    if (showAllButton) {
        showAllButton.addEventListener('click', function() {
            showAllMovies = true;
            displayMovies();
        });
    } else {
        console.warn('Show All button (BtShowAll) not found in DOM');
    }

    if (searchBtn) {
        searchBtn.addEventListener('click', searchMovies);
    } else {
        console.warn('Search button (searchBtn) not found in DOM');
    }

    if (clearSearchBtn) {
        clearSearchBtn.addEventListener('click', clearSearch);
    } else {
        console.warn('Clear Search button (clearSearchBtn) not found in DOM');
    }

    if (searchInput) {
        searchInput.addEventListener('keypress', function(event) {
            if (event.key === 'Enter') {
                searchMovies();
            }
        });
    }
});
