import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import BlogDetail from "./pages/BlogDetail"
import "./App.css"

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/blog/:day" element={<BlogDetail />} />
          </Routes>
        </main>
        <footer className="footer">
          <p>&copy; {new Date().getFullYear()} Educational Tour Blog by Vince Bradley Muloc. All rights reserved.</p>
        </footer>
      </div>
    </Router>
  )
}

export default App
