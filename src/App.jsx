// react
import { useState, useEffect } from "react";

// material UI
import { Container, Toolbar } from "@material-ui/core";

// amplify
import { Auth, Hub } from "aws-amplify";
import { AmplifyAuthenticator } from "@aws-amplify/ui-react";

// components
import HEAppBar from "./components/organisms/HEAppBar";
import LoggedIn from "./components/templates/LoggedIn";
import SignUp from "./components/templates/SignUp";

const App = () => {
  const [userSub, updateUserSub] = useState(null);
  const [isEditingTitle, setIsEditingTitle] = useState(false);

  useEffect(() => {
    Auth.currentAuthenticatedUser()
      .then((currentUser) => updateUserSub(currentUser.attributes.sub))
      // eslint-disable-next-line no-console
      .catch(() => console.log("No signed in user."));
    Hub.listen("auth", (data) => {
      switch (data.payload.event) {
        case "signIn":
          return updateUserSub(data.payload.data.attributes.sub);
        case "signOut":
          return updateUserSub(null);
        default:
          return null;
      }
    });
  }, [userSub]);

  return (
    <>
      <HEAppBar
        isLoggedIn={!!userSub}
        userSub={userSub}
        isEditingTitle={isEditingTitle}
      />
      <Toolbar />
      <Container>
        <AmplifyAuthenticator>
          {userSub ? (
            <LoggedIn setIsEditingTitle={setIsEditingTitle} />
          ) : (
            <SignUp />
          )}
        </AmplifyAuthenticator>
      </Container>
    </>
  );
};

export default App;
