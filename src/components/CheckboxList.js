import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import '../styles/CheckboxList.css';
import LoadingModal from './LoadingModal';
import NotificationModal from './NotificationModal';

function CheckboxList({ isGeneratorActive }) {
  const { t } = useTranslation(); // Hook for translation
  const networks = ["BSC", "ETH"];
  const exchanges = ["Uniswap ETH", "Sushiswap", "Uniswap BSC", "Pancakeswap"];
  const [showLoading, setShowLoading] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [checkboxStates, setCheckboxStates] = useState({});

  const handleCheckboxChange = (event, type) => {
    const { id, checked } = event.target;
    setCheckboxStates(prevState => ({
      ...prevState,
      [id]: checked
    }));

    if (checked) {
      setShowLoading(true);
      setTimeout(() => {
        setShowLoading(false);
        setNotificationMessage(`${type} ${t('successfully_connected')}`);
        setShowNotification(true);
      }, Math.random() * (6500 - 4000) + 4000); 
    }
  };

  const handleLoaded = () => {
    setShowLoading(false);
    setShowNotification(true);
  };

  const handleCloseNotification = () => {
    setShowNotification(false);
  };

  useEffect(() => {
    const checkboxes = document.querySelectorAll('.checkbox-item input');
    checkboxes.forEach(checkbox => {
      checkbox.disabled = isGeneratorActive;
    });
  }, [isGeneratorActive]);

  return (
    <div className="checkbox-list">
      {showLoading && <LoadingModal onLoaded={handleLoaded} />}
      {showNotification && <NotificationModal message={notificationMessage} onClose={handleCloseNotification} />}
      <div className="networks">
        <h3>{t('networks')}</h3>
        {networks.map((network, index) => (
          <div key={index} className="checkbox-item">
            <input
              type="checkbox"
              id={network}
              name={network}
              onChange={(e) => handleCheckboxChange(e, t('network'))}
              checked={checkboxStates[network] || false}
            />
            <label htmlFor={network}>{t(network)}</label>
          </div>
        ))}
      </div>
      <div className="exchanges">
        <h3>{t('exchanges')}</h3>
        {exchanges.map((exchange, index) => (
          <div key={index} className="checkbox-item">
            <input
              type="checkbox"
              id={exchange}
              name={exchange}
              onChange={(e) => handleCheckboxChange(e, t('exchange'))}
              checked={checkboxStates[exchange] || false}
            />
            <label htmlFor={exchange}>{t(exchange)}</label>
          </div>
        ))}
      </div>
    </div>
  );
}

CheckboxList.propTypes = {
  isGeneratorActive: PropTypes.bool.isRequired,
};

export default CheckboxList;
