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
  makeStyles,
} from "@material-ui/core";
import { Add } from "@material-ui/icons";

// other libs
import { ReactSortable } from "react-sortablejs";

// utils and components
import { tasksPropTypes } from "../../utils";
import Task from "../../containers/Task";

const useStyles = makeStyles((theme) => ({
  fab: {
    position: "fixed",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}));

const Tasks = ({
  tasks,
  create,
  copy,
  saveOrder,
  setSortedTasks,
  creatingTask,
  failedToCreateTask,
  showCompleted,
  setShowCompleted,
  setIsEditingTitle,
}) => {
  const classes = useStyles();
  const [showError, setShowError] = useState(failedToCreateTask);
  const hideError = () => {
    setShowError(false);
  };

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

      <ReactSortable
        list={tasks}
        setList={setSortedTasks}
        onEnd={saveOrder}
        handle=".sortable-handle"
      >
        {tasks.map((task) => (
          <Task
            task={task}
            key={task.id}
            copy={copy}
            showCompleted={showCompleted}
            setIsEditingTitle={setIsEditingTitle}
          />
        ))}
      </ReactSortable>

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
  saveOrder: PropTypes.func.isRequired,
  setSortedTasks: PropTypes.func.isRequired,
  creatingTask: PropTypes.bool.isRequired,
  failedToCreateTask: PropTypes.bool.isRequired,
  showCompleted: PropTypes.bool.isRequired,
  setShowCompleted: PropTypes.func.isRequired,
  setIsEditingTitle: PropTypes.func.isRequired,
};

export default Tasks;
