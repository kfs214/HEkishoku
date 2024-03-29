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
  deletingTask ? (
    <CircularProgress size={CONSTS.ICON_HEIGHT} />
  ) : (
    <Delete onClick={handleTaskDelete} />
  );

const TaskController = ({
  status,
  deletingTask,
  // handleTaskUpdate,
  handleStatusUpdate,
  handleTaskDelete,
  handleCopy
}) => (
  <Grid container justify="space-between">
    <Grid item>
      <Box display="flex">
        {status === CONSTS.DONE ? (
          <ResumeTask handleTaskUpdate={handleStatusUpdate} />
        ) : (
          <CompleteTask handleTaskUpdate={handleStatusUpdate} />
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
        <FileCopy onClick={handleCopy} />
        <DragHandle className="sortable-handle" />
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
  // handleTaskUpdate: PropTypes.func.isRequired,
  handleStatusUpdate: PropTypes.func.isRequired,
  handleTaskDelete: PropTypes.func.isRequired,
  status: PropTypes.string.isRequired,
  deletingTask: PropTypes.bool.isRequired,
  handleCopy: PropTypes.func.isRequired
};

export default TaskController;
