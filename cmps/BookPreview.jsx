export function BookPreview({id, title, amount, onSale, coverImage}){
    return(
        <div className="book-preview">
            <p className="title">{`${title}`}</p>
            <div className="total-image">
                {coverImage? <img src={coverImage}/>:<img src={'../assets/BooksImages/defult-cover.png'}/>}
                {onSale?<p className="on-sale">On Sale!</p>:''}
            </div>
            <p className="price">{`${amount}₪`}</p>
            
        </div>
    )
}