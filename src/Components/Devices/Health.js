import React from 'react';
import Badge from 'react-bootstrap/Badge';

const Health = ({ health }) => {
  if (health) {
    return <Badge variant="success">Healthy</Badge>;
  } else {
    return <Badge variant="danger">Malfunctioning</Badge>;
  }
};

export default Health;
