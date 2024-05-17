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
      <h2>Search Asteroids Nearing Earth</h2>
      <div className="main-container">
        <h3>Select Start Date</h3>
        <ReactDatePicker
          className="datepicker"
          selected={startDate}
          onChange={(date) => handleStartDateChange(date)}
          dateFormat="yyyy-MM-dd"
        />
        <h3>Select End Date</h3>
        <ReactDatePicker
          className="datepicker"
          selected={endDate}
          onChange={(date) => handleEndDateChange(date)}
          dateFormat="yyyy-MM-dd"
        />
        <button
          className="button"
          type="button"
          disabled={isDisabled}
          onClick={() => {
            getClosebyAsteroids(
              url,
              startDate,
              endDate,
              apiKey,
              setAsteroids,
              setLoading,
              setErrorMessage
            );
          }}
        >
          Search
        </button>
        {errorMessage && <p className="error-msg">{errorMessage}</p>}
        <AsteroidsTable asteroids={asteroids} loading={loading} />
      </div>
    </>
  );
}

export default App;
