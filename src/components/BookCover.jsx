import { useState } from "react"

const BookCover = ({ src, title }) => {
    const [ isError, setIsError ] = useState(false);
    return(
      <div className={`book-cover ${ isError ? 'fallback' : ''}`}>
        { !isError ? (
            <img src={src} alt={title} className="book-img" onError={() => {
              setIsError(true)
            }} />
          ) : (
            <div className="gradient-content">
              <span>{title? title.substring(0, 1) : "?"}</span>
            </div>
          )}
      </div>
    )
  }
  
  export default BookCover