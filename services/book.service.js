import { utilService } from './util.service.js'
import { storageService } from './storage.service.js'

const BOOK_KEY = 'bookDB'
_createDefultBooks()

export const bookService = {
    query,
    get,
    remove,
    save,
    getDefaultFilter,
    getTopBookPrice,
    getEmptyBook,
    getCategories,
    getSimpleBookAge,
    getSimplePageAmount,
    getFilterFromParams,
    getDemoBooks,
    addGoogleBook,
    addDoesBookExist,
}

// For Debug (easy access from console):
// window.cs = bookService


// returns the filterd book list
function query(filter = {}) {
    return storageService.query(BOOK_KEY)
        .then(books => {

            if (filter.title) {
                const regExp = new RegExp(filter.title, 'i')
                books = books.filter(book => regExp.test(book.title))
            }

            if(filter.author){
                const regExp = new RegExp(filter.author, 'i')
                books = books.filter(book => regExp.test(book.author))
            }


            if(filter.category && filter.category !== 'All'){
                books = books.filter(book => book.category === filter.category)
            }

            

            if(!(!filter.isNew && !filter.isModern && !filter.isVintage)){
                books = books.filter(book => (filter.isNew && getSimpleBookAge(book.publishedYear) === 'new')
                    || (filter.isModern && getSimpleBookAge(book.publishedYear) === 'modern')
                    || (filter.isVintage && getSimpleBookAge(book.publishedYear) === 'vintage')
                )   
            }

            if(!(!filter.isLightReading && !filter.isDescentReading && !filter.isSeriousReading)){
                books = books.filter(book => (filter.isLightReading && getSimplePageAmount(book.pageCount) === 'light')
                    || (filter.isDescentReading && getSimplePageAmount(book.pageCount) === 'descent')
                    || (filter.isSeriousReading && getSimplePageAmount(book.pageCount) === 'serious')
                )   
            }

            if(filter.maxAmount || filter.maxAmount===0){
                books = books.filter(book => filter.maxAmount >= book.listPrice.amount)
            }

            if(filter.onSale){
                books = books.filter(book => book.listPrice.isOnSale)
            }

            return books
        })
}

// return book by the id it gets
function get(bookId) {
    return storageService.get(BOOK_KEY, bookId)
    .then(_setNextPrevBookId)
}

// remove book by the id it gets
function remove(bookId) {
    return storageService.remove(BOOK_KEY, bookId)
}

//save changes on book (book with id), and creates book if it doesn't have one
function save(book) {
    if (book.id) {
        return storageService.put(BOOK_KEY, book)
    } else {
        return storageService.post(BOOK_KEY, book)
    }
}

// returns defualt filter settings
function getDefaultFilter() {
    return { title: '',
        maxAmount: Number.MAX_SAFE_INTEGER,
        onSale: false,
        category: 'All',
        isNew: false,
        isModern: false, 
        isVintage: false,
        isLightReading: false,
        isDescentReading: false,
        isSeriousReading: false,
        }
}

function getFilterFromParams(searchParams){
    const title = searchParams.get('title') || ''
    const maxAmount = parseInt(searchParams.get('maxAmount')) || Number.MAX_SAFE_INTEGER
    const onSale = searchParams.get('onSale') ? true : false
    const category = searchParams.get('category') || 'All'
    const isNew = searchParams.get('isNew') ? true : false
    const isModern = searchParams.get('isModern') ? true : false
    const isVintage = searchParams.get('isVintage') ? true : false
    const isLightReading = searchParams.get('isLightReading') ? true : false
    const isDescentReading = searchParams.get('isDescentReading') ? true : false
    const isSeriousReading = searchParams.get('isSeriousReading') ? true : false
    

    return {
        title,
        maxAmount,
        onSale,
        category,
        isNew,
        isModern,
        isVintage,
        isLightReading,
        isDescentReading,
        isSeriousReading
    }

}

function getEmptyBook(){
    return {title: '',
        author: '',
        publishedYear: utilService.getTodaysYear(),
        description: '',
        pageCount: 0,
        category: '',
        listPrice: {amount: 0, isOnSale: false},
        coverImage: `./assets/BooksImages/${Math.ceil(Math.random()*20)}.jpg`
    }
}

