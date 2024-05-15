import { useState } from "react";
import "./App.css";
import axios from "axios";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { checkInterval, apiKey, url } from "./utils";

function App() {
  const [asteroids, setAsteroids] = useState([]);
  const [isDisabled, setIsDisabled] = useState(false);

  //prefilled on start
  const today = new Date();
  const todayFormatted = today.toISOString().split("T")[0];
  const sevenDaysLater = new Date(today);
  sevenDaysLater.setDate(today.getDate() + 7);
  const sevenFormatted = sevenDaysLater.toISOString().split("T")[0];

  const [startDate, setStartDate] = useState(todayFormatted);
  const [endDate, setEndDate] = useState(sevenFormatted);
  const [errorMessage, setErrorMessage] = useState("");

  const handleStartDateChange = (date) => {
    const formattedDate = date.toISOString().split("T")[0];
    setStartDate(formattedDate);
    checkInterval(date, endDate, setErrorMessage, setIsDisabled);
  };

  const handleEndDateChange = (date) => {
    const formattedDate = date.toISOString().split("T")[0];
    setEndDate(formattedDate);
    checkInterval(startDate, date, setErrorMessage, setIsDisabled);
  };

  async function getClosebyAsteroids() {
    try {
      const response = await axios.get(
        `${url}start_date=${startDate}&end_date=${endDate}&api_key=${apiKey}`
      );

      const insideArraysOfAsteroids = Object.values(
        response.data.near_earth_objects
      ).flatMap((array) => array);

      insideArraysOfAsteroids.sort(
        (a, b) =>
          Number(a.close_approach_data[0].miss_distance.kilometers) -
          Number(b.close_approach_data[0].miss_distance.kilometers)
      );

      setAsteroids(insideArraysOfAsteroids);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  return (
    <>
      <div
        style={{
          display: "flex",
          flexFlow: "column",
          alignItems: "center",
        }}
      >
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
          style={{ width: "100px", textAlign: "center", margin: "20px 20px" }}
          type="submit"
          disabled={isDisabled}
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
          let closeApproachData = asteroid.close_approach_data[0];
          let sortedDistances = closeApproachData.miss_distance.kilometers;

          return (
            <table
              style={{
                border: "1px solid red",
              }}
              key={closeApproachData.miss_distance.kilometers}
            >
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Diameter</th>
                  <th>How far</th>
                  <th>When</th>
                </tr>
              </thead>
              <tr>
                <td style={{ textDecoration: "underline" }}>{asteroid.name}</td>
                <td>
                  {
                    asteroid.estimated_diameter.kilometers
                      .estimated_diameter_max
                  }
                </td>
                <td>{sortedDistances}</td>
                <td>{closeApproachData.close_approach_date_full}</td>
              </tr>
            </table>
          );
        })}
      </div>
    </>
  );
}

export default App;
