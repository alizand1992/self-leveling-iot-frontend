import React, { Suspense } from 'react';

import axios from 'axios';

import Container from 'react-bootstrap/Container';

import Loading from './Components/Common/Loading';

function App() {
  axios.defaults.baseURL = 'http://localhost:5002';
  axios.defaults.headers['Content-Type'] = 'application/json';

  const SignIn = React.lazy(() => import('./Components/Users/SignIn'));
  const SignUp = React.lazy(() => import('./Components/Users/SignUp'));

  return (
    <Container>
      <Suspense fallback={<Loading />}>
        <SignIn />
        <SignUp />
      </Suspense>
    </Container>
  );
}

export default App;
