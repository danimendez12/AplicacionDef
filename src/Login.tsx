import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebase/firebaseConfig.ts';

export default function LoginPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    try {
      await signInWithEmailAndPassword(auth, formData.email, formData.password);
      alert('Inicio de sesión exitoso');
      navigate('/pagina_principal');
    } catch (err: any) {
      console.error('Error al iniciar sesión:', err);
      setError('Correo o contraseña inválidos');
    }
  };

  return (
    <div style={containerStyle}>
      <div style={formContainerStyle}>
        <h2 style={titleStyle}>Iniciar Sesión</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Correo"
            value={formData.email}
            onChange={handleChange}
            required
            style={inputStyle}
          />
          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            value={formData.password}
            onChange={handleChange}
            required
            style={inputStyle}
          />
          <button type="submit" style={buttonStyle}>
            Iniciar Sesión
          </button>
        </form>
        {error && (
          <p style={{ color: 'red', marginTop: '1rem', textAlign: 'center' }}>
            {error}
          </p>
        )}
        <p style={linkTextStyle}>
          ¿No tienes cuenta?{' '}
          <Link to="/register" style={linkStyle}>
            Regístrate aquí
          </Link>
        </p>
      </div>
    </div>
  );
}

// Estilos
const containerStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
  width: '100vw',
  backgroundColor: '#f0f2f5',
};

const formContainerStyle = {
  backgroundColor: '#ffffff',
  padding: '2rem',
  borderRadius: '12px',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  width: '100%',
  maxWidth: '400px',
};

const titleStyle = {
  textAlign: 'center' as const,
  marginBottom: '1.5rem',
  color: '#333',
};

const inputStyle = {
  width: '100%',
  padding: '0.75rem',
  marginBottom: '1rem',
  border: '1px solid #ccc',
  borderRadius: '8px',
  fontSize: '1rem',
  backgroundColor: '#cccccc',
  color: '#1b1b1b',
};

const buttonStyle = {
  width: '100%',
  padding: '0.75rem',
  backgroundColor: '#007bff',
  color: '#fff',
  border: 'none',
  borderRadius: '8px',
  fontSize: '1rem',
  cursor: 'pointer',
};

const linkTextStyle = {
  marginTop: '1rem',
  fontSize: '0.9rem',
  color: '#555',
};

const linkStyle = {
  color: '#bb1515',
  textDecoration: 'underline',
  cursor: 'pointer',
};
