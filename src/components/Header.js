import React from 'react';
import { withTranslation } from 'react-i18next';
import '../styles/Header.css';

function Header({ t }) {
  return (
    <header className="header">
      <div className="header-title">MeVBot v0.2</div>
      <div className="header-address">{t('address')}: 0x49f7E...52a003C8c</div>
    </header>
  );
}

export default withTranslation()(Header);
