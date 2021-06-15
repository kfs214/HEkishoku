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

const CompleteTask = (id) => (
  <CheckCircleOutline
    onClick={() => {
      console.log("completed: ", id);
    }}
  />
);

const ResumeTask = (id) => (
  <CheckCircle
    onClick={() => {
      console.log("resumed: ", id);
    }}
  />
);

const TaskController = ({ id, status }) => (
  <Grid container justify="space-between">
    <Grid item>
      <Box display="flex">
        {status === CONSTS.DONE ? (
          <ResumeTask id={id} />
        ) : (
          <CompleteTask id={id} />
        )}
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
  id: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired
};

export default TaskController;
