import { bookService } from "../services/book.service.js"
import { utilService } from "../services/util.service.js"
import { googleBookService } from "../services/googleBookService.js"
import { showSuccessMsg } from "../services/event-bus.service.js"

const { useEffect, useState, useRef } = React
const {  useNavigate } = ReactRouterDOM

export function BookAdd(){

    const navigate = useNavigate()

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

    function onBack() {
        navigate('/book')
    }



    // if(!googleBookList.length){
    //     return <h1>Loading...</h1>
    // }

    return(
        <section className="book-add">

            <button className="back-button" onClick={onBack}>{`« Back`}</button>

            <form>
                <label htmlFor="title">Search Book: </label>
                <input 
                onChange={ onSetListDebounce } 
                type="text" 
                id="title"
                className="title"/>
            </form>

            <ul>
                {
                    googleBookList.map(gbook => {
                        const alreadyInList = inMissBookList(gbook.id)

                        return <li key={gbook.id}
                        className={alreadyInList?"gbook onlist":"gbook"}
                        onClick={alreadyInList?  null : (event => onAddButton(event, gbook))}>
                            
                            <div className="text">
                                <h2>{gbook.title}</h2>
                                {alreadyInList? <p>book alredy been added</p>: ''}
                            </div>
                            <img src={gbook.coverImage}/>
                        </li>
                    })
                }
            </ul>
            
        </section>
    )
}