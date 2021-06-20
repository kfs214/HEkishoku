// libs
import PropTypes from "prop-types";
import { DateTimePicker } from "@material-ui/pickers";

// consts
import CONSTS from "../../consts";

const getInitialDateTime = () => {
  const dt = new Date();
  dt.setHours(dt.getHours() + 1);
  dt.setMinutes(0);

  return dt;
};

const HEDateTimePicker = ({ label, selectedDate, onChange }) => (
  <DateTimePicker
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

HEDateTimePicker.propTypes = {
  label: PropTypes.string.isRequired,
  selectedDate: PropTypes.string,
  onChange: PropTypes.func.isRequired
};

HEDateTimePicker.defaultProps = {
  selectedDate: null
};

export default HEDateTimePicker;
