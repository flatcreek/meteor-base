import React, { useEffect, useState } from 'react';
import { Accounts } from 'meteor/accounts-base';
import { Bert } from 'meteor/themeteorchef:bert';
import Alert from 'react-bootstrap/Alert';
import { useNavigate, useParams } from 'react-router-dom';

const VerifyEmail = () => {
  const [verifyError, setVerifyError] = useState(null);
  const { token } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    Accounts.verifyEmail(token, async (error) => {
      if (error) {
        console.warn('VerifyEmail error');
        console.warn(error);
        Bert.alert(error.reason, 'danger');
        setVerifyError(`${error.reason}. Please try again.`);
      } else {
        Bert.alert('All set, thanks!', 'success');
        navigate('/');
      }
    });
  }, [verifyError]);

  return (
    <div className="VerifyEmail">
      <Alert variant={!verifyError ? 'info' : 'danger'}>
        {!verifyError ? 'Verifying...' : verifyError}
      </Alert>
    </div>
  );
};

export default VerifyEmail;
