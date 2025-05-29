import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { auth } from './firebaseConfig';  // Importa aquí auth configurado
import { createUserWithEmailAndPassword } from 'firebase/auth';

export default function RegisterPage() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    try {
      await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      alert('Usuario registrado con éxito');
      setFormData({ email: '', password: '' });
    } catch (err: any) {
      setError(err.message);
      console.error('Error al registrar:', err);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', width: '100vw', backgroundColor: '#f0f2f5' }}>
      <div style={{ backgroundColor: '#fff', padding: '2rem', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)', width: '100%', maxWidth: '400px' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '1.5rem', color: '#333' }}>Registro</h2>
        <form onSubmit={handleSubmit}>
          <input type="email" name="email" placeholder="Correo" value={formData.email} onChange={handleChange} required style={inputStyle} />
          <input type="password" name="password" placeholder="Contraseña" value={formData.password} onChange={handleChange} required style={inputStyle} />
          <button type="submit" style={buttonStyle}>Registrarse</button>
        </form>
        {error && <p style={{ color: 'red', marginTop: '1rem', textAlign: 'center' }}>{error}</p>}
        <p style={linkTextStyle}>¿Ya tienes cuenta? <Link to="/Login" style={linkStyle}>Inicia sesión aquí</Link></p>
      </div>
    </div>
  );
}

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
