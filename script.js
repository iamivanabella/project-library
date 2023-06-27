// Library array
let library = [];

// Book constructor
function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

const newBookForm = document.getElementById('newBookForm');

newBookForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const { title, author, pages, readStatus } = e.target.elements;

    const newBook = new Book(title.value, author.value, parseInt(pages.value), readStatus.checked);
    addBookToLibrary(newBook);
    displayBooks();

    newBookForm.reset();
    $('#addBookModal').modal('hide');
});

function addBookToLibrary(book) {
    library.push(book);
}

function removeBookFromLibrary(index) {
    library.splice(index, 1);
}

function toggleReadStatus(index) {
    library[index].read = !library[index].read;
}

function displayBooks() {
    const bookList = document.getElementById('bookList');
    bookList.innerHTML = '';

    library.forEach((book, index) => {
        const card = document.createElement('div');
        card.className = 'card book-card';

        const cardBody = document.createElement('div');
        cardBody.className = 'card-body';

        const createElem = (tagName, className, textContent) => {
            const elem = document.createElement(tagName);
            elem.className = className;
            elem.textContent = textContent;
            return elem;
        };

        cardBody.appendChild(createElem('h5', 'card-title', book.title));
        cardBody.appendChild(createElem('p', 'card-text', `Author: ${book.author}`));
        cardBody.appendChild(createElem('p', 'card-text', `Pages: ${book.pages}`));
        cardBody.appendChild(createElem('p', 'card-text', `Read: ${book.read ? 'Yes' : 'No'}`));

        const removeButton = createElem('button', 'btn btn-danger mr-2', 'Remove');
        removeButton.addEventListener('click', () => {
            removeBookFromLibrary(index);
            displayBooks();
        });

        const toggleButton = createElem('button', 'btn btn-primary', 'Toggle Read Status');
        toggleButton.addEventListener('click', () => {
            toggleReadStatus(index);
            displayBooks();
        });

        cardBody.appendChild(removeButton);
        cardBody.appendChild(toggleButton);

        card.appendChild(cardBody);
        bookList.appendChild(card);
    });
}