import { useState } from "react";
import "./App.css";
import axios from "axios";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function App() {
  const [asteroids, setAsteroids] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);

  // function getClosebyAsteroids() {
  //   axios
  //     .get(
  //       "https://api.nasa.gov/neo/rest/v1/feed?start_date=2024-05-13&end_date=2024-05-20&api_key=3lIka5CXiRJQ0hHNEPilFSSFkP8tg33KRaDeQyvM"
  //     )
  //     .then((response) => {
  //       console.log(response.data.near_earth_objects["2024-05-13"]);
  //       setAsteroids(response.data.near_earth_objects["2024-05-13"]);
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
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          dateFormat="yyyy-MM-dd"
        />
        <h2>Select End Date</h2>
        <ReactDatePicker
          selected={selectedEndDate}
          onChange={(date) => setSelectedEndDate(date)}
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
