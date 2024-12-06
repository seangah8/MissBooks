const { useState } = React

export function LongText({ txt, length=100}) {

    const [readMore, setReadMore] = useState(false)

    function onToggelReadMore(){
        setReadMore(!readMore)
    }

    return (
        <section className="long-text">
            <p onClick={onToggelReadMore}>
                {readMore? txt: txt.slice(0,length)}
                {readMore? '' : <span > ...read more</span>}
            </p>
            
        </section> 
    )
}
