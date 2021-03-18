function Book(title, author, pageCount, year, read) {
    this.title = title;
    this.author = author;
    this.pageCount = pageCount;
    this.year = year;
    this.read = read;
}

function Label(name, content, value) {
    this.name = name;
    this.content = content;
    this.value = value;
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

function createBookCard(book) {
    const bookCard = document.createElement('div');
    bookCard.className = 'book';

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
    
    toggleContainer.appendChild(toggleInput);
    toggleContainer.appendChild(toggleSpan);
    readBtnContainer.appendChild(toggleContainer);

    bookCard.appendChild(readBtnContainer);

    return bookCard;
}

function viewBooks() {
    const displayContainer = document.querySelector('#book-display');
    displayContainer.textContent = '';
    library.map(book => {
        const bookCard = createBookCard(book);
        displayContainer.appendChild(bookCard);
    });
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
        field.style.borderColor = 'rgb(151, 151, 151)';
        const errorMsg = field.previousElementSibling;
        errorMsg.style.display = 'none';
        if (field.value === '') {
            abort = true;
            field.style.borderColor = 'red';         
            errorMsg.style.display = 'inline-block';
        }
    })
    return abort;
}

function disableError() {
    const fields = form.querySelectorAll('input, select');
    fields.forEach(field => {
        field.style.borderColor = 'rgb(151, 151, 151)';
        const errorMsg = field.previousElementSibling;
        errorMsg.style.display = 'none';
    });
}

let library = [];

const formContainer = document.querySelector('#form-container');
formContainer.addEventListener('click', e => {
    if (e.target.id === 'form-container') {
        hideForm();
    }
});

const theHobbit = new Book('The Hobbit', 'J.R.R. Tolkien', '295', '1937', false);
const theLordOfTheRings = new Book('The Lord of the Rings', 'J.R.R. Tolkien', '1137', '1954', false);
library.push(theHobbit, theLordOfTheRings);

const form = document.querySelector('#add-form');
form.addEventListener('submit', addBookToLibrary);

const newBookBtn = document.querySelector('#add-btn');
newBookBtn.addEventListener('click', displayForm);

const closeFormBtn = document.querySelector('#close-form-btn');
closeFormBtn.addEventListener('click', hideForm);

viewBooks();