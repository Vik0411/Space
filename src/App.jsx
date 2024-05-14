import { useState } from "react";
import "./App.css";
import axios from "axios";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function App() {
  const [asteroids, setAsteroids] = useState([]);
  // const [selectedDate, setSelectedDate] = useState("2024-05-13");
  // const [selectedEndDate, setSelectedEndDate] = useState("2024-05-20");
  const apiKey = "3lIka5CXiRJQ0hHNEPilFSSFkP8tg33KRaDeQyvM";

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const handleStartDateChange = (date) => {
    const formattedDate = date.toISOString().split("T")[0];
    // Update state and call the onChange callback with formatted date
    setStartDate(formattedDate);
    checkInterval(date, endDate);
  };

  const handleEndDateChange = (date) => {
    const formattedDate = date.toISOString().split("T")[0];
    // Update state and call the onChange callback with formatted date
    setEndDate(formattedDate);
    checkInterval(startDate, date);
  };

  const checkInterval = (start, end) => {
    if (start && end) {
      const intervalInDays = Math.abs((end - start) / (1000 * 60 * 60 * 24));
      if (intervalInDays > 7) {
        setErrorMessage(
          "Interval between dates must be less than or equal to 7 days."
        );
        // disable submit btn also
      } else {
        setErrorMessage("");
      }
    }
  };

  function getClosebyAsteroids() {
    axios
      .get(
        `https://api.nasa.gov/neo/rest/v1/feed?start_date=${startDate}&end_date=${endDate}&api_key=${apiKey}`
      )
      .then((response) => {
        const insideArraysOfAsteroids = Object.values(
          response.data.near_earth_objects
        ).flatMap((array) => array);
        console.log(insideArraysOfAsteroids);
        setAsteroids(insideArraysOfAsteroids);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }
  return (
    <>
      <div style={{ display: "flex", flexFlow: "column" }}>
        <h2>Select Start Date</h2>
        <ReactDatePicker
          selected={startDate}
          onChange={(date) => handleStartDateChange(date)}
          dateFormat="yyyy-MM-dd"
        />
        <h2>Select End Date</h2>
        <ReactDatePicker
          selected={endDate}
          onChange={(date) => handleEndDateChange(date)}
          dateFormat="yyyy-MM-dd"
        />
        <button
          type="submit"
          onClick={() => {
            getClosebyAsteroids();
          }}
        >
          submit
        </button>
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      </div>
      <div>
        {asteroids.map((asteroid) => {
          let astDistance =
            asteroid.close_approach_data[0].miss_distance.kilometers;
          return <li key={astDistance}>{astDistance}</li>;
        })}
      </div>
    </>
  );
}

export default App;
