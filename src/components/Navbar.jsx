import { FaBell, FaSignOutAlt } from 'react-icons/fa'
import { motion } from 'framer-motion'

function Navbar() {
  return (
    <motion.div
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className='navbar'
    >
      <div>
        <h2 className='logo'>ChatSphere</h2>
      </div>

      <div className='nav-icons'>
        <FaBell className='icon' />
        <FaSignOutAlt className='icon logout' />
      </div>
    </motion.div>
  )
}

export default Navbar