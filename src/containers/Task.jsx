// react
import PropTypes from "prop-types";

// apollo
import { gql, useMutation } from "@apollo/client";

// components, graphql, and consts
import { updateTask } from "../graphql/mutations";
import Task from "../components/molecules/Task";
import { tasksPropTypes, handleHoursChange, handleTaskUpdate } from "../utils";

const EhnahcedTask = ({ task, copy, showCompleted }) => {
  const [update] = useMutation(gql(updateTask));

  const handleOnChange = (input) => {
    handleTaskUpdate({ update, input, id: task.id });
  };

  const handleDateTimeChange = (key, dateTime) => {
    handleOnChange({ [key]: dateTime.toISOString() });
  };

  const resetDateTime = (key) => {
    handleOnChange({ [key]: null });
  };

  const handleEstimatedHourChange = (e) => {
    handleHoursChange({
      e,
      key: "estimatedHour",
      handleOnChange
    });
  };

  const handleCopy = () => {
    const { title, estimatedHour, startedAt, endedBy } = task;
    copy({
      title,
      estimatedHour,
      startedAt,
      endedBy
    });
  };

  return (
    <Task
      id={task.id}
      title={task.title}
      status={task.status}
      estimatedHour={String(task.estimatedHour ?? "")}
      startedAt={task.startedAt}
      endedBy={task.endedBy}
      startedBy={task.startedBy}
      endedAt={task.endedAt}
      handleDateTimeChange={handleDateTimeChange}
      resetDateTime={resetDateTime}
      handleOnChange={handleOnChange}
      handleEstimatedHourChange={handleEstimatedHourChange}
      handleCopy={handleCopy}
      showCompleted={showCompleted}
    />
  );
};

EhnahcedTask.propTypes = {
  task: tasksPropTypes.isRequired,
  copy: PropTypes.func.isRequired,
  showCompleted: PropTypes.bool.isRequired
};

export default EhnahcedTask;
