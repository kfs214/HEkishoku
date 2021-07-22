// apollo
import { gql, useQuery, useMutation } from "@apollo/client";

// components, graphql, and consts
import Tasks from "../components/organisms/Tasks";
import { listTasks } from "../graphql/queries";
import { createTask } from "../graphql/mutations";
import CONSTS from "../consts";

const EnhancedTasks = () => {
  const {
    // data: { listTasks: { items: tasks = [] } = {} } = {}
    data: dataListTasks
    // loading,
    // error
  } = useQuery(gql(listTasks));
  console.log({ dataListTasks });

  const { listTasks: { items: tasks = [] } = {} } = dataListTasks ?? {};

  const [
    create,
    { loading: creatingTask, error: failedToCreateTask }
  ] = useMutation(gql(createTask), {
    update(cache, { data }) {
      const newTaskFromResponse = data?.createTask;
      const existingTasks = cache.readQuery({ query: gql(listTasks) });

      cache.writeQuery({
        query: gql(listTasks),
        data: {
          listTasks: {
            ...existingTasks?.listTasks,
            items: [...existingTasks?.listTasks.items, newTaskFromResponse]
          }
        }
      });
    }
  });

  const initialInput = {
    title: "",
    status: CONSTS.CREATED
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
    />
  );
};

export default EnhancedTasks;
