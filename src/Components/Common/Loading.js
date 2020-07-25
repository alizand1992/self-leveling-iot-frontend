import React from 'react';

import ReactLoading from 'react-loading';


const Loading = () => (
  <ReactLoading type="spin"
                style={{
                  marginLeft: 'auto',
                  marginRight: 'auto',
                  width: 100,
                  fill: '#aaa'
                }} />
);

export default Loading;