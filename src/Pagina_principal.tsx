import  { useState, type CSSProperties } from 'react';

export default function PaginaPrincipal() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');

  const data = [
    { id: 1, name: 'Producto A', category: 'frutas' },
    { id: 2, name: 'Producto B', category: 'verduras' },
    { id: 3, name: 'Producto C', category: 'frutas' },
    { id: 4, name: 'Producto D', category: 'bebidas' },
  ];

  const filteredData = data.filter(item => {
    const matchesCategory = filterCategory === 'all' || item.category === filterCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
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
          <select
            value={filterCategory}
            onChange={e => setFilterCategory(e.target.value)}
            style={selectStyle}
          >
            <option value="all">Todas</option>
            <option value="frutas">Frutas</option>
            <option value="verduras">Verduras</option>
            <option value="bebidas">Bebidas</option>
          </select>
        </aside>

        <main style={mainContent}>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Categoría</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.length > 0 ? (
                filteredData.map(item => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.category}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3} style={{ textAlign: 'center' }}>
                    No se encontraron resultados
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </main>
      </div>
    </div>
  );
}

const container: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  height: '100vh',
  width: '100vw',
  padding: '1rem',
  backgroundColor: '#f0f2f5',
  boxSizing: 'border-box',
};

const searchBarContainer: CSSProperties = {
  marginBottom: '1rem',
  flexShrink: 0,
};

const searchInput: CSSProperties = {
  width: '100%',
  padding: '0.75rem',
  fontSize: '1rem',
  borderRadius: '8px',
  border: '1px solid #ccc',
  boxSizing: 'border-box',
};

const contentContainer: CSSProperties = {
  display: 'flex',
  flex: 1,
  gap: '1rem',
  minHeight: 0,
};

const sidebar: CSSProperties = {
  width: '200px',
  backgroundColor: '#fff',
  padding: '1rem',
  borderRadius: '12px',
  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
  height: '100%',
  boxSizing: 'border-box',
  overflowY: 'auto',
};

const selectStyle: CSSProperties = {
  width: '100%',
  padding: '0.5rem',
  fontSize: '1rem',
  borderRadius: '6px',
  border: '1px solid #ccc',
  boxSizing: 'border-box',
};

const mainContent: CSSProperties = {
  flex: 1,
  backgroundColor: '#fff',
  padding: '1rem',
  borderRadius: '12px',
  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
  overflowY: 'auto',
  minHeight: 0,
};

const tableStyle: CSSProperties = {
  width: '100%',
  borderCollapse: 'collapse',
};
