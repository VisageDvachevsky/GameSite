import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import supabase from './supabaseClient';
import '../styles/WithdrawModal.css';

class WithdrawModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      address: '',
      amount: '',
      network: 'BSC', // default selection
      errorMessage: '',
    };
  }

  handleAddressChange = (e) => {
    this.setState({ address: e.target.value });
  }

  handleAmountChange = (e) => {
    this.setState({ amount: e.target.value });
  }

  handleNetworkChange = (e) => {
    this.setState({ network: e.target.value });
  }

  handleWithdraw = async () => {
    const { balance, onWithdraw, t } = this.props;
    const { address, amount, network } = this.state;
    const amountNumber = parseFloat(amount);

    if (!address || !amount) {
      this.setState({ errorMessage: t('allFieldsRequired') });
    } else if (amountNumber > balance) {
      this.setState({ errorMessage: t('insufficientFunds') });
    } else if (amountNumber <= 0) {
      this.setState({ errorMessage: t('amountGreaterThanZero') });
    } else {
      try {
        const { error } = await supabase
          .from('transactions')
          .insert([{ address, amount: amountNumber, network, date: new Date().toISOString() }]);

        if (error) throw error;

        onWithdraw(amountNumber);
        this.setState({ errorMessage: '', address: '', amount: '', network: 'BSC' });
      } catch (error) {
        console.error('Error adding transaction: ', error);
        this.setState({ errorMessage: t('transactionSaveError') });
      }
    }
  }

  render() {
    const { balance, onClose, t } = this.props;
    const { address, amount, network, errorMessage } = this.state;

    return (
      <div className="modal-overlay">
        <div className="withdraw-modal">
          <h2>{t('withdrawFunds')}</h2>
          <div className="balance-frame">
            <p>{t('currentBalance')}:</p>
            <p className="balance-amount">${balance.toFixed(2)}</p>
          </div>
          
          <div className="modal-input-group">
            <label>{t('walletAddress')}:</label>
            <input 
              type="text" 
              placeholder={t('enterWalletAddress')}
              value={address}
              onChange={this.handleAddressChange}
            />
          </div>
          <div className="modal-input-group">
            <label>{t('withdrawAmount')}:</label>
            <input 
              type="number" 
              placeholder={t('enterAmount')}
              value={amount}
              onChange={this.handleAmountChange}
            />
          </div>
          <div className="modal-input-group network-group">
            <label>{t('selectNetwork')}:</label>
            <div className="radio-group">
              <div className="radio-option">
                <input
                  type="radio"
                  id="bsc"
                  value="BSC"
                  checked={network === 'BSC'}
                  onChange={this.handleNetworkChange}
                />
                <label htmlFor="bsc">BSC</label>
              </div>
              <div className="radio-option">
                <input
                  type="radio"
                  id="eth"
                  value="ETH"
                  checked={network === 'ETH'}
                  onChange={this.handleNetworkChange}
                />
                <label htmlFor="eth">ETH</label>
              </div>
            </div>
          </div>

          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <button onClick={this.handleWithdraw} className="modal-button">{t('withdraw')}</button>
          <button onClick={onClose} className="modal-button">{t('cancel')}</button>
        </div>
      </div>
    );
  }
}

WithdrawModal.propTypes = {
  balance: PropTypes.number.isRequired,
  onWithdraw: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};

export default withTranslation()(WithdrawModal);
