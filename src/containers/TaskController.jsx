// react
import PropTypes from "prop-types";

// apollo
import { gql, useMutation } from "@apollo/client";

// components, graphql, and consts
import { updateTask, deleteTask } from "../graphql/mutations";
import { tasksByStatus } from "../graphql/queries";
import TaskController from "../components/molecules/TaskController";
import { handleTaskUpdate } from "../utils";
import CONSTS from "../consts";

const EnhancedTaskController = ({ id, status, handleCopy, showCompleted }) => {
  const deleteTasksVriables = {
    status: showCompleted ? CONSTS.DONE : CONSTS.CREATED
  };

  const [update] = useMutation(gql(updateTask));
  const [deleteTaskMutation, { loading: deletingTask }] = useMutation(
    gql(deleteTask),
    {
      update(cache, { data }) {
        const { id: deletedId } = data?.deleteTask ?? {};
        const { tasksByStatus: existingListTasks } = cache.readQuery({
          query: gql(tasksByStatus),
          variables: deleteTasksVriables
        });

        const newListTasks = existingListTasks.items.filter(
          (task) => task.id !== deletedId
        );

        cache.writeQuery({
          query: gql(tasksByStatus),
          variables: deleteTasksVriables,
          data: {
            tasksByStatus: {
              ...existingListTasks,
              items: newListTasks
            }
          }
        });
      }
    }
  );

  const handleTaskDelete = () => {
    deleteTaskMutation({
      variables: { input: { id } }
    });
  };

  return (
    <TaskController
      handleTaskUpdate={(input) => handleTaskUpdate({ update, input, id })}
      handleTaskDelete={handleTaskDelete}
      handleCopy={handleCopy}
      deletingTask={deletingTask}
      status={status}
    />
  );
};

EnhancedTaskController.propTypes = {
  id: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  handleCopy: PropTypes.func.isRequired,
  showCompleted: PropTypes.bool.isRequired
};

export default EnhancedTaskController;
