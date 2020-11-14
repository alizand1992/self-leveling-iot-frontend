import React from 'react';
import Form from 'react-bootstrap/Form';

class ValueField extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: props.value,
    };
  }

  setValue = (e) => {
    this.setState({ value: e.target.value });
    this.props.onChange(e.target.value);
  }

  render() {
    const { disabled, triggerType, options, value } = this.props;

    if (disabled || triggerType === '') {
      return (
        <Form.Group>
          <Form.Label>Value:</Form.Label>
          <Form.Control disabled={true}/>
        </Form.Group>
      );
    }

    if (triggerType === 'float') {
      return (
        <Form.Group>
          <Form.Label>Value:</Form.Label>
          <Form.Control onChange={this.setValue} value={value} />
        </Form.Group>
      );
    } else if (triggerType === 'bool') {
      return (
        <Form.Group>
          <Form.Label>Value:</Form.Label>
          <Form.Control as="select" custom={true} onChange={this.setValue} value={value}>
            <option value="">-- Select --</option>
            {Object.entries(options).map(([optVal, optData]) => {
              return <option key={optVal} value={optVal}>{optData}</option>;
            })}
          </Form.Control>
        </Form.Group>
      );
    }

    return <React.Fragment />;
  }
}

export default ValueField;
