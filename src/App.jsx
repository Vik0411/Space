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
    setStartDate(date);
    checkInterval(date, endDate);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
    checkInterval(startDate, date);
  };

  const checkInterval = (start, end) => {
    if (start && end) {
      const intervalInDays = Math.abs((end - start) / (1000 * 60 * 60 * 24));
      if (intervalInDays > 7) {
        setErrorMessage(
          "Interval between dates must be less than or equal to 7 days."
        );
      } else {
        setErrorMessage("");
      }
    }
  };

  // function getClosebyAsteroids() {
  //   axios
  //     .get(
  //       `https://api.nasa.gov/neo/rest/v1/feed?start_date=${selectedDate}&end_date=${selectedEndDate}&api_key=${apiKey}`
  //     )
  //     .then((response) => {
  //       console.log(response.data.near_earth_objects[0]);
  //       // adjust to select all
  //       setAsteroids(response.data.near_earth_objects[0]);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching data:", error);
  //     });
  // }
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
          // onClick={() => {
          //   getClosebyAsteroids();
          // }}
        >
          submit
        </button>
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      </div>
      <div>
        {asteroids.map((asteroid) => {
          return (
            <li key={asteroid.close_approach_data[0].miss_distance.kilometers}>
              {asteroid.close_approach_data[0].miss_distance.kilometers}
            </li>
          );
        })}
      </div>
    </>
  );
}

export default App;
