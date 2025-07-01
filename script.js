
const myLibrary = [];

class Book {
    constructor(title, author, genre, pages, id) {
        this.title = title;
        this.author = author;
        this.genre = genre;
        this.pages = pages;
        this.id = id;
    }
}

class readStatus extends Book {
    constructor(title, author, genre, pages, id, read) {
        super(title, author, genre, pages, id)
        this.read = read;
    }
    toggleReadStatus() {
        const status = document.createElement('select');
        status.innerHTML = `
        <option value="read">Read</option>
        <option value="unread">Unread</option>
        <option value="currently reading">Currently Reading</option>
    `;
        status.value = this.read;
        status.addEventListener('change', (event) => {
            this.read = event.target.value;
        });
        return status;
    }
}

function createId() {
    // Use crypto.randomUUID() if is available, if not, use Date.now()
    return (window.crypto && crypto.randomUUID) ? crypto.randomUUID() : Date.now().toString();
}

function addBookToLibrary(book) {
    myLibrary.push(book);
}

function displayBooks(book) {
    const read = new readStatus();
    const bookList = document.querySelector(".book-list");
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.genre}</td>
        <td>${book.pages}</td>   
        <td>${book.id}</td>
        <td></td>
        <td><button data-delete-book="${book.id}">Delete</button></td>
    `;
    row.children[5].appendChild(read.toggleReadStatus());
    bookList.appendChild(row);
}

const setupDeleteListener = () => {
    const deleteButtons = document.querySelectorAll('[data-delete-book]');
    deleteButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const bookId = event.target.getAttribute('data-delete-book');
            // Find the index of the book in myLibrary and remove it
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
        const read = 'unread'; // Default value for read status
        const newBook = new readStatus(
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