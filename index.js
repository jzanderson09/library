'use strict';

//Classes:
class Book {
    #title;
    #author;
    #pages;
    #read;
    #id;
    constructor(title, author, pages, read) {
        this.#title = title;
        this.#author = author;
        this.#pages = pages;
        if(read) {
            this.#read = true;
        } else {
            this.#read = false;
        }
    }
    get book() {
        return { title: this.#title, author: this.#author, pages: this.#pages, read: this.#read };
    }
    get title() {
        return this.#title;
    }
    get author() {
        return this.#author;
    }
    get pages() {
        return this.#pages;
    }
    get id() {
        return this.#id;
    }
    get read() {
        return this.#read;
    }
    set title(newTitle) {
        this.#title = newTitle;
    }
    set author(newAuthor) {
        this.#author = newAuthor;
    }
    set pages(newPages) {
        this.#pages = newPages;
    }
    set id(newId) {
        this.#id = newId;
    }
    set read(newRead) {
        this.#read = newRead;
    }
}

class Library {
    #library;
    constructor() {
        this.#library = [];
        this.addBook = this.addBook.bind(this);
        this.deleteReadBooks = this.deleteReadBooks.bind(this);
        this.initializeLibrary = this.initializeLibrary.bind(this);
    }
    get library() {
        return this.#library;
    }
    set library(newLibrary) {
        this.#library = newLibrary;
        updateLibraryDiv();
    }
    addBook(newBook) {
        let titles = this.library.map(book => book.title);
        if(titles.includes(newBook.title)) {
            window.alert(`Error:  ${newBook.title} is already in your library!`);
        } else {
            this.library.push(newBook);
            updateLibraryDiv();
            console.log(myLibrary.library);
        }
    }
    deleteReadBooks() {
        let newLib = this.library.filter(book => book.read === false);
        if(window.confirm(`Click 'OK' to proceed with clearing read (green colored) books from your library.`)) {
            this.library = newLib;
            updateLibraryDiv();
            console.log(myLibrary.library);
        }
    }
    initializeLibrary(newBook) {
        let titles = this.library.map(book => book.title);
        if(titles.includes(newBook.title)) {
            window.alert(`Error:  ${newBook.title} is already in your library!`);
        } else {
            this.library.push(newBook);
            updateLibraryDiv();
        }
    }
}
// -----------------------------------------------------------------------
//DOM functions:
function clickHandler(e) {
    e.preventDefault();
    if(e.target.id === 'submit') {
        let [title, author, pages] = document.querySelectorAll('.text-input');
        if (title.value !== '' && author.value !== '' && pages.value !== '') {
            let titleField = document.querySelector('#title').value;
            let authorField = document.querySelector('#author').value;
            let pagesField = Number(document.querySelector('#pages').value);
            let readCheckField = document.querySelector('#read').checked;
            let addedBook = new Book(titleField, authorField, pagesField, readCheckField);
            let formInputs = document.querySelectorAll('input');
            for (let i = 0; i < formInputs.length; i++) {
                formInputs[i].value = '';
            }
            myLibrary.addBook(addedBook);
        } else {
            alert('Error:  Please include a title, author and page count for your new book!');
        }
    } else {
        let bookClicked = document.getElementById(`${e.currentTarget.id}`);
        toggleBookRead(bookClicked);
    }
}
//id is the name of the input (i.e. 'title', 'author', 'pages'):
function inputCheck(id) {
    let inputVar = document.getElementById(id);
    if(inputVar.style.borderColor === 'red') {
        inputVar.setCustomValidity('This field is required!');
    }
    else if(inputVar.style.border === 'green') {
        inputVar.setCustomValidity('');
    }
    inputVar.reportValidity();
}
//Toggle class/color of bookCard when clicked/read:
function toggleBookRead(bookCard) {
    let libraryId = bookCard.id;
    if(bookCard.classList == 'book-card book-read') {
        myLibrary.library[libraryId]['read'] = false;
        bookCard.classList.remove('book-read');
    } else {
        myLibrary.library[libraryId]['read'] = true;
        bookCard.classList.add('book-read');
    }
}
// Updates libraryDiv to reflect myLibrary:
function updateLibraryDiv() {
    let libraryDiv = document.querySelector('.library-div');
    let bookCardBoiler = document.createElement('div');
    libraryDiv.innerHTML = '';
    bookCardBoiler.className = 'book-card';
    let bookCardArr = [];
    myLibrary.library.forEach(book => {
        let currentCard = bookCardBoiler.cloneNode(true);
        currentCard.innerHTML = `<p>${book.title} by ${book.author}</p>`;
        currentCard.addEventListener('click', clickHandler);
        currentCard.id = bookCardArr.length;
        book.id = Number(currentCard.id);
        if(book.read === true) {
            currentCard.classList.add('book-read');
        }
        bookCardArr.push(currentCard);
    });
    bookCardArr.forEach(card => {
        libraryDiv.appendChild(card);
    });
}
// -----------------------------------------------------------------------
const harryFirst = new Book(`Harry Potter and the Sorcerer's Stone`, 'J.K. Rowling', 309, true);
const harrySecond = new Book('Harry Potter and the Chamber of Secrets', 'J.K. Rowling', 341, true);
const harryThird = new Book('Harry Potter and the Prisoner of Azkaban', 'J.K. Rowling', 435, true);
const harryFourth = new Book('Harry Potter and the Goblet of Fire', 'J.K. Rowling', 734, true);
const harryFifth = new Book('Harry Potter and the Order of the Phoenix', 'J.K. Rowling', 870, true);
const harrySixth = new Book('Harry Potter and the Half-Blood Prince', 'J.K. Rowling', 652, false);
const harrySeventh = new Book('Harry Potter and the Deathly Hallows', 'J.K. Rowling', 759);

let myLibrary = new Library();
let initialLibrary = [harryFirst, harrySecond, harryThird, harryFourth, harryFifth, harrySixth, harrySeventh];
initialLibrary.forEach(book => myLibrary.initializeLibrary(book));

const submitButton = document.querySelector('#submit');
submitButton.addEventListener('click', clickHandler);

const clearReadBooksButton = document.createElement('button');
clearReadBooksButton.addEventListener('click', myLibrary.deleteReadBooks);
clearReadBooksButton.id = 'clear-read';
clearReadBooksButton.textContent = 'Clear Read Books';
const userFormDiv = document.querySelector('#user-form');
userFormDiv.appendChild(clearReadBooksButton);

console.log(myLibrary.library);