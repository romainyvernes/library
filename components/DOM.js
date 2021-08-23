function createBookCard(book, index) {
  const bookCard = document.createElement('article');
  bookCard.className = 'book primary-border rounded-border';
  bookCard.setAttribute('data-index', index);

  // create header for each book card
  const bookHeader = document.createElement('header');

  // create close button to delete any given card
  const closeBtn = document.createElement('button');
  closeBtn.className = 'close-btn';

  const title = document.createElement('h2');
  title.className = 'title';
  title.textContent = book.title;

  bookHeader.appendChild(title);
  bookHeader.appendChild(closeBtn);

  // wrapper for book data
  const cardContent = document.createElement('div');
  cardContent.className = 'card-content';

  const CARD_LABELS = [
      {label: 'Author', data: book.author},
      {label: 'Year of Publication', data: book.year},
      {label: 'Number of Pages', data: book.pageCount}
  ];

  CARD_LABELS.map((item) => {
      const cardItem = document.createElement('h3');
      cardItem.textContent = `${item.label}: ${item.data}`;
      cardContent.appendChild(cardItem);
  });

  // create container with mark as read message and toggle button
  const readBtnContainer = document.createElement('footer');
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
  
  toggleContainer.appendChild(toggleInput);
  toggleContainer.appendChild(toggleSpan);
  readBtnContainer.appendChild(toggleContainer);

  bookCard.appendChild(bookHeader);
  bookCard.appendChild(cardContent);
  bookCard.appendChild(readBtnContainer);

  return bookCard;
}

function displayBook(target, bookCard) {
  target.appendChild(bookCard);
}

export {
  createBookCard,
  displayBook,
};