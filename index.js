import Book from './components/factory.js';
import {
    createBookCard,
    displayBook,
    resetForm,
} from './components/DOM.js';

function addBookToLibrary(event) {
    // prevent page refresh, which resets value of library
    event.preventDefault();
    console.log('here')
    /* cancel add if one of the fields is empty and change display of missing 
    fields */
    if (isIncomplete()) {
        return;
    }
    
    const newBook = new Book(
        event.target[1].value, 
        event.target[2].value, 
        event.target[3].value, 
        event.target[4].value, 
        (event.target[5].value === 'true' ? true : false)
    );
    
    library.push(newBook);
    
    // hide new book form
    toggleFormDisplay();
    // reset form input and select fields
    resetForm();
    // display new list of books
    viewBooks();
}

/* display books in DOM as cards */
function viewBooks() {
    const currentSortingValue = sortDropdown.value;
    sortBooks(currentSortingValue);
    
    const displayContainer = document.querySelector('#book-display');
    displayContainer.textContent = '';
    library.map((book, index) => {
        const bookCard = createBookCard(book, index);
        displayBook(displayContainer, bookCard);
    });

    displayContainer.querySelectorAll('.book').forEach(book => 
            toggleBookBackground(book));

    updateLibraryData();
    // assign event listeners to "read" toggle buttons and card close buttons
    createBookEvents();
}

function isIncomplete() {
    let incomplete = false;
    const fields = form.querySelectorAll('input, select');
    fields.forEach((field) => {
        const errorMsg = (
            document.querySelector(`label[for="${field.name}"] p`)
        );
        /* prior to checking whether or not field is empty, hide its error 
        message in case form was already submitted with that field empty, which
        would have caused its error message to appear */
        errorMsg.classList.add('invisible');
        
        if (field.value === '') { // display error messages for empty fields
                    
            errorMsg.classList.remove('invisible');

            incomplete = true;
        }
    })
    return incomplete;
}

function toggleFormDisplay() {
    disableError();
    formContainer.classList.toggle('hide');
  }

function disableError() {
    const fields = form.querySelectorAll('input, select');
    fields.forEach((field) => {
        const errorMsg = (
            document.querySelector(`label[for="${field.name}"] p`)
        );
        errorMsg.classList.add('invisible');
    });
}

function updateReadProp(event) {
    const bookIndex = event.target.dataset.index;
    const readProperty = this.checked;
    if (readProperty) {
        library[bookIndex].read = true;
    } else {
        library[bookIndex].read = false;
    }

    const bookCard = document.querySelector(`[data-index="${bookIndex}"]`);
    
    toggleBookBackground(bookCard);
    updateLibraryData();
}

function deleteBook(event) {
    const bookIndex = event.target.dataset.index;
    library.splice(bookIndex, 1);
    viewBooks();
}

function updateLibraryData() {
    const totalBooks = document.querySelector('.total-books p');
    const unreadBooks = document.querySelector('.unread-books p');
    const readBooks = document.querySelector('.read-books p');
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

function toggleBookBackground(bookCard) {
    const book = library[bookCard.dataset.index];
    
    if (book.read) {
        bookCard.classList.remove('unread');
        bookCard.classList.add('secondary-bg');
    } else {
        bookCard.classList.remove('secondary-bg');
        bookCard.classList.add('unread');
    }
}

function createBookEvents() {
    // enable book deletion upon clicking "x" button in book card
    const closeBtn = document.querySelectorAll('.book .close-btn');
    closeBtn.forEach((btn) => {
        btn.addEventListener('click', deleteBook);
    });
    
    // enable card background change upon toggling of "read" button
    const toggleInput = document.querySelectorAll('.toggle-input');
    toggleInput.forEach((input) => {
        input.addEventListener('change', updateReadProp);
    });
}

let library = [];

/* enable form closing when clicking on background */
const formContainer = document.getElementById('form-container');
formContainer.addEventListener('click', e => {
    if (e.target.id === 'form-container') {
        toggleFormDisplay();
    }
});

/* fictitious library books */
const theHobbit = new Book('The Hobbit', 'J.R.R. Tolkien', '295', '1937', false);
const theLordOfTheRings = new Book('The Lord of the Rings', 'J.R.R. Tolkien', '1137', '1954', true);
const carol = new Book('Carol', 'Patricia Highsmith', '204', '1952', true);
library.push(theHobbit, theLordOfTheRings, carol);

// enable form submission
const form = document.querySelector('#add-form');
form.addEventListener('submit', addBookToLibrary);

// enable form display
const newBookBtn = document.querySelector('#add-book');
newBookBtn.addEventListener('click', toggleFormDisplay);

// enable form closing when clicking "x" button in form
const closeFormBtn = document.querySelector('#close-form-btn');
closeFormBtn.addEventListener('click', toggleFormDisplay);

// enable library update upon change in sorting criterion
const sortDropdown = document.querySelector('#sort-by');
sortDropdown.addEventListener('change', viewBooks);

// display library
viewBooks();