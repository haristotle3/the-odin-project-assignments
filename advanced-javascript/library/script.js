class Book {
  constructor(title, author, pages, isRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
    this.id = crypto.randomUUID();
  }

  info() {
    let infoString = "";
    infoString += this.title + " ";
    infoString += "by " + this.author + ", ";
    infoString += this.pages + " pages, ";
    if (this.isRead) infoString += "has been read.";
    else infoString += "not read yet.";

    return infoString;
  }

  toggleRead() {
    this.isRead = !this.isRead;
    return;
  }
}

class Library {
  constructor() {
    this.myLibrary = [];
  }

  addBookToLibrary(title, author, pages, isRead) {
    let book = new Book(title, author, pages, isRead);
    this.myLibrary.push(book);
    return;
  }

  deleteBookFromLibrary(book) {
    let removalIndex = this.myLibrary.indexOf(book);
    this.myLibrary.splice(removalIndex, 1);
  }

  getBooks() {
    return this.myLibrary;
  }
}

class DisplayController {
  constructor() {
    this.library = new Library();

    this.createBookButton = document.querySelector("#create-book");
    this.dialog = document.querySelector("dialog");
    this.form = document.querySelector("form");
    this.inputs = document.querySelectorAll("form input");

    this.inputs.forEach((inpEle) => {
      inpEle.addEventListener("input", () => {
        if (inpEle.validity.rangeUnderflow) {
          inpEle.setCustomValidity(`The book should contain minimum one page!`);
        } else {
          inpEle.setCustomValidity(``);
        }

        if (inpEle.validity.patternMismatch)
          inpEle.setCustomValidity(
            `Enter a name you idiot! What author is named in number!!`
          );
      });
    });

    this.createBookButton.addEventListener("click", () => {
      this.dialog.showModal();
    });

    this.dialog.addEventListener("close", () => {
      this.dialog.close();
    });

    this.form.addEventListener("submit", (e) => {
      const title = document.querySelector("form #title");
      const author = document.querySelector("form #author");
      const pages = document.querySelector("form #pages");
      const isRead = document.querySelector("form #isRead");

      this.library.addBookToLibrary(
        title.value,
        author.value,
        pages.value,
        isRead.checked
      );
      this.displayLibrary();
    });

    this.initLibrary();
  }

  initLibrary() {
    this.library.addBookToLibrary(
      "A Mind For Numbers",
      "Barbara Oakley",
      450,
      true
    );
    this.library.addBookToLibrary("Clean Code", "Robert C. Martin", 464, true);
    this.library.addBookToLibrary(
      "Introduction to Algorithms",
      "Thomas H. Cormen",
      1312,
      false
    );
    this.library.addBookToLibrary("Design Patterns", "Erich Gamma", 395, true);
    this.library.addBookToLibrary(
      "The Pragmatic Programmer",
      "Andrew Hunt",
      352,
      false
    );
    this.library.addBookToLibrary(
      "You Don't Know JS",
      "Kyle Simpson",
      278,
      true
    );
    this.library.addBookToLibrary("Deep Work", "Cal Newport", 304, true);
    this.library.addBookToLibrary("Zero to One", "Peter Thiel", 224, false);
    this.library.addBookToLibrary("Atomic Habits", "James Clear", 320, true);
    this.displayLibrary();
  }

  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  createNode(book) {
    const node = document.createElement("div");
    node.className = "card";

    for (let property of Object.keys(book)) {
      if (property === "id") continue;
      if (property === "isRead") continue;

      const propName = document.createElement("p");
      propName.textContent = this.capitalizeFirstLetter(property);
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
    });

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";

    deleteButton.addEventListener("click", () => {
      this.library.deleteBookFromLibrary(book);
      this.displayLibrary();
    });

    node.dataset.id = book.id;

    node.append(label);
    node.appendChild(readButton);
    node.appendChild(deleteButton);

    return node;
  }

  clearCardContainer() {
    const cardContainer = document.querySelector(".card-container");
    let child = cardContainer.lastElementChild;
    while (child) {
      cardContainer.removeChild(child);
      child = cardContainer.lastElementChild;
    }

    return;
  }

  displayLibrary() {
    this.clearCardContainer();
    const cardContainer = document.querySelector(".card-container");

    for (let book of this.library.getBooks()) {
      let node = this.createNode(book);
      cardContainer.appendChild(node);
    }
    return;
  }
}

const displayContoller = new DisplayController();
