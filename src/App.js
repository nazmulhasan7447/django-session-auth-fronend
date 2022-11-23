import React from "react";
import { BrowserRouter, HashRouter } from "react-router-dom";
import { SnackbarProvider } from "notistack";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import Main from "./Main";
import { AuthProvider } from "./components/auth/Authentication";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <SnackbarProvider
          maxSnack={3}
          autoHideDuration={3000}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          <Main />
        </SnackbarProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;

// "start": "set HTTPS=true&&set SSL_CRT_FILE=C:/Windows/System32/cert.crt&&set SSL_KEY_FILE=C:/Windows/System32/cert.key&&react-scripts start",
