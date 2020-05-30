import React from "react";

import ErrorBoundary from "./ErrorBoundary";
import LoginForm from "./LoginForm";
import AuthenticationContext from "../contexts/AuthenticationContext";
import AuthenticationAPI from "../api/FakeAuthenticationApi";

const AuthenticatedApp = React.lazy(() => import("./AuthenticatedApp"));

class App extends React.Component {
  state = {
    accessToken: null,
    previousLoginAttemptFailed: false,
    expiresIn: 3600000,
  };

  getAccessToken() {
    this.setState({
      accessToken: localStorage.getItem("accessToken"),
      previousLoginAttemptFailed: false,
    });
  }

  componentDidMount() {
    this.getAccessToken();
    this.intID = setInterval(() => {
      this.handleLogout();
    }, this.state.expiresIn);
  }

  componentWillUnmount() {
    clearInterval(this.intID);
  }

  isUserLoggedIn() {
    return !!this.state.accessToken;
  }

  handleLoginAttempt = (credentials) => {
    AuthenticationAPI.login(credentials)
      .then(({ accessToken }) => {
        localStorage.setItem("accessToken", accessToken);
        this.getAccessToken();
      })
      .catch(() => {
        this.setState({
          accessToken: null,
          previousLoginAttemptFailed: true,
        });
      });
  };

  handleLogout = () => {
    this.setState({
      accessToken: localStorage.removeItem("accessToken"),
      previousLoginAttemptFailed: false,
    });
  };

  render() {
    return (
      <div className="App">
        <ErrorBoundary message="Coś nie działa w całej aplikacji">
          {this.isUserLoggedIn() ? (
            <AuthenticationContext.Provider
              value={{ accessToken: this.state.accessToken }}
            >
              {
                <React.Suspense fallback={"... Loading"}>
                  <AuthenticatedApp onLogout={this.handleLogout} />
                </React.Suspense>
              }
            </AuthenticationContext.Provider>
          ) : (
            <LoginForm
              errorMessage={
                this.state.previousLoginAttemptFailed
                  ? "Nie udało się zalogować"
                  : null
              }
              onLoginAttempt={this.handleLoginAttempt}
            />
          )}
        </ErrorBoundary>
      </div>
    );
  }
}

export default App;
