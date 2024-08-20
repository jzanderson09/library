'use strict';

const myLibrary = [];

const libraryDiv = document.querySelector('.library-div');
const bookCardBoiler = document.createElement('div');

const harryFirst = new Book(`Harry Potter and the Sorcerer's Stone`, 'J.K. Rowling', 309, true);
const harrySecond = new Book('Harry Potter and the Chamber of Secrets', 'J.K. Rowling', 341, true);
const harryThird = new Book('Harry Potter and the Prisoner of Azkaban', 'J.K. Rowling', 435, true);
const harryFourth = new Book('Harry Potter and the Goblet of Fire', 'J.K. Rowling', 636, true);
const harryFifth = new Book('Harry Potter and the Order of the Phoenix', 'J.K. Rowling', 766, true);
const harrySixth = new Book('Harry Potter and the Half-Blood Prince', 'J.K. Rowling', 607, false);
const harrySeventh = new Book('Harry Potter and the Deathly Hallows', 'J.K. Rowling', 607);

addBookToLibrary(harryFirst);
addBookToLibrary(harrySecond);
addBookToLibrary(harryThird);
addBookToLibrary(harryFourth);
addBookToLibrary(harryFifth);
addBookToLibrary(harrySixth);
addBookToLibrary(harrySeventh);

const formSubmit = document.querySelector('#submit');
formSubmit.addEventListener('click', clickHandler);

console.table(myLibrary);

//----------------functions: ---------------------

//Creates book object:
function Book(title, author, pages, read, id) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    if (!id) {
        this.id = myLibrary.length;
    }
    if (read) {
        this.read = true;
    } else {
        this.read = false;
    }
    this.info = function() {
        if (this.read === false) {
        return `${this.title} by ${this.author} (${this.pages} pages). I have not read this book.`;
        } else {
        return `${this.title} by ${this.author} (${this.pages} pages). I have read this book.`;
        }
    }
}

//Adds book object to myLibrary:
function addBookToLibrary(newBook) {
    let titles = myLibrary.map(book => book.title);
    if (titles.includes(newBook.title)) {
        window.alert(`Error! ${newBook.title} is already in your library!`);
    } else {
        myLibrary.push(newBook);
        updateLibrary();
    }
}

//Click eventHandler:
function clickHandler(e) {
    e.preventDefault();
    if (e.target.id === 'submit') {
        let titleField = document.querySelector('#title').value;
        let authorField = document.querySelector('#author').value;
        let pagesField = Number(document.querySelector('#pages').value);
        let readCheckField = document.querySelector('#read').checked;
        let addedBook = new Book(titleField, authorField, pagesField, readCheckField);
        addBookToLibrary(addedBook);
    }
    else {
        let bookClicked = document.getElementById(`${e.currentTarget.id}`);
        toggleBookRead(bookClicked);
    }
}

//Toggle class/color of bookCard when clicked/read:
function toggleBookRead(bookCard) {
    //updates read key in obj to true/false and updates card-read class:
    let libraryId = bookCard.id;
    if (bookCard.classList == 'book-card book-read') {
        myLibrary[libraryId].read = false;
        bookCard.classList.remove('book-read');
    } else {
        myLibrary[libraryId].read = true;
        bookCard.classList.add('book-read');
    }
}

// Updates libraryDiv to reflect myLibrary:
function updateLibrary() {
    libraryDiv.innerHTML = '';
    let bookCardBoiler = document.createElement('div');
    bookCardBoiler.className = 'book-card';
    let bookCardArr = [];
    myLibrary.forEach(book => {
        let currentCard = bookCardBoiler.cloneNode(true);
        currentCard.innerHTML = `<p>${book.title} by ${book.author}</p>`;
        currentCard.addEventListener('click', clickHandler);
        currentCard.id = bookCardArr.length;
        book.id = Number(currentCard.id);
        if (book.read === true) {
            currentCard.classList.add('book-read');
        }
        bookCardArr.push(currentCard);
    });
    bookCardArr.forEach(card => {
        libraryDiv.appendChild(card);
    });
}