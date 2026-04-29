import { useState, useEffect} from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import "./styles/HandlePinjam.css"

function HandlePinjam() {
  const { slug } = useParams()
  const navigate = useNavigate()
  
  const today = new Date()
  const returnDate = new Date()
  const tanggalPinjam = today.toISOString().split('T')[0]
  returnDate.setDate(today.getDate() + 7)
  const formatted = returnDate.toISOString().split('T')[0]

  const [ userCookieData, setUserCookieData ] = useState()
  const [ bookList, setBookList ] = useState(null)
  
  const [ jumlahPinjam, setJumlahPinjam ] = useState(1)
  
  useEffect(() => {
    fetch('http://localhost:3000/api/get-book-list')
    .then( res => res.json())
    .then( data => setBookList(data.data) )
    fetch('http://localhost:3000/check-auth', { credentials: 'include' })
    .then( res => res.json() )
    .then( data => setUserCookieData( data ))
  }, [])
  
  const bookDetail = bookList?.find( item => ( item.kebabTitle === slug || item.title === slug.charAt(0).toUpperCase() + slug.slice(1)) )
  const handleToBookDetail = () => { navigate(`/book-detail/${slug}`) }
  const handleKonfirmasiPinjam = () => {
    fetch('http://localhost:3000/api/save-new-pinjaman', {
      credentials: 'include',
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        namaPeminjam: userCookieData?.name,
        namaBuku: bookDetail?.title,
        jumlahPinjam: jumlahPinjam,
        tanggalPinjam: tanggalPinjam,
        tanggalKembali: formatted,
        isDikembalikan: false
      })
    })
    .then(async (res) => {
      const data = await res.json();
      if (!res.ok) {
        alert("Gagal: " + data.msg); 
      } else {
        alert(data.msg); 
      }
    })
    .catch(err => {
      console.error("Error:", err)
      alert("Koneksi ke server gagal")
    })
  }
  
  if (!bookList || !bookDetail) return (
    <>
      <p>Loading Data...</p>
    </>
  )
  return(
    <>
      <section className="book-detail-section borrow-section">
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
              <div className="button-wrapper">
                <button id="pinjam-button" onClick={handleToBookDetail}>Batal</button>
              </div>
            </div>
          </div>
          <div className="book-content-body">
            <br/>
            <hr/>
            
            <div className="input-container margin-top-1">
              <div className="input-name">
                <span>Nama Peminjam {" *"}</span>
                <input className="margin-top-03 elegant-input" value={ userCookieData?.name } type="text" disabled />
              </div>
              <div className="margin-top-03">
                <span>Tanggal Kembali {" *"}</span>
                <input className="margin-top-03 elegant-input" value={formatted} type="date" disabled/>
              </div>
              <div className="margin-top-03">
                <span>Jumlah Pinjam {" *"}</span>
                <input className="margin-top-03 elegant-input" type="number" min="1" value={jumlahPinjam} onChange={(e) => {
                    if (e.target.value >= 4) {
                      setJumlahPinjam(3)
                      return alert("Maaf, meminjam lebih dari 3 buku tidak diperbolehkan")
                    }
                    setJumlahPinjam(Number(e.target.value))
                  }}/>
              </div>
              <div className="margin-top-05">
                <button className="zuhax-padding" onClick={handleKonfirmasiPinjam}>Konfirmasi Pinjam</button>
              </div>
            </div>
            
            <p>{ /*JSON.stringify(userCookieData)*/ }</p>
          </div>
          { /*JSON.stringify(bookDetail)*/ }
        </div>
      </section>
    </>
  )
}

export default HandlePinjam