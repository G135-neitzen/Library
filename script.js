const myLibrary = [];

function Book(bookTitle, author, gender, numberOfPages, idNNumber) {
    this.bookTitle = bookTitle;
    this.author = author;
    this.gender = gender;
    this.numberOfPages = numberOfPages;
    this.idNNumber = idNNumber;
}

function readStatus(bookTitle, author, gender, numberOfPages, idNNumber, read) {
    Book.call(this, bookTitle, author, gender, numberOfPages, idNNumber);
    this.read = read;
}
Object.setPrototypeOf(readStatus.prototype, Book.prototype);

function createId () {
    const crypto = require('crypto');
    const id = crypto.randomUUID();
    return id;
}

function createBook() {
    const form = document.getElementsByClassName("submitBook")[0];
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const newBook = new Book(
            form.elements['bookTitle'].value,
            form.elements['author'].value,
            form.elements['gender'].value,
            form.elements['numberOfPages'].value,
            form.elements['idNNumber'].value = createId(),
            form.elements['read'].checked
        );
        form.reset();
        document.querySelector("[data-modal]").close();
        addBookToLibrary(newBook);
    });
}

function addBookToLibrary(book) {
    myLibrary.push(book);
}

const displayModal = function () {
    const modal = document.querySelector("[data-modal]");
    const openButton = document.querySelector("[data-open-modal]");
    const closeButton = document.querySelector("[data-close-modal]");

    openButton.addEventListener('click', () => {
        modal.show();
    });

    closeButton.addEventListener('click', () => {
        modal.close();
    });
}

document.addEventListener('DOMContentLoaded', () => {
    createBook();
    displayModal();
});

