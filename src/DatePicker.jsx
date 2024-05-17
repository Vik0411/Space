import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DatePicker = ({ label, selectedDate, onChange }) => (
  <>
    <h3>{label}</h3>
    <ReactDatePicker
      className="datepicker"
      selected={selectedDate ? new Date(selectedDate) : null}
      onChange={onChange}
      placeholderText="yyyy-mm-dd"
      dateFormat="yyyy-MM-dd"
    />
  </>
);

export default DatePicker;
