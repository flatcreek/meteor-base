import React, { useEffect, useState, useContext } from 'react';
import { Accounts } from 'meteor/accounts-base';
import { Bert } from 'meteor/themeteorchef:bert';
import { Alert } from 'react-bootstrap';
import { useHistory, useParams } from 'react-router-dom';

import { AuthContext } from '../../../global/context/Authentication';

const VerifyEmail = () => {
  const { login } = useContext(AuthContext);
  const [verifyError, setVerifyError] = useState(null);
  const { token } = useParams();
  const history = useHistory();

  useEffect(() => {
    Accounts.verifyEmail(token, async (error) => {
      if (error) {
        console.warn('VerifyEmail error');
        console.warn(error);
        Bert.alert(error.reason, 'danger');
        setVerifyError(`${error.reason}. Please try again.`);
      } else {
        await login();
        Bert.alert('All set, thanks!', 'success');
        history.push('/');
      }
    });
  }, [verifyError]);

  return (
    <div className="VerifyEmail">
      <Alert bsStyle={!verifyError ? 'info' : 'danger'}>
        {!verifyError ? 'Verifying...' : verifyError}
      </Alert>
    </div>
  );
};

export default VerifyEmail;
