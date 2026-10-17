
import { fetchData, displayError } from "/scripts/sharedCorr.js";

const ROWS_PER_PAGE = 15;

let fullData = [];
let filteredData = [];
let currentPage = 1;
let sortKey = "name";
let sortDirection = 1; // 1 = ascending, -1 = descending

// Read the current filters from the URL.
function getFiltersFromURL() {
  const params = new URLSearchParams(window.location.search);

  return {
    category: params.get("category") || "all",
    page: parseInt(params.get("page"), 10) || 1
  };
}

// Convert a category slug into a readable label.
function formatCategory(category) {
  const labels = {
    "deities-hellenic": "Hellenic",
    "deities-nordic": "Nordic",
    "deities-celtic": "Celtic"
  };

  if (!category) return "Unknown";

  return labels[category] ||
    category
      .replace(/-/g, " ")
      .replace(/\b\w/g, letter => letter.toUpperCase());
}

function formatDropdownCategory(category) {
  const labels = {
    "deities-hellenic": "- Hellenic",
    "deities-nordic": "- Nordic",
    "deities-celtic": "- Celtic"
  };

  return labels[category] || formatCategory(category);
}

// Entry page URL.
function getEntryURL(entry) {
  return `./entries/${entry.link}.html`;
}

// Thumbnail path.
// Change this if your thumbnails use a different directory or extension.
function getThumbnailPath(entry) {
  return `./assets/thumbnails/${entry.link}.gif`;
}

// Initialize the table and load the JSON data.
async function initializeTable() {
  try {
    const data = await fetchData();

    if (!data || !Array.isArray(data.entries)) {
      throw new Error('JSON must contain an "entries" array.');
    }

    // Keep only the information needed by this page.
    fullData = data.entries.map(entry => {
      const categories = Array.isArray(entry.category)
        ? entry.category
        : [entry.category].filter(Boolean);

      return {
        name: entry.title,
        link: entry.link,
        categories: categories.length > 0 ? categories : ["unknown"]
      };
    });

    populateCategoryFilter();

    const filters = getFiltersFromURL();
    const categorySelect = document.getElementById("filterCategory");

    if (categorySelect) {
      const categoryExists = [
        ...categorySelect.options
      ].some(option => option.value === filters.category);

      categorySelect.value = categoryExists
        ? filters.category
        : "all";
    }

    // Apply the initial filter and requested page.
    applyFilters(false);
    changePage(filters.page, false);

  } catch (error) {
    console.error("Failed to load entries:", error);
    displayError("tableContainer", "Failed to load entries.");
  }
}

// Populate the category dropdown from the JSON data.
function populateCategoryFilter() {
  const select = document.getElementById("filterCategory");
  if (!select) return;

  select.replaceChildren();

  const allOption = document.createElement("option");
  allOption.value = "all";
  allOption.textContent = "All Categories";
  select.appendChild(allOption);

  const categories = new Set(
    fullData.flatMap(entry => entry.categories)
  );

  [...categories].sort((a, b) => a.localeCompare(b))
    .forEach(category => {
      const option = document.createElement("option");
      option.value = category;
      option.textContent = formatDropdownCategory(category);
      select.appendChild(option);
    });
}

// Apply the selected category filter.
function applyFilters(resetPage = true) {
  const category =
    document.getElementById("filterCategory")?.value || "all";

  filteredData = fullData.filter(entry =>
    category === "all" || entry.categories.includes(category)
  );

  // Sort the filtered data.
  sortData();

  // Update the result counts, if those elements exist.
  const totalCount = document.getElementById("entryCount");
  const filteredCount = document.getElementById("filteredCount");

  if (totalCount) totalCount.textContent = fullData.length;
  if (filteredCount) filteredCount.textContent = filteredData.length;

  if (resetPage) {
    changePage(1);
  }
}

// Sort by title or category.
function sortData() {
  filteredData.sort((a, b) => {
    const valueA = sortKey === "category"
      ? a.categories.join(", ")
      : a.name;

    const valueB = sortKey === "category"
      ? b.categories.join(", ")
      : b.name;

    return sortDirection * valueA.localeCompare(valueB, undefined, {
      sensitivity: "base",
      numeric: true
    });
  });
}

