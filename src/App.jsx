import { useDispatch } from "react-redux"
import React, {useState, useEffect} from "react"
import authService from './appwrite/auth.js'
import { login,logout } from "./store+slice/authSlice"
import Header from "./components/Header.jsx"
import Footer from "./components/Footer.jsx"
import { Outlet } from 'react-router-dom'
function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    authService.getCurrentUser()
    .then((userData) => {
      if (userData) {
        dispatch(login({userData}))
      } else {
        dispatch(logout())
      }
    })
    .finally(() => setLoading(false))
  }, [])

  if(loading == false){
    return(
      <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
      <div className='w-full block'>
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
    )
  } else {
    return null;
  }
}

export default App
