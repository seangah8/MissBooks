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
            <button className="back-button" onClick={onBack}>{`« Back`}</button>
            <div className="pop-up">
                <div className="details">
                    <div className="header">
                        <h1 className="title">{book.title}</h1>
                        <h1 className="author"> author: {book.author}</h1>
                    </div>
                    <h1 className="second-header">{book.category} • {publishDateSimplify()} • {pageCountSimplify()}</h1>     
                    <LongText txt={book.description}/>
                    <h1 className="price">Price: {book.listPrice.amount +'₪'}</h1>
                    <h1 className="on-sale">{book.listPrice.isOnSale? 'On Sale!':''}</h1>
                </div>

                <img src={book.coverImage}/>

            </div>
            

            
            <section className="pre-next-buttons">
                <button className="previos"><Link to={`/book/${book.prevBookId}`}>«</Link></button>
                <button className="next"><Link to={`/book/${book.nextBookId}`}>»</Link></button>
            </section>
        </section>
    )
}