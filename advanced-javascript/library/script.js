const myLibrary = [];

function Book(title, author, pages, isRead) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;
  this.id = crypto.randomUUID();
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

function addBookToLibrary(title, author, pages, isRead) {
  let book = new Book(title, author, pages, isRead);
  myLibrary.push(book);
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

  return node;
}

function displayLibrary() {
  const cardContainer = document.querySelector(".card-container");

  for (let book of myLibrary) {
    let node = createNode(book);
    cardContainer.appendChild(node);
  }
  return;
}

displayLibrary();
