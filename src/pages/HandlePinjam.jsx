import { useState, useEffect} from 'react'
import { useParams, useNavigate } from 'react-router-dom'

function HandlePinjam() {
  useState(() => {
    fetch('http://localhost:3000/')
  }, [])
  return(
    <>
      <p>Ini HandlePinjam</p>
    </>
  )
}

export default HandlePinjam