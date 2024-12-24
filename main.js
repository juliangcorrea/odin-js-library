const myLibrary = [];

function Book(author, title, pages, status) {
    this.author = author
    this.title = title
    this.pages = pages
    this.status = status
}

function addBookToLibrary(bookForm) {
    const newBook = new Book(bookForm.author, bookForm.title, bookForm.pages, bookForm.status)
    myLibrary.push(newBook)
}

function displayBooks(){
    myLibrary.forEach(book => {
        const bookCards = document.querySelector('.book-cards')
        const bookCardTemplate = createBookCard(book)
        bookCards.insertAdjacentHTML('beforeend', bookCardTemplate)
    });
}

function createBookCard(book){
    return `
    <div class="book-card">
        <h1 class="book-title">${book.title}</h1>
        <h2 class="book-author">${book.author}</h2>
        <h3 class="book-pages">${book.pages}</h3>
        <button class="change-status">${book.status}</button>
        <button class="delete-book">Delete</button>
    </div>`
}

const testBook = {
    author: 'Test-Author',
    title: 'Test-Title',
    pages: 200,
    status: 'Read'
}

addBookToLibrary(testBook)
displayBooks()