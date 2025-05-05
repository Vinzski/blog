"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import "../styles/Navbar.css"

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          Tour Blog
        </Link>

        <div className="menu-icon" onClick={toggleMenu}>
          {isOpen ? <i className="fa-solid fa-xmark"></i> : <i className="fa-solid fa-bars"></i>}
        </div>

        <ul className={isOpen ? "nav-menu active" : "nav-menu"}>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
