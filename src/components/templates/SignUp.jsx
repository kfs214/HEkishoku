import { AmplifySignUp } from "@aws-amplify/ui-react";

const SignUp = () => (
  <AmplifySignUp
    slot="sign-up"
    formFields={[{ type: "username" }, { type: "password" }, { type: "email" }]}
  />
);

export default SignUp;
