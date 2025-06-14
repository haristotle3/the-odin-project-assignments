const myLibrary = [];

function Book(title, author, pages, isRead) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;
  this.id = crypto.randomUUID();

  this.toggleRead = function () {
    this.isRead = !this.isRead;
    return;
  };

  this.info = function () {
    let info = "";
    info += title + " ";
    info += "by " + author + ", ";
    info += pages + " pages, ";
    if (this.isRead) info += "has been read.";
    else info += "not read yet.";

    return info;
  };
}

function addBookToLibrary(title, author, pages, isRead) {
  let book = new Book(title, author, pages, isRead);
  myLibrary.push(book);
  return;
}
