// react
import React from "react";

// material UI
import { CssBaseline, Button } from "@material-ui/core";

// amplify
import Amplify from "aws-amplify";
import awsExports from "./aws-exports";
Amplify.configure(awsExports);

const App = () => (
  <React.Fragment>
    <CssBaseline />
    <Button variant="contained" color="primary">
      Primary
    </Button>
  </React.Fragment>
);

export default App;
