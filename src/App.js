// react
import React from "react";

// material UI and theme
import { CssBaseline, Button } from "@material-ui/core";
import { MuiThemeProvider } from "@material-ui/core/styles";
import theme from "./theme";
import "./amplify.css";

// amplify
import { withAuthenticator } from "@aws-amplify/ui-react";
import Amplify from "aws-amplify";
import awsExports from "./aws-exports";
Amplify.configure(awsExports);

const App = () => (
  <MuiThemeProvider theme={theme}>
    <CssBaseline />
    <Button variant="contained" color="primary">
      Primary
    </Button>
    <Button variant="contained" color="secondary">
      Secondary
    </Button>
  </MuiThemeProvider>
);

export default withAuthenticator(App);
