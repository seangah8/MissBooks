import { bookService } from "../services/book.service.js"
import { LongText } from "../cmps/LongText.jsx"
import { BookReviews } from "../cmps/BookReviews.jsx"
import { utilService } from "../services/util.service.js"

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

    async function onAddReview(review){
        const newReview = {id: utilService.makeId(), ...review}
        book.reviews.unshift(newReview)
        const newReviews = book.reviews
        await bookService.save({...book,
             reviews: newReviews})
        loadBook()
    }

    async function onRemoveReview(reviewId){
        const filteredReviews = book.reviews.filter(rev =>
            rev.id !== reviewId)

        await bookService.save({...book,
             reviews: filteredReviews})

        loadBook()

    }


    if(!book){
        return <h1>Loding...</h1>
    }

    return (
        <section className="book-details">
            <button className="back-button" onClick={onBack}>{`« Back`}</button>
            <section className="pop-up">
                <section className="details">
                    <div className="header">
                        <h1 className="title">{book.title}</h1>
                        <h1 className="author"> author: {book.author}</h1>
                    </div>
                    <h1 className="second-header">{book.category} • {publishDateSimplify()} • {pageCountSimplify()}</h1>     
                    <LongText txt={book.description}/>
                    <h1 className="price">Price: {book.listPrice.amount +'₪'}</h1>
                    <h1 className="on-sale">{book.listPrice.isOnSale? 'On Sale!':''}</h1>
                </section>

                <img src={book.coverImage}/>

            </section>
            

            
            <section className="pre-next-buttons">
                <button className="previos"><Link to={`/book/${book.prevBookId}`}>«</Link></button>
                <button className="next"><Link to={`/book/${book.nextBookId}`}>»</Link></button>
            </section>

            <BookReviews bookReviews={book.reviews}
             onAddReview={onAddReview}
             onRemoveReview={onRemoveReview}/>

        </section>
    )
}