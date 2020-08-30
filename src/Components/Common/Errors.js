import React from 'react';

import Alert from 'react-bootstrap/Alert';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

const Errors = ({ errors }) => {
  if (!errors || errors.length === 0) {
    return null;
  }

  return (
    <Row>
      <Col md={{ span: 6, offset: 3 }}>
        <Alert variant="danger">
          <ul>
            {errors.map((error, index) => <li key={index}>{error}</li>)}
          </ul>
        </Alert>
      </Col>
    </Row>
  );
};

export default Errors;