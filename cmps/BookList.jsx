import { BookPreview } from "./BookPreview.jsx"

const { Link } = ReactRouterDOM

export function BookList({ books, onRemoveBook }){


    if(!books.length){
        return <h1>List empty, add more books to the list!</h1>
    }

    return(
        <ul className="book-list">
            {
                books.map((book,key) =>
                <li key={book.id}>
                    <article>
                        <BookPreview id={book.id}
                                    title={book.title}
                                    amount={book.listPrice.amount}
                                    onSale={book.listPrice.isOnSale}
                                    coverImage={book.coverImage}/>
                        <section>
                            <button onClick={() => onRemoveBook(book.id)}> Remove</button>
                            <button><Link to={`/book/${book.id}`}>Details</Link></button>
                            <button ><Link to={`/book/edit/${book.id}`}>Edit</Link></button>
                        </section>
                    
                    </article>
                </li>
                )
            }
            
        </ul>
        
    )
}