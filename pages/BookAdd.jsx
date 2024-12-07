import { bookService } from "../services/book.service.js"

const { useEffect, useState } = React

export function BookAdd(){

    const [bookList, setBookList] = useState(null)
    const [loading, setLoding] = useState(true)

    useEffect(()=>{
        loadBooks()

    }, [bookList])

    async function loadBooks(){
        let books = await bookService.getDemoBooks()
        books = await bookService.addDoesBookExist(books)
        setBookList(books)
        setLoding(false)
    }

    async function onAddButton(book){
        await bookService.addGoogleBook(book)
        book.doesExist = true
    }

    if(loading){
        return <h1>Loading...</h1>
    }

    return(
        <section className="book-add">

            <ul>
                {
                    bookList.map(book => 
                        <li key={book.id}>
                            <h2>{book.title}</h2>
                            <button 
                                disabled={book.doesExist}
                                onClick={()=>onAddButton(book)}>+
                            </button>
                            {book.doesExist? <p>book alredy been added</p>: ''}
                        </li>
                    )
                }
            </ul>
            
        </section>
    )
}