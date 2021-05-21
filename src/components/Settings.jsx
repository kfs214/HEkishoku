import { useState } from "react";
import PropTypes from "prop-types";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Input,
  InputAdornment
} from "@material-ui/core";

import HETimePicker from "./HETimePicker";
import CONSTS from "../consts";

const Settings = ({ settingsOpen, setSettingsOpen }) => {
  const [workFrom, setWorkFrom] = useState(CONSTS.DEFAULT_WORK_FROM);
  const [workTo, setWorkTo] = useState(CONSTS.DEFAULT_WORK_TO);
  const [lunchBreakFrom, setLunchBreakFrom] = useState(
    CONSTS.DEFAULT_LUNCH_BREAK_FROM
  );
  const [lunchBreakHours, setLunchBreakHours] = useState(
    CONSTS.DEFAULT_LUNCH_BREAK_HOURS
  );

  const handleClose = () => {
    setSettingsOpen(false);
  };

  const mb = 1;

  return (
    <Dialog
      open={settingsOpen}
      onClose={handleClose}
      aria-labelledby="settings-dialog"
    >
      <DialogContent>
        <DialogTitle>Working hours</DialogTitle>
        <Box mb={mb}>
          <HETimePicker
            label="From"
            selectedDate={workFrom}
            handleDateChange={setWorkFrom}
          />
        </Box>

        <Box mb={mb}>
          <HETimePicker
            label="To"
            selectedDate={workTo}
            handleDateChange={setWorkTo}
          />
        </Box>

        <DialogTitle>Lunch break</DialogTitle>
        <Box mb={mb}>
          <HETimePicker
            label="From"
            selectedDate={lunchBreakFrom}
            handleDateChange={setLunchBreakFrom}
          />
        </Box>

        <Box mb={mb}>
          <Input
            value={lunchBreakHours}
            onChange={(e) => setLunchBreakHours(e.target.value)}
            endAdornment={<InputAdornment position="end">h</InputAdornment>}
            aria-describedby="lunch-break-hours"
            fullWidth
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

Settings.propTypes = {
  settingsOpen: PropTypes.bool.isRequired,
  setSettingsOpen: PropTypes.func.isRequired
};

export default Settings;
