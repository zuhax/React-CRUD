import './styles/Home.css'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import BookCover from '../components/BookCover.jsx'

function Home() {
  const navigate = useNavigate()
  const [ accountUserName, setAccountUserName ] = useState()
  const [ bookList, setBookList ] = useState([])
  const [ bookTitleFocus, setBookTitleFocus ] = useState()
  
  useEffect(() => {
    fetch('http://localhost:3000/check-auth', { credentials : 'include' })
    .then( res => res.json() )
    .then( data => setAccountUserName(data.name) )
    fetch('http://localhost:3000/api/get-book-list')
    .then( res => res.json())
    .then( data => setBookList(data.data))
  }, [])
  
  const handleToDashboardPage = () => { navigate('/dashboard') }
  const handleToBookDetailPage = ({ title }) => {
    const slug = title.toLowerCase().replace(/\s+/g, '-');
    navigate('/book-detail/' + slug);
  }
  
  return(
    <main className="main-home">
      <div className="main-home-container">
        <span></span>
        <button onClick={handleToDashboardPage}>Pergi ke Dashboard</button>
        <section className="book-list-container">
          <input type="text" placeholder="Cari buku" />
          <div className="book-list">
            <p>Buku Populer</p>
              <div className="book-list-wrapper">
                { bookList.map( (item, index) => (
                  <div className="column">
                    <div key={index} id="book-no-cover" onClick={() => {
                      handleToBookDetailPage({ title: item.title })
                    }}>
                      <span id="book-title">{item.title}</span>
                    </div>
                    {/*<span id="book-title">{item.title}</span>*/}
                  </div>
                )) }
              </div>
          </div>
          { /* Ntar list bukunya grid atau gmn jir */}
        </section>
      </div>
    </main>
  )
}

export default Home