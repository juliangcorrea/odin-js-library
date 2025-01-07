const myLibrary = [];
const addBtn = document.querySelector(".addBook")
const dialog = document.querySelector("#addBookDialog")
const newBookBtn = document.querySelector(".newBookBtn")

addBtn.addEventListener('click', addNewBookPopup)
newBookBtn.addEventListener('click', (e)=>{
    e.preventDefault()
    const inputs = document.querySelectorAll('input')
    const tempData = Array.from(inputs).map(input => input.value)
    tempData.push("Started")
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
    console.log(myLibrary)
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

    const statusBtn = document.querySelectorAll('.change-status')
    statusBtn.forEach(btn => {
        btn.addEventListener('click', ()=>{
            const parentCard = btn.parentElement
            const id = parentCard.querySelector('.delete-book').dataset.id
            if(myLibrary[id].status == 'Started'){
                myLibrary[id].status = 'Reading...'
            } else if(myLibrary[id].status == 'Reading...'){
                myLibrary[id].status = 'Finished'
            }
            console.log('changing')
            displayBooks()
        })
    })
}

function createBookCard(book){
    return `
    <div class="book-card">
        <h1 class="book-title">${book.title}</h1>
        <h2 class="book-author">${book.author}</h2>
        <h3 class="book-pages">${book.pages} pages</h3>
        <h4 class="book-status">${book.status}</h4>
        <div class="buttons">
            <button class="change-status">Change Status</button>
            <button class="delete-book" data-id="${myLibrary.indexOf(book)}">Delete Book</button>
        </div>
    </div>`
}

function addNewBookPopup(){
    const inputs = document.querySelectorAll('input')
    const tempData = Array.from(inputs).map(input => input.value = '')
    dialog.showModal()
}

const testBook = {
    author: 'Mark Twain',
    title: 'The Adventures of Tom Sawyer',
    pages: 224,
    status: 'Started'
}

addBookToLibrary(testBook)
displayBooks()