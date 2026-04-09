import './styles/NewBookData.css'
import { useState } from 'react'

function NewBookData() {
      /*
      imageUrl: imageUrl,
      name: name,
      title: title,
      description: description,
      uploader: uploader,
      genre: genre,
      rate: rate
      */
  let isBookDataValue
  const [ bookImageUrl, setBookImageUrl ] = useState()
  const [ bookTitle, setBookTitle ] = useState()
  const [ bookDescription, setBookDescription ] = useState()
  const [ bookUploader, setBookUploader ] = useState()
  const [ bookGenre, setBookGenre ] = useState()
  const [ bookRate, setBookRate ] = useState()
  const handleInsertNewBookData = () => {
    alert('p')
    if (!bookImageUrl || !bookTitle || !bookDescription || !bookUploader || !bookGenre || !bookRate) return alert('harap isi semua data')
    fetch('http://localhost:3000/api/push-book-list', {
      credentials: "include",
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        imageUrl: bookImageUrl,
        title: bookTitle,
        description: bookDescription,
        uploader: bookUploader,
        genre: bookGenre,
        rate: bookRate
      })
    })
    .then( res => res.json() )
    .then( data => alert(data.msg || 'eror') )
  }
  return(
    <>
      <span>Buat Data Buku Baru</span>
      <div className="div-container input">
        <span>Image URL</span>
        <input type="text" onChange={(e) => setBookImageUrl(e.target.value)} value={bookImageUrl} className="Username" />
      </div>
      <div className="div-container input">
        <span>Judul Buku</span>
        <input type="text" onChange={(e) => setBookTitle(e.target.value)} value={bookTitle} className="Username" />
      </div>
      <div className="div-container input">
        <span>Deskripsi</span>
        <input type="text" onChange={(e) => setBookDescription(e.target.value)} value={bookDescription} className="Username" />
      </div>
      <div className="div-container input">
        <span>Penerbit</span>
        <input type="text" onChange={(e) => setBookUploader(e.target.value)} value={bookUploader} className="Username" />
      </div>
      <div className="div-container input">
        <span>Genre</span>
        <input type="text" onChange={(e) => setBookGenre(e.target.value)} value={bookGenre} className="Username" />
      </div>
      <div className="div-container input">
        <span>Rate</span>
        <input type="text" onChange={(e) => setBookRate(e.target.value)} value={bookRate} className="Username" />
      </div>
      <button onClick={handleInsertNewBookData} className="new-book-button">Tambah Buku</button>
    </>
  )
}

export default NewBookData