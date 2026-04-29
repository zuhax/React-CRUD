import './styles/Home.css'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import BookCover from '../components/BookCover.jsx'

function Home() {
  const navigate = useNavigate()
  const [accountUserName, setAccountUserName] = useState()
  const [bookList, setBookList] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    fetch('http://localhost:3000/check-auth', { credentials: 'include' })
      .then(res => res.json())
      .then(data => setAccountUserName(data.name))

    fetch('http://localhost:3000/api/get-book-list')
      .then(res => res.json())
      .then(data => {
        setBookList(data.data)
        setIsLoaded(true)
      })
  }, [])

  const handleToDashboardPage = () => { navigate('/dashboard') }
  const handleToBookDetailPage = ({ title }) => {
    const slug = title.toLowerCase().replace(/\s+/g, '-')
    navigate('/book-detail/' + slug)
  }

  const filteredBooks = bookList.filter(item =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <main className="main-home">
      {/* Background decoration */}
      <div className="bg-grid" />
      <div className="bg-glow" />

      <div className="main-home-container">

        {/* Header */}
        <header className="home-header">
          <div className="home-header-left">
            <div className="logo-mark">📚</div>
            <div>
              <h1 className="site-title">Pustaka</h1>
              <p className="site-subtitle">Koleksi Buku Digital</p>
            </div>
          </div>
          <div className="home-header-right">
            <button className="btn-dashboard" onClick={handleToDashboardPage}>
              <span>Dashboard</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </header>

        {/* Hero Search */}
        <section className="hero-section">
          <p className="hero-eyebrow">Temukan Bacaan Terbaikmu</p>
          <h2 className="hero-heading">Perpustakaan<br /><em>Digital</em></h2>
          <div className="search-wrapper">
            <svg className="search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
            <input
              type="text"
              className="search-input"
              placeholder="Cari judul buku..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button className="search-clear" onClick={() => setSearchQuery('')}>✕</button>
            )}
          </div>
        </section>

        {/* Book List */}
        <section className="book-list-section">
          <div className="section-header">
            <div>
              <p className="section-eyebrow">Koleksi</p>
              <h3 className="section-title">
                {searchQuery ? `Hasil untuk "${searchQuery}"` : 'Buku Populer'}
              </h3>
            </div>
            <span className="book-count">{filteredBooks.length} buku</span>
          </div>

          <div className={`book-grid ${isLoaded ? 'loaded' : ''}`}>
            {filteredBooks.length > 0 ? (
              filteredBooks.map((item, index) => (
                <div
                  key={index}
                  className="book-card"
                  style={{ '--delay': `${index * 60}ms` }}
                  onClick={() => handleToBookDetailPage({ title: item.title })}
                >
                  <div className="book-card-spine" />
                  <div className="book-card-body">
                    <div className="book-card-index">
                      {String(index + 1).padStart(2, '0')}
                    </div>
                    <h4 className="book-card-title">{item.title}</h4>
                    {item.author && (
                      <p className="book-card-author">{item.author}</p>
                    )}
                    <div className="book-card-arrow">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="empty-state">
                <p className="empty-icon">🔍</p>
                <p className="empty-text">Tidak ada buku ditemukan</p>
                <p className="empty-sub">Coba kata kunci yang berbeda</p>
              </div>
            )}
          </div>
        </section>

      </div>
    </main>
  )
}

export default Home
