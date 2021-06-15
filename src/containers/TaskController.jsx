// react
import PropTypes from "prop-types";

// apollo
import { gql, useMutation } from "@apollo/client";

// components, graphql, and consts
import { updateTask } from "../graphql/mutations";
import TaskController from "../components/molecules/TaskController";
import { handleTaskUpdate } from "../utils";

const EnhancedTaskController = ({ id, status }) => {
  const [update] = useMutation(gql(updateTask));

  return (
    <TaskController
      handleTaskUpdate={(input) => handleTaskUpdate({ update, input, id })}
      status={status}
    />
  );
};

EnhancedTaskController.propTypes = {
  id: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired
};

export default EnhancedTaskController;
