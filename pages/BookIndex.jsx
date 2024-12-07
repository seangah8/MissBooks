import { bookService } from '../services/book.service.js'
import { BookList } from '../cmps/BookList.jsx'
import { BookFilter } from '../cmps/BookFilter.jsx'
import { showSuccessMsg } from "../services/event-bus.service.js"
import { utilService } from '../services/util.service.js'

const { useState, useEffect } = React
const { Link, useSearchParams } = ReactRouterDOM

export function BookIndex(){

    const [searchParams, setSearchParams] = useSearchParams()

    const [bookList,setBookList] = useState(null)
    const [filter, setFilter] = useState( bookService.getFilterFromParams(searchParams))
    const [maxBookPrice, setMaxBookPrice] = useState(0)

    
    useEffect(() => { 
        setSearchParams(utilService.getTruthyValues(filter))
        loadBooks()
    },[filter])

    function loadBooks() {
        bookService.query(filter)
        .then(books => {
            setBookList(books)
        })
        .catch(err => {
            console.log('Failed Loading Books: ',err)
        })
        loadMaxPrice()    
    }
    
    function loadMaxPrice(){
        bookService.getTopBookPrice().then(setMaxBookPrice)
    }

    function onSetFilter(newFilter){
        setFilter(prevFilter => ({ ...prevFilter, ...newFilter}))
    }

    function onRemoveBook(bookId){
        bookService.get(bookId).then(book=>{
            bookService.remove(bookId).then(()=>{
                showSuccessMsg(`Revomed "${book.title}" Successfuly!`)
                loadBooks()
            })
        })
        
    }

    if(!bookList || !filter){
        return <h1>Loading List...</h1>
    }

    return(
        <section className='book-index'>
            <BookFilter filter={filter} onSetFilter={onSetFilter} maxPrice={maxBookPrice}/>
            <button className='add-book-button'><Link to="/book/edit">Add Book +</Link></button>
            <BookList books={bookList} onRemoveBook={onRemoveBook}/>
        </section>
    )
}