import React, { Suspense } from 'react';

import Container from 'react-bootstrap/Container';

import Loading from './Components/Common/Loading';

function App() {
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
