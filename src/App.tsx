import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import Login from './Login';
import RegisterPage from './Register';
import Pagina_principal from './Pagina_principal'

function Home() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        width: '100vw',
        backgroundColor: '#f0f2f5',
        gap: '1rem',
      }}
    >
      <button style={buttonStyle} onClick={() => navigate('/login')}>
        Login
      </button>
      <button style={buttonStyle} onClick={() => navigate('/register')}>
        Register
      </button>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegisterPage />} />
          <Route path="/pagina_principal" element={<Pagina_principal />} />
      </Routes>
    </BrowserRouter>
  );
}

const buttonStyle = {
  padding: '1rem 2rem',
  fontSize: '1.25rem',
  borderRadius: '8px',
  border: 'none',
  cursor: 'pointer',
  backgroundColor: '#007bff',
  color: 'white',
};

