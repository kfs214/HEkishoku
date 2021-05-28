// react
import PropTypes from "prop-types";

// apollo
import {
  gql,
  useQuery,
  // , useSubscription
  useMutation
} from "@apollo/client";

// materialUI
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

// components, graphql, and consts
import HETimePicker from "./HETimePicker";
import { listUsersSettings } from "../graphql/queries";
// import { onUpdateUsersSetting } from "../graphql/subscriptions";
import { createUsersSetting, updateUsersSetting } from "../graphql/mutations";

import CONSTS from "../consts";

const Settings = ({ settingsOpen, setSettingsOpen }) => {
  const {
    data: { listUsersSettings: { items: [usersSetting] = [] } = {} } = {},
    loading,
    error
  } = useQuery(gql(listUsersSettings));

  const [create] = useMutation(gql(createUsersSetting));
  const [update] = useMutation(gql(updateUsersSetting));

  if (loading) {
    return <p>loading...</p>;
  }

  if (error) {
    return <p>error!</p>;
  }

  console.log({ usersSetting });

  const handleOnChange = (input) => {
    if (usersSetting) {
      update({ variables: { input: { ...input, id: usersSetting.id } } });
    } else {
      create({ variables: { input } });
    }
  };

  const handleLunchBreakHoursChange = (e) => {
    const { value } = e.target;
    const float = value === "" ? null : value;

    handleOnChange({ lunchBreakHours: float });
  };

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
            selectedDate={usersSetting?.workFrom ?? CONSTS.DEFAULT_WORK_FROM}
            handleDateChange={(e) => {
              handleOnChange({ workFrom: e });
            }}
          />
        </Box>

        <Box mb={mb}>
          <HETimePicker
            label="To"
            selectedDate={usersSetting?.workTo ?? CONSTS.DEFAULT_WORK_TO}
            handleDateChange={(e) => {
              handleOnChange({ workTo: e });
            }}
          />
        </Box>

        <DialogTitle>Lunch break</DialogTitle>
        <Box mb={mb}>
          <HETimePicker
            label="From"
            selectedDate={
              usersSetting?.lunchBreakFrom ?? CONSTS.DEFAULT_LUNCH_BREAK_FROM
            }
            handleDateChange={(e) => {
              handleOnChange({ lunchBreakFrom: e });
            }}
          />
        </Box>

        <Box mb={mb}>
          <Input
            value={usersSetting?.lunchBreakHours}
            onChange={handleLunchBreakHoursChange}
            endAdornment={<InputAdornment position="end">h</InputAdornment>}
            aria-describedby="lunch-break-hours"
            placeholder={1}
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
};

Settings.propTypes = {
  settingsOpen: PropTypes.bool.isRequired,
  setSettingsOpen: PropTypes.func.isRequired
};

export default Settings;
