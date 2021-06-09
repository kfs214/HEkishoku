import Task from "../molecules/Task";

const Tasks = () => (
  <>
    <Task task={{ status: "DONE" }} />
    <Task task={{ status: "CREATED" }} />
  </>
);

export default Tasks;
