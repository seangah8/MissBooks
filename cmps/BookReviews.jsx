import { showErrorMsg } from "../services/event-bus.service.js"

const { useState } = React

export function BookReviews({bookReviews, onAddReview, onRemoveReview}) {

    const [reviewToEdit, setReviewToEdit] = useState(reviewToEditDefult())

    function addReview(event){
        event.preventDefault()
        if(!reviewToEdit.username){
            showErrorMsg("Must Enter Username!")
            return
        }
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

    if(!bookReviews){
        return <h1>Loding...</h1>
    }

    return (
        <section className="book-reviews">
            <form onSubmit={addReview}>
                <h2>Leave Review:</h2>
                <div>
                    <label htmlFor="username">User Name: </label>
                    <input 
                    onChange={handleChange} 
                    value={username} 
                    type="txt" 
                    name='username' 
                    className="username"
                    id='username'/>
                </div>

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
                                fontSize: "20px",
                                cursor: "pointer"
                            }}
                        >★
                        </span>
                    ))}
                </div>

                <textarea 
                onChange={handleChange} 
                value={text} 
                type="txt" 
                name='text' 
                placeholder="Add a review..."
                id='text'/>

                
                
                <button>Submit</button>
            </form>
            {!bookReviews[0]?<p className="no-reviews">This book yet has reviews..</p>:
                <ul>
                {
                    bookReviews.map(review=>{

                        return <li key={review.id}>
                            <div className="header">
                                <p className="review-username">{review.username}</p>
                                <div>
                                    <p className="review-date">{review.date}</p>
                                    <button className="review-remove" 
                                    onClick={()=>onRemoveReview(review.id)}>X</button>
                                </div>
                            </div>
                            
                            <p className="rating">
                                {
                                    [1,2,3,4,5].map(star => (
                                        <span key={star}
                                        style={{color: star <= review.rating ? "yellow" : "gray"}}>★
                                        </span>
                                    ))
                                    
                                }
                            </p>
                            <p className="text">{review.text}</p>
                            
                        </li>
                    })
                }
                </ul>
            }
            
            
        </section> 
    )
}
