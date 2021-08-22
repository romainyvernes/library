class Book {
    constructor(title, author, pageCount, year, read) {
        this.title = title;
        this.author = author;
        this.pageCount = pageCount;
        this.year = year;
        this.read = read;
        this.addDate = Date.now();
    }
}

class Label {
    constructor(name, content, value) {
        this.name = name;
        this.content = content;
        this.value = value;
    }
}

function addBookToLibrary(event) {
    /* cancel add if one of the fields is empty and change display of missing 
    fields */
    let abort = false;

    abort = enableError(abort);
    
    if (abort) {
        // prevent form from submitting and closing itself
        return event.preventDefault();
    }
    
    let newBook = new Book(event.target[1].value, event.target[2].value, event.target[3].value, 
        event.target[4].value, (event.target[5].value === 'true' ? true : false));
    
    library.push(newBook);

    // prevent page refresh, which resets value of library to empty array
    event.preventDefault();

    hideForm();
    viewBooks();
}

function createBookCard(book, index) {
    const bookCard = document.createElement('article');
    bookCard.className = 'book secondary-bg';
    bookCard.setAttribute('data-index', index);

    // create close button for each book card
    const closeBtn = document.createElement('button');
    closeBtn.className = 'close-book-btn';
    closeBtn.textContent = '+';
    closeBtn.addEventListener('click', deleteBook);
    bookCard.appendChild(closeBtn);

    const CARD_LABELS = [new Label('title', null, book.title), new Label('author',
            'Author:', book.author), new Label('date', 'Year of Publication:', 
            book.year), new Label('pages', 'Number of Pages:', book.pageCount)];

    CARD_LABELS.map(cardLabel => {
        const cardItem = document.createElement('p');
        cardItem.className = cardLabel.name;
        cardItem.textContent = `${cardLabel.content ? cardLabel.content : ''} ${cardLabel.value}`;
        bookCard.appendChild(cardItem);
    });
    
    // create container with mark as read message and toggle button
    const readBtnContainer = document.createElement('div');
    const readMsg = document.createElement('p');
    
    readBtnContainer.className = 'read-container';
    readMsg.textContent = 'Mark as read';
    readBtnContainer.appendChild(readMsg);

    // create toggle button
    const toggleContainer = document.createElement('label');
    const toggleInput = document.createElement('input');
    const toggleSpan = document.createElement('span');
    
    toggleContainer.className = 'toggle-container';
    toggleInput.className = 'toggle-input';
    toggleInput.type = 'checkbox';
    toggleSpan.className = 'toggle-span';

    // toggle button to read if book's read property is true
    if (book.read) toggleInput.checked = true;

    toggleInput.addEventListener('change', updateReadProp);
    
    toggleContainer.appendChild(toggleInput);
    toggleContainer.appendChild(toggleSpan);
    readBtnContainer.appendChild(toggleContainer);

    bookCard.appendChild(readBtnContainer);

    return bookCard;
}

function viewBooks() {
    const currentSortingValue = sortDropdown.value;
    sortBooks(currentSortingValue);
    
    const displayContainer = document.querySelector('#book-display');
    displayContainer.textContent = '';
    library.map((book, index) => {
        const bookCard = createBookCard(book, index);
        displayContainer.appendChild(bookCard);
    });

    displayContainer.querySelectorAll('.book').forEach(book => 
            toggleBookBckgrd(book));

    updateLibraryData();
}

function displayForm() {
    form.reset();
    disableError();
    formContainer.style.display = 'block';
}

function hideForm() {
    formContainer.style.display = 'none';
}

function enableError(abort) {
    const fields = form.querySelectorAll('input, select');
    fields.forEach(field => {
        const errorMsg = field.previousElementSibling;
        errorMsg.style.display = 'none';
        if (field.value === '') {
            abort = true;        
            errorMsg.style.display = 'inline-block';
        }
    })
    return abort;
}

function disableError() {
    const fields = form.querySelectorAll('input, select');
    fields.forEach(field => {
        const errorMsg = field.previousElementSibling;
        errorMsg.style.display = 'none';
    });
}

function updateReadProp(event) {
    const bookCard = event.path[3];
    const bookIndex = bookCard.dataset.index;
    const readProperty = this.checked;
    if (readProperty) {
        library[bookIndex].read = true;
    } else {
        library[bookIndex].read = false;
    }

    toggleBookBckgrd(bookCard);
    updateLibraryData();
}

function deleteBook(event) {
    const bookIndex = event.path[1].dataset.index;
    library.splice(bookIndex, 1);
    viewBooks();
}

function updateLibraryData() {
    const totalBooks = document.querySelector('#total-books span');
    const unreadBooks = document.querySelector('#unread-books span');
    const readBooks = document.querySelector('#read-books span');
    const readStatusCount = library.reduce(((obj, book) => {
        if (book.read) {
            obj.readCount ? obj.readCount += 1 : obj.readCount = 1;
        } else {
            obj.unreadCount ? obj.unreadCount += 1 : obj.unreadCount = 1;
        }
        return obj;
    }), {});
    
    totalBooks.textContent = library.length ? library.length : 0;
    unreadBooks.textContent = readStatusCount.unreadCount ? readStatusCount.unreadCount :
            0;
    readBooks.textContent = readStatusCount.readCount ? readStatusCount.readCount :
            0;
}

function sortBooks(sortingValue) {
    switch(sortingValue) {
        case 'add-date':
            library.sort((book1, book2) => book2.addDate - book1.addDate);
            break;
        case 'title':
            library.sort((book1, book2) => {
                const title1 = book1.title.toUpperCase();
                const title2 = book2.title.toUpperCase();
                if (title1 < title2) return -1;
                if (title1 > title2) return 1;
                return 0;
            });
            break;
        case 'author':
            library.sort((book1, book2) => {
                const author1 = book1.author.toUpperCase();
                const author2 = book2.author.toUpperCase();
                const title1 = book1.title.toUpperCase();
                const title2 = book2.title.toUpperCase();
                
                if (author1 < author2) return -1;
                if (author1 > author2) return 1;
                if (title1 < title2) return -1;
                if (title1 > title2) return 1;

                return 0;
            });
            break;
        case 'year':
            library.sort((book1, book2) => book1.year - book2.year);
            break;
    }
}

function toggleBookBckgrd(bookCard) {
    const book = library[bookCard.dataset.index];
    
    if (book.read) {
        bookCard.style.backgroundColor = 'rgb(48, 155, 27)';
    } else {
        bookCard.style.backgroundColor = 'rgb(48, 155, 27, .7)';
    }
}

let library = [];

const formContainer = document.querySelector('#form-container');
formContainer.addEventListener('click', e => {
    if (e.target.id === 'form-container') {
        hideForm();
    }
});

const theHobbit = new Book('The Hobbit', 'J.R.R. Tolkien', '295', '1937', false);
const theLordOfTheRings = new Book('The Lord of the Rings', 'J.R.R. Tolkien', '1137', '1954', true);
const carol = new Book('Carol', 'Patricia Highsmith', '204', '1952', true);
library.push(theHobbit, theLordOfTheRings, carol);

const form = document.querySelector('#add-form');
form.addEventListener('submit', addBookToLibrary);

const newBookBtn = document.querySelector('#add-btn');
newBookBtn.addEventListener('click', displayForm);

const closeFormBtn = document.querySelector('#close-form-btn');
closeFormBtn.addEventListener('click', hideForm);

const sortDropdown = document.querySelector('#sort-by');
sortDropdown.addEventListener('change', viewBooks);

viewBooks();