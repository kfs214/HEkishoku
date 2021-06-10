// material UI
import { Fab, makeStyles } from "@material-ui/core";
import { Add } from "@material-ui/icons";

// components
import Task from "../molecules/Task";

const useStyles = makeStyles((theme) => ({
  fab: {
    position: "fixed",
    bottom: theme.spacing(2),
    right: theme.spacing(2)
  }
}));

const Tasks = () => {
  const classes = useStyles();

  return (
    <>
      <Task task={{ status: "DONE" }} />
      <Task task={{ status: "CREATED" }} />
      <Task task={{ status: "DONE" }} />
      <Task task={{ status: "CREATED" }} />
      <Task task={{ status: "DONE" }} />
      <Task task={{ status: "CREATED" }} />
      <Task task={{ status: "DONE" }} />
      <Task task={{ status: "CREATED" }} />
      <Fab color="primary" aria-label="add" className={classes.fab}>
        <Add />
      </Fab>
    </>
  );
};

export default Tasks;
