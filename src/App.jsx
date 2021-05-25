// react
import { useState, useEffect } from "react";

// material UI
import { Container, Toolbar } from "@material-ui/core";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

// Apollo
import { ApolloProvider } from "@apollo/react-hooks";
import {
  ApolloLink,
  createHttpLink,
  InMemoryCache,
  ApolloClient
} from "@apollo/client";

// amplify
import Amplify, { Auth, Hub } from "aws-amplify";
import { AmplifyAuthenticator } from "@aws-amplify/ui-react";
import { createAuthLink } from "aws-appsync-auth-link";
import awsExports from "./aws-exports";

// components
import HEAppBar from "./components/HEAppBar";
import LoggedIn from "./components/LoggedIn";
import SignUp from "./components/SignUp";

Amplify.configure(awsExports);

const url = awsExports.aws_appsync_graphqlEndpoint;

const client = new ApolloClient({
  link: ApolloLink.from([
    createAuthLink({
      url,
      region: awsExports.aws_appsync_region,
      auth: {
        type: awsExports.aws_appsync_authenticationType,
        jwtToken: async () =>
          (await Auth.currentSession()).getIdToken().getJwtToken()
      }
    }),
    createHttpLink({ uri: url })
  ]),
  cache: new InMemoryCache()
});

const App = () => {
  const [user, updateUser] = useState(null);

  useEffect(() => {
    Auth.currentAuthenticatedUser()
      .then((currentUser) => updateUser(currentUser))
      // eslint-disable-next-line no-console
      .catch(() => console.log("No signed in user."));
    Hub.listen("auth", (data) => {
      switch (data.payload.event) {
        case "signIn":
          return updateUser(data.payload.data);
        case "signOut":
          return updateUser(null);
        default:
          return null;
      }
    });
  }, []);

  return (
    <ApolloProvider client={client}>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <HEAppBar isLoggedIn={!!user} />
        <Toolbar />
        <Container>
          <AmplifyAuthenticator>
            {user ? <LoggedIn /> : <SignUp />}
          </AmplifyAuthenticator>
        </Container>
      </MuiPickersUtilsProvider>
    </ApolloProvider>
  );
};

export default App;
