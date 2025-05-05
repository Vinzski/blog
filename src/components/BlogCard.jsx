import { Link } from "react-router-dom"
import "../styles/BlogCard.css"

const BlogCard = ({ day, title, summary, image }) => {
  return (
    <div className="blog-card">
      <div className="blog-card-image">
        <img src={image || "/placeholder.svg"} alt={`Day ${day} - ${title}`} />
      </div>
      <div className="blog-card-content">
        <h3>Day {day}</h3>
        <h2>{title}</h2>
        <p>{summary}</p>
        <Link to={`/blog/${day}`} className="read-more-btn">
          Read More
        </Link>
      </div>
    </div>
  )
}

export default BlogCard
