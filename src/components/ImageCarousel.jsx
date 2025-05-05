"use client"

import { useState, useEffect } from "react"
import "../styles/ImageCarousel.css"

const ImageCarousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [showFullscreen, setShowFullscreen] = useState(false)
  const [slideDirection, setSlideDirection] = useState("")

  const goToPrevious = () => {
    if (isTransitioning) return

    setIsTransitioning(true)
    setSlideDirection("slide-right")
    const isFirstImage = currentIndex === 0
    const newIndex = isFirstImage ? images.length - 1 : currentIndex - 1
    setCurrentIndex(newIndex)
  }

  const goToNext = () => {
    if (isTransitioning) return

    setIsTransitioning(true)
    setSlideDirection("slide-left")
    const isLastImage = currentIndex === images.length - 1
    const newIndex = isLastImage ? 0 : currentIndex + 1
    setCurrentIndex(newIndex)
  }

  const openFullscreen = () => {
    setShowFullscreen(true)
    document.body.style.overflow = "hidden" // Prevent scrolling when fullscreen is open
  }

  const closeFullscreen = () => {
    setShowFullscreen(false)
    document.body.style.overflow = "" // Restore scrolling
  }

  const handleFullscreenNavigation = (direction) => {
    if (direction === "next") {
      const newIndex = (currentIndex + 1) % images.length
      setCurrentIndex(newIndex)
    } else {
      const newIndex = (currentIndex - 1 + images.length) % images.length
      setCurrentIndex(newIndex)
    }
  }

  const handleKeyDown = (e) => {
    if (!showFullscreen) return

    if (e.key === "Escape") {
      closeFullscreen()
    } else if (e.key === "ArrowRight") {
      handleFullscreenNavigation("next")
    } else if (e.key === "ArrowLeft") {
      handleFullscreenNavigation("prev")
    }
  }

  useEffect(() => {
    // Reset to first image when images change
    setCurrentIndex(0)
  }, [images])

  useEffect(() => {
    // Reset transition state after animation completes
    const timer = setTimeout(() => {
      setIsTransitioning(false)
      setSlideDirection("")
    }, 500)

    return () => clearTimeout(timer)
  }, [currentIndex])

  useEffect(() => {
    // Add keyboard event listeners for fullscreen mode
    window.addEventListener("keydown", handleKeyDown)
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [showFullscreen, currentIndex])

  if (!images || images.length === 0) {
    return <div className="carousel-container">No images available</div>
  }

  return (
    <div className="carousel-container">
      <div className={`carousel-main ${slideDirection}`}>
        {/* Main image */}
        <div className="carousel-image-container" onClick={openFullscreen}>
          <img
            src={images[currentIndex].url || "/placeholder.svg"}
            alt={images[currentIndex].caption}
            className="main-image"
          />
          <div className="image-caption">
            <p>{images[currentIndex].caption}</p>
          </div>
          <div className="click-indicator">
            <i className="fa-solid fa-magnifying-glass-plus"></i>
            <span>Click to enlarge</span>
          </div>
        </div>

        {/* Side previews */}
        <div className="carousel-side-preview left-preview" onClick={goToPrevious}>
          <div className="preview-overlay"></div>
          <img
            src={images[(currentIndex - 1 + images.length) % images.length].url || "/placeholder.svg"}
            alt="Previous"
          />
        </div>

        <div className="carousel-side-preview right-preview" onClick={goToNext}>
          <div className="preview-overlay"></div>
          <img src={images[(currentIndex + 1) % images.length].url || "/placeholder.svg"} alt="Next" />
        </div>
      </div>

      {/* Navigation buttons */}
      <button className="carousel-nav-button prev-button" onClick={goToPrevious} aria-label="Previous image">
        <i className="fa-solid fa-chevron-left"></i>
      </button>

      <button className="carousel-nav-button next-button" onClick={goToNext} aria-label="Next image">
        <i className="fa-solid fa-chevron-right"></i>
      </button>

      {/* Indicators */}
      <div className="carousel-indicators">
        {images.map((_, index) => (
          <button
            key={index}
            className={`indicator ${index === currentIndex ? "active" : ""}`}
            onClick={() => {
              if (!isTransitioning) {
                setIsTransitioning(true)
                setSlideDirection(index > currentIndex ? "slide-left" : "slide-right")
                setCurrentIndex(index)
              }
            }}
            aria-label={`Go to image ${index + 1}`}
          />
        ))}
      </div>

      {/* Fullscreen modal */}
      {showFullscreen && (
        <div className="fullscreen-modal">
          <div className="fullscreen-content">
            <button className="close-button" onClick={closeFullscreen} aria-label="Close fullscreen view">
              <i className="fa-solid fa-xmark"></i>
            </button>

            <div className="fullscreen-image-container">
              <img src={images[currentIndex].url || "/placeholder.svg"} alt={images[currentIndex].caption} />

              <div className="fullscreen-navigation">
                <button
                  className="fullscreen-nav-button prev"
                  onClick={() => handleFullscreenNavigation("prev")}
                  aria-label="Previous image"
                >
                  <i className="fa-solid fa-arrow-left"></i>
                </button>
                <button
                  className="fullscreen-nav-button next"
                  onClick={() => handleFullscreenNavigation("next")}
                  aria-label="Next image"
                >
                  <i className="fa-solid fa-arrow-right"></i>
                </button>
              </div>

              <div className="fullscreen-caption">
                <p>{images[currentIndex].caption}</p>
                <p>{images[currentIndex].description}</p>
              </div>
            </div>

            <div className="image-counter">
              {currentIndex + 1} / {images.length}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ImageCarousel
