import axios from "axios";

const bothFieldsWarn = "Please fill in both start and end date.";

function getDateWithoutTime(date) {
  const dateWithoutTime = new Date(date);
  dateWithoutTime.setHours(0, 0, 0, 0);
  return dateWithoutTime;
}

export function formatNumberWithSpaces(numberString) {
  // Convert number string to number, and then to string (to remove leading zeros)
  const number = Number(numberString).toString();

  // Split into integer and decimal parts
  const [integerPart, decimalPart] = number.split(".");

  // Add spaces between every three digits in the integer part
  const formattedIntegerPart = integerPart.replace(
    /\B(?=(\d{3})+(?!\d))/g,
    " "
  );

  // Combine integer and decimal parts, if any
  const formattedNumber = decimalPart
    ? `${formattedIntegerPart}.${decimalPart}`
    : formattedIntegerPart;

  return formattedNumber;
}

export const checkInterval = (start, end, setErrorMessage, setIsDisabled) => {
  const date1 = new Date(start);
  const date1NoTime = getDateWithoutTime(date1);
  const date2 = new Date(end);
  const date2NoTime = getDateWithoutTime(date2);

  if (!start || !end) {
    setErrorMessage(bothFieldsWarn);
    setIsDisabled(true);
    return;
  }

  const intervalInDays = Math.abs(
    (date2NoTime - date1NoTime) / (1000 * 60 * 60 * 24)
  );

  if (date2NoTime < date1NoTime) {
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
  startDate,
  endDate,
  setAsteroids,
  setLoading,
  setErrorMessage
) {
  setLoading(true);
  try {
    if (!startDate || !endDate) {
      setErrorMessage(bothFieldsWarn);
      return;
    }
    const response = await fetchData(startDate, endDate);
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

async function fetchData(startDate, endDate) {
  const response = await axios.get(
    `/api/neo?start_date=${startDate}&end_date=${endDate}`
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

export const formatDate = (date) => {
  return new Intl.DateTimeFormat("en-CA", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);
};
export function removeParenthesesIfFirstIsParenthesis(str) {
  if (str.charAt(0) === "(") {
    return str.replace(/[()]/g, "");
  }
  return str;
}
