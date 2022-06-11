import PropTypes from "prop-types";
import { useState } from "react";

// libs
import { gql, useQuery, useMutation } from "@apollo/client";
import { addMinutes, format, isValid, max, min, parseISO } from "date-fns";

// components, graphql, and consts
import Tasks from "../components/organisms/Tasks";
import { tasksByStatus } from "../graphql/queries";
import { createTask, updateTask } from "../graphql/mutations";
import CONSTS from "../consts";
import { handleTaskUpdate } from "../utils";

const isNumber = (value) =>
  !Number.isNaN(value) && value !== undefined && value !== null;

const calcTime = ({
  estimatedHour,
  referenceTime,
  isCalculatingStartedTimes,
}) => {
  if (!referenceTime || !isNumber(estimatedHour)) {
    return null;
  }

  const addedMinutesPerHour = isCalculatingStartedTimes ? -60 : 60;
  const addedMinutes = addedMinutesPerHour * estimatedHour;

  return addMinutes(referenceTime, addedMinutes);
};

const getReferenceTime = ({
  referenceTimes,
  isCalculatingStartedTimes = false,
  index,
}) => {
  const validReferenceTimes = referenceTimes
    .map((time) => parseISO(time))
    .filter((time) => isValid(time));

  if (!validReferenceTimes.length) {
    return isCalculatingStartedTimes || index ? null : new Date();
  }

  return isCalculatingStartedTimes
    ? min(validReferenceTimes)
    : max(validReferenceTimes);
};

const calcTimes = ({ tasks, isCalculatingStartedTimes = false }) => {
  const resultKey = isCalculatingStartedTimes
    ? CONSTS.STARTED_BY
    : CONSTS.ENDED_AT;
  const referenceKey = isCalculatingStartedTimes
    ? CONSTS.ENDED_BY
    : CONSTS.STARTED_AT;

  const reducer = (tasksWithCalculatedTimes, task, currentIndex) => {
    const { estimatedHour } = task;

    const referenceTime = getReferenceTime({
      referenceTimes: [
        tasksWithCalculatedTimes[currentIndex - 1]?.[resultKey]?.toISOString(),
        task[referenceKey],
      ],
      isCalculatingStartedTimes,
      index: currentIndex,
    });

    const calculatedTime = calcTime({
      estimatedHour,
      referenceTime,
      isCalculatingStartedTimes,
    });

    return [
      ...tasksWithCalculatedTimes,
      { ...task, [resultKey]: calculatedTime },
    ];
  };

  return tasks
    .reduce(reducer, [])
    .map((task) => {
      const formattedTime = task[resultKey]
        ? format(task[resultKey], CONSTS.DATE_TIME_FORMAT)
        : "...";

      return {
        ...task,
        [resultKey]: formattedTime,
      };
    })
    .reverse();
};

const getCalculatedTasks = (tasks) => {
  const tasksWithEndedAt = calcTimes({ tasks });
  const tasksWithStartedBy = calcTimes({
    tasks: tasksWithEndedAt,
    isCalculatingStartedTimes: true,
  });

  const tasksEntries = tasksWithStartedBy.map((task) => {
    const { id, ...otherProperties } = task;

    return [id, { ...otherProperties }];
  });

  return Object.fromEntries(tasksEntries);
};

const getShownTasks = (tasks) => {
  const tasksSortedByIndex = [...tasks].sort((a, b) => a.index - b.index);
  const tasksToCalc = tasksSortedByIndex.map((task) => {
    const { id, startedAt, endedBy, estimatedHour } = task;

    return { id, startedAt, endedBy, estimatedHour };
  });

  const calculatedTasks = getCalculatedTasks(tasksToCalc);
  const tasksWithTimes = tasksSortedByIndex.map((task) => {
    const calculatedTask = calculatedTasks[task.id];

    return { ...task, ...calculatedTask };
  });

  return tasksWithTimes;
};

const EnhancedTasks = ({ setIsEditingTitle }) => {
  // useState 系
  const [showCompleted, setShowCompleted] = useState(false);

  const [tasksSortedByReactSortable, setTasksSortedByReactSortable] = useState(
    []
  );

  // Apollo系
  // variables
  const listTasksVriables = {
    status: showCompleted ? CONSTS.DONE : CONSTS.CREATED,
  };

  const createTasksVriables = {
    status: CONSTS.CREATED,
  };

  // queries and mutations
  const {
    data: { tasksByStatus: { items: tasks = [] } = {} } = {},
    // loading,
    // error
  } = useQuery(gql(tasksByStatus), { variables: listTasksVriables });

  const [create, { loading: creatingTask, error: failedToCreateTask }] =
    useMutation(gql(createTask), {
      update(cache, { data }) {
        const newTaskFromResponse = data?.createTask;
        const existingCreatedTasks = cache.readQuery({
          query: gql(tasksByStatus),
          variables: createTasksVriables,
        });
        cache.writeQuery({
          query: gql(tasksByStatus),
          variables: createTasksVriables,
          data: {
            tasksByStatus: {
              ...existingCreatedTasks?.tasksByStatus,
              items: [
                ...existingCreatedTasks?.tasksByStatus.items,
                newTaskFromResponse,
              ],
            },
          },
        });
      },
    });

  const [update] = useMutation(gql(updateTask));

  // handlers
  const initialInput = {
    title: "",
    status: CONSTS.CREATED,
    index: tasks?.length,
  };

  const handleCreate = () => {
    create({ variables: { input: initialInput } });
  };

  const handleCopy = (input) => {
    create({
      variables: {
        input: {
          ...initialInput,
          ...input,
        },
      },
    });
  };

  // 並べ替え
  const updatedIndexes = tasksSortedByReactSortable
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

  return (
    <Tasks
      tasks={getShownTasks(tasks)}
      create={handleCreate}
      copy={handleCopy}
      saveOrder={handleSaveOrder}
      setSortedTasks={setTasksSortedByReactSortable}
      creatingTask={creatingTask}
      failedToCreateTask={failedToCreateTask !== undefined}
      showCompleted={showCompleted}
      setShowCompleted={setShowCompleted}
      setIsEditingTitle={setIsEditingTitle}
    />
  );
};

EnhancedTasks.propTypes = {
  setIsEditingTitle: PropTypes.func.isRequired,
};

export default EnhancedTasks;
