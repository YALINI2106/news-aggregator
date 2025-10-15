import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

const categories = ["general", "business", "technology", "sports", "health"];

function App() {
  const [news, setNews] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("general");

  useEffect(() => {
    fetchNews(selectedCategory);
  }, [selectedCategory]);

  const fetchNews = async (category) => {
    const res = await axios.get(`http://localhost:4000/news?category=${category}`);
    setNews(res.data);
  };

  const sendFeedback = async (title, action) => {
    await axios.post("http://localhost:4000/feedback", { title, action });
  };

  return (
    <div className="App">
      <h1>News Aggregator</h1>
      <div className="categories">
        {categories.map((cat) => (
          <button
            key={cat}
            className={selectedCategory === cat ? "active" : ""}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat.toUpperCase()}
          </button>
        ))}
      </div>
      <div className="news-container">
        {news.map((article, idx) => (
          <div key={idx} className="news-card">
            {article.urlToImage && <img src={article.urlToImage} alt="thumbnail" />}
            <h3>{article.title}</h3>
            <p>{article.description}</p>
            <div className="feedback">
              <button
                className="like-btn"
                onClick={(e) => {
                  sendFeedback(article.title, "like");
                  e.target.style.color = "green";
                }}
              >
                👍
              </button>
              <button
                className="dislike-btn"
                onClick={(e) => {
                  sendFeedback(article.title, "dislike");
                  e.target.style.color = "red";
                }}
              >
                👎
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
