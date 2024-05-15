export const apiKey = "3lIka5CXiRJQ0hHNEPilFSSFkP8tg33KRaDeQyvM";
export const url = "https://api.nasa.gov/neo/rest/v1/feed?start_date";

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
