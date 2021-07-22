import { useState } from "react";

// apollo
import { gql, useQuery, useMutation } from "@apollo/client";

// components, graphql, and consts
import Tasks from "../components/organisms/Tasks";
import { tasksByStatus } from "../graphql/queries";
import { createTask } from "../graphql/mutations";
import CONSTS from "../consts";

const EnhancedTasks = () => {
  const [showCompleted, setShowCompleted] = useState(false);

  const listTasksVriables = {
    status: showCompleted ? CONSTS.DONE : CONSTS.CREATED
  };

  const createTasksVriables = {
    status: CONSTS.CREATED
  };

  const {
    data: { tasksByStatus: { items: tasks = [] } = {} } = {}
    // loading,
    // error
  } = useQuery(gql(tasksByStatus), { variables: listTasksVriables });

  const [
    create,
    { loading: creatingTask, error: failedToCreateTask }
  ] = useMutation(gql(createTask), {
    update(cache, { data }) {
      const newTaskFromResponse = data?.createTask;
      const existingCreatedTasks = cache.readQuery({
        query: gql(tasksByStatus),
        variables: createTasksVriables
      });
      cache.writeQuery({
        query: gql(tasksByStatus),
        variables: createTasksVriables,
        data: {
          tasksByStatus: {
            ...existingCreatedTasks?.tasksByStatus,
            items: [
              ...existingCreatedTasks?.tasksByStatus.items,
              newTaskFromResponse
            ]
          }
        }
      });
    }
  });

  const initialInput = {
    title: "",
    status: CONSTS.CREATED,
    index: tasks?.length
  };

  const handleCreate = () => {
    create({ variables: { input: initialInput } });
  };

  const handleCopy = (input) => {
    create({
      variables: {
        input: {
          ...initialInput,
          ...input
        }
      }
    });
  };

  return (
    <Tasks
      tasks={tasks}
      create={handleCreate}
      copy={handleCopy}
      creatingTask={creatingTask}
      failedToCreateTask={failedToCreateTask !== undefined}
      showCompleted={showCompleted}
      setShowCompleted={setShowCompleted}
    />
  );
};

export default EnhancedTasks;
