// Day 5: Simple dark mode toggle.
// Add a button with id="dark-mode-toggle" to a test HTML page.
const darkModeButton = document.querySelector("#dark-mode-toggle");
if (darkModeButton) {
  darkModeButton.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
  });
}
// Add this CSS rule to the page: body.dark-mode { background: #111827; color: #f9fafb; }
