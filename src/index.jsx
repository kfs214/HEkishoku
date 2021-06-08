// React
import React from "react";
import ReactDOM from "react-dom";

// material UI
import { CssBaseline } from "@material-ui/core";
import { MuiThemeProvider } from "@material-ui/core/styles";
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

// Amplify
import Amplify, { Auth } from "aws-amplify";
import { createAuthLink } from "aws-appsync-auth-link";
import awsExports from "./aws-exports";

// component and misc
import App from "./App";
import reportWebVitals from "./reportWebVitals";

// theme
import theme from "./styles/theme";
import "./styles/amplify.css";

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

ReactDOM.render(
  <React.StrictMode>
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <ApolloProvider client={client}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <App />
        </MuiPickersUtilsProvider>
      </ApolloProvider>
    </MuiThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
