import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const API_KEY = process.env.REACT_APP_PIXABAY_API_KEY;

function SearchPage() {
  const [query, setQuery] = useState("");
  const [images, setImages] = useState([]);
  const navigate = useNavigate();

  const searchImages = async () => {
    if (!query) return;
    try {
      const res = await fetch(
        `https://pixabay.com/api/?key=${API_KEY}&q=${encodeURIComponent(
          query
        )}&image_type=photo&per_page=12`
      );
      const data = await res.json();
      setImages(data.hits);
    } catch (error) {
      console.error("API Error:", error);
    }
  };

  const handleAddCaption = (imageURL) => {
    navigate("/edit", { state: { image: imageURL } });
  };

  return (
    <div className="search-container">
      <h2>Name: Ayush Saxena</h2>
      <h3>Email: ayushsaxena994@gmail.com</h3>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Enter your search term"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button onClick={searchImages}>Search</button>
      </div>
      <div className="image-grid">
        {images.map((img) => (
          <div className="image-card" key={img.id}>
            <img src={img.webformatURL} alt="Result" />
            <button onClick={() => handleAddCaption(img.webformatURL)}>
              Add Caption
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SearchPage;
