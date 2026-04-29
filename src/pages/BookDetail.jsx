import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import './styles/BookDetail.css'

function BookDetail() {
  const navigate = useNavigate()
  const [ bookList, setBookList ] = useState(null)
  const { slug } = useParams()
  const handleToPinjamPage = () => { navigate(`/books/${slug}/borrow`) }
  useEffect(() => {
    fetch('http://localhost:3000/api/get-book-list')
    .then( res => res.json())
    .then( data => setBookList(data.data) )
  }, [])
  const bookDetail = bookList?.find( item => ( item.kebabTitle === slug || item.title === slug.charAt(0).toUpperCase() + slug.slice(1)) )
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
                <div className="detail-book-title">Judul: { bookDetail?.title }</div>
                <div className="detail-book-genre">{ bookDetail?.genre }</div>
              </div>
              <div className="button-wrapper">
                <button id="pinjam-button" onClick={handleToPinjamPage}>Pinjam</button>
              </div>
            </div>
          </div>
          <div className="book-content-body">
            <div id="book-description">
              <hr />
              <p>Deskripsi:</p>
              <br />
              <p>{ bookDetail?.description}</p>
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