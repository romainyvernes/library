export default class Book {
  constructor(title, author, pageCount, year, read) {
      this.title = title;
      this.author = author;
      this.pageCount = pageCount;
      this.year = year;
      this.read = read;
      this.addDate = Date.now();
  }
};