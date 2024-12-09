import { utilService } from "../services/util.service.js"

const { useState } = React

export function BookReviews({bookReviews, onAddReview, onRemoveReview}) {

    const [reviewToEdit, setReviewToEdit] = useState(reviewToEditDefult())

    function addReview(event){
        event.preventDefault()
        onAddReview(reviewToEdit)
        setReviewToEdit(reviewToEditDefult())
    }

    function reviewToEditDefult(){
        return {username: '', text: '', rating: 3}
    }

    function handleChange({ target }) {
        let { value, name: field } = target
        setReviewToEdit((prevReview) => ({ ...prevReview, [field]: value }))
    }

    function handleRating(rating) {
        setReviewToEdit((prevReview) => ({ ...prevReview, rating }));
    }

    const {username, rating, text} = reviewToEdit

    return (
        <section className="book-reviews">
            <form onSubmit={addReview}>

            <label htmlFor="username">User: </label>
                <input 
                onChange={handleChange} 
                value={username} 
                type="txt" 
                name='username' 
                id='username'/>

                <label htmlFor="review">Add review: </label>
                <textarea 
                onChange={handleChange} 
                value={text} 
                type="txt" 
                name='text' 
                id='text'/>

<div className="rating">
                    <label htmlFor="rating">Rating: </label>
                    {[1, 2, 3, 4, 5].map(star => (
                        <span
                            key={star}
                            className={`star ${star <= rating ? "selected" : ""}`}
                            onClick={() => handleRating(star)}
                            id='rating'

                            style={{
                                color: star <= rating ? "yellow" : "gray",
                            }}
                        >★
                        </span>
                    ))}
                </div>
                
                <button>Submit</button>
            </form>

            <ul>
                {
                    bookReviews.map(review=>{

                        return <li key={review.id}>
                            <p>{review.username}</p>
                            <p>{review.date}</p>
                            <p>
                                {
                                    [1,2,3,4,5].map(star => (
                                        <span key={star}
                                        style={{color: star <= review.rating ? "yellow" : "gray"}}>★
                                        </span>
                                    ))
                                    
                                }
                            </p>
                            <p>{review.text}</p>
                            <button onClick={()=>onRemoveReview(review.id)}>X</button>
                        </li>
                    })
                }
            </ul>
            
        </section> 
    )
}
