import React from 'react';
import jwt from 'jsonwebtoken';
import AuthenticationContext from '../contexts/AuthenticationContext';

function getUserEmail(accessToken) {
  const decodedToken = jwt.decode(accessToken);
  return decodedToken.email;
}

function UserGreeting({ onLogout }) {
  return (
    <AuthenticationContext.Consumer>
      {({ accessToken }) => (
        <>
          Witaj {getUserEmail(accessToken)} /{' '}
          <a href="#" className="header__logout-link" onClick={onLogout}>
            wyloguj się
          </a>
        </>
      )}
    </AuthenticationContext.Consumer>
  );
}

export default UserGreeting;
