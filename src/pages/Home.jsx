"use client"

import { useState, useEffect } from "react"
import BlogCard from "../components/BlogCard"
import { blogData } from "../data/BlogData"
import "../styles/Home.css"

const Home = () => {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Add animation class after component mounts
    setIsLoaded(true)
  }, [])

  return (
    <div className="home-container">
      <div className="hero-section">
        <h1>Educational Tour Blog</h1>
        <p>Follow our journey through seven days of discovery and learning</p>
      </div>

      <div className={`blog-gallery ${isLoaded ? "loaded" : ""}`}>
        {blogData.map((blog) => (
          <div key={blog.day} className="blog-gallery-item">
            <BlogCard day={blog.day} title={blog.title} summary={blog.summary} image={blog.coverImage} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Home
