// react
import { useState, useEffect } from "react";

// amplify
import Amplify, { Auth, Hub } from "aws-amplify";
import { AmplifyAuthenticator } from "@aws-amplify/ui-react";
import awsExports from "./aws-exports";

// components
import SignUp from "./components/SignUp";
import LoggedIn from "./components/LoggedIn";

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
    <AmplifyAuthenticator>
      {user ? <LoggedIn /> : <SignUp />}
    </AmplifyAuthenticator>
  );
};

export default App;
