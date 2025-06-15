import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import Login from './Login';
import RegisterPage from './Register';
import Pagina_principal from './Pagina_principal'
import PaginaDocumento from './pagina_documento';
import RWAWidget from './RWAWidget';

function Home() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
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
      <div style={{ marginTop: '2rem' }}>
        <RWAWidget />
      </div>
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
        <Route path="/pagina_documento/:id" element={<PaginaDocumento />} />
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
  backgroundColor: '#458339',
  color: 'white',
};



