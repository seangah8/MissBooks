import { utilService } from './util.service.js'

export const googleBookService = {
    query,
    
}


async function query(){
    const booksApiStr = await getBooksApi()
    const bookList = booksApiStr.items.map(apiBook =>
         _convertToFittingObject(apiBook))

    return bookList

    
}

function getBooksApi(){
    console.log('asking api')
    return new Promise(resolve => {
        const xhr = new XMLHttpRequest()

        xhr.onreadystatechange = () => {
            if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200){
                const answer = JSON.parse(xhr.responseText)
                resolve(answer)
            }
        }
    
        xhr.open('GET', 'https://www.googleapis.com/books/v1/volumes?printType=books&q=effective%20javascript', true)
        xhr.send()
    })

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
    }

}




