import { AppHeader } from "./pages/AppHeader.jsx"
import { HomePage } from "./pages/HomePage.jsx"
import { BookIndex } from "./pages/BookIndex.jsx"
import { BookDetails } from "./pages/BookDetails.jsx"
import { BookEdit } from "./pages/BookEdit.jsx"
import { BookAdd } from "./pages/BookAdd.jsx"
import { AboutUs } from "./pages/AboutUs.jsx"
import { AppFooter } from "./pages/AppFooter.jsx"
import { NotFound } from "./pages/NotFound.jsx"
import { UserMassage } from "./cmps/UserMassage.jsx"

const Router = ReactRouterDOM.HashRouter
const { Routes, Route, Navigate } = ReactRouterDOM

export function RootCmp() {
    return (
        <Router>
            <section className="app main-layout">
                <AppHeader />
                <main>
                    <Routes>
                        <Route path="/" element={<Navigate to="/home" />} />
                        
                        <Route path="/home" element={<HomePage/>}/>
                        <Route path="/book" element={<BookIndex/>}/>
                        <Route path="/book/:bookId" element={<BookDetails/>}/>
                        <Route path="/book/edit" element={<BookEdit/>}/>
                        <Route path="/book/edit/:bookId" element={<BookEdit/>}/>
                        <Route path="/book/add" element={<BookAdd/>}/>
                        <Route path="/about" element={<AboutUs/>}/>

                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </main>
                <AppFooter/>
                <UserMassage/>
            </section>
        </Router>
    )
}