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

console.log 
  return (
    <div>
      <h3>Welcome back, {user?.user_metadata?.full_name}</h3>
      {JSON.stringify(role)}
      <button onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default Homepage