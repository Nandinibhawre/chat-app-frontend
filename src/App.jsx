import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import ChatPage from './pages/ChatPage'
import './App.css'
import ResetPassword from './pages/ResetPassword'
import FriendSidebar from './components/FriendSidebar'
import Home from './pages/Home'
import SearchUsers from './components/SearchUsers'
import FriendRequests from './components/FriendRequests'
import FriendsList from './components/FriendsList'
import Friends from './pages/Friends'
function App() {
    // GET USER FROM LOCAL STORAGE
  const currentUser = JSON.parse(
    localStorage.getItem("user")
  );
  return (
    
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/register' element={<Register />} />
        {/* Main Chat Home */}
        <Route
          path="/home"
          element={<Home />}
        />
        <Route path='/chat' element={<ChatPage />} />

    <Route
        path='/reset-password'
        element={<ResetPassword />}
  
  />
   <Route path="/friends" element={<Friends />} />
        </Routes>
    </BrowserRouter>
  )
}

export default App