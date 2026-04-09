import './styles/Home.css'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function Home() {
  const navigate = useNavigate()
  const [ accountUserName, setAccountUserName ] = useState()
  const [ bookList, setBookList ] = useState([])
  const handleToDashboardPage = () => {
    navigate('/dashboard')
  }
  useEffect(() => {
    fetch('http://localhost:3000/check-auth', { credentials : 'include' })
    .then( res => res.json() )
    .then( data => setAccountUserName(data.name) )
    
    fetch('http://localhost:3000/api/get-book-list')
    .then( res => res.json())
    .then( data => setBookList(data.data))
  }, [])
  return(
    <main className="main-home">
      Halo kak {accountUserName ? accountUserName : "..."}
      <button onClick={handleToDashboardPage}>Pergi ke Dashboard</button>
      <section>
        <h4>Daftar Buku</h4>
        <input type="text" placeholder="Cari buku" />
        <div className="book-image-list-wrapper raw-data-wrapper">
          { /* JSON.stringify(bookList) */}
          { bookList.map((item, index) => (
            <div key={index}>
              <img src={item.imageUrl} alt="book cover" />
            </div>
          ))}
        </div>
        { /* Ntar list bukunya grid atau gmn jir */}
      </section>
    </main>
  )
}

export default Home