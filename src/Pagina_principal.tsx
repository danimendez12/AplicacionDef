import React from 'react';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from './firebase/firebaseConfig.ts';

export default function PaginaPrincipal() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      alert('Sesión cerrada correctamente');
      navigate('/login');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  return (
    <div style={container}>
      <div style={contentContainer}>
        <aside style={sidebar}>
          <h3>Sidebar</h3>
          <h3>Sidebar</h3>
          <button onClick={handleLogout} style={logoutButtonStyle}>
            Cerrar sesión
          </button>
        </aside>

        <div style={buttonGrid}>
          <button style={buttonStyle}>Botón 1</button>
          <button style={buttonStyle}>Botón 2</button>
          <button style={buttonStyle}>Botón 3</button>
          <button style={buttonStyle}>Botón 4</button>
        </div>
      </div>
    </div>
  );
}

// Estilos
const container: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
  backgroundColor: '#f0f2f5',
};

const contentContainer: React.CSSProperties = {
  display: 'flex',
  width: '80%',
  height: '80%',
  backgroundColor: '#fff',
  borderRadius: '10px',
  boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
};

const sidebar: React.CSSProperties = {
  width: '200px',
  backgroundColor: '#ddd',
  padding: '1rem',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
};

const buttonGrid: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 150px)',
  gap: '1rem',
  justifyContent: 'center',
  alignContent: 'center',
  flex: 1,
};

const buttonStyle: React.CSSProperties = {
  padding: '1rem',
  fontSize: '1rem',
  borderRadius: '8px',
  border: 'none',
  backgroundColor: '#4a90e2',
  color: 'white',
  cursor: 'pointer',
  boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
};

const logoutButtonStyle: React.CSSProperties = {
  ...buttonStyle,
  backgroundColor: '#e74c3c',
};
