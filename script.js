
const myLibrary = [];

function Book(title, author, genre, pages, id, read) {
    this.title = title;
    this.author = author;
    this.genre = genre;
    this.pages = pages;
    this.id = id;
    this.read = read;
}

function createId() {
    // Usa crypto.randomUUID() si está disponible, si no, usa Date.now()
    return (window.crypto && crypto.randomUUID) ? crypto.randomUUID() : Date.now().toString();
}

function addBookToLibrary(book) {
    myLibrary.push(book);
}

function displayBooks(book) {
    const bookList = document.querySelector(".book-list");
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.genre}</td>
        <td>${book.pages}</td> 
        <td>${book.id}</td>
        <td>${book.read}</td>
        <td><button data-delete-book="${book.id}">Delete</button></td>
    `;
    bookList.appendChild(row);
}

const setupDeleteListener = () => {
    const deleteButtons = document.querySelectorAll('[data-delete-book]');
    deleteButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const bookId = event.target.getAttribute('data-delete-book');
                // Encuentra el índice del libro en myLibrary y elimínalo
                const bookIndex = myLibrary.findIndex(book => book.id === bookId);
                if (bookIndex !== -1) {
                    myLibrary.splice(bookIndex, 1);
                    event.target.closest('tr').remove();
                }
            });
        });
    }


function createBook() {
    const form = document.querySelector('.modal');
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const title = form.elements['title'].value;
        const author = form.elements['author'].value;
        const genre = form.elements['genre'].value;
        const pages = form.elements['pages'].value;
        const read = form.elements['read'] ? form.elements['read'].value : 'unread';
        const newBook = new Book(
            title,
            author,
            genre,
            pages,
            createId(),
            read
        );
        form.reset();
        document.querySelector("[data-modal]").close();
        addBookToLibrary(newBook);
        displayBooks(newBook);
        setupDeleteListener();
    });
}

const displayModal = function () {
    const modal = document.querySelector("[data-modal]");
    const openButton = document.querySelector("[data-open-modal]");
    const closeButton = document.querySelector("[data-close-modal]");

    openButton.addEventListener('click', () => {
        modal.showModal();
    });

    closeButton.addEventListener('click', () => {
        modal.close();
    });

    modal.addEventListener('click', e => {
        if (e.target === modal) {
            modal.close();
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    createBook();
    displayModal();
});