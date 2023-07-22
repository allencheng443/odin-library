const myLibrary = [];

const data = [
  {
    title: 'The Hobbit',
    author: 'J.R.R. Tolkien',
    pages: 295,
    read: false,
  },
  {
    title: 'The AAA',
    author: 'T.A.A',
    pages: 233,
    read: true,
  },
  {
    title: 'The BBB',
    author: 'W.B.B',
    pages: 98,
    read: false,
  },
];

function Book(title, author, pages, isRead) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;
  this.info = function () {
    return `${this.title} by ${this.author}, ${this.pages} pages, ${
      this.isRead ? 'already read' : 'not read yet'
    }`;
  };
}

function addBookTiLibrary() {}

function render() {
  const bookList = document.querySelector('#book-list')
}

function createCardElement({title, author, pages, isRead}) {
  const container = document.createCardElement('article')
  const bookTitle = document.createElement('p')
  bookTitle.textContent = title
  const bookAuthor = document.createElement('p')
  bookAuthor.textContent = author
  const bookPages = document.createElement('p')
  bookPages.textContent = pages
  const bookIsRead = document.createElement('input[type="checkbox')
  bookIsRead.checked
}
