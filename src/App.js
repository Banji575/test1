import logo from './logo.svg';
import './App.css';
import { Header } from './components/Header';
import { BooksList } from './components/BooksList';
import { useCallback, useEffect, useState } from "react"

function App() {
  const [bookKeyWord, setBookKeyWord] = useState('')
  const [bookData, setBookData] = useState(null)
  const [bookDataFilter, setBookDataFilter] = useState(null)
  const [bookFilter, setBookFilter] = useState('all')
  const [isLoading, setIsLoading] = useState(false)

  const filterBook = () => {
    console.log(bookFilter)
    if (bookFilter !== 'all') {
      const bookFilterArr = bookData.items.filter((book) => {
        console.log(book.volumeInfo.categories.includes(bookFilter))
      })
      setBookDataFilter(bookFilterArr)
      //console.log(bookFilter, 'rerer')
    }
    else {
      setBookDataFilter(bookData)
      console.log(bookFilter, 'rerer')
    }
  }
  const onChangeFilter = (filter) => {
    setBookDataFilter(filter)
    filterBook()
  }

  useEffect(() => {
    if (bookKeyWord === "") return
    fetch(`https://www.googleapis.com/books/v1/volumes?q=${bookKeyWord}&key=AIzaSyDwUpMRt-K6uh89hU4Pu3775c4RECpvTK8`)
      .then((data) => data.json())
      .then((books) => {
        console.log(books)
        setBookData(books)
        filterBook()
        setIsLoading(false)
      })
  }, [bookKeyWord])
  const search = (name) => {

    const url = `https://www.googleapis.com/books/v1/volumes?q=${name}&key=AIzaSyDwUpMRt-K6uh89hU4Pu3775c4RECpvTK8`
    setBookKeyWord(name)
  }
  const Content = isLoading ? <div>Loading</div> : <BooksList books={bookDataFilter} />

  return (
    <div className="App">
      <Header search={search} startSearch={setIsLoading}
        onChangeFilter={onChangeFilter} />
      {Content}
    </div>
  );
}

export default App;

