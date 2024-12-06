import { bookService } from "../services/book.service.js"
import { utilService } from "../services/util.service.js"

const { useState, useEffect, useRef } = React

export function BookFilter({filter, onSetFilter, maxPrice}){

    const [filterToEdit, setFilterToEdit] = useState(filter)
    const onSetFilterDebounce = useRef(utilService.debounce(onSetFilter)).current


    useEffect(()=>{
        onSetFilterDebounce(filterToEdit)
    },[filterToEdit])

    function handleChange({ target }) {
        let { value, name: field } = target
        switch (target.type) {
            case 'range': 
                value = +target.value
                break
            case 'checkbox':
                value = target.checked
                break
        }
        setFilterToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))
    }

    function handleMaxAmountNumber(maxAmount){
        if(maxAmount===Number.MAX_SAFE_INTEGER || maxAmount>maxPrice){
            return maxPrice
        } 
        else{
            return maxAmount
        }
    }

    function onSubmitFilter(event) {
        // event.preventDefault()
        // console.log(filterToEdit)
        // onSetFilter(filterToEdit)
    }

    const { title,
        maxAmount,
        onSale,
        author, 
        category,
        isNew, 
        isModern, 
        isVintage,
        isLightReading,
        isDescentReading,
        isSeriousReading,

    } = filterToEdit

    const categories = bookService.getCategories()

    return(
        <section className="book-filter">
            <h1>Book Filter</h1>
            <form onSubmit={onSubmitFilter}> 


                <h5>- Title -</h5>
                
                <label htmlFor="title"/>
                <input 
                value={title} 
                onChange={handleChange} 
                type="text" 
                name="title" 
                id="title"
                className="title"/>

                <h5>- Author -</h5>   

                <label htmlFor="author"/>
                <input 
                value={author} 
                onChange={handleChange} 
                type="text" 
                name="author" 
                id="author"
                className="author" />

                <h5>- Category -</h5>

                <label htmlFor="category"/>
                <select 
                onChange={handleChange} 
                value={category} 
                name="category" 
                id="category"
                className="category">
                    <option value='All'>All</option>
                    {
                        categories.map((category, key) =>
                            <option key={key} value={`${category}`}>{category}</option>
                        )
                    }
                </select>
                
                <section className="book-age-filter">

                    <h5>- Age -</h5>

                    <div className="selection">
                        <label htmlFor="is-new">New</label>
                        <input 
                        value={isNew} 
                        onChange={handleChange} 
                        type="checkbox" 
                        name="isNew" 
                        id="is-new"/>
                    </div>
                    
                    <div className="selection">
                        <label htmlFor="is-modern">Modern</label>
                        <input 
                        value={isModern} 
                        onChange={handleChange} 
                        type="checkbox" 
                        name="isModern" 
                        id="is-modern"/>
                    </div>
                    
                    <div className="selection">
                        <label htmlFor="is-vintage">Vintage</label>
                        <input 
                        value={isVintage} 
                        onChange={handleChange} 
                        type="checkbox" 
                        name="isVintage" 
                        id="is-vintage" />
                    </div>
                    
                
                </section>  


                <section className="book-page-amount-filter">

                    <h5>- Reading Quantity -</h5>

                    <div className="selection">
                        <label htmlFor="is-light-reading">Light</label>
                        <input 
                        value={isLightReading} 
                        onChange={handleChange} 
                        type="checkbox" 
                        name="isLightReading" 
                        id="is-light-reading" />
                    </div>

                    
                    <div className="selection">
                        <label htmlFor="is-descent-reading">Descent</label>
                        <input 
                        value={isDescentReading} 
                        onChange={handleChange} 
                        type="checkbox" 
                        name="isDescentReading" 
                        id="is-descent-reading" />
                    </div>
                    
                    <div className="selection">
                        <label htmlFor="is-serious-reading">Serious</label>
                        <input 
                        value={isSeriousReading} 
                        onChange={handleChange} 
                        type="checkbox" 
                        name="isSeriousReading" 
                        id="is-serious-reading" />
                    </div>
                </section>  
                
                <h5>- Maximum Price -</h5>
                <div className="max-amount">
                    <label 
                        htmlFor="maxAmount">
                        {handleMaxAmountNumber(maxAmount)} ₪
                    </label>
                    <input 
                    value={maxAmount} 
                    onChange={handleChange} 
                    min={0} 
                    max={maxPrice} 
                    type="range" 
                    name="maxAmount"
                    id="maxAmount"/>  
                </div>

                <h5>- Sale -</h5>
                
                <div className="selection">
                    <label htmlFor="onSale">On Sale: </label>
                    <input 
                    value={onSale} 
                    onChange={handleChange} 
                    type="checkbox" 
                    name="onSale" 
                    id="onSale"
                    className="on-sale"/>
                </div>
                 

                {/* <button>Submit</button> */}
            </form>
        </section>
    )
}