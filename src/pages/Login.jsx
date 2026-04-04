import "./styles/Login.css"
import { useState } from "react"
import { useNavigate } from 'react-router-dom'

function Login() {
  const navigate = useNavigate()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    
    try {
      const response = await fetch("http://localhost:3000/login", { 
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user: username, pass: password }),
        credentials: "include"
      })
      
      const data = await response.json()
      
      if (response.ok) {
        alert("Login berhasil")
        navigate("/")
      } else {
        alert("Gagal: " + data.msg)
      }
    } catch (error) {
      console.error("Error pas login:", error)
      alert("Server mati?")
    }
  }
  
  return(
    <main className="login-page-main">
      <form className="login-form" onSubmit={handleSubmit}>
        <h3>Login to zuhax</h3>
        
        <div className="login-page-username">
          <span>Username</span>
          <input 
            type="text" 
            placeholder="Username" 
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="login-page-password">
          <span>Password</span>
          <input 
            type="password" 
            placeholder="Password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button type="submit">Submit</button>
      </form>
    </main>
  )
}

export default Login
