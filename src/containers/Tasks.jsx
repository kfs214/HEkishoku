// apollo
import { gql, useQuery, useMutation } from "@apollo/client";

// components, graphql, and consts
import Tasks from "../components/organisms/Tasks";
import { listTasks } from "../graphql/queries";
import { createTask } from "../graphql/mutations";
import CONSTS from "../consts";

const EnhancedTasks = () => {
  const {
    data: { listTasks: { items: tasks = [] } = {} } = {}
    // loading,
    // error
  } = useQuery(gql(listTasks));

  const [create] = useMutation(gql(createTask), {
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

  const handleCreate = () => {
    const variables = {
      variables: {
        input: {
          title: "",
          status: CONSTS.CREATED
        }
      }
    };
    create(variables);
  };

  return <Tasks tasks={tasks} create={handleCreate} />;
};

export default EnhancedTasks;
