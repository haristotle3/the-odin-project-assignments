const myLibrary = [];
const createBookButton = document.querySelector("#create-book");
const dialog = document.querySelector("dialog");
const form = document.querySelector("form");

class Book {
  constructor(title, author, pages, isRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
    this.id = crypto.randomUUID();
  }
}

Book.prototype.info = function () {
  let info = "";
  info += title + " ";
  info += "by " + author + ", ";
  info += pages + " pages, ";
  if (this.isRead) info += "has been read.";
  else info += "not read yet.";

  return info;
};

Book.prototype.toggleRead = function () {
  this.isRead = !this.isRead;
  return;
};

createBookButton.addEventListener("click", () => {
  dialog.showModal();
});

dialog.addEventListener("close", () => {
  dialog.close();
});

form.addEventListener("submit", (e) => {
  const title = document.querySelector("form #title");
  const author = document.querySelector("form #author");
  const pages = document.querySelector("form #pages");
  const isRead = document.querySelector("form #isRead");

  addBookToLibrary(title.value, author.value, pages.value, isRead.checked);
  displayLibrary();
});

function addBookToLibrary(title, author, pages, isRead) {
  let book = new Book(title, author, pages, isRead);
  myLibrary.push(book);
  return;
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function createNode(book) {
  const node = document.createElement("div");
  node.className = "card";

  for (let property of Object.keys(book)) {
    if (property === "id") continue;
    if (property === "isRead") continue;

    const propName = document.createElement("p");
    propName.textContent = capitalizeFirstLetter(property);
    const propValue = document.createElement("p");
    propValue.textContent = book[property];

    node.appendChild(propName);
    node.appendChild(propValue);
  }

  const label = document.createElement("label");
  label.textContent = "Read";

  const readButton = document.createElement("input");
  readButton.type = "checkbox";
  readButton.checked = book.isRead ? true : false;
  readButton.addEventListener("click", () => {
    book.toggleRead();
    console.log(book);
  });

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.addEventListener("click", () => {
    let removalIndex = myLibrary.indexOf(book);
    myLibrary.splice(removalIndex, 1);
    displayLibrary();
  });

  node.dataset.id = book.id;

  node.append(label);
  node.appendChild(readButton);
  node.appendChild(deleteButton);

  return node;
}

function clearCardContainer() {
  const cardContainer = document.querySelector(".card-container");
  let child = cardContainer.lastElementChild;
  while (child) {
    cardContainer.removeChild(child);
    child = cardContainer.lastElementChild;
  }

  return;
}

function displayLibrary() {
  clearCardContainer();
  const cardContainer = document.querySelector(".card-container");

  for (let book of myLibrary) {
    let node = createNode(book);
    cardContainer.appendChild(node);
  }
  return;
}

addBookToLibrary("A Mind For Numbers", "Barbara Oakley", 450, true);
addBookToLibrary("Clean Code", "Robert C. Martin", 464, true);
addBookToLibrary("Introduction to Algorithms", "Thomas H. Cormen", 1312, false);
addBookToLibrary("Design Patterns", "Erich Gamma", 395, true);
addBookToLibrary("The Pragmatic Programmer", "Andrew Hunt", 352, false);
addBookToLibrary("You Don't Know JS", "Kyle Simpson", 278, true);
addBookToLibrary("Deep Work", "Cal Newport", 304, true);
addBookToLibrary("Zero to One", "Peter Thiel", 224, false);
addBookToLibrary("Atomic Habits", "James Clear", 320, true);

displayLibrary();
