import { useState } from "react";
import PropTypes from "prop-types";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Input,
  InputAdornment
} from "@material-ui/core";

// import HETimePicker from "./HETimePicker";
import CONSTS from "../consts";

const Settings = ({ open = false, setOpen }) => {
  // const [workFrom, setWorkFrom] = useState(CONSTS.DEFAULT_WORK_FROM);
  // const [workTo, setWorkTo] = useState(CONSTS.DEFAULT_WORK_TO);
  // const [lunchBreakFrom, setLunchBreakFrom] = useState(
  //   CONSTS.DEFAULT_LUNCH_BREAK_FROM
  // );
  const [lunchBreakHours, setLunchBreakHours] = useState(
    CONSTS.DEFAULT_LUNCH_BREAK_HOURS
  );

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="settings-dialog">
      <DialogContent>
        <DialogTitle>Working hours</DialogTitle>
        {/* <HETimePicker
          label="From"
          selectedDate={workFrom}
          handleDateChange={setWorkFrom}
        />
        <HETimePicker
          label="To"
          selectedDate={workTo}
          handleDateChange={setWorkTo}
        /> */}
        <DialogTitle>Lunch break</DialogTitle>
        {/* <HETimePicker
          label="From"
          selectedDate={lunchBreakFrom}
          handleDateChange={setLunchBreakFrom}
        /> */}
        <Input
          value={lunchBreakHours}
          onChange={(e) => setLunchBreakHours(e.target.value)}
          endAdornment={<InputAdornment position="end">h</InputAdornment>}
          aria-describedby="lunch-break-hours"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleClose}>Save</Button>
      </DialogActions>
    </Dialog>
  );
};

Settings.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired
};

export default Settings;
