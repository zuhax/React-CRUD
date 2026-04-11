import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import './styles/BookDetail.css'

function BookDetail() {
  const [ bookList, setBookList ] = useState(null)
  const { slug } = useParams()
  useEffect(() => {
    fetch('http://localhost:3000/api/get-book-list')
    .then( res => res.json())
    .then( data => setBookList(data.data) )
  }, [])
  const bookDetail = bookList?.find( item => ( item.title === slug || item.title === slug.charAt(0).toUpperCase() + slug.slice(1)) )
  if (!bookList) return (
    <>
      <p>Loading Data...</p>
    </>
  )
  return(
    <>
      <section className="book-detail-section">
        <div className="book-detail-container">
          <div className="book-content-header">
            <div id="book-cover">
              <img src="" alt="" />
            </div>
            <div className="book-information">
              <div className="information">
                <div id="book-title">Judul: { bookDetail?.title }</div>
                <div id="book-genre">{ bookDetail?.genre }</div>
              </div>
              <button id="pinjam-button">Pinjam</button>
            </div>
          </div>
          <div className="book-content-body">
            <div id="book-description">
              <hr />
              <p>Deskripsi:</p>
              <br />
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            </div>
          </div>
          { /*JSON.stringify(bookDetail)*/ }
          <p>{slug}</p>
        </div>
      </section>
    </>
  )
}

export default BookDetail