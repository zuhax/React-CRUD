import { useState } from "react"
import { useNavigate } from 'react-router-dom'
import './styles/Signup.css'

function Signup() {
  const navigate = useNavigate()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    
    try {
      const response = await fetch("http://localhost:3000/signup", { 
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user: username, pass: password }),
        credentials: "include"
      })
      
      const data = await response.json()
      
      if (response.ok) {
        alert("signup berhasil")
        navigate("/")
      } else {
        alert("Gagal: " + data.msg)
      }
    } catch (error) {
      console.error("Error pas signup:", error)
      alert("Server mati?")
    }
  }
  
  return(
    <main className="signup-page-main">
      <form className="signup-form" onSubmit={handleSubmit}>
        <h3>signup to zuhax</h3>
        
        <div className="signup-page-username">
          <span>Username</span>
          <input 
            type="text" 
            placeholder="Username" 
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div className="signup-page-password">
          <span>Password</span>
          <input 
            type="password" 
            placeholder="Password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit">Submit</button>
      </form>
    </main>
  )
}

export default Signup
