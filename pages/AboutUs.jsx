
const { useState } = React

export function AboutUs(){

    const [msgOpen,setMsgOpen] = useState(false)

    function onOpenToggel(){
        setMsgOpen(pev => !pev)
    }


    return(
        <section className="about-us">

            <div 
            className={msgOpen?"msg-background open":"msg-background"}
            onClick={onOpenToggel}
            >
                <h1 className={msgOpen?"title open":"title"}>
                    {msgOpen?"About Us":"About Us?"}</h1>

                {
                msgOpen?<p>Welcome to MissBooks, where stories come to life
                and readers find their perfect match!
                Founded by a team of passionate bibliophiles,
                MissBooks was created to bring the joy of
                reading to everyone, everywhere. Our company
                prides itself on offering a vast and thoughtfully
                curated selection of books, from beloved classics
                to the latest bestsellers, ensuring theres
                something for every taste and age. Were more than
                just a bookstore—we’re a community dedicated to
                celebrating the magic of reading and the authors
                who create it. At MissBooks, we combine our love for
                literature with a commitment to exceptional customer
                service, making your shopping experience as enjoyable
                as the stories you’ll discover.
                Join us in our mission to connect the world
                through the power of books. Let’s turn pages,
                spark imaginations, and share the love of reading
                together!</p> : ''
                }
            </div>
            
            
        </section>
        
    )
}