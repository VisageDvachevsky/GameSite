import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import NotificationModal from './NotificationModal';
import WithdrawModal from './WithdrawModal';
import TransactionHistoryModal from './TransactionHistoryModal';
import '../styles/Sidebar.css';
import i18n from './i18n';
import themes from '../themes'; 

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOn: false,
      balance: 0.00,
      showWithdrawModal: false,
      showModal: false,
      showTransactionHistoryModal: false,
      modalMessage: '',
    };
    this.interval = null;
    this.handleToggle = this.handleToggle.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.handleWithdrawClick = this.handleWithdrawClick.bind(this);
    this.handleWithdraw = this.handleWithdraw.bind(this);
    this.handleTransactionHistoryClick = this.handleTransactionHistoryClick.bind(this);
    this.creditBalance = this.creditBalance.bind(this);
    this.handleLanguageChange = this.handleLanguageChange.bind(this);
    this.handleThemeChange = this.handleThemeChange.bind(this); 
    window.creditBalance = this.creditBalance;
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.isOn !== prevState.isOn) {
      if (this.state.isOn) {
        this.startUpdatingBalance();
      } else {
        this.stopUpdatingBalance();
      }
    }
  }

  componentWillUnmount() {
    this.stopUpdatingBalance();
  }

  handleToggle() {
    this.setState(prevState => {
      const newIsOn = !prevState.isOn;
      this.props.onToggle(newIsOn);
      return { isOn: newIsOn };
    });
  }

  handleCloseModal() {
    this.setState({ showModal: false, showWithdrawModal: false, showTransactionHistoryModal: false, modalMessage: '' });
  }

  handleWithdrawClick() {
    this.setState({ showWithdrawModal: true });
  }

  handleWithdraw(amount) {
    this.setState(prevState => ({
      balance: (prevState.balance - amount).toFixed(2),
      showModal: true,
      modalMessage: this.props.t('fundsWithdrawn'),
      showWithdrawModal: false,
    }));
  }

  handleTransactionHistoryClick() {
    this.setState({ showTransactionHistoryModal: true });
  }

  creditBalance(amount) {
    this.setState(prevState => ({
      balance: (parseFloat(prevState.balance) + parseFloat(amount)).toFixed(2),
      showModal: true,
      modalMessage: this.props.t('creditSuccess', { amount })
    }));
  }

  startUpdatingBalance() {
    this.updateBalance();
  }

  stopUpdatingBalance() {
    clearTimeout(this.interval);
  }

  updateBalance = () => {
    const updateAmount = () => {
      const randomAmount = (Math.random() * (89 - 1) + 1).toFixed(2);
      this.setState(prevState => ({
        balance: (parseFloat(prevState.balance) + parseFloat(randomAmount)).toFixed(2),
        showModal: true,
        modalMessage: this.props.t('creditSuccess', { amount: randomAmount })
      }));
    };

    const randomInterval = Math.floor(Math.random() * (10 - 6 + 1) + 6) * 60 * 1000;

    this.interval = setTimeout(() => {
      if (this.state.isOn) {
        updateAmount();
        this.updateBalance();
      }
    }, randomInterval);
  };

  handleLanguageChange(event) {
    const language = event.target.value;
    i18n.changeLanguage(language);
  }

  handleThemeChange(event) {
    const newTheme = event.target.value;
    this.props.onThemeChange(newTheme); 
  }

  render() {
    const { balance, showWithdrawModal, showModal, showTransactionHistoryModal, modalMessage } = this.state;
    const { t } = this.props;

    return (
      <aside className="sidebar">
        <button className="sidebar-button" onClick={this.handleWithdrawClick}>{t('withdraw')}</button>
        <button className="sidebar-button" onClick={this.handleToggle}>
          {this.state.isOn ? t('toggleOff') : t('toggleOn')}
        </button>
        <button className="sidebar-button" onClick={this.handleTransactionHistoryClick}>{t('transactions')}</button>
        <div className="bottom-section">
          <div className="balance">{t('balance')}: ${balance}</div>
          <div className="selector-container">
            <label className="selector-label">{t('theme')}</label>
            <div className="theme-selector">
              <select onChange={this.handleThemeChange}>
                <option value="default">{t('default')}</option>
                <option value="tranquil">{t('tranquil')}</option>
                <option value="autumn">{t('autumn')}</option>
                <option value="sunset">{t('sunset')}</option>
                <option value="ocean">{t('ocean')}</option>
                <option value="black">{t('black')}</option>
              </select>
            </div>
          </div>
          <div className="selector-container">
            <label className="selector-label">{t('language')}</label>
            <div className="language-selector">
              <select onChange={this.handleLanguageChange}>
                <option value="ru">Русский</option>
                <option value="en">English</option>
                <option value="es">Español</option>
              </select>
            </div>
          </div>
        </div>
        {showWithdrawModal && (
          <WithdrawModal
            balance={parseFloat(balance)}
            onWithdraw={this.handleWithdraw}
            onClose={this.handleCloseModal}
          />
        )}
        {showModal && (
          <NotificationModal
            message={modalMessage}
            onClose={this.handleCloseModal}
          />
        )}
        {showTransactionHistoryModal && (
          <TransactionHistoryModal
            onClose={this.handleCloseModal}
          />
        )}
      </aside>
    );
  }
}

Sidebar.propTypes = {
  onToggle: PropTypes.func.isRequired,
  onThemeChange: PropTypes.func.isRequired, 
  t: PropTypes.func.isRequired,
};

export default withTranslation()(Sidebar);
