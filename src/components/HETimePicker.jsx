import PropTypes from "prop-types";
import { KeyboardTimePicker } from "@material-ui/pickers";

const HETimePicker = ({ label, selectedDate, handleDateChange }) => (
  <KeyboardTimePicker
    ampm={false}
    variant="inline"
    minitStep={15}
    label={label}
    value={selectedDate}
    onChange={handleDateChange}
  />
);

HETimePicker.propTypes = {
  label: PropTypes.string.isRequired,
  selectedDate: PropTypes.instanceOf(Date).isRequired,
  handleDateChange: PropTypes.func.isRequired
};

export default HETimePicker;
