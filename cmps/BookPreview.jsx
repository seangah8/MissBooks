export function BookPreview({id, title, amount, onSale, coverImage}){
    return(
        <div className="book-preview">
            <p className="title">{`${title}`}</p>
            <div className="total-image">
                <img src={coverImage}/>
                {onSale?<p className="on-sale">On Sale!</p>:''}
            </div>
            <p className="price">{`${amount}₪`}</p>
            
        </div>
    )
}