import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import ChatPage from './pages/ChatPage'
import './App.css'
import ResetPassword from './pages/ResetPassword'
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/chat' element={<ChatPage />} />

    <Route
        path='/reset-password'
        element={<ResetPassword />}
    />

      </Routes>
    </BrowserRouter>
  )
}

export default App