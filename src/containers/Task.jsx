// apollo
import { gql, useMutation } from "@apollo/client";

// components, graphql, and consts
import { updateTask } from "../graphql/mutations";
import Task from "../components/molecules/Task";
import { tasksPropTypes, handleHoursChange } from "../utils";

const EhnahcedTask = ({ task }) => {
  const [update] = useMutation(gql(updateTask));

  const handleOnChange = (input) => {
    update({
      variables: {
        input: {
          ...input,
          id: task.id
        }
      },
      optimisticResponse: {
        updateTask: {
          ...input,
          id: task.id,
          __typename: "Task"
        }
      }
    });
  };

  const handleDateTimeChange = (key, dateTime) => {
    handleOnChange({ [key]: dateTime.toISOString() });
  };

  const handleEstimatedHourChange = (e) => {
    handleHoursChange({
      e,
      key: "estimatedHour",
      handleOnChange
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
      handleDateTimeChange={handleDateTimeChange}
      handleOnChange={handleOnChange}
      handleEstimatedHourChange={handleEstimatedHourChange}
    />
  );
};

EhnahcedTask.propTypes = {
  task: tasksPropTypes.isRequired
};

export default EhnahcedTask;
