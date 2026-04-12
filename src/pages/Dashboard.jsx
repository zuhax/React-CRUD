import './styles/Dashboard.css'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import NewBookData from '../components/NewBookData.jsx'

function Dashboard() {
  const navigate = useNavigate()
  let isNoData
  const [ cookieUserName, setCookieUserName ] = useState("Tamu")
  const [ rawCookieData, setRawCookieData ] = useState()
  const [ dataPinjamBuku, setDataPinjamBuku ] = useState([])
  useEffect(() => {
    //==[ check-auth ]==\\
    fetch( 'http://localhost:3000/check-auth', { credentials: 'include' })
    .then( res => res.json() )
    .then( data => {
      if (!data.name) return navigate('/login')
      setCookieUserName(data.name) 
    })
    
    //==[ /api/get-book-data ]==\\
    fetch('http://localhost:3000/api/get-data-pinjaman-buku')
    .then( res => res.json() )
    .then( data => setDataPinjamBuku(data.data || []) );
   
    //==[ /api/me ]==\\
    fetch('http://localhost:3000/api/me', { credentials: 'include' })
    .then( res => res.json() )
    .then( data => setRawCookieData(data) )
    
  }, [])
  if (dataPinjamBuku.length == 0) { isNoData = true }
  return(
    <main id="dashboard-main">
      <section>
        <h4>Data Peminjaman Buku</h4>
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>No</th>
                <th>Nama Peminjam</th>
                <th>Buku</th>
                <th>Jumlah</th>
                <th>Tanggal Pinjam</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              { isNoData ? (
                  <tr>
                    <td className="text-center">-</td>
                    <td className="text-center">-</td>
                    <td className="text-center">-</td>
                    <td className="text-center">-</td>
                    <td className="text-center">-</td>
                  </tr>
                ):( dataPinjamBuku.map((item, index) => (
                    <tr key={index}>
                      <td className="text-center">{index+1}</td>
                      <td>{item.namaPeminjam}</td>
                      <td>{item.namaBuku}</td>
                      <td>{item.jumlahPinjam}</td>
                      <td>{item.tanggalPinjam}</td>
                      <td>{item.isKembali?"Dikembalikan":"Belum Kembali"}</td>
                    </tr>
                  )) )
              }
            </tbody>
          </table>
        </div>
        <div className="margin-top">
          <h4>Account username:</h4>
          <div className="raw-data-wrapper">
            {JSON.stringify(cookieUserName ? cookieUserName : "Belum Login" )}
          </div>
          <hr/>
          <h4>Raw Cookie Data:</h4>
          <div className="raw-data-wrapper">
            {JSON.stringify(rawCookieData)}
          </div>
        </div>
        <hr />
        <p>Raw DataPinjamanBuku:</p>
        <div className="raw-data-wrapper">
          {JSON.stringify(dataPinjamBuku)}
        </div>
        <div className="margin-top new-book-data">
          <NewBookData />
        </div>
      </section>
    </main>
  )
}

export default Dashboard