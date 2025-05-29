import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export default function Login() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Aquí iría tu lógica para login
    alert('Intentando iniciar sesión con: ' + JSON.stringify(formData));
    navigate('/pagina_principal');
  };

  return (
    <div style={containerStyle}>
      <form onSubmit={handleSubmit} style={formStyle}>
        <h2
            style={{
              textAlign: 'center',
              marginBottom: '1.5rem',
              color: '#333',
            }}
        >
          Login
        </h2>
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
        <button type="submit" style={buttonStyle}>Entrar</button>

        <p style={linkTextStyle}>
          ¿No tienes cuenta?{' '}
          <Link to="/register" style={linkStyle}>
            Regístrate aquí
          </Link>
        </p>
      </form>
    </div>
  );
}

// Estilos reutilizables
const containerStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
  width: '100vw',
  backgroundColor: '#f0f2f5',
};

const formStyle = {
  backgroundColor: '#ffffff',
  padding: '2rem',
  borderRadius: '12px',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  width: '100%',
  maxWidth: '400px',
  textAlign: 'center' as const,
};

const inputStyle = {
  width: '100%',
  padding: '0.75rem',
  marginBottom: '1rem',
  border: '1px solid #ccc',
  borderRadius: '8px',
  fontSize: '1rem',
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

