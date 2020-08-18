const sunSVG = `<svg
    stroke="currentColor"
    fill="none"
    stroke-width="2"
    viewBox="0 0 24 24"
    stroke-linecap="round"
    stroke-linejoin="round"
    style="height: 2rem; width: 2rem;"
    xmlns="http://www.w3.org/2000/svg"
  >
    <title>Switch to light mode</title>
    <circle cx="12" cy="12" r="5"></circle>
    <line x1="12" y1="1" x2="12" y2="3"></line>
    <line x1="12" y1="21" x2="12" y2="23"></line>
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
    <line x1="1" y1="12" x2="3" y2="12"></line>
    <line x1="21" y1="12" x2="23" y2="12"></line>
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
  </svg>`;
const moonSVG = `<svg
stroke="currentColor"
fill="none"
stroke-width="2"
viewBox="0 0 24 24"
stroke-linecap="round"
stroke-linejoin="round"
style="height: 2rem; width: 2rem;"
xmlns="http://www.w3.org/2000/svg"
>
<title>Switch to dark mode</title>
<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
</svg>`;
const toggleButton = document.getElementById("themeToggle");
const stylesheet = document.getElementById("themeStylesheet");

const handleThemeChange = (newTheme) => {
  toggleButton.innerHTML = newTheme === "dark" ? sunSVG : moonSVG;

  stylesheet.href = `./styles/${newTheme === "dark" ? "dark" : "light"}.css`;
  localStorage.setItem("currentTheme", newTheme);
};
const getCurrentTheme = () => {
  return localStorage.getItem("currentTheme");
};

if (getCurrentTheme() === null) {
  localStorage.setItem(
    "currentTheme",
    window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
  );
}

toggleButton.addEventListener("click", () => {
  handleThemeChange(getCurrentTheme() === "light" ? "dark" : "light");
});

window.matchMedia("(prefers-color-scheme: dark)").addListener((event) => {
  handleThemeChange(event.matches ? "dark" : "light");
});

handleThemeChange(getCurrentTheme());