// Render the current page.
function displayTable(page) {
  const table = document.getElementById("tablePaginated");
  if (!table) return;

  table.replaceChildren();

  // Header row: thumbnail, name, category.
  const header = table.insertRow();

  ["", "Name", "Category"].forEach((label, index) => {
    const th = document.createElement("th");
    th.textContent = label;

    if (index === 1) {
      th.style.cursor = "pointer";
      th.title = "Sort by name";
      th.addEventListener("click", () => toggleSort("name"));
    }

    if (index === 2) {
      th.style.cursor = "pointer";
      th.title = "Sort by category";
      th.addEventListener("click", () => toggleSort("category"));
    }

    header.appendChild(th);
  });

  const startIndex = (page - 1) * ROWS_PER_PAGE;
  const pageEntries = filteredData.slice(
    startIndex,
    startIndex + ROWS_PER_PAGE
  );

  if (pageEntries.length === 0) {
    const row = table.insertRow();
    const cell = row.insertCell();

    cell.colSpan = 3;
    cell.textContent = "No entries found.";
    cell.style.textAlign = "center";
    cell.style.fontStyle = "italic";
  } else {
    pageEntries.forEach(entry => {
      const row = table.insertRow();
      const entryURL = getEntryURL(entry);

      // Thumbnail linked to the entry page.
      const thumbnailCell = row.insertCell();
      const thumbnailLink = document.createElement("a");
      thumbnailLink.href = entryURL;

      const thumbnail = document.createElement("img");
      thumbnail.src = getThumbnailPath(entry);
      thumbnail.alt = entry.name;
      thumbnail.loading = "lazy";

      thumbnailLink.appendChild(thumbnail);
      thumbnailCell.appendChild(thumbnailLink);

      // Name linked to the entry page.
      const nameCell = row.insertCell();
      const nameLink = document.createElement("a");

      nameLink.href = entryURL;
      nameLink.textContent = entry.name;

      nameCell.appendChild(nameLink);

      // Each category links back to this listing with that filter.
      const categoryCell = row.insertCell();

      entry.categories.forEach((category, index) => {
        if (index > 0) {
          categoryCell.appendChild(document.createElement("br"));
        }

        const categoryLink = document.createElement("a");
        const params = new URLSearchParams();
        params.set("category", category);

        categoryLink.href =
          `${window.location.pathname}?${params.toString()}`;

        categoryLink.textContent = formatCategory(category);
        categoryCell.appendChild(categoryLink);
      });
    });
  }

  // Always update pagination, including when there are no results.
  updatePagination(page);
}

// Toggle ascending/descending sort.
function toggleSort(key) {
  if (sortKey === key) {
    sortDirection *= -1;
  } else {
    sortKey = key;
    sortDirection = 1;
  }

  sortData();
  changePage(1);
}

// Change the current page, clamping it to valid bounds.
function changePage(page, updateURL = true) {
  const pageCount = Math.ceil(filteredData.length / ROWS_PER_PAGE);

  currentPage = pageCount === 0
    ? 1
    : Math.max(1, Math.min(Number(page) || 1, pageCount));

  displayTable(currentPage);

  if (updateURL) {
    updateURLParams();
  }
}

// Create pagination buttons.
function updatePagination(page) {
  const pageCount = Math.ceil(filteredData.length / ROWS_PER_PAGE);

  const containers = [
    document.getElementById("paginationUpper"),
    document.getElementById("paginationLower")
  ].filter(Boolean);

  containers.forEach(container => {
    container.replaceChildren();

    if (pageCount <= 1) return;

    container.appendChild(document.createTextNode("Page: "));

    function addButton(label, targetPage, disabled = false, active = false) {
      const button = document.createElement("button");

      button.textContent = label;
      button.disabled = disabled;
      button.style.background = "none";
      button.style.border = "none";
      button.style.margin = "0 4px";
      button.style.padding = "5px 10px";
      button.style.cursor = disabled ? "default" : "pointer";
      button.style.color = disabled ? "transparent" : "#00ffcc";

      if (active) {
        button.style.fontWeight = "bold";
        button.style.fontSize = "1.2em";
      }

      if (!disabled) {
        button.addEventListener("click", () => changePage(targetPage));
      }

      container.appendChild(button);
    }

    addButton("|←", 1, page === 1);
    addButton("←", page - 1, page === 1);

    const maxVisiblePages = 9;
    let start = Math.max(1, page - Math.floor(maxVisiblePages / 2));
    let end = Math.min(pageCount, start + maxVisiblePages - 1);

    start = Math.max(1, end - maxVisiblePages + 1);

    if (start > 1) {
      container.appendChild(document.createTextNode("… "));
    }

    for (let i = start; i <= end; i++) {
      addButton(String(i), i, false, i === page);
    }

    if (end < pageCount) {
      container.appendChild(document.createTextNode(" …"));
    }

    addButton("→", page + 1, page === pageCount);
    addButton("→|", pageCount, page === pageCount);
  });
}

// Keep category and page parameters synchronized with the URL.
function updateURLParams() {
  const params = new URLSearchParams();
  const category =
    document.getElementById("filterCategory")?.value || "all";

  if (category !== "all") {
    params.set("category", category);
  }

  if (currentPage > 1) {
    params.set("page", currentPage);
  }

  const query = params.toString();
  const url = query
    ? `${window.location.pathname}?${query}`
    : window.location.pathname;

  window.history.replaceState({}, "", url);
}

// Wire up controls after the document is ready.
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("filterCategory")
    ?.addEventListener("change", () => applyFilters());

  document.getElementById("sortName")
    ?.addEventListener("click", () => toggleSort("name"));

  document.getElementById("sortCategory")
    ?.addEventListener("click", () => toggleSort("category"));

  document.getElementById("resetFilters")
    ?.addEventListener("click", () => {
      const select = document.getElementById("filterCategory");
      if (select) select.value = "all";

      sortKey = "name";
      sortDirection = 1;

      applyFilters();
    });

  initializeTable();
});

console.log("paginationAll.js loaded");
