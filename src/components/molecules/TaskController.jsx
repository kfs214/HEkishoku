// libs
import PropTypes from "prop-types";
import { Box, CircularProgress, Grid } from "@material-ui/core";
import {
  CheckCircle,
  CheckCircleOutline,
  Delete,
  DragHandle,
  FileCopy
} from "@material-ui/icons";

// components, graphql, and consts
import TaskTimer from "./TaskTimer";
import CONSTS from "../../consts";

const CompleteTask = ({ handleTaskUpdate }) => (
  <CheckCircleOutline
    onClick={() => handleTaskUpdate({ status: CONSTS.DONE })}
  />
);

const ResumeTask = ({ handleTaskUpdate }) => (
  <CheckCircle onClick={() => handleTaskUpdate({ status: CONSTS.CREATED })} />
);

const DeleteTask = ({ handleTaskDelete, deletingTask }) =>
  deletingTask ? <CircularProgress /> : <Delete onClick={handleTaskDelete} />;

const TaskController = ({
  status,
  deletingTask,
  handleTaskUpdate,
  handleTaskDelete
}) => (
  <Grid container justify="space-between">
    <Grid item>
      <Box display="flex">
        {status === CONSTS.DONE ? (
          <ResumeTask handleTaskUpdate={handleTaskUpdate} />
        ) : (
          <CompleteTask handleTaskUpdate={handleTaskUpdate} />
        )}
        <TaskTimer />
      </Box>
    </Grid>

    <Grid item>
      <Box display="flex">
        <DeleteTask
          handleTaskDelete={handleTaskDelete}
          deletingTask={deletingTask}
        />
        <FileCopy />
        <DragHandle color="disabled" />
      </Box>
    </Grid>
  </Grid>
);

const taskUpdaterPropTypes = {
  handleTaskUpdate: PropTypes.func.isRequired
};

CompleteTask.propTypes = taskUpdaterPropTypes;
ResumeTask.propTypes = taskUpdaterPropTypes;

DeleteTask.propTypes = {
  deletingTask: PropTypes.bool.isRequired,
  handleTaskDelete: PropTypes.func.isRequired
};

TaskController.propTypes = {
  handleTaskUpdate: PropTypes.func.isRequired,
  handleTaskDelete: PropTypes.func.isRequired,
  status: PropTypes.string.isRequired,
  deletingTask: PropTypes.bool.isRequired
};

export default TaskController;
