function Book(author, pages, title) {
    this.author = author;
    this.pages = pages;
    this.title = title;
    this.info = function() {
        console.log(`${this.title}, by ${this.author} (${this.pages} pages).`);
    }
}

function addBookToLibrary(book) {
    if (myLibrary.includes(book)) {
        alert(`Error! ${book.title} already exists in your library!`);
    } else {
        myLibrary.push(book);
        alert(`Success! ${book.title} added to your library!`);
    }
}

function showLibrary() {
    console.table(myLibrary);
}

const myLibrary = [];

const myBook = new Book('J.K. Rowling', 309, `Harry Potter and the Sorcerer's Stone`);
const mySecondBook = new Book('J.K. Rowling', 341, 'Harry Potter and the Chamber of Secrets');
const myThirdBook = new Book('J.K. Rowling', 435, 'Harry Potter and the Prisoner of Azkaban');
const myFourthBook = new Book('J.K. Rowling', 734, 'Harry Potter and the Goblet of Fire');
const myFifthBook = new Book('J.K. Rowling', 870, 'Harry Potter and the Order of the Phoenix');
const mySixthBook = new Book('J.K. Rowling', 652, 'Harry Potter and the Half-Blood Prince');
const mySeventhBook = new Book('J.K. Rowling', 759, 'Harry Potter and the Deathly Hallows');

[myBook, mySecondBook, myThirdBook, 
myFourthBook, myFifthBook, mySixthBook, 
mySeventhBook].forEach(book => myLibrary.push(book));

showLibrary();