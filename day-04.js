// Day 4: Copy content from one element to another.
// Add elements with id="source-text" and id="copied-text" to a test HTML page.
const source = document.querySelector("#source-text");
const destination = document.querySelector("#copied-text");
if (source && destination) destination.textContent = source.textContent;
