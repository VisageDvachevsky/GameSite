import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      "withdraw": "Withdraw",
      "toggleOn": "On",
      "toggleOff": "Off",
      "transactions": "Transactions",
      "balance": "Balance",
      "theme": "Theme",
      "tranquil": "Tranquil",
      "default": "Default",
      "autumn": "Warm",
      "sunset": "Sunset",
      "ocean": "Ocean",
      "black": "Black",
      "language": "Language",
      "fundsWithdrawn": "Funds successfully withdrawn",
      "creditSuccess": "Successfully credited ${{amount}}",
      "address": "Address",
      "transactionHistory": "Transaction History",
      "date": "Date",
      "amount": "Amount",
      "close": "Close",
      "withdrawFunds": "Withdraw Funds",
      "currentBalance": "Current Balance",
      "walletAddress": "Wallet Address",
      "enterWalletAddress": "Enter Wallet Address",
      "withdrawAmount": "Withdraw Amount",
      "enterAmount": "Enter Amount",
      "allFieldsRequired": "All fields must be completed",
      "insufficientFunds": "Insufficient funds",
      "amountGreaterThanZero": "Amount must be greater than zero",
      "transactionSaveError": "Error saving transaction",
      "cancel": "Cancel",
      "networks": "Networks",
      "exchanges": "Exchanges",
      "network": "Network",
      "exchange": "Exchange",
      "successfully_connected": "successfully connected"
    }
  },
  es: {
    translation: {
      "withdraw": "Retirar",
      "toggleOn": "Encendido",
      "toggleOff": "Apagado",
      "transactions": "Transacciones",
      "balance": "Saldo",
      "theme": "Tema",
      "tranquil": "Tranquilo",
      "default": "Por defecto",
      "autumn": "Caliente",
      "sunset": "Puesta de sol",
      "ocean": "Océano",
      "black": "Negro",
      "language": "Idioma",
      "fundsWithdrawn": "Fondos retirados con éxito",
      "creditSuccess": "Acreditado con éxito ${{amount}}",
      "address": "Dirección",
      "transactionHistory": "Historial de transacciones",
      "date": "Fecha",
      "amount": "Cantidad",
      "close": "Cerrar",
      "withdrawFunds": "Retirar Fondos",
      "currentBalance": "Saldo Actual",
      "walletAddress": "Dirección de la Billetera",
      "enterWalletAddress": "Ingrese la dirección de la billetera",
      "withdrawAmount": "Cantidad a Retirar",
      "enterAmount": "Ingrese la cantidad",
      "allFieldsRequired": "Todos los campos deben ser completados",
      "insufficientFunds": "Fondos insuficientes",
      "amountGreaterThanZero": "La cantidad debe ser mayor que cero",
      "transactionSaveError": "Error al guardar la transacción",
      "cancel": "Cancelar",
      "networks": "Redes",
      "exchanges": "Intercambios",
      "network": "Red",
      "exchange": "Intercambio",
      "successfully_connected": "conectado con éxito"
    }
  },
  ru: {
    translation: {
      "withdraw": "Вывод",
      "toggleOn": "Вкл",
      "toggleOff": "Выкл",
      "transactions": "Транзакции",
      "balance": "Баланс",
      "theme": "Тема",
      "tranquil": "Спокойная",
      "default": "По умолчанию",
      "autumn": "Теплая",
      "sunset": "Закат",
      "ocean": "Океан",
      "black": "Темная",
      "language": "Язык",
      "fundsWithdrawn": "Средства успешно выведены",
      "creditSuccess": "Успешное начисление ${{amount}}",
      "address": "Адрес",
      "transactionHistory": "История транзакций",
      "date": "Дата",
      "amount": "Сумма",
      "close": "Закрыть",
      "withdrawFunds": "Вывод средств",
      "currentBalance": "Текущий баланс",
      "walletAddress": "Адрес кошелька",
      "enterWalletAddress": "Введите адрес кошелька",
      "withdrawAmount": "Сумма к выводу",
      "enterAmount": "Введите сумму",
      "allFieldsRequired": "Все поля должны быть заполнены",
      "insufficientFunds": "Недостаточно средств",
      "amountGreaterThanZero": "Сумма к выводу должна быть больше 0",
      "transactionSaveError": "Ошибка сохранения транзакции",
      "cancel": "Отмена",
      "networks": "Сети",
      "exchanges": "Биржи",
      "network": "Сеть",
      "exchange": "Биржа",
      "successfully_connected": "успешно подключена"
    }
  }
};

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'ru',
    interpolation: {
      escapeValue: false,
    }
  });

export default i18n;
