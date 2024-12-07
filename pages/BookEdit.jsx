import { bookService } from "../services/book.service.js"
import { utilService } from "../services/util.service.js"
import { showSuccessMsg } from "../services/event-bus.service.js"

const { useState, useEffect } = React
const { useNavigate, useParams } = ReactRouterDOM

export function BookEdit() {

    const [bookToEdit, setBookToEdit] = useState(bookService.getEmptyBook)
    const navigate = useNavigate()
    const { bookId } = useParams()

    useEffect(() => {
        if (bookId) {
            loadBook()
        }
    }, [])

    function loadBook() {
        bookService.get(bookId).then(setBookToEdit)
    }

    function handleChange({ target }) {
        console.log(target)
        let { value, name: field } = target
        switch (target.type) {
            case 'number':
                value = +target.value
                break
            case 'checkbox':
                value = target.checked
                break
        }

        setBookToEdit((prevBook) => {
            if (prevBook.hasOwnProperty(field)) {
                return { ...prevBook, [field]: value }
            }
            else {
                const innerObj = utilService.underInnetObject(prevBook, field)
                return { ...prevBook, [innerObj]: { ...prevBook[innerObj], [field]: value } }
            }
        })
    }

    function onSaveBook(event) {
        event.preventDefault()
        bookService.save(bookToEdit)
            .then(() => {
                const successMsg = `"${bookToEdit.title}" Has Been Edited Successfuly!` 
                                            
                showSuccessMsg(successMsg)
                navigate('/book')
            })
    }

    function onBack() {
        navigate('/book')
    }

    function correctUnvalidYear(year) {
        const currantYear = utilService.getTodaysYear()

        if (year > currantYear) {
            return currantYear
        }
        else if (year < 1900) {
            return 1900
        }
        return year
    }

    if (bookId && !bookToEdit) {
        return <h1>Loading...</h1>
    }

    const {
        title,
        category,
        description,
        author,
        publishedYear,
        pageCount,
        coverImage,
        listPrice: { amount, isOnSale },

    } = bookToEdit

    const categories = bookService.getCategories()

    return (
        <section className="book-edit">

            <button className="back-button" onClick={onBack}>« Back</button>
            
            <section className="pop-up">
                <form onSubmit={onSaveBook}>

                    <h1 className="edit-add-title">Edit Book</h1>

                    <div>
                        <label htmlFor="title">Title:</label>
                        <input 
                        onChange={handleChange} 
                        value={title} 
                        type="text" 
                        name="title" 
                        id="title" 
                        className="title"/>
                    </div>

                    <div>
                        <label htmlFor="category">Category: </label>
                        <select 
                        onChange={handleChange} 
                        value={category} 
                        name="category" 
                        id="category"
                        className="category">
                            {
                                categories.map((category, key) =>
                                    <option key={key} value={`${category}`}>{category}</option>
                                )
                            }
                        </select>
                    </div>


                    <div className="description-textarea">
                        <label htmlFor="description">Description:</label>
                        <textarea 
                        onChange={handleChange} 
                        value={description} 
                        type="text" 
                        name="description" 
                        id="description" />
                    </div>
                    
                    <div>
                        <label htmlFor="author">Author:</label>
                        <input 
                        onChange={handleChange} 
                        value={author} 
                        type="text" 
                        name="author" 
                        id="author" 
                        className="author"/>
                    </div>
                    
                    <div>
                        <label htmlFor="published-year">Published Year:</label>
                        <input 
                        onChange={handleChange} 
                        value={publishedYear} 
                        type="number" 
                        name="publishedYear" 
                        id="published-year"
                        className="published-year"
                        onBlur={({ target }) => setBookToEdit(prev => 
                        ({ ...prev, publishedYear: correctUnvalidYear(target.value) }))} />
                    </div>
                    
                    <div>
                        <label htmlFor="page-count">Page Count:</label>
                        <input 
                        onChange={handleChange} 
                        value={pageCount} 
                        type="number" 
                        name="pageCount" 
                        id="page-count" 
                        className="page-count"/>
                    </div>
                    
                    <div>
                        <label htmlFor="amount">Price:</label>
                        <input 
                        onChange={handleChange} 
                        value={amount} 
                        type="number" 
                        name="amount" 
                        id="amount" 
                        className="amount"/>
                    </div>

                    <div>
                        <label htmlFor="on-sale">On Sale:</label>
                        <input 
                        onChange={handleChange} 
                        checked={isOnSale} 
                        type="checkbox" 
                        name="isOnSale" 
                        id="on-sale" />
                    </div>
                    
                    <button className="save-button">Save</button>
                </form>
                <img src={coverImage}/>
            </section>
            
        </section>
    )
}