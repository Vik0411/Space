import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import axios from "axios";

// axios
//   .get(
//     "https://api.nasa.gov/neo/rest/v1/feed?start_date=2024-05-13&end_date=2024-05-20&api_key=3lIka5CXiRJQ0hHNEPilFSSFkP8tg33KRaDeQyvM"
//   )
//   .then((response) => {
//     console.log(response.data);
//   })
//   .catch((error) => {
//     console.error("Error fetching data:", error);
//   });

function App() {
  return (
    <>
      <form>
        <input placeholder="input a  start date"></input>
        <input placeholder="input an end date"></input>

        <button>submit</button>
      </form>
      <div>{}</div>
    </>
  );
}

export default App;
