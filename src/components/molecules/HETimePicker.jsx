import PropTypes from "prop-types";
import { KeyboardTimePicker } from "@material-ui/pickers";

const getInitialDateTime = () => {
  const dt = new Date();
  dt.setHours(dt.getHours() + 1);
  dt.setMinutes(0);

  return dt;
};

const HETimePicker = ({ label, selectedDate, onChange }) => (
  <KeyboardTimePicker
    ampm={false}
    autoOk
    variant="inline"
    minutesStep={15}
    label={label}
    value={selectedDate}
    initialFocusedDate={getInitialDateTime()}
    onChange={onChange}
    fullWidth
  />
);

HETimePicker.propTypes = {
  label: PropTypes.string.isRequired,
  selectedDate: PropTypes.string,
  onChange: PropTypes.func.isRequired
};

HETimePicker.defaultProps = {
  selectedDate: null
};

export default HETimePicker;
