import logo from './logo.svg';
import './App.css';
import { Header } from './components/Header';
import { BooksList } from './components/BooksList';
import { useCallback, useEffect, useState } from "react"

function App() {
  const [bookKeyWord, setBookKeyWord] = useState('')
  const [bookData, setBookData] = useState(null)
  const [bookDataFilter, setBookDataFilter] = useState([])
  const [bookFilter, setBookFilter] = useState('all')
  const [isLoading, setIsLoading] = useState(false)

  const filterBook = () => {
    console.log(bookFilter)
    if (bookFilter !== 'all') {
      const bookFilterArr = bookData.items.filter((book) => {
        console.log(book.volumeInfo.categories.includes(bookFilter))
      })
      setBookDataFilter(bookFilterArr)
    }
    else {
      setBookDataFilter(bookData)
    }
  }
  const onChangeFilter = (filter) => {
    if (!bookData) return
    if (filter === 'all') {
      setBookDataFilter(bookData.items)
    } else {

      const newArr = bookData.items.filter((item, index, arr) => {
        return item.volumeInfo.categories.includes(filter)
      })
      setBookDataFilter(newArr)
    }


  }

  useEffect(() => {
    onChangeFilter(bookFilter)
  }, [bookData])


  useEffect(() => {
    if (bookKeyWord === "") return
    fetch(`https://www.googleapis.com/books/v1/volumes?q=${bookKeyWord}&key=AIzaSyDwUpMRt-K6uh89hU4Pu3775c4RECpvTK8`)
      .then((data) => data.json())
      .then((books) => {
        setBookData(books)

        setIsLoading(false)
      })
  }, [bookKeyWord])
  const search = (name) => {

    // const url = `https://www.googleapis.com/books/v1/volumes?q=${name}&key=AIzaSyDwUpMRt-K6uh89hU4Pu3775c4RECpvTK8`
    setBookKeyWord(name)
  }
  const Content = isLoading ? <div>Loading</div> : <BooksList books={bookDataFilter} />

  return (
    <div className="App">
      <Header
        search={search}
        startSearch={setIsLoading}
        onChangeFilter={onChangeFilter} />
      {Content}
    </div>
  );
}

export default App;

