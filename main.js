// #region utility funcs

/**
 * Get a random integer between given two numbers
 * @param {number} min - minimum limitation
 * @param {number} max - maximum limitation
 * @returns {number} - a random integer
 */
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Create random hash string in specific length
 * @param {number} length
 * @returns {string} - random hash
 */
function createHashString(length) {
  const charMap = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  return Array.from({ length: length }, () => charMap[getRandomNumber(0, 61)]).join('');
}

/**
 * Get Book hash ID
 * @returns {string}
 */
function createBookId() {
  let hash = createHashString(8);
  while (books.some((book) => book.id === hash)) {
    hash = createHashString(8);
  }
  return hash;
}

// #endregion

/**
 * Define Book constructor
 * @param {string} title
 * @param {string} author
 * @param {number} pages
 * @param {boolean} isRead
 * @param {string} id
 * @returns {object} - Book instance
 */
function Book(title, author, pages, isRead) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;
  this.id = createBookId();
  this.info = function () {
    return `${this.title} by ${this.author}, ${this.pages} pages, ${
      this.isRead ? 'already read' : 'not read yet'
    }`;
  };
}

function addBookToLibrary(e) {
  e.preventDefault();
  const book = new Book(
    this.title.value,
    this.author.value,
    +this.pages.value,
    this.isRead.checked,
  );
  books.push(book);
  renderBookCardList();
}

function createCardElement({ title, author, pages, isRead, id }) {
  const element = document.createElement('article');
  element.classList.add('book');
  element.dataset.key = id;
  element.append(
    createBookContentComponent(title, author, pages, isRead),
    createDelBookComponent(),
  );
  return element;
}

// #region child components
function createBookContentComponent(title, author, pages, isRead) {
  const element = document.createElement('div');
  element.classList.add('book-content');
  element.append(
    createBookTitleComponent(title),
    createBookAuthorComponent(author),
    createBookPagesComponent(pages),
    createBookIsReadComponent(isRead),
  );
  return element;
}

function createBookTitleComponent(title) {
  const element = document.createElement('p');
  element.textContent = title;
  element.classList.add('book-title');
  return element;
}

function createBookAuthorComponent(author) {
  const element = document.createElement('p');
  element.textContent = `~ ${author}`;
  element.classList.add('book-author');
  return element;
}

function createBookPagesComponent(pages) {
  const element = document.createElement('p');
  element.textContent = `${pages} Pages`;
  element.classList.add('book-pages');
  return element;
}

function createBookIsReadComponent(isRead) {
  const element = document.createElement('input');
  element.type = 'checkbox';
  element.checked = isRead;
  element.classList.add('book-isread');
  element.addEventListener('change', handleToggleIsRead);
  return element;
}

function createDelBookComponent() {
  const element = document.createElement('button');
  element.textContent = 'X';
  element.classList.add('book-del');
  element.addEventListener('click', handleDelBook);
  return element;
}
// #endregion

function renderBookCardList() {
  while (bookList.firstChild) {
    bookList.removeChild(bookList.firstChild);
  }
  books.forEach((book) => bookList.appendChild(createCardElement(book)));
}

function handleDelBook() {
  books = books.filter((book) => book.id !== this.parentElement.dataset.key);
  renderBookCardList();
}

function handleToggleIsRead() {
  const element = books.find((book) => book.id === this.parentElement.parentElement.dataset.key);
  element.isRead = this.checked;
}

const data = [
  {
    title: 'The Hobbit',
    author: 'J.R.R. Tolkien',
    pages: 295,
    isRead: false,
  },
  {
    title: 'The AAA',
    author: 'T.A.A',
    pages: 233,
    isRead: true,
  },
  {
    title: 'The BBB',
    author: 'W.B.B',
    pages: 98,
    isRead: false,
  },
];

let books = [];
data.forEach(({ title, author, pages, isRead }) =>
  books.push(new Book(title, author, pages, isRead)),
);

const form = document.querySelector('form');
form.addEventListener('submit', addBookToLibrary);
const bookList = document.querySelector('.book-list');
books.forEach((book) => bookList.appendChild(createCardElement(book)));
