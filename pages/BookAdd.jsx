import { bookService } from "../services/book.service.js"
import { utilService } from "../services/util.service.js"
import { googleBookService } from "../services/googleBookService.js"

const { useEffect, useState, useRef } = React

export function BookAdd(){

    const [googleBookList, setGoogleBookList] = useState(null)
    const [missBookList, setMissBookList] = useState(null)
    const [titleToEdit, setTitleToEdit] = useState('')
    const [filteredGoogleList, setFilteredGoogleList] = useState(null)
    // const debouncedFilterListRef = useRef()

    useEffect(()=>{
        loadBooks()
        // debouncedFilterListRef.current = utilService.debounce(
            // () => filterList())
    }, [])

    useEffect(()=>{
        setFilteredGoogleList(googleBookList)
    },[googleBookList])


    useEffect(()=>{
        // debouncedFilterListRef.current()
        filterList()
    },[titleToEdit])

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

    function filterList(){
        // console.log(googleBookList) //null all the time!
        if(googleBookList && titleToEdit){
            const regExp = new RegExp(titleToEdit, 'i')
            const filteredList = googleBookList.filter(book => regExp.test(book.title))
            setFilteredGoogleList(filteredList)
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