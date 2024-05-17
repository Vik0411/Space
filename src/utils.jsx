import axios from "axios";

export const apiKey = "3lIka5CXiRJQ0hHNEPilFSSFkP8tg33KRaDeQyvM";
export const url = "https://api.nasa.gov/neo/rest/v1/feed?";

export const checkInterval = (start, end, setErrorMessage, setIsDisabled) => {
  const date1 = new Date(start).getTime();
  const date2 = new Date(end).getTime();

  if (!start || !end) {
    setErrorMessage("Please fill in both start and end date.");
    setIsDisabled(true);
    return;
  }

  const intervalInDays = Math.abs((date2 - date1) / (1000 * 60 * 60 * 24));

  if (date2 < date1) {
    setErrorMessage("Start date has to be prior to end date.");
    setIsDisabled(true);
  } else if (intervalInDays > 7) {
    setErrorMessage(
      "Interval between dates must be less than or equal to 7 days."
    );
    setIsDisabled(true);
  } else {
    setErrorMessage("");
    setIsDisabled(false);
  }
};

export async function getClosebyAsteroids(
  url,
  startDate,
  endDate,
  apiKey,
  setAsteroids,
  setLoading,
  setErrorMessage
) {
  setLoading(true);
  try {
    const response = await fetchData(url, startDate, endDate, apiKey);
    if (response.element_count === 0) {
      setErrorMessage("Oops, no asteroid records found for this interval.");
    }
    const asteroids = extractAsteroids(response);
    setAsteroids(asteroids);
    console.log(asteroids);
  } catch (error) {
    //add at least alert
    console.error("Error fetching data:", error);
  } finally {
    setLoading(false);
  }
}

async function fetchData(url, startDate, endDate, apiKey) {
  const response = await axios.get(
    `${url}start_date=${startDate}&end_date=${endDate}&api_key=${apiKey}`
  );
  return response.data;
}

function extractAsteroids(data) {
  const insideArraysOfAsteroids = Object.values(
    data.near_earth_objects
  ).flatMap((array) => array);
  insideArraysOfAsteroids.sort(
    (a, b) =>
      Number(a.close_approach_data[0].miss_distance.kilometers) -
      Number(b.close_approach_data[0].miss_distance.kilometers)
  );
  return insideArraysOfAsteroids;
}

export function roundStringToTwoDecimalPlaces(str) {
  const number = parseFloat(str);

  // Check if the input is a valid number
  if (!isNaN(number)) {
    // Round the number to two decimal places
    const roundedNumber = parseFloat(number.toFixed(2));
    // Convert the rounded number back to a string
    return roundedNumber.toString();
  } else {
    // Return the input string if it's not a valid number
    return str;
  }
}
