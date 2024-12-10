import { bookService } from "../services/book.service.js"
import { utilService } from "../services/util.service.js"
import { googleBookService } from "../services/googleBookService.js"
import { showSuccessMsg } from "../services/event-bus.service.js"

const { useEffect, useState, useRef } = React

export function BookAdd(){

    const [googleBookList, setGoogleBookList] = useState([])
    const [missBookList, setMissBookList] = useState([])

    const onSetListDebounce = useRef(
        utilService.debounce(onChangeTitle)).current

    useEffect(() => {
        loadBooks()
    }, [])

    function loadBooks(){
        bookService.query().then(setMissBookList)
        googleBookService.query().then(setGoogleBookList)
    }

    async function onAddButton(event, gbook) {
        event.preventDefault()
        await bookService.addGoogleBook(gbook)
        setMissBookList(prevList => [gbook, ...prevList])
        showSuccessMsg(`"${gbook.title}" Was Successfully Added!`)
    }

    function inMissBookList(bookId) {
        return missBookList.some(book => book.id === bookId)
    }

    function onChangeTitle({ target }) {
        googleBookService.query(target.value)
        .then(setGoogleBookList)
    }



    // if(!googleBookList.length){
    //     return <h1>Loading...</h1>
    // }

    return(
        <section className="book-add">

            <form>
                <label htmlFor="title">Search Book: </label>
                <input 
                onChange={ onSetListDebounce } 
                type="text" 
                id="title"
                className="title"/>

                <ul>
                    {
                        googleBookList.map(gbook => {
                            const alreadyInList = inMissBookList(gbook.id)

                            return <li key={gbook.id}>
                                <h2>{gbook.title}</h2>
                                <button 
                                    disabled={alreadyInList}
                                    onClick={event => onAddButton(event, gbook)}>+
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