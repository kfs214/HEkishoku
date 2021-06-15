// react
import PropTypes from "prop-types";

// material UI
import { Fab, makeStyles } from "@material-ui/core";
import { Add } from "@material-ui/icons";

// utils and components
import { tasksPropTypes } from "../../utils";
import Task from "../../containers/Task";

const useStyles = makeStyles((theme) => ({
  fab: {
    position: "fixed",
    bottom: theme.spacing(2),
    right: theme.spacing(2)
  }
}));

const Tasks = ({ tasks, create }) => {
  const classes = useStyles();

  return (
    <>
      {tasks.map((task) => (
        <Task task={task} key={task.id} />
      ))}

      <Fab color="primary" aria-label="add" className={classes.fab}>
        <Add onClick={create} />
      </Fab>
    </>
  );
};

Tasks.propTypes = {
  tasks: PropTypes.arrayOf(tasksPropTypes).isRequired,
  create: PropTypes.func.isRequired
};

export default Tasks;
