import { AmplifyAuthenticator, AmplifySignUp } from "@aws-amplify/ui-react";

const SignUp = () => (
  <AmplifyAuthenticator>
    <AmplifySignUp
      slot="sign-up"
      formFields={[
        { type: "username" },
        { type: "password" },
        { type: "email" },
      ]}
    />
  </AmplifyAuthenticator>
);

export default SignUp;
