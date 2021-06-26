// react
import { useState } from "react";
import PropTypes from "prop-types";

// material UI
import {
  Box,
  CircularProgress,
  Fab,
  FormControlLabel,
  Switch,
  Tooltip,
  makeStyles
} from "@material-ui/core";
import { Add } from "@material-ui/icons";

// utils and components
import { tasksPropTypes } from "../../utils";
import Task from "../../containers/Task";
import CONSTS from "../../consts";

const useStyles = makeStyles((theme) => ({
  fab: {
    position: "fixed",
    bottom: theme.spacing(2),
    right: theme.spacing(2)
  }
}));

const Tasks = ({ tasks, create, copy, creatingTask, failedToCreateTask }) => {
  const classes = useStyles();
  const [showError, setShowError] = useState(failedToCreateTask);
  const hideError = () => {
    setShowError(false);
  };

  const [showCompleted, setShowCompleted] = useState(false);

  return (
    <>
      <Box display="flex" justifyContent="flex-end">
        <FormControlLabel
          control={
            <Switch
              checked={showCompleted}
              onChange={(e) => setShowCompleted(e.target.checked)}
            />
          }
          label="Show Completed"
        />
      </Box>

      {tasks
        .filter((task) => (showCompleted ? true : task.status !== CONSTS.DONE))
        .map((task) => (
          <Task task={task} key={task.id} copy={copy} />
        ))}

      <Tooltip
        open={showError}
        title="Something went wrong. Please try again..."
        onClose={hideError}
        onOpen={hideError}
      >
        <Fab
          onClick={creatingTask ? undefined : create}
          color="primary"
          aria-label="add"
          className={classes.fab}
        >
          {creatingTask ? <CircularProgress /> : <Add />}
        </Fab>
      </Tooltip>
    </>
  );
};

Tasks.propTypes = {
  tasks: PropTypes.arrayOf(tasksPropTypes).isRequired,
  create: PropTypes.func.isRequired,
  copy: PropTypes.func.isRequired,
  creatingTask: PropTypes.bool.isRequired,
  failedToCreateTask: PropTypes.bool.isRequired
};

export default Tasks;
