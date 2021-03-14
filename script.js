function Book(title, author, pageCount, read) {
    this.title = title;
    this.author = author;
    this.pageCount = pageCount;
    this.read = read;
    this.info = function() {
        return `${title} by ${author}, ${pageCount} pages, ${read ? 'read' :
                'not read yet'}`;
    }
}

const theHobbit = new Book('The Hobbit', 'J.R.R. Tolkien', '295', false);
console.log(theHobbit.info());