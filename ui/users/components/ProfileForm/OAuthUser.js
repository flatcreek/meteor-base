import React from 'react';
import { capitalize } from 'lodash';
import { Button } from 'react-bootstrap';

const oAuthUser = (user) => (
  <div className="OAuthProfile">
    <div key={user.oAuthProvider} className={`LoggedInWith ${user.oAuthProvider}`}>
      <img src={`/${user.oAuthProvider}.svg`} alt={user.oAuthProvider} />
      <p>
        {`You're logged in with ${capitalize(user.oAuthProvider)} using the email address ${
          user.emailAddress
        }.`}
      </p>
      <Button
        className={`btn btn-${user.oAuthProvider}`}
        href={
          {
            facebook: 'https://www.facebook.com/settings',
            google: 'https://myaccount.google.com/privacy#personalinfo',
            github: 'https://github.com/settings/profile',
          }[user.oAuthProvider]
        }
        target="_blank"
      >
        {'Edit Profile on '}
        {capitalize(user.oAuthProvider)}
      </Button>
    </div>
  </div>
);

export default oAuthUser;
