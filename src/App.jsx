import { useState } from "react";
import DatePicker from "./DatePicker";
import SearchButton from "./SearchButton";
import "react-datepicker/dist/react-datepicker.css";
import AsteroidsTable from "./AsteroidsTable";
import { getClosebyAsteroids, checkInterval, formatDate } from "./utils";
import "./App.css";

function App() {
  const [asteroids, setAsteroids] = useState([]);
  const [isDisabled, setIsDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const handleStartDateChange = (date) => {
    setStartDate(formatDate(date));
    checkInterval(date, endDate, setErrorMessage, setIsDisabled);
  };

  const handleEndDateChange = (date) => {
    setEndDate(formatDate(date));
    checkInterval(startDate, date, setErrorMessage, setIsDisabled);
  };

  const handleSearch = () => {
    getClosebyAsteroids(
      startDate,
      endDate,
      setAsteroids,
      setLoading,
      setErrorMessage
    );
  };

  return (
    <div className="main-container">
      <h2>Search Asteroids Nearing Earth</h2>
      <DatePicker
        label="Select Start Date"
        selectedDate={startDate}
        onChange={handleStartDateChange}
      />
      <DatePicker
        label="Select End Date"
        selectedDate={endDate}
        onChange={handleEndDateChange}
      />
      <SearchButton isDisabled={isDisabled} onClick={handleSearch} />
      {errorMessage && <p className="error-msg">{errorMessage}</p>}
      <AsteroidsTable asteroids={asteroids} loading={loading} />
    </div>
  );
}

export default App;
