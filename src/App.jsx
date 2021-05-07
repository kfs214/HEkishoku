// react
import { useState, useEffect } from "react";

// amplify
import Amplify, { Auth, Hub } from "aws-amplify";
import awsExports from "./aws-exports";

// components
import SignUp from "./components/SignUp";

Amplify.configure(awsExports);

const App = () => {
  const [user, updateUser] = useState(null);

  useEffect(() => {
    Auth.currentAuthenticatedUser()
      .then((currentUser) => updateUser(currentUser))
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

  if (user) {
    return <p>logged in.</p>;
  }

  return <SignUp />;
};

export default App;
