// CONCEPT: Work in progress
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { AuthContext } from '../../../global/context/Authentication';

const publicLoader = (props) => {
  console.log('publicLoader.props:');
  console.log(props);
  const { userId } = useContext(AuthContext);
  const navigate = useNavigate();

  // If this is a public page and the user is logged in -- redirect to the index page
  if (userId) {
    return navigate('/');
  }
};

export default publicLoader;
