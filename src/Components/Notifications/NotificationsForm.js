import React from 'react';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const NotificationsForm = ({ buttonText, submit, handleChange, name, description }) => {
  return (
    <Form>
      <Form.Group>
        <Form.Label>Name:</Form.Label>
        <Form.Control type="text"
                      placeholder="Name"
                      value={name}
                      onChange={(e) =>  handleChange(e, 'name')}  />
      </Form.Group>
      <Form.Group>
        <Form.Label>Description:</Form.Label>
        <Form.Control as="textarea"
                      placeholder="Description"
                      rows={3}
                      value={description}
                      onChange={(e) =>  handleChange(e, 'description')}  />
      </Form.Group>
      <Button type="primary" className="float-right" onClick={submit}>
        {buttonText}
      </Button>
    </Form>
  );
};

export default NotificationsForm;
