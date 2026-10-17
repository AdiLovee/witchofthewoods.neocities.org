const popup = document.getElementById("witch-popup");
const continueButton = document.getElementById("enter-site");

if (localStorage.getItem("witchPopupDismissed") !== "true") {
  popup.style.display = "flex";

  continueButton.addEventListener("click", () => {
    localStorage.setItem("witchPopupDismissed", "true");
    popup.remove();
  });
}