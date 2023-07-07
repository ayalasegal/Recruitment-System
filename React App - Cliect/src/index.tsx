import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./store";
import { theme } from "./external/Theme";
import { CssBaseline } from "@mui/material";
import { Experimental_CssVarsProvider as CssVarsProvider } from "@mui/material/styles";
import MyRoutes from "./MyRoutes";

const app = (
  <Provider store={store}>
    {/* <CssVarsProvider theme={theme}> */}
      {/* <CssBaseline /> */}
      <MyRoutes />
    {/* </CssVarsProvider> */}
  </Provider>
);

ReactDOM.render(app, document.getElementById("root"));
