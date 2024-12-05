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
            

            <div className="welcome">

                <h2 className="title">MissBooks</h2>

                <p className="paragraph">Welcome to MissBooks, where every book is
                a new adventure! From thrilling mysteries to timeless classics,
                the perfect story awaits.
                Your next great read is just a click away:</p>

                <Link className="link" to="/book">Start Exploring Now!</Link>
            </div>

            <div className="decoration">

                <div className="dec-1">
                    <p>hello</p>
                </div>

                <div className="dec-2">
                    <p>hello</p>
                </div>

                <div className="dec-3">
                    <p>hello</p>
                </div>

                <div className="dec-4">
                    <p>hello</p>
                </div>

                <div className="dec-5">
                    <p>hello</p>
                </div>
            </div>

           


            


       </section>
    )
}

