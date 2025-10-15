const express = require("express");
const cors = require("cors");
const fs = require("fs");
const axios = require("axios");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const NEWS_API_KEY = "e2f56d7d034849baab7a7c79b5856f82";
const NEWS_URL = "https://newsapi.org/v2/top-headlines?country=us";

// Get news by category
app.get("/news", async (req, res) => {
  const category = req.query.category || "general";
  try {
    const response = await axios.get(`${NEWS_URL}&category=${category}&apiKey=${NEWS_API_KEY}`);
    res.json(response.data.articles);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Failed to fetch news" });
  }
});

// Store feedback in logs.json
app.post("/feedback", (req, res) => {
  const feedback = req.body; // { title, action: "like"/"dislike" }
  const logs = JSON.parse(fs.readFileSync("logs.json", "utf8") || "[]");
  logs.push({ ...feedback, time: new Date() });
  fs.writeFileSync("logs.json", JSON.stringify(logs, null, 2));
  res.send({ message: "Feedback recorded" });
});

app.listen(4000, () => console.log("Backend running on port 4000"));
