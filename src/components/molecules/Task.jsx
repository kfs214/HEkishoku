// react
import PropTypes from "prop-types";

// material UI
import {
  Box,
  Card,
  CardActions,
  CardContent,
  Grid,
  InputAdornment,
  TextField
} from "@material-ui/core";

// components, graphql, and consts
import TaskController from "../../containers/TaskController";
import HEDateTimePicker from "./HEDateTimePicker";
import CONSTS from "../../consts";

const Task = ({
  id,
  status,
  title,
  estimatedHour,
  startedAt,
  endedBy,
  handleDateTimeChange,
  handleOnChange,
  handleEstimatedHourChange,
  handleCopy
}) => (
  <Box mb={CONSTS.BOX_M}>
    <Card>
      <CardActions>
        <TaskController id={id} status={status} handleCopy={handleCopy} />
      </CardActions>
      <CardContent>
        <Grid container>
          <Grid container item sm={6}>
            <Grid item xs={6}>
              <Box m={CONSTS.BOX_M}>
                <TextField
                  label="Task Name"
                  value={title}
                  onChange={(e) => {
                    handleOnChange({ title: e.target.value });
                  }}
                  aria-describedby="task-name"
                  fullWidth
                />
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box m={CONSTS.BOX_M}>
                <TextField
                  label="Estimated Time"
                  value={estimatedHour}
                  onChange={handleEstimatedHourChange}
                  aria-describedby="estimated-time"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">h</InputAdornment>
                    )
                  }}
                  fullWidth
                />
              </Box>
            </Grid>
          </Grid>
          <Grid container item sm={6}>
            <Grid item xs={6}>
              <Box m={CONSTS.BOX_M}>
                <HEDateTimePicker
                  label="Start After"
                  selectedDate={startedAt}
                  onChange={(e) => {
                    handleDateTimeChange("startedAt", e);
                  }}
                />
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box m={CONSTS.BOX_M}>
                <HEDateTimePicker
                  label="End By"
                  selectedDate={endedBy}
                  onChange={(e) => {
                    handleDateTimeChange("endedBy", e);
                  }}
                />
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  </Box>
);

Task.propTypes = {
  id: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  estimatedHour: PropTypes.string.isRequired,
  title: PropTypes.string,
  startedAt: PropTypes.string,
  endedBy: PropTypes.string,
  handleDateTimeChange: PropTypes.func.isRequired,
  handleOnChange: PropTypes.func.isRequired,
  handleEstimatedHourChange: PropTypes.func.isRequired,
  handleCopy: PropTypes.func.isRequired
};

Task.defaultProps = {
  title: null,
  startedAt: null,
  endedBy: null
};

export default Task;
