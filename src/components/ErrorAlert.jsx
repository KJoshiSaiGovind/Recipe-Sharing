import { AlertCircle } from 'lucide-react';

const ErrorAlert = ({ message }) => {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '1rem',
      backgroundColor: 'rgba(239, 68, 68, 0.1)',
      border: '1px solid #ef4444',
      color: '#ef4444',
      padding: '1rem 1.5rem',
      borderRadius: 'var(--radius-md)',
      margin: '2rem auto',
      maxWidth: '600px'
    }}>
      <AlertCircle size={24} />
      <span style={{ fontWeight: 500 }}>{message}</span>
    </div>
  );
};

export default ErrorAlert;
