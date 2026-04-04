import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './styles/Header.css'


function Header() {
  
  const navigate = useNavigate()
  const [ isLogin, setIsLogin ] = useState(false)
  const [ data, setData ] = useState('')
  
  useEffect(() => {
    fetch('http://localhost:3000/check-auth', { credentials: 'include' })
    .then( res => res.json())
    .then(data => {
      setData(data);
      if (data.name) {
        setIsLogin(true)
      }
    })
    .catch(() => {
      setIsLogin(false)
    })
  }, [])
  
  const handleLogin = () => {
    alert("hai")
    navigate('/login')
  }
  const handleSignup = () => {
    alert('signUp clicked')
    navigate('/signup')
  }
  const handleButton = () => { alert(JSON.stringify(data)) }
  const handleLogout = () => {
    setIsLogin(false)
    fetch('http://localhost:3000/logout', {
      method: "POST",
      credentials: "include"
    })
    alert('berhasil logout')
  }
  
  return(
    <header>
      <h3>Ini Header</h3>
      <button onClick={handleButton}>Hai</button>
      { isLogin ? (<button onClick={handleLogout}>Logout</button>) : (
        <>
          <button onClick={handleLogin}>Login</button>
          <button onClick={handleSignup}>Signup</button>
        </>
      ) }
      <hr />
    </header>
  )
}

export default Header