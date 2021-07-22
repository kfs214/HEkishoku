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

  const tasksByStatusVariables = {
    status: showCompleted ? CONSTS.DONE : CONSTS.CREATED
  };

  const {
    data: { tasksByStatus: { items: tasks = [] } = {} } = {}
    // loading,
    // error
  } = useQuery(gql(tasksByStatus), { variables: tasksByStatusVariables });

  const [
    create,
    { loading: creatingTask, error: failedToCreateTask }
  ] = useMutation(gql(createTask), {
    // update(cache, { data }) {
    //   const newTaskFromResponse = data?.createTask;
    //   const existingTasks = cache.readQuery({ query: gql(tasksByStatus) });
    //   cache.writeQuery({
    //     query: gql(tasksByStatus),
    //     data: {
    //       tasksByStatus: {
    //         ...existingTasks?.tasksByStatus,
    //         items: [...existingTasks?.tasksByStatus.items, newTaskFromResponse]
    //       }
    //     }
    //   });
    // }
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
