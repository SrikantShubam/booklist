// book class :represents a book
class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}
//ui class: handle ui tasks
class UI {
    static displayBooks() {

        const books = Store.getBooks();
        books.forEach((book) => UI.addBookToList(book));
    }
    static addBookToList(book) {
        const list = document.querySelector('#book-list');
        const row = document.createElement('tr');
        row.innerHTML = `<td>${book.title}</td>
<td>${book.author}</td>
<td>${book.isbn}</td>
<td><ar href="" class="btn btn-danger btn-sm delete">X </td>
`;
        list.appendChild(row);
    }
    static deleteBook(a) {
        if (a.classList.contains('delete')) {
            a.parentElement.parentElement.remove();
        }
    }
    static showAlert(message, className) {
        const div = document.createElement('div');
        div.className = `alert alert-${className}`;
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector('.container');
        const form = document.querySelector('#book-form');
        container.insertBefore(div, form);
        // Vanish 
        setTimeout(() => document.querySelector('.alert').remove(), 3000);
    }


    static clearfields() {
        document.querySelector('#title').value = '';
        document.querySelector('#author').value = '';
        document.querySelector('#isbn').value = '';
    }
}

//store class  : handles storage
class Store {
    static getBooks() {
        let books;
        if (localStorage.getItem('books') === null) {
            books = [];
        } else {
            books = JSON.parse(localStorage.getItem('books'));
        }
        return books;
    }
    static addBook(book) {
        const books = Store.getBooks();
        books.push(book);

        localStorage.setItem('books', JSON.stringify(books));
    }
    static removeBook(isbn) {
        const books = Store.getBooks();
        books.forEach((book, index) => {
            if (book.isbn === isbn) {
                books.splice(index, 1);
            }
        });
        localStorage.setItem('books', JSON.stringify(books));
    }
}

//events : display books
document.addEventListener('DOMContentLoaded', UI.displayBooks);
//event : add book
document.querySelector('#book-form').addEventListener('submit', (e) => {
    //prevent actual submit
    e.preventDefault();
    //get form values
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const isbn = document.querySelector('#isbn').value;
    //validate 
    if (title === '' || author === '' || isbn === '') {
        UI.showAlert('Please fill in all fields', 'danger');
    } else {
        //inantitate book
        const book = new Book(title, author, isbn);
        //add book to list 
        UI.addBookToList(book);
        //add book to storage
        Store.addBook(book);
        //show success message
        UI.showAlert('Book Added sucessfully', 'success');
        //clear fields
        UI.clearfields();
    }




});


//event : remove book
document.querySelector('#book-list').addEventListener('click', (e) => {
   //remove book form ui
    UI.deleteBook(e.target);
//remove book from storage
Store.removeBook(e.target.parentElement.parentElementSibling.textContent);

    //show success message
    UI.showAlert('Book Removed', 'info');
});

