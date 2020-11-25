import React from 'react';
import Badge from 'react-bootstrap/Badge';
import { Spinner } from 'react-bootstrap';

const Level = ({ leveling, level }) => {
  if (leveling) {
    return <Badge variant="warning"><Spinner animation="border" size="sm" /> Leveling</Badge>;
  }

  if (level) {
    return <Badge variant="success">Level</Badge>;
  } else {
    return <Badge variant="danger">Out of Level</Badge>;
  }
};

export default Level;
