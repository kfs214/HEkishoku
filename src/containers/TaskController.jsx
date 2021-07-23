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

  const createdTasksVriables = {
    status: CONSTS.CREATED
  };

  const doneTasksVriables = {
    status: CONSTS.DONE
  };

  const reject = ({ existingTasks, rejectedId }) =>
    existingTasks?.items?.filter((task) => task.id !== rejectedId) ?? [];

  const getNewTasks = ({
    newStatus,
    groupOfStatus,
    existingTasks,
    updatedId
  }) =>
    newStatus === groupOfStatus
      ? existingTasks?.items?.concat({
          id: updatedId,
          status: newStatus,
          __typename: "Task"
        })
      : reject({
          existingTasks,
          rejectedId: updatedId
        });

  const getWriteQueryOptions = ({ variables, existingTasks, newTasks }) => ({
    query: gql(tasksByStatus),
    variables,
    data: {
      tasksByStatus: {
        ...existingTasks,
        items: newTasks
      }
    }
  });

  // status更新しか存在しないため、その他のupdateは一旦コメントアウト
  // const [update] = useMutation(gql(updateTask));

  const [updateStatus] = useMutation(gql(updateTask), {
    update(cache, { data }) {
      const { id: updatedId, status: newStatus } = data?.updateTask ?? {};

      // 未了タスクのキャッシュ更新

      const { tasksByStatus: existingCreatedTasks } = cache.readQuery({
        query: gql(tasksByStatus),
        variables: createdTasksVriables
      });

      const newCreatedTasks = getNewTasks({
        newStatus,
        groupOfStatus: CONSTS.CREATED,
        existingTasks: existingCreatedTasks,
        updatedId
      });

      const createOptions = getWriteQueryOptions({
        variables: createdTasksVriables,
        existingTasks: existingCreatedTasks,
        newTasks: newCreatedTasks
      });

      cache.writeQuery(createOptions);

      // 完了タスクのキャッシュ更新は
      // 完了タスクが読み込み済みの場合のみ実施

      const { tasksByStatus: existingDoneTasks } =
        cache.readQuery({
          query: gql(tasksByStatus),
          variables: doneTasksVriables
        }) ?? {};

      if (existingDoneTasks) {
        const newDoneTasks = getNewTasks({
          newStatus,
          groupOfStatus: CONSTS.DONE,
          existingTasks: existingDoneTasks,
          updatedId
        });

        const doneOptions = getWriteQueryOptions({
          variables: doneTasksVriables,
          existingTasks: existingDoneTasks,
          newTasks: newDoneTasks
        });

        cache.writeQuery(doneOptions);
      }
    }
  });

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
      // handleTaskUpdate={(input) => handleTaskUpdate({ update, input, id })}
      handleStatusUpdate={(input) =>
        handleTaskUpdate({ update: updateStatus, input, id })
      }
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
