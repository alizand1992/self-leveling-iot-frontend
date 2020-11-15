import React from 'react';
import Registered from './Registered';
import Unregistered from './Unregistered';

class Devices extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      needsReload: false,
    };
  }

  reload = () => {
    this.setState({ needsReload: true });
  }

  reloadDone = () => {
    if (this.state.needsReload === true) {
      this.setState({ needsReload: false });
    }
  }

  render() {
    const { needsReload } = this.state;

    return (
      <React.Fragment>
        <Registered reload={this.reload}
                    needsReload={needsReload}
                    reloadDone={this.reloadDone} />
        <Unregistered reload={this.reload}
                      needsReload={needsReload}
                      reloadDone={this.reloadDone} />
      </React.Fragment>
    );
  }
}

export default Devices;
