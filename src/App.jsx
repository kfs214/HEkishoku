import { useState, useEffect } from "react";
import { Container, Toolbar } from "@material-ui/core";
import Amplify, { Auth, Hub } from "aws-amplify";
import { AmplifyAuthenticator } from "@aws-amplify/ui-react";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import awsExports from "./aws-exports";

// components
import HEAppBar from "./components/HEAppBar";
import LoggedIn from "./components/LoggedIn";
import SignUp from "./components/SignUp";

Amplify.configure(awsExports);

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
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <HEAppBar isLoggedIn={!!user} />
      <Toolbar />
      <Container>
        <AmplifyAuthenticator>
          {user ? <LoggedIn /> : <SignUp />}
        </AmplifyAuthenticator>
      </Container>
    </MuiPickersUtilsProvider>
  );
};

export default App;
