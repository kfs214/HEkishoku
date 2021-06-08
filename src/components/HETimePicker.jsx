import PropTypes from "prop-types";
import { KeyboardTimePicker } from "@material-ui/pickers";

const HETimePicker = ({ label, selectedDate, onChange }) => (
  <KeyboardTimePicker
    ampm={false}
    autoOk
    variant="inline"
    minutesStep={15}
    label={label}
    value={selectedDate}
    onChange={onChange}
    fullWidth
  />
);

HETimePicker.propTypes = {
  label: PropTypes.string.isRequired,
  selectedDate: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};

export default HETimePicker;
