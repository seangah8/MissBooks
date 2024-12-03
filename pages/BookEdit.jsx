import { bookService } from "../services/book.service.js"
import { utilService } from "../services/util.service.js"

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
            .then(() => navigate('/book'))
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

            <button onClick={onBack}>Back</button>

            <h1>{bookId ? 'Edit' : 'Add'} Book</h1>
            <form onSubmit={onSaveBook}>

                <label htmlFor="title">Title:</label>
                <input onChange={handleChange} value={title} type="text" name="title" id="title" />

                <label htmlFor="category">Category: </label>
                <select onChange={handleChange} value={category} name="category" id="category">
                    {
                        categories.map((category, key) =>
                            <option key={key} value={`${category}`}>{category}</option>
                        )
                    }
                </select>

                <img src={coverImage}/>

                <label htmlFor="description">Description:</label>
                <textarea onChange={handleChange} value={description} type="text" name="description" id="description" />

                <label htmlFor="author">Author:</label>
                <input onChange={handleChange} value={author} type="text" name="author" id="author" />

                <label htmlFor="published-year">Published Year:</label>
                <input onChange={handleChange} value={publishedYear} type="number" name="publishedYear" id="published-year"
                    onBlur={({ target }) => setBookToEdit(prev => ({ ...prev, publishedYear: correctUnvalidYear(target.value) }))} />

                <label htmlFor="page-count">Page Count:</label>
                <input onChange={handleChange} value={pageCount} type="number" name="pageCount" id="page-count" />

                <label htmlFor="amount">Amount:</label>
                <input onChange={handleChange} value={amount} type="number" name="amount" id="amount" />

                <label htmlFor="on-sale">On Sale:</label>
                <input onChange={handleChange} checked={isOnSale} type="checkbox" name="isOnSale" id="on-sale" />

                <button>Save</button>
            </form>
        </section>
    )
}