// returns the price of the most expensive book on the list
async function getTopBookPrice(){
    const books = await storageService.query(BOOK_KEY)
    const maxPrice = books.reduce((accumulator, book)=>{
        const bookPrice = book.listPrice.amount
        return (bookPrice > accumulator) ? bookPrice : accumulator
    },0)
    return maxPrice
}

function getCategories(){
    return  ['Love', 'Fiction', 'Poetry', 'Computers', 'Religion']

}

function getSimpleBookAge(publishedYear){
    const thisYear = new Date().getFullYear()
    const yearsSinceRelease = thisYear - publishedYear

    if(yearsSinceRelease <= 3){
        return 'new'
    }
    else if(yearsSinceRelease > 20){
        return 'vintage'
    }
    return 'modern'
}

function getSimplePageAmount(pageCount){
    if(pageCount < 200){
        return 'light'
    }
    else if(pageCount < 500){
        return 'descent'
    }
    return 'serious'
}


// Hard Coded Books TEMPORARY Function!
function getDemoBooks(){
    const book1 = {
        id: 'id-1',
        title: 'title-1',
        author: 'author-1',
        publishedYear: 2001,
        description: 'description-1',
        pageCount: 100,
        category: 'Romance',
        listPrice: {
            amount: 100,
            isOnSale: false
        },
        coverImage: `./assets/BooksImages/1.jpg`
    }
    const book2 = {
        id: 'id-2',
        title: 'title-2',
        author: 'author-2',
        publishedYear: 2002,
        description: 'description-2',
        pageCount: 200,
        category: 'Fantasy',
        listPrice: {
            amount: 200,
            isOnSale: true
        },
        coverImage: `./assets/BooksImages/2.jpg`
    }
    const book3 = {
        id: 'id-3',
        title: 'title-3',
        author: 'author-3',
        publishedYear: 2003,
        description: 'description-3',
        pageCount: 300,
        category: 'Science Fiction',
        listPrice: {
            amount: 300,
            isOnSale: false
        },
        coverImage: `./assets/BooksImages/3.jpg`
    }

    return [book1, book2, book3]
}

async function addDoesBookExist(bookList) {
    const storageBooks = await query()
    const updatedList = bookList.map(book => {
        const exist = storageBooks.some(storageBook => storageBook.id === book.id)
        return { ...book, doesExist: exist }
    })
    return updatedList
}


function addGoogleBook(book){
    return storageService.post(BOOK_KEY, book)
}

//  Privet functions

// if no DB, creates you new one with 3 defult books
function _createDefultBooks() {
    if(!storageService.isEntityExist(BOOK_KEY)){
        const numOfBooks = 100
        const ctgs = getCategories()
        const books = []
        for (let i = 0; i < numOfBooks; i++) {
            const book = {
                id: utilService.makeId(),
                title: utilService.makeLorem(2),
                author: utilService.makeLorem(1),
                publishedYear: utilService.getRandomIntInclusive(1950, 2024),
                description: utilService.makeLorem(100),
                pageCount: utilService.getRandomIntInclusive(20, 600),
                category: ctgs[utilService.getRandomIntInclusive(0, ctgs.length - 1)],
                listPrice: {
                    amount: utilService.getRandomIntInclusive(20, 300),
                    isOnSale: Math.random() > 0.7
                },
                coverImage: `./assets/BooksImages/${Math.ceil(Math.random()*20)}.jpg` // temporary
            }
            books.push(book)
        }
        utilService.saveToStorage(BOOK_KEY, books)
    }
    
}

// give book next and perv bookIds
function _setNextPrevBookId(book) {
    return query().then((books) => {
        const bookIdx = books.findIndex((currBook) => currBook.id === book.id)
        const nextBook = books[bookIdx + 1] ? books[bookIdx + 1] : books[0]
        const prevBook = books[bookIdx - 1] ? books[bookIdx - 1] : books[books.length - 1]
        book.nextBookId = nextBook.id
        book.prevBookId = prevBook.id
        return book
    })
}


