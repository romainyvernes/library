function Book(title, author, year, pageCount, read) {
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

function addBookToLibrary(book) {
    library.push(book);
}

function createBookCard(book) {
    const bookCard = document.createElement('div');
    bookCard.className = 'book';

    const CARD_LABELS = [new Label('title', null, book.title), new Label('author',
            'Author:', book.author), new Label('date', 'Publication Year:', 
            book.year), new Label('pages', 'Number of Pages:', book.pageCount)];

    CARD_LABELS.map(cardLabel => {
        const cardItem = document.createElement('p');
        cardItem.className = cardLabel.name;
        cardItem.textContent = `${cardLabel.content ? cardLabel.content : ''} ${cardLabel.value}`;
        bookCard.appendChild(cardItem);
    });

    return bookCard;
}

function viewBooks() {
    const displayContainer = document.querySelector('#book-display');
    library.map(book => {
        const bookCard = createBookCard(book);
        displayContainer.appendChild(bookCard);
    });
}

function displayForm() {
    console.log("success")
}

let library = [];

const theHobbit = new Book('The Hobbit', 'J.R.R. Tolkien', '1937', '295', false);
const theLordOfTheRings = new Book('The Lord of the Rings', 'J.R.R. Tolkien', '1954', '1137', false);
addBookToLibrary(theHobbit);
addBookToLibrary(theLordOfTheRings);

const newBookBtn = document.querySelector('#add-book');
newBookBtn.addEventListener('click', displayForm);

viewBooks();