import PropTypes from "prop-types";
import { Card } from "@material-ui/core";
import TaskController from "./TaskController";

const Task = ({ task }) => (
  <Card>
    <TaskController task={task} />
    <p>this is card</p>
  </Card>
);

Task.propTypes = {
  task: PropTypes.shape({
    status: PropTypes.string.isRequired
  }).isRequired
};

export default Task;
