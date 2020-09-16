import React from 'react';
import Card from 'react-bootstrap/Card';
import NotificationsForm from './NotificationsForm';
import { saveNotification } from '../../Util/Ajax/Notifications';
import { Redirect } from 'react-router-dom';

class New extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      description: '',
      redirect: false,
    };
  }

  handleChange = (e, field) => {
    this.setState({
      [field]: e.target.value,
    });
  }

  submit = (e) => {
    e.preventDefault();

    const { name, description } = this.state;

    if (name.trim() === '' || description.trim() === '') {
      window.alert('All fields are required.');
      return;
    }

    saveNotification({ name, description }, () => {
      this.setState({ redirect: true });
    });
  }

  render() {
    const { name, description, redirect } = this.state;

    if (redirect) {
      return <Redirect to="/notifications" />;
    }

    return (
      <Card>
        <Card.Header>
          New Notification
        </Card.Header>
        <Card.Body>
          <NotificationsForm buttonText="Create"
                             name={name}
                             description={description}
                             submit={this.submit}
                             handleChange={this.handleChange} />
        </Card.Body>
      </Card>
    );
  }
}

export default New;
