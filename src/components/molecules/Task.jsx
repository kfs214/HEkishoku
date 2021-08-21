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
  TextField,
  Typography
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
  startedBy,
  endedAt,
  handleDateTimeChange,
  resetDateTime,
  handleOnChange,
  handleEstimatedHourChange,
  handleCopy,
  showCompleted
}) => (
  <Box mb={CONSTS.BOX_M}>
    <Card>
      <CardActions>
        <TaskController
          id={id}
          status={status}
          handleCopy={handleCopy}
          showCompleted={showCompleted}
        />
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
                  disabled={status === CONSTS.DONE}
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
                  resetDateTime={() => {
                    resetDateTime(CONSTS.STARTED_AT);
                  }}
                  onChange={(e) => {
                    handleDateTimeChange(CONSTS.STARTED_AT, e);
                  }}
                  disabled={status === CONSTS.DONE}
                />
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box m={CONSTS.BOX_M}>
                <HEDateTimePicker
                  label="End By"
                  selectedDate={endedBy}
                  resetDateTime={() => {
                    resetDateTime(CONSTS.ENDED_BY);
                  }}
                  onChange={(e) => {
                    handleDateTimeChange(CONSTS.ENDED_BY, e);
                  }}
                  disabled={status === CONSTS.DONE}
                />
              </Box>
            </Grid>
          </Grid>
        </Grid>

        <Box m={CONSTS.BOX_M}>
          <Grid container>
            <Grid container item sm={6}>
              <Box width={80}>
                <Typography variant="body1">Ended At</Typography>
              </Box>
              <Box>
                <Typography variant="body1">{endedAt}</Typography>
              </Box>
            </Grid>
            <Grid container item sm={6}>
              <Box width={80}>
                <Typography variant="body1">Started By</Typography>
              </Box>
              <Box>
                <Typography variant="body1">{startedBy}</Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
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
  startedBy: PropTypes.string.isRequired,
  endedAt: PropTypes.string.isRequired,
  handleDateTimeChange: PropTypes.func.isRequired,
  resetDateTime: PropTypes.func.isRequired,
  handleOnChange: PropTypes.func.isRequired,
  handleEstimatedHourChange: PropTypes.func.isRequired,
  handleCopy: PropTypes.func.isRequired,
  showCompleted: PropTypes.bool.isRequired
};

Task.defaultProps = {
  title: null,
  startedAt: null,
  endedBy: null
};

export default Task;
