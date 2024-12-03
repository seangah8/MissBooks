import { bookService } from "../services/book.service.js"
import { LongText } from "../cmps/LongText.jsx"

const { useEffect, useState } = React
const { useParams, useNavigate, Link } = ReactRouterDOM

export function BookDetails(){

    const [book,setBook] = useState(null)
    const navigate = useNavigate()
    const params = useParams()

    useEffect(()=>{
        loadBook()
    },[params.bookId])

    function loadBook(){
        bookService.get(params.bookId).then(setBook)
    }

    function onBack() {
        navigate('/book')
    }

    function pageCountSimplify(){
        const str = bookService.getSimplePageAmount(book.pageCount)
        return `${str.charAt(0).toUpperCase()+ str.slice(1)} Reading`
    }

    function publishDateSimplify(){
        const str = bookService.getSimpleBookAge(book.publishedYear)
        return `${str.charAt(0).toUpperCase()+ str.slice(1)}`
    }

    if(!book){
        return <h1>Loding...</h1>
    }

    return (
        <section className="book-details">
            <button onClick={onBack}>Back</button>

            <h1 className="header">{book.title} (author: {book.author})</h1>
            <h1>{book.category}, {publishDateSimplify()}, {pageCountSimplify()}</h1>
            <img src={book.coverImage}/>
            <LongText txt={book.description}/>
            <h1>Price: {book.listPrice.amount +' '}
                {book.listPrice.isOnSale? 'On Sale!':'Not for sale right now..'}
            </h1> {/* make it a sigh later */}

            
            <section>
                <button><Link to={`/book/${book.prevBookId}`}>Prev Book</Link></button>
                <button><Link to={`/book/${book.nextBookId}`}>Next Book</Link></button>
            </section>
        </section>
    )
}