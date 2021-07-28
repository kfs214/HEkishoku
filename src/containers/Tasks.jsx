import { useState } from "react";

// apollo
import { gql, useQuery, useMutation } from "@apollo/client";

// components, graphql, and consts
import Tasks from "../components/organisms/Tasks";
import { tasksByStatus } from "../graphql/queries";
import { createTask, updateTask } from "../graphql/mutations";
import CONSTS from "../consts";
import { handleTaskUpdate } from "../utils";

const EnhancedTasks = () => {
  // useState 系
  const [showCompleted, setShowCompleted] = useState(false);

  const [sortedTasks, setSortedTasks] = useState([]);

  // Apollo系
  // variables
  const listTasksVriables = {
    status: showCompleted ? CONSTS.DONE : CONSTS.CREATED
  };

  const createTasksVriables = {
    status: CONSTS.CREATED
  };

  // queries and mutations
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

  const [update] = useMutation(gql(updateTask));

  // handlers
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

  // 並べ替え
  const updatedIndexes = sortedTasks
    .map((task, newIndex) => {
      const { id, index: oldIndex } = task;

      return { id, oldIndex, newIndex };
    })
    .filter((task) => task.oldIndex !== task.newIndex)
    .map((task) => ({ id: task.id, input: { index: task.newIndex } }));

  const handleSaveOrder = () => {
    updatedIndexes.forEach((updatedIndex) => {
      handleTaskUpdate({ update, ...updatedIndex });
    });
  };

  const tasksSortedByIndex = [...tasks].sort((a, b) => a.index - b.index);

  return (
    <Tasks
      tasks={tasksSortedByIndex}
      create={handleCreate}
      copy={handleCopy}
      saveOrder={handleSaveOrder}
      setSortedTasks={setSortedTasks}
      creatingTask={creatingTask}
      failedToCreateTask={failedToCreateTask !== undefined}
      showCompleted={showCompleted}
      setShowCompleted={setShowCompleted}
    />
  );
};

export default EnhancedTasks;
