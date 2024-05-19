import express, { json } from "express";
import fetch from "node-fetch";
const app = express();
const port = 3000;
import cors from "cors";
// Enable CORS for all routes
app.use(cors());
// Middleware to parse JSON bodies
app.use(json());

// Define a route to fetch data from NASA API
app.get("/api/neo", async (req, res) => {
  try {
    const url = "https://api.nasa.gov/neo/rest/v1/feed";
    const apiKey = "3lIka5CXiRJQ0hHNEPilFSSFkP8tg33KRaDeQyvM";
    const startDate = req.query.start_date;
    const endDate = req.query.end_date;
    const apiUrl = `${url}?start_date=${startDate}&end_date=${endDate}&api_key=${apiKey}`;
    const response = await fetch(apiUrl);
    const data = await response.json();

    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Backend server is running at http://localhost:${port}`);
});
