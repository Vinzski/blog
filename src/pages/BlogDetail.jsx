"use client"

import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import ImageCarousel from "../components/ImageCarousel"
import { blogData } from "../data/BlogData"
import "../styles/BlogDetail.css"

const BlogDetail = () => {
  const { day } = useParams()
  const [blog, setBlog] = useState(null)
  const [nextDay, setNextDay] = useState(null)
  const [prevDay, setPrevDay] = useState(null)

  useEffect(() => {
    const currentDayNum = Number.parseInt(day)
    const currentBlog = blogData.find((b) => b.day === currentDayNum)

    if (currentBlog) {
      // Make sure images have the correct structure with url and caption properties
      const formattedImages = currentBlog.images.map((img) => ({
        url: img.url,
        caption: img.caption,
        description: img.description,
      }))

      // Update the blog object with properly formatted images
      setBlog({
        ...currentBlog,
        images: formattedImages,
      })

      // Set next and previous days
      const nextDayNum = currentDayNum < 8 ? currentDayNum + 1 : null
      const prevDayNum = currentDayNum > 1 ? currentDayNum - 1 : null

      setNextDay(nextDayNum)
      setPrevDay(prevDayNum)

      // Scroll to top when blog changes
      window.scrollTo(0, 0)
    }
  }, [day])

  if (!blog) {
    return <div className="loading">Loading...</div>
  }

  return (
    <div className="blog-detail-container">
      <div className="blog-header">
        <h1>
          Day {blog.day}: {blog.title}
        </h1>
        <p className="blog-date">{blog.date}</p>
      </div>

      <div className="blog-navigation">
        {prevDay && (
          <Link to={`/blog/${prevDay}`} className="nav-link prev">
            <i className="fa-solid fa-chevron-left"></i>
            <span>Day {prevDay}</span>
          </Link>
        )}
        <Link to="/" className="nav-link home">
          Back to Gallery
        </Link>
        {nextDay && (
          <Link to={`/blog/${nextDay}`} className="nav-link next">
            <span>Day {nextDay}</span>
            <i className="fa-solid fa-chevron-right"></i>
          </Link>
        )}
      </div>

      <div className="blog-content">
        <p className="blog-intro">{blog.fullContent.intro}</p>

        <ImageCarousel images={blog.images} />

        <div className="blog-paragraphs">
          {blog.fullContent.paragraphs.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </div>
    </div>
  )
}

export default BlogDetail
