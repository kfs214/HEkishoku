// react
import PropTypes from "prop-types";

// apollo
import { gql, useMutation } from "@apollo/client";

// components, graphql, and consts
import { updateTask, deleteTask } from "../graphql/mutations";
import { listTasks } from "../graphql/queries";
import TaskController from "../components/molecules/TaskController";
import { handleTaskUpdate } from "../utils";

const EnhancedTaskController = ({ id, status }) => {
  const [update] = useMutation(gql(updateTask));
  const [deleteTaskMutation, { loading: deletingTask }] = useMutation(
    gql(deleteTask),
    {
      update(cache, { data }) {
        const { id: deletedId } = data?.deleteTask ?? {};
        const { listTasks: existingListTasks } = cache.readQuery({
          query: gql(listTasks)
        });

        const newListTasks = existingListTasks.items.filter(
          (task) => task.id !== deletedId
        );

        cache.writeQuery({
          query: gql(listTasks),
          data: {
            listTasks: {
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
      deletingTask={deletingTask}
      status={status}
    />
  );
};

EnhancedTaskController.propTypes = {
  id: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired
};

export default EnhancedTaskController;
