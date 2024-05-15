import { useState } from "react";
import "./App.css";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { checkInterval, apiKey, url, getClosebyAsteroids } from "./utils";
import AsteroidsTable from "./AsteroidsTable";

function App() {
  const [asteroids, setAsteroids] = useState([]);
  const [isDisabled, setIsDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

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
            getClosebyAsteroids(
              url,
              startDate,
              endDate,
              apiKey,
              setAsteroids,
              setLoading
            );
          }}
        >
          submit
        </button>
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      </div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <AsteroidsTable asteroids={asteroids} />
      )}
    </>
  );
}

export default App;
