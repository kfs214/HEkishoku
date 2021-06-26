// libs
import PropTypes from "prop-types";
import { InputAdornment } from "@material-ui/core";
import { DateTimePicker } from "@material-ui/pickers";
import { Backspace } from "@material-ui/icons";

// consts
import CONSTS from "../../consts";

const getInitialDateTime = () => {
  const dt = new Date();
  dt.setHours(dt.getHours() + 1);
  dt.setMinutes(0);

  return dt;
};

const ResetDateTimeButton = ({ resetDateTime }) => (
  <Backspace onClick={resetDateTime} />
);

const HEDateTimePicker = ({
  label,
  selectedDate,
  onChange,
  resetDateTime,
  disabled
}) => (
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
    InputProps={{
      endAdornment: (
        <InputAdornment position="end">
          <ResetDateTimeButton
            resetDateTime={disabled ? () => undefined : resetDateTime}
          />
        </InputAdornment>
      )
    }}
    disabled={disabled}
  />
);

ResetDateTimeButton.propTypes = {
  resetDateTime: PropTypes.func.isRequired
};

HEDateTimePicker.propTypes = {
  label: PropTypes.string.isRequired,
  selectedDate: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  resetDateTime: PropTypes.func.isRequired,
  disabled: PropTypes.bool
};

HEDateTimePicker.defaultProps = {
  selectedDate: null,
  disabled: false
};

export default HEDateTimePicker;
