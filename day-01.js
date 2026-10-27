// Day 1: Change every heading to a random text color.
document.querySelectorAll("h1, h2, h3, h4, h5, h6").forEach((heading) => {
  const color = `#${Math.floor(Math.random() * 0xffffff).toString(16).padStart(6, "0")}`;
  heading.classList.add("random-color");
  heading.dataset.randomColor = color;
  heading.classList.toggle("highlight");
});
// Add a CSS rule for .random-color in the page stylesheet if you want to apply colors from data.
document.querySelectorAll(".random-color").forEach((heading) => {
  heading.classList.add("highlight");
});
