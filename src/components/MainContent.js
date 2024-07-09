import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../styles/MainContent.css';

class MainContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      blockchainAddresses: Array(10).fill('0x0000000000000000000000000000000000000000'),
    };
    this.interval = null;
  }

  componentDidUpdate(prevProps) {
    if (this.props.isToggled !== prevProps.isToggled) {
      if (this.props.isToggled) {
        this.startGeneratingAddresses();
      } else {
        this.stopGeneratingAddresses();
        this.setState({
          blockchainAddresses: Array(10).fill('0x0000000000000000000000000000000000000000'),
        });
      }
    }
  }

  componentWillUnmount() {
    this.stopGeneratingAddresses();
  }

  startGeneratingAddresses() {
    this.interval = setInterval(() => {
      this.setState({
        blockchainAddresses: Array(10).fill().map(this.generateRandomAddress),
      });
    }, 100);
  }

  stopGeneratingAddresses() {
    clearInterval(this.interval);
  }

  generateRandomAddress = () => {
    const characters = 'abcdef0123456789';
    let address = '0x';
    for (let i = 0; i < 40; i++) {
      address += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return address;
  };

  render() {
    return (
      <main className="main-content">
        <div className={`text-label ${this.props.isToggled ? 'animated' : ''}`}>
          {this.state.blockchainAddresses.map((address, index) => (
            <div key={index} className="address" unselectable="on" onSelectStart={() => false}>{address}</div>
          ))}
        </div>
      </main>
    );
  }
}

MainContent.propTypes = {
  isToggled: PropTypes.bool.isRequired,
};

export default MainContent;
