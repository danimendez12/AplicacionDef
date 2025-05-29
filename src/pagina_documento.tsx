import { useNavigate, useParams } from 'react-router-dom';
import { documentosMock } from './data/Documentos';
import {container,card,titulo,resumen,botonVolver} from './styles/styles'

export default function PaginaDocumento() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const documento = documentosMock.find(doc => doc.id === Number(id));

    const handleVolver = () => {
        try {
            navigate('/Pagina_principal');
        } catch (error) {
            console.error('Error al volver:', error);
        }
    };

    return (
        <div style={container}>
            <div style={card}>
                <h1 style={titulo}>{documento?.titulo}</h1>
                <p><strong>Autor:</strong> {documento?.autor}</p>
                <p><strong>Fecha:</strong> {documento?.fecha}</p>
                <p style={resumen}><strong>Resumen:</strong> {documento?.resumen}</p>
                <button onClick={handleVolver} style={botonVolver}>
                    ← Volver a la página principal
                </button>
            </div>
        </div>
    );
}




