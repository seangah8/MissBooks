import { utilService } from "../services/util.service.js"

const { useState } = React

export function BookReviews({bookReviews, onAddReview, onRemoveReview}) {

    const [reviewToEdit, setReviewToEdit] = useState({
        text: ''
    })

    function addReview(event){
        event.preventDefault()
        onAddReview(reviewToEdit)
        setReviewToEdit({text: ''})
    }

    function handleChange({ target }) {
        let { value, name: field } = target
        // switch (target.type) {}

        setReviewToEdit((prevReview) => ({ ...prevReview, [field]: value }))
    }

    const {text} = reviewToEdit

    return (
        <section className="book-reviews">
            <form onSubmit={addReview}>

                <label htmlFor="review">Add review: </label>
                <input onChange={handleChange} value={text} type="txt" name='text' id='text'/>

                <button>Submit</button>
            </form>

            <ul>
                {
                    bookReviews.map(review=>{
                        return <li key={review.id}>
                            <p>{review.text}</p>
                            <button onClick={()=>onRemoveReview(review.id)}>X</button>
                        </li>
                    })
                }
            </ul>
            
        </section> 
    )
}
