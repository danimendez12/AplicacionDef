
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from './firebase/firebaseConfig.ts';
import { documentosMock } from './data/Documentos';
import {mainContent,cardStyle,verMasButtonStyle,searchBarContainer,searchInput,contentContainer,sidebar,logoutButtonStyle,selectStyle} from './styles/styles'
import {type CSSProperties, useState} from "react";

export default function PaginaPrincipal() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const navigate = useNavigate();
  const handleLogout = async () => {
  try {
    await signOut(auth);
    alert('Sesión cerrada correctamente');
    navigate('/login'); // redirige al login
  } catch (error) {
    console.error('Error al cerrar sesión:', error);
  }
};

 const documentos = documentosMock

const handleVerMas = (id: number) => {
  navigate(`/pagina_documento/${id}`);
};


  const filteredData = documentos.filter(item => {
    const matchesCategory = filterCategory === 'all' || item.autor === filterCategory;
    const matchesSearch = item.titulo.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div style={container}>
      <div style={searchBarContainer}>
        <input
          type="text"
          placeholder="Buscar..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          style={searchInput}
        />
      </div>

      <div style={contentContainer}>
        <aside style={sidebar}>
          <h3>Filtros</h3>
          <h3>Filtrar por autor</h3>
            <select
                value={filterCategory}
                onChange={e => setFilterCategory(e.target.value)}
                style={selectStyle}
            >
              <option value="all">Todos</option>
              <option value="Dra. Ana Pérez">Dra. Ana Pérez</option>
              <option value="Dr. Carlos Gómez">Dr. Carlos Gómez</option>
            </select>
          <button onClick={handleLogout} style={logoutButtonStyle}>
            Cerrar sesión
          </button>
        </aside>

        <main style={mainContent}>
          {filteredData.length > 0 ? (
              filteredData.map(doc => (
                <div key={doc.id} style={cardStyle}>
                  <h3 style={{ fontStyle: 'italic' }}>{doc.titulo}</h3>
                  <p><strong>{doc.autor}</strong></p>
                  <p><em><strong>{doc.fecha}</strong></em></p>
                  <p><em><strong>{doc.resumen}</strong></em></p>
                  <button
                    style={verMasButtonStyle}
                    onClick={() => handleVerMas(doc.id)}
                  >
                    Ver más
                  </button>
                </div>
              ))
            ) : (
              <p style={{ textAlign: 'center' }}>No se encontraron documentos</p>
            )}

        </main>
      </div>
    </div>
  );
}

export const container: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  height: '100vh',
  width: '100vw',
  padding: '1rem',
  backgroundColor: '#f0f2f5',
  boxSizing: 'border-box',
  overflow: 'hidden', // ¡importante!
};