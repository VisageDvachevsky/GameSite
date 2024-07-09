import React, { useState, useEffect } from 'react';
import { withTranslation } from 'react-i18next';
import supabase from './supabaseClient';
import '../styles/TransactionHistoryModal.css';

const TransactionHistoryModal = ({ onClose, t }) => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      const { data, error } = await supabase
        .from('transactions')
        .select('*')
        .order('date', { ascending: false });

      if (error) {
        console.error('Error fetching transactions:', error);
      } else {
        setTransactions(data);
      }
    };

    fetchTransactions();
  }, []);

  return (
    <div className="modal-overlay">
      <div className="history-modal">
        <h2>{t('transactionHistory')}</h2>
        <table className="transaction-list">
          <thead>
            <tr>
              <th>{t('date')}</th>
              <th>{t('amount')}</th>
              <th>{t('address')}</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map(transaction => (
              <tr key={transaction.id}>
                <td>{new Date(transaction.date).toLocaleDateString()}</td>
                <td>${transaction.amount.toFixed(2)}</td>
                <td>{transaction.address}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <button onClick={onClose} className="modal-button">{t('close')}</button>
      </div>
    </div>
  );
};

export default withTranslation()(TransactionHistoryModal);
