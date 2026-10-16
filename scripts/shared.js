export const ENTRY_BASE_PATH = "/entries/";
export const DATA_URL = "/data/grimoireDict.json";

export async function fetchData() {
  try {
    const response = await fetch(DATA_URL);
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    return await response.json();
  } catch (e) {
    console.error("Data fetch error:", e);
    throw e;
  }
}

export function displayError(elementId, msg, showRetry = true) {
  const el = document.getElementById(elementId);
  if (el) {
    el.innerHTML = `
      <span class="error">${msg}</span>
      ${showRetry ? "<a href=\"javascript:location.reload()\">Try again</a>" : ""}
    `;
  }
}

export function sortByName(arr) {
  return arr.sort((a, b) => a.name.localeCompare(b.name));
}

export function sortByCategory(arr) {
  return arr.sort((a, b) => a.localeCompare(b));
}

export function sortByTitle(arr) {
  return arr.sort((a, b) => a.title.localeCompare(b.title));
}

console.log("shared.js loaded");