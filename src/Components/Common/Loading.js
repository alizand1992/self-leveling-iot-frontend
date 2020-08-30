import React from 'react';

import ReactLoading from 'react-loading';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

const Loading = ({ message }) => {
  return (
    <React.Fragment>
      <ReactLoading type="spin"
                    style={{
                      marginLeft: 'auto',
                      marginRight: 'auto',
                      width: 100,
                      fill: '#aaa'
                    }}/>
      {message &&
        <Row>
          <Col md={12} className="text-center">
            <br />
            {message}
          </Col>
        </Row>
      }
    </React.Fragment>
  );
};

export default Loading;
