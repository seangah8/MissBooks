import { utilService } from './util.service.js'

export const googleBookService = {
    query,
    
}

async function query(txt){


    // get book list from google
    const response = await fetch('https://www.googleapis.com/books/v1/volumes?printType=books&q=effective%20javascript')
    const booksApiStr = await response.json()
    
    const bookList = booksApiStr.items.map(apiBook =>
         _convertToFittingObject(apiBook))

    console.log('called api')

    // filter the list
    if(txt){
        const regExp = new RegExp(txt, "i");
        return bookList.filter(book => regExp.test(book.title))
    }

    return bookList
}

function _convertToFittingObject(apiBookObj){
    return {
        id: apiBookObj.id,
        title: apiBookObj.volumeInfo.title || 'Untitled',
        author: apiBookObj.volumeInfo.authors ? apiBookObj.volumeInfo.authors[0] : 'Unknown',
        publishedYear: utilService.convertDateToYear(apiBookObj.volumeInfo.publishedDate) || 2000,
        description: apiBookObj.volumeInfo.description || 'no description',
        pageCount: apiBookObj.volumeInfo.pageCount || 0,
        category: apiBookObj.volumeInfo.category || 'Unknown',
        listPrice: {amount: utilService.getRandomIntInclusive(20, 300),
                    isOnSale: Math.random() > 0.7},
        coverImage:  apiBookObj.volumeInfo.imageLinks?
                    apiBookObj.volumeInfo.imageLinks.thumbnail : './assets/BooksImages/defult-cover.png',
        reviews: [], // adding zero reviews as defult
    }   

}




