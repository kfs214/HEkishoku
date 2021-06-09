// react
import PropTypes from "prop-types";

// material UI
import { Box, Grid } from "@material-ui/core";
import {
  CheckCircle,
  CheckCircleOutline,
  Delete,
  DragHandle,
  FileCopy
} from "@material-ui/icons";

// components
import TaskTimer from "./TaskTimer";

// consts
import CONSTS from "../../consts";

const CompleteTask = () => <CheckCircleOutline />;

const ResumeTask = () => <CheckCircle />;

const TaskController = ({ task: { status } }) => (
  <Grid container justify="space-between">
    <Grid item>
      <Box display="flex">
        {status === CONSTS.DONE ? <ResumeTask /> : <CompleteTask />}
        <TaskTimer />
      </Box>
    </Grid>

    <Grid item>
      <Box display="flex">
        <Delete />
        <FileCopy />
        <DragHandle color="disabled" />
      </Box>
    </Grid>
  </Grid>
);

TaskController.propTypes = {
  task: PropTypes.shape({
    status: PropTypes.string.isRequired
  }).isRequired
};

export default TaskController;
