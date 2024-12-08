import { bookService } from "../services/book.service.js"
import { googleBookService } from "../services/googleBookService.js"

const { useEffect, useState } = React

export function BookAdd(){

    const [bookList, setBookList] = useState(null)
    const [loading, setLoding] = useState(true)

    useEffect(()=>{
        loadBooks()

    }, [])

    async function loadBooks(){
        let books = await googleBookService.query()
        books = await bookService.addDoesBookExist(books)
        setBookList(books)
        setLoding(false)
    }

    async function onAddButton(book){
        await bookService.addGoogleBook(book)
        const updatedList = await bookService.addDoesBookExist(bookList)
        setBookList(updatedList)
    }


    function onSearchBook(event){
        event.preventDefault()
    }

    if(loading){
        return <h1>Loading...</h1>
    }

    return(
        <section className="book-add">

            <form onSubmit={onSearchBook}>
                <input type="txt"></input>
                <button>Submit</button>
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
            </form>
            
        </section>
    )
}