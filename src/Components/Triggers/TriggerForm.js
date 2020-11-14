import React from 'react';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { deleteTrigger, getTriggerAttributes, saveTrigger, updateTrigger } from '../../Util/Ajax/Triggers';
import axios from 'axios';
import Loading from '../Common/Loading';
import ValueField from './ValueField';
import Button from 'react-bootstrap/Button';

class TriggerForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: props.id,
      attributes: undefined,
      name: props.name || '',
      relationship: props.relationship || '',
      value: props.value || '',
      dirty: false,
    };
  }

  componentDidMount() {
    this.cancelTokens = axios.CancelToken.source();

    getTriggerAttributes((attributes) => {
      this.setState({ attributes });
    }, this.cancelTokens);
  }

  componentWillUnmount() {
    if (this.cancelTokens) {
      this.cancelTokens.cancel();
    }
  }

  setField = (e, field) => {
    this.setState({ [field]: e.target.value, dirty: true });
  }

  setValue = (value) => {
    this.setState({ value, dirty: true });
  }

  saveTrigger = (e) => {
    e.preventDefault();
    const { attributes, name, relationship, value } = this.state;
    const { notificationId } = this.props;
    const trigger_type = attributes[name].trigger_type;

    saveTrigger({
      aws_column: name,
      relationship,
      trigger_type,
      value,
      notification_id: notificationId,
    }, () => {
      this.setState({ dirty: false });
      this.props.reloadList();
    });
  }

  updateTrigger = (e) => {
    e.preventDefault();
    const { id, attributes, name, relationship, value } = this.state;
    const { notificationId } = this.props;
    const trigger_type = attributes[name].trigger_type;

    updateTrigger({
      id,
      aws_column: name,
      relationship,
      trigger_type,
      value,
      notification_id: notificationId,
    }, () => {
      this.setState({ dirty: false });
    });
  }

  deleteTrigger = (e) => {
    e.preventDefault();
    const { id } = this.state;
    const { notificationId } = this.props;

    deleteTrigger({ id, notificationId }, () => {
      this.props.reloadList();
    });
  }

  disabled = () => {
    const { name, relationship, value, dirty } = this.state;
    return !dirty || name === '' || relationship === '' || value.trim() === '';
  }

  render() {
    const { id, attributes, name, relationship, value } = this.state;

    if (!attributes) {
      return <Loading />;
    }

    let triggerType = '';
    let options = { };
    if (name) {
      triggerType = attributes[name].trigger_type;
      options = attributes[name].options;
    }

    return (
      <React.Fragment>
        <Row>
          <Col md={3}>
            <Form.Group>
              <Form.Label>Name:</Form.Label>
              <Form.Control as="select"
                            custom={true}
                            value={name}
                            onChange={(e) => this.setField(e, 'name')}>
                <option value="">-- Select --</option>
                {Object.entries(attributes).map(([key, data]) => {
                  return <option key={key} value={key}>{data.text}</option>;
                })}
              </Form.Control>
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group>
              <Form.Label>Relationship:</Form.Label>
              {Object.entries(attributes).map(([key, data]) => {
                return (
                  <React.Fragment key={`relationship:${key}`}>
                    {name === key &&
                    <Form.Control as="select"
                                  value={relationship}
                                  custom={true}
                                  onChange={(e) => this.setField(e, 'relationship')}>
                      <option value="">-- Select --</option>
                      {Object.entries(data.relationships).map(([relVal, relData]) => {
                        return <option key={relVal} value={relVal}>{relData}</option>;
                      })}
                    </Form.Control>
                    }
                  </React.Fragment>
                );
              })}
              {!name &&
                <Form.Control as="select" custom={true} disabled={true}>
                  <option>-- Select --</option>
                </Form.Control>
              }
            </Form.Group>
          </Col>
          <Col md={3}>
            <ValueField disabled={!relationship}
                        field={name}
                        value={value}
                        triggerType={triggerType} onChange={(value) => this.setValue(value)}
                        options={options} />
          </Col>
          <Col md={3}>
            <Form.Label>&nbsp;</Form.Label><br />
            {!id &&
              <Button variant="primary" disabled={this.disabled()} onClick={this.saveTrigger}>Save</Button>
            }
            {id &&
              <React.Fragment>
                <Button variant="primary" disabled={this.disabled()} onClick={this.updateTrigger}>Update</Button>
                {' '}
                <Button variant="danger" onClick={this.deleteTrigger}>Delete</Button>
              </React.Fragment>
            }
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}

export default TriggerForm;
