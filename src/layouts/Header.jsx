import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './styles/Header.css'


function Header() {
  const navigateLandingPage = () => { navigate('/') }
  const navigate = useNavigate()
  const [ isLogin, setIsLogin ] = useState(false)
  const [ data, setData ] = useState('')
  
  useEffect(() => {
    fetch('http://localhost:3000/check-auth', { credentials: 'include' })
    .then( res => res.json())
    .then(data => {
      setData(data);
      if (data.name) { setIsLogin(true) }
    })
    .catch(() => { setIsLogin(false) })
  }, [])
  
  const handleLogin = () => { alert("login clicked"); navigate('/login') }
  const handleSignup = () => { alert('signUp clicked'); navigate('/signup') }
  const handleButton = () => { alert(JSON.stringify(data)) }
  const handleLogout = () => {
    setIsLogin(false)
    fetch('http://localhost:3000/logout', {
      method: "POST",
      credentials: "include"
    })
    alert('berhasil logout')
    navigate('/login')
  }
  
  return(
    <header id="main-header">
      <div className="headerAndButtonDiv">
        <h3 onClick={navigateLandingPage}>Perpustakaan A</h3>
        <div id="login-button">
          { isLogin ? (<button id="logout" onClick={handleLogout}>Logout</button>) : (
            <>
              <button id="login" onClick={handleLogin}>Login</button>
              <button id="signup" onClick={handleSignup}>Signup</button>
            </>
          ) }
        </div>
      </div>
      <hr />
    </header>
  )
}

export default Header