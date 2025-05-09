import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Homepage = () => {
  const navigate = useNavigate()
  const { user, signOut ,role} = useAuth()
  
  async function handleLogout() {
    await signOut()
    navigate('/')
  }
  console.log(user)

console.log 
  return (
    <div>
      <h3>Welcome back, {user?.email}</h3>
      <div className="bg-accent">
        <code>
          {JSON.stringify(user.user_metadata)}
          <img src={user.user} alt="" />
        </code>
      </div>
      <button onClick={handleLogout}>Logout</button>

    </div>
  )
}

export default Homepage