// Movie App - Improved Version

const API_URL = "https://api.tvmaze.com/shows/30/episodes";
const SPINNER_TIMEOUT = 6000; // 3 seconds
let loadingTimeout;

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

    const tableBody = document.getElementById('tableBody');
    if (!tableBody) {
        console.error('Table body element not found');
        return;
    }

    tableBody.innerHTML = ''; // Clear existing rows

    jsonData.forEach((arrayItem, index) => {
        // Safely access properties with defaults
        const name = arrayItem.name || 'N/A';
        const type = arrayItem.type || 'N/A';
        const imageUrl = arrayItem.image?.medium || 'https://via.placeholder.com/210x295?text=No+Image';
        const airDate = arrayItem.airdate || 'N/A';
        const runtime = arrayItem.runtime || 'N/A';
        const rating = arrayItem.rating?.average || 'N/A';

        const newRow = `
            <tr>
                <td class="text-center">${index + 1}</td>
                <td class="text-left">${escapeHtml(name)}</td>
                <td class="text-center">${escapeHtml(type)}</td>
                <td class="text-center">
                    <img src="${imageUrl}" alt="${escapeHtml(name)}" style="max-width: 300px; height: auto;">
                </td>
                <td class="text-center">${escapeHtml(airDate)}</td>
                <td class="text-center">${runtime} min</td>
                <td class="text-center">${rating}</td>
            </tr>
        `;
        tableBody.innerHTML += newRow;
    });
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

    try {
        const response = await fetch(API_URL);
        
        // Check if response is successful
        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
        }

        const resData = await response.json();
        
        // Validate response
        if (!resData) {
            throw new Error('Empty response from server');
        }

        LoadTableData(resData);
        hideSpinner();

    } catch (error) {
        console.error('Error loading data:', error.message);
        
        // Show user-friendly error message
        const tableBody = document.getElementById('tableBody');
        if (tableBody) {
            tableBody.innerHTML = `
                <tr>
                    <td colspan="7" class="text-center text-danger">
                        Error loading movies. Please try again later.
                    </td>
                </tr>
            `;
        }

        // Hide spinner after timeout if still showing
        loadingTimeout = setTimeout(hideSpinner, SPINNER_TIMEOUT);
    }
}

/**
 * Initialize event listeners when DOM is ready
 */
document.addEventListener('DOMContentLoaded', function() {
    const showButton = document.getElementById('BtShow');
    
    if (showButton) {
        showButton.addEventListener('click', function() {
            loadTable();
        });
    } else {
        console.warn('Show button (BtShow) not found in DOM');
    }
});