import React from 'react';
import { useTranslation } from 'react-i18next';
import './HyperloopDashboard.css';

const premiumServices = [
  { name: 'Check-up Sanitario', description: 'Sedili che effettuano un check-up medico durante il viaggio', icon: '🏥' },
  { name: 'Intrattenimento Immersivo', description: 'Esperienze di realtà virtuale personalizzate', icon: '🎮' },
  { name: 'Apprendimento Rapido', description: 'Corsi di memorizzazione in fase Alpha', icon: '🧠' },
  { name: 'Ufficio Mobile', description: 'Spazio di lavoro ad alta tecnologia con connettività avanzata', icon: '💼' },
  { name: 'Relax Personalizzato', description: 'Ambiente adattivo per il massimo comfort', icon: '🧘' },
];

const InteractiveInfo = () => {
  const { t } = useTranslation();

  return (
    <div className="interactive-info">
      <h1>{t('Interactive Info')}</h1>
      <div className="premium-services">
        {premiumServices.map((service, index) => (
          <div key={service.name} className="service-card">
            <div className="service-icon">{service.icon}</div>
            <h3>{service.name}</h3>
            <p>{service.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InteractiveInfo;
