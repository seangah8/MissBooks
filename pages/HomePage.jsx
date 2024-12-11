const { useState, useEffect } = React
const { Link } = ReactRouterDOM


export function HomePage() {
    return (
        <section className="home">

        <video
            autoPlay
            loop
            muted
            className="background-video"
            src="https://videos.pexels.com/video-files/9568942/9568942-uhd_2732_1440_25fps.mp4">
        </video>
            

            <section className="welcome">

                <h2 className="title">MissBooks</h2>

                <p className="paragraph">Welcome to MissBooks, where every book is
                a new adventure! From thrilling mysteries to timeless classics,
                the perfect story awaits.
                Your next great read is just a click away:</p>

                <Link className="link" to="/book">Start Exploring Now!</Link>
            </section>

            <div className="fading"></div>

            <section className="extras">         

                <div className="extra-title">
                    <h1>BOOKS IGNITE ENDLESS CURIOSITY</h1>
                </div>

                <div className="extra-image">
                    <img src="https://www.goodnet.org/photos/281x197/37822_hd.jpg"/>
                </div>

                <div className="extra-paragraph">
                    <p>Reading books is a gateway to endless possibilities.
                    Each page invites you into a world of imagination,
                    adventure, and knowledge. Whether you're seeking to
                    escape into thrilling stories or expand your
                    understanding of the world, books are the perfect
                    companions. They inspire creativity, spark curiosity,
                    and nurture the soul. Through reading, we connect
                    with ideas, cultures, and emotions that transcend
                    time and place. Every book has the power to teach,
                    heal, and transform, offering wisdom and joy with every
                    turn of the page. In the quiet moments spent reading,
                    we discover more about ourselves and the world around us.
                    A library is more than a collection of books; its
                    a treasure trove of dreams waiting to be explored.
                    Step inside, find a cozy corner, and let a book
                    take you on an unforgettable journey.
                    Your next adventure is just a story away!</p>
                </div>
            </section>

           


            


       </section>
    )
}

