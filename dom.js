"use strict";

/* TASK 9.1 — SELECT ELEMENTS IN DIFFERENT WAYS */
const heading = document.querySelector("h1");
const contentElements = document.querySelectorAll(".content");
const contactForm = document.getElementById("contact-form");
const emailInput = document.querySelector("#contact-form input[type='email']");
const navItems = document.querySelectorAll("nav li");
const firstNavLink = document.querySelector(".nav-link");
const lastArticleParagraph = document.querySelector("#article p:last-of-type");
const submitButton = document.querySelector("#contact-form button[type='submit']");
const mainHeadings = document.querySelectorAll("main h2");
const footer = document.querySelector("footer");

console.log("h1:", heading);
console.log("All .content elements:", contentElements);
console.log("Contact form:", contactForm);
console.log("Email input:", emailInput);
console.log("Navigation list items:", navItems);
console.log("First nav link:", firstNavLink);
console.log("Last article paragraph:", lastArticleParagraph);
console.log("Submit button:", submitButton);
console.log("Headings in main:", mainHeadings);
console.log("Footer:", footer);
console.log("Missing selector returns:", document.querySelector(".does-not-exist"));
console.log("Navigation text:", [...navItems].map((item) => item.textContent.trim()));

/* TASK 9.2 — TRAVERSE THE DOM */
const headerNav = document.querySelector("header nav");
const firstNavParent = firstNavLink.parentElement;
const articleNextSibling = document.querySelector("#article").nextElementSibling;
const navChildItems = document.querySelector(".nav-list").children;
const footerBody = footer.closest("body");
const headerFromNav = firstNavLink.closest("header");

console.log("Nav inside header:", headerNav);
console.log("First link's parent li:", firstNavParent);
console.log("Article's next sibling:", articleNextSibling);
console.log("Nav child elements:", navChildItems);
console.log("Footer's body:", footerBody);
console.log("Header found with closest():", headerFromNav);

/* TASK 9.3 — CHANGE CONTENT, ATTRIBUTES, AND CLASSES */
const practiceParagraphs = document.querySelectorAll(".content");
const article = document.querySelector("#article");

heading.textContent = "Anthony's DOM Practice";
if (firstNavLink) {
  firstNavLink.href = "https://developer.mozilla.org";
  firstNavLink.target = "_blank";
  firstNavLink.rel = "noopener";
}
console.log("Article data-id:", article.dataset.id);
console.log("Article data-category:", article.dataset.category);
article.dataset.status = "reviewed";

if (practiceParagraphs[0]) practiceParagraphs[0].classList.add("highlight");
if (practiceParagraphs[1]) practiceParagraphs[1].classList.toggle("accent");

/* Injection demonstration: textContent treats the string as text.
   Never use innerHTML for untrusted user comments. */
const exampleInput = `<img src="x" onerror="alert('hacked!')">`;
document.querySelector("#unsafe").textContent = `Unsafe HTML demo string: ${exampleInput}`;
document.querySelector("#safe").textContent = `Safe textContent output: ${exampleInput}`;

/* TASK 9.4 — CREATE, INSERT, CLONE, AND REMOVE */
const navList = document.querySelector(".nav-list");
function addNavItem(text, href) {
  const item = document.createElement("li");
  const link = document.createElement("a");
  link.classList.add("nav-link");
  link.href = href;
  link.textContent = text;
  item.appendChild(link);
  navList.appendChild(item);
}
addNavItem("Blog", "#blog");

const insertedParagraph = document.createElement("p");
insertedParagraph.textContent = "This paragraph was inserted before the article's first paragraph.";
article.insertBefore(insertedParagraph, article.querySelector("p"));

const addParagraphButton = document.querySelector("#add-paragraph");
const practiceOutput = document.querySelector("#practice-output");
let paragraphCount = 0;
addParagraphButton.addEventListener("click", () => {
  paragraphCount += 1;
  const p = document.createElement("p");
  p.textContent = `Created paragraph ${paragraphCount}.`;
  practiceOutput.appendChild(p);
});

document.querySelector("#add-nav").addEventListener("click", () => {
  addNavItem(`Extra ${navList.children.length}`, "#practice-section");
});

document.querySelector("#clone-nav").addEventListener("click", () => {
  const firstItem = navList.querySelector("li");
  if (!firstItem) return;
  const clone = firstItem.cloneNode(true);
  clone.querySelector("a").textContent = "Cloned";
  clone.querySelector("a").href = "#practice-section";
  navList.prepend(clone);
});

document.querySelector("#remove-footer").addEventListener("click", () => {
  const currentFooter = document.querySelector("#site-footer");
  if (currentFooter) currentFooter.remove();
});

/* LESSON 10 — EVENTS, INPUTS, AND FORM HANDLING */
document.querySelector("#change-text").addEventListener("click", () => {
  heading.textContent = "You changed the heading with JavaScript!";
  const firstParagraph = document.querySelector("#article .content");
  if (firstParagraph) firstParagraph.textContent = "This paragraph was updated by a click event.";
});

document.querySelector("#toggle-highlight").addEventListener("click", () => {
  document.querySelector("#article").classList.toggle("highlight");
});

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();
  document.querySelector("#form-status").textContent =
    `Form demo received: ${emailInput.value.trim()}`;
});

const liveInput = document.querySelector("#live-input");
const liveOutput = document.querySelector("#live-output");
liveInput.addEventListener("input", () => {
  liveOutput.textContent = liveInput.value ? `You typed: ${liveInput.value}` : "Your text will appear here.";
});

document.addEventListener("keydown", (event) => {
  if (event.altKey && event.key.toLowerCase() === "h") {
    heading.classList.toggle("highlight");
  }
});
