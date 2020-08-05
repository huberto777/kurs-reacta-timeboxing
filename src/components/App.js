import React from 'react';

import ErrorBoundary from './ErrorBoundary';
import LoginForm from './LoginForm';
import AuthenticationContext from '../contexts/AuthenticationContext';
import AuthenticationAPI from '../api/FakeAuthenticationApi';

const AuthenticatedApp = React.lazy(() => import('./AuthenticatedApp'));

class App extends React.Component {
  state = {
    accessToken: null,
    previousLoginAttemptFailed: false,
    expiresIn: 3600000,
  };

  componentDidMount() {
    this.getAccessToken();
    this.intID = setInterval(() => {
      this.handleLogout();
    }, this.state.expiresIn);
  }

  componentWillUnmount() {
    clearInterval(this.intID);
  }

  getAccessToken() {
    this.setState({
      accessToken: localStorage.getItem('accessToken'),
      previousLoginAttemptFailed: false,
    });
  }

  handleLoginAttempt = (credentials) => {
    AuthenticationAPI.login(credentials)
      .then(({ accessToken }) => {
        localStorage.setItem('accessToken', accessToken);
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
      accessToken: localStorage.removeItem('accessToken'),
      previousLoginAttemptFailed: false,
    });
  };

  isUserLoggedIn() {
    return !!this.state.accessToken;
  }

  render() {
    return (
      <div className="App">
        <h2 className="title">Timeboxing</h2>
        <ErrorBoundary message="Coś nie działa w całej aplikacji">
          {this.isUserLoggedIn() ? (
            <AuthenticationContext.Provider value={{ accessToken: this.state.accessToken }}>
              <React.Suspense fallback="... Loading">
                <AuthenticatedApp onLogout={this.handleLogout} />
              </React.Suspense>
            </AuthenticationContext.Provider>
          ) : (
            <LoginForm
              errorMessage={
                this.state.previousLoginAttemptFailed ? 'Nie udało się zalogować' : null
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
