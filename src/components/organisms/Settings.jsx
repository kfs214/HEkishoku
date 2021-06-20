// react
import PropTypes from "prop-types";

// materialUI
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  InputAdornment
} from "@material-ui/core";

// components, graphql, and consts
import HETimePicker from "../molecules/HETimePicker";
import CONSTS from "../../consts";

const Settings = ({
  settingsOpen,
  handleOnEnter,
  handleClose,
  handleDateTimeChange,
  handleLunchBreakHoursChange,
  workFrom,
  workTo,
  lunchBreakFrom,
  lunchBreakHours
}) => (
  <Dialog
    open={settingsOpen}
    onEnter={handleOnEnter}
    onClose={handleClose}
    aria-labelledby="settings-dialog"
  >
    <DialogContent>
      <DialogTitle>Working hours</DialogTitle>
      <Box mb={CONSTS.BOX_M}>
        <HETimePicker
          label="From"
          selectedDate={workFrom}
          onChange={(e) => {
            handleDateTimeChange("workFrom", e);
          }}
        />
      </Box>

      <Box mb={CONSTS.BOX_M}>
        <HETimePicker
          label="To"
          selectedDate={workTo}
          onChange={(e) => {
            handleDateTimeChange("workTo", e);
          }}
        />
      </Box>

      <DialogTitle>Lunch break</DialogTitle>
      <Box mb={CONSTS.BOX_M}>
        <HETimePicker
          label="From"
          selectedDate={lunchBreakFrom}
          onChange={(e) => {
            handleDateTimeChange("lunchBreakFrom", e);
          }}
        />
      </Box>

      <Box mb={CONSTS.BOX_M}>
        <TextField
          value={lunchBreakHours}
          onChange={handleLunchBreakHoursChange}
          InputProps={{
            endAdornment: <InputAdornment position="end">h</InputAdornment>
          }}
          aria-describedby="lunch-break-hours"
          placeholder={String(CONSTS.DEFAULT_LUNCH_BREAK_HOURS)}
          type="number"
          fullWidth
        />
      </Box>
    </DialogContent>
    <DialogActions>
      <Button onClick={handleClose}>Close</Button>
    </DialogActions>
  </Dialog>
);

Settings.propTypes = {
  settingsOpen: PropTypes.bool.isRequired,
  handleOnEnter: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleDateTimeChange: PropTypes.func.isRequired,
  handleLunchBreakHoursChange: PropTypes.func.isRequired,
  workFrom: PropTypes.string.isRequired,
  workTo: PropTypes.string.isRequired,
  lunchBreakFrom: PropTypes.string.isRequired,
  lunchBreakHours: PropTypes.string.isRequired
};

export default Settings;
