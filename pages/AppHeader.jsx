const { NavLink } = ReactRouterDOM

export function AppHeader() {

    return (
        <header className="app-header full main-layout">
            <section className="header-container">
                <img src="./assets/BooksImages/missbooks-icon.png"/>
                <nav className="app-nav">
                    <NavLink to="/home">Home</NavLink>
                    <NavLink to="/book">Books</NavLink>
                    <NavLink to="/about">About</NavLink>
                </nav>
            </section>
        </header>
    )
}
