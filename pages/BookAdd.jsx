import { bookService } from "../services/book.service.js"
import { utilService } from "../services/util.service.js"
import { googleBookService } from "../services/googleBookService.js"

const { useEffect, useState, useRef } = React
const { useSearchParams } = ReactRouterDOM

export function BookAdd(){

    const [searchParams, setSearchParams] = useSearchParams()

    const [googleBookList, setGoogleBookList] = useState(null)
    const [missBookList, setMissBookList] = useState(null)
    const [titleToEdit, setTitleToEdit] = useState(bookService.getTitleFromParams(searchParams))
    const [filteredGoogleList, setFilteredGoogleList] = useState(null)
    // const debouncedFilterListRef = useRef()

    useEffect(() => {
        loadBooks()
    }, [])

    useEffect(() => {
        setSearchParams(utilService.getTruthyValues({ title: titleToEdit }))
    }, [titleToEdit])

    useEffect(() => {
        filterList()
    }, [googleBookList, titleToEdit])

    function loadBooks(){
        googleBookService.query().then(setGoogleBookList)
        bookService.query().then(setMissBookList)
    }

    async function onAddButton(book){
        await bookService.addGoogleBook(book)
        setMissBookList((prevMissBookList) =>
             [book, ...prevMissBookList])
    }

    function inMissBookList(bookId){
        return missBookList.some(book => book.id === bookId)
    }

    function onChangeTitle({ target }) {
        setTitleToEdit(target.value)
    }

    function filterList() {
        if (!googleBookList) return

        if (titleToEdit) {
            const regExp = new RegExp(titleToEdit, "i");
            const filteredList = googleBookList.filter((book) =>
                regExp.test(book.title))
            setFilteredGoogleList(filteredList)
        } else {
            setFilteredGoogleList(googleBookList) 
        }
    }


    if(!filteredGoogleList){
        return <h1>Loading...</h1>
    }
 
    const title = titleToEdit

    return(
        <section className="book-add">

            <form>
                <label htmlFor="title">Search Book: </label>
                <input 
                value={title} 
                onChange={onChangeTitle} 
                type="text" 
                name="title" 
                id="title"
                className="title"/>

                <ul>
                    {
                        filteredGoogleList.map(book => {
                            const alreadyInList = inMissBookList(book.id)

                            return <li key={book.id}>
                                <h2>{book.title}</h2>
                                <button 
                                    disabled={alreadyInList}
                                    onClick={()=>onAddButton(book)}>+
                                </button>
                                {alreadyInList? <p>book alredy been added</p>: ''}
                            </li>
                        })
                    }
                </ul>
            </form>
            
        </section>
    )
}