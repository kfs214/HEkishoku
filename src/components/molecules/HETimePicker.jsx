// libs
import PropTypes from "prop-types";
import { TimePicker } from "@material-ui/pickers";

// consts
import CONSTS from "../../consts";

const getInitialDateTime = () => {
  const dt = new Date();
  dt.setHours(dt.getHours() + 1);
  dt.setMinutes(0);

  return dt;
};

const HETimePicker = ({ label, selectedDate, onChange }) => (
  <TimePicker
    ampm={false}
    autoOk
    variant="inline"
    minutesStep={CONSTS.DEFAULT_MINUTES_STEP}
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
