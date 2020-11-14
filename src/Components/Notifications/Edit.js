import React from 'react';
import Card from 'react-bootstrap/Card';
import NotificationsForm from './NotificationsForm';
import { withRouter } from 'react-router-dom';
import { getNotificationData, updateNotification } from '../../Util/Ajax/Notifications';
import Loading from '../Common/Loading';

import axios from 'axios';
import Triggers from '../Triggers';
import Form from 'react-bootstrap/Form';

class Edit extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.match.params.id,
      name: props.name || '',
      description: props.description || '',
      dirty: false,
      updating: false,
    };
  }

  componentDidMount() {
    this.cancelTokens = axios.CancelToken.source();

    getNotificationData(this.state.id, (res) => {
      const { name, description } = res;
      this.setState({
        name,
        description,
      });
    }, this.cancelTokens);
  }

  componentWillUnmount() {
    if (this.cancelTokens) {
      this.cancelTokens.cancel();
    }
  }

  handleChange = (e, field) => {
    this.setState({
      [field]: e.target.value,
      dirty: true,
    });
  }

  submit = (e) => {
    e.preventDefault();

    const { id, name, description, dirty } = this.state;

    if (dirty) {
      this.setState({ updating: true });

      if (name.trim() === '' || description.trim() === '') {
        window.alert('All fields are required.');
        return;
      }

      updateNotification({ id, name, description }, (res) => {
        this.setState({ updating: false, dirty: false });
      });
    }
  }

  render() {
    const { id, name, description, updating, dirty } = this.state;

    if (updating) {
      return <Loading message="Updating your notification." />;
    }

    return (
      <Card>
        <Card.Header>
          Edit Notification
        </Card.Header>
        <Card.Body>
          <NotificationsForm buttonText="Update"
                             name={name}
                             submitDisabled={!dirty}
                             description={description}
                             submit={this.submit}
                             handleChange={this.handleChange} />
          <br /><br />
          <Triggers notificationId={id} />
        </Card.Body>
      </Card>
    );
  }
}

export default withRouter(Edit);
