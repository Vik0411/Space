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

    // Check if the response status is not ok (200-299) and throw an error if not
    if (!response.ok) {
      const errorDetails = await response.json();
      const error = new Error(
        `Failed to fetch data from NASA API: ${response.statusText}`
      );
      error.status = response.status;
      error.details = errorDetails;
      throw error;
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Error fetching data from NASA API:", error);
    res.status(error.status || 500).json({
      error: error.message || "Internal server error",
      details: error.details || error.toString(),
    });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Backend server is running at http://localhost:${port}`);
});
