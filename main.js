const myLibrary = [];
const addBtn = document.querySelector(".addBook")
const dialog = document.querySelector("#addBookDialog")
const newBookBtn = document.querySelector(".newBookBtn")

addBtn.addEventListener('click', addNewBookPopup)
newBookBtn.addEventListener('click', (e)=>{
    e.preventDefault()
    const inputs = document.querySelectorAll('input')
    const tempData = Array.from(inputs).map(input => input.value)
    tempData.push("started")
    const newBook = new Book(tempData[0], tempData[1], tempData[2], tempData[3])
    addBookToLibrary(newBook)
    dialog.close()
    displayBooks()
})

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
    const bookCards = document.querySelector('.book-cards')
    bookCards.innerHTML = ""
    myLibrary.forEach(book => {
        const bookCardTemplate = createBookCard(book)
        bookCards.insertAdjacentHTML('beforeend', bookCardTemplate)
    });

    const deleteBtn = document.querySelectorAll('.delete-book')
    deleteBtn.forEach(btn => {
        btn.addEventListener('click', ()=>{
            const id = btn.dataset.id
            myLibrary.splice(id, 1)
            displayBooks()
        })
})
}

function createBookCard(book){
    return `
    <div class="book-card">
        <h1 class="book-title">${book.title}</h1>
        <h2 class="book-author">${book.author}</h2>
        <h3 class="book-pages">${book.pages}</h3>
        <button class="change-status">${book.status}</button>
        <button class="delete-book" data-id="${myLibrary.indexOf(book)}">Delete</button>
    </div>`
}

function addNewBookPopup(){
    dialog.showModal()
}

const testBook = {
    author: 'Test-Author',
    title: 'Test-Title',
    pages: 200,
    status: 'Read'
}

addBookToLibrary(testBook)
displayBooks()