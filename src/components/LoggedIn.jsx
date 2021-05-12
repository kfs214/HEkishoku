import { AmplifySignOut } from "@aws-amplify/ui-react";

const LoggedIn = () => (
  <>
    <p>This will be shown if you are logged in.</p>
    <AmplifySignOut />
  </>
);

export default LoggedIn;
