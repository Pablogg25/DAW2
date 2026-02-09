/**
 * HELPER PARA PRUEBAS - Función reutilizable para fetch con JWT
 * 
 * Uso:
 *   const result = await apiFetch('/pedidos', 'GET');
 *   const result = await apiFetch('/auth/login', 'POST', {username: 'juan', password: 'juan123'});
 */

const API_BASE = 'http://localhost:8000';

/**
 * Realiza una petición fetch inyectando automáticamente el JWT
 * @param {string} endpoint - Ruta relativa (ej: '/usuarios/me')
 * @param {string} method - GET, POST, PUT, DELETE
 * @param {object} body - Datos a enviar (opcional)
 * @returns {Promise<object>} Respuesta parseada o objeto con error
 */
async function apiFetch(endpoint, method = 'GET', body = null) {
    const url = API_BASE + endpoint;
    const options = {
        method,
        headers: {
            'Content-Type': 'application/json'
        }
    };

    // Inyectar token JWT si existe
    const token = localStorage.getItem('token');
    if (token) {
        options.headers['Authorization'] = `Bearer ${token}`;
    }

    // Agregar body si existe
    if (body) {
        options.body = JSON.stringify(body);
    }

    try {
        const response = await fetch(url, options);
        const data = await response.json();

        // Manejo de errores
        if (!response.ok) {
            return {
                ok: false,
                status: response.status,
                statusText: response.statusText,
                error: data.detail || data.message || 'Error desconocido',
                fullData: data
            };
        }

        return {
            ok: true,
            status: response.status,
            data
        };
    } catch (error) {
        return {
            ok: false,
            error: error.message,
            networkError: true
        };
    }
}

/**
 * Guarda el token en localStorage
 * @param {string} token - Token JWT a guardar
 */
function guardarToken(token) {
    localStorage.setItem('token', token);
    console.log('✅ Token guardado');
}

/**
 * Obtiene el token de localStorage
 * @returns {string|null} Token o null si no existe
 */
function obtenerToken() {
    return localStorage.getItem('token');
}

/**
 * Elimina el token de localStorage
 */
function eliminarToken() {
    localStorage.removeItem('token');
    console.log('✅ Token eliminado');
}

/**
 * Comprueba si hay token guardado
 * @returns {boolean}
 */
function tieneToken() {
    return !!obtenerToken();
}

/**
 * Muestra un resultado en consola con formato
 * @param {string} titulo - Título del grupo
 * @param {object} datos - Datos a mostrar
 * @param {string} tipo - 'success', 'error', 'info' (afecta al color del log)
 */
function mostrarResultado(titulo, datos, tipo = 'info') {
    const icono = {
        success: '✅',
        error: '❌',
        info: 'ℹ️',
        warning: '⚠️'
    }[tipo] || 'ℹ️';

    console.group(`${icono} ${titulo}`);
    
    if (datos instanceof Object) {
        console.table(datos);
    } else {
        console.log(datos);
    }
    
    console.groupEnd();
}

/**
 * Decodifica un JWT para ver su contenido (sin verificar firma)
 * @param {string} token - Token JWT
 * @returns {object} Payload decodificado
 */
function decodificarJWT(token) {
    try {
        const parts = token.split('.');
        if (parts.length !== 3) throw new Error('Token inválido');
        
        const payload = JSON.parse(atob(parts[1]));
        return payload;
    } catch (e) {
        console.error('Error decodificando JWT:', e);
        return null;
    }
}

/**
 * Actualiza la UI para mostrar estado de autenticación
 */
function actualizarUIAutenticacion() {
    const token = obtenerToken();
    const tokenInfo = document.getElementById('token-info');
    const btnLogin = document.getElementById('btn-login');
    const btnLogout = document.getElementById('btn-logout');
    const btnAccionesAutenticadas = document.querySelectorAll('[data-requiere-auth]');

    if (token) {
        // Mostrar información del usuario
        const payload = decodificarJWT(token);
        if (tokenInfo) {
            tokenInfo.innerHTML = `✅ Autenticado (Usuario ID: ${payload.sub})`;
            tokenInfo.style.display = 'block';
        }
        
        if (btnLogout) btnLogout.style.display = 'inline-block';
        if (btnLogin) btnLogin.style.display = 'none';
        
        // Mostrar elementos que requieren auth
        btnAccionesAutenticadas.forEach(btn => btn.style.display = 'inline-block');
    } else {
        // Mostrar estado desautenticado
        if (tokenInfo) {
            tokenInfo.innerHTML = '❌ No autenticado';
            tokenInfo.style.display = 'block';
        }
        
        if (btnLogout) btnLogout.style.display = 'none';
        if (btnLogin) btnLogin.style.display = 'inline-block';
        
        // Ocultar elementos que requieren auth
        btnAccionesAutenticadas.forEach(btn => btn.style.display = 'none');
    }
}

/**
 * Genera una tabla HTML para mostrar datos
 * @param {array} datos - Array de objetos
 * @returns {string} HTML de tabla
 */
function generarTablaHTML(datos) {
    if (!Array.isArray(datos) || datos.length === 0) {
        return '<p>Sin datos</p>';
    }

    const columnas = Object.keys(datos[0]);
    let html = '<table style="width:100%; border-collapse: collapse; margin: 10px 0;">';
    
    // Encabezados
    html += '<thead>';
    html += '<tr style="background: #667eea; color: white;">';
    columnas.forEach(col => {
        html += `<th style="padding: 10px; text-align: left; border: 1px solid #ddd;">${col}</th>`;
    });
    html += '</tr>';
    html += '</thead>';
    
    // Filas
    html += '<tbody>';
    datos.forEach((fila, i) => {
        html += `<tr style="background: ${i % 2 === 0 ? '#f9f9f9' : 'white'};">`;
        columnas.forEach(col => {
            const valor = fila[col];
            const celdaValor = typeof valor === 'object' ? JSON.stringify(valor) : valor;
            html += `<td style="padding: 10px; border: 1px solid #ddd;">${celdaValor}</td>`;
        });
        html += '</tr>';
    });
    html += '</tbody>';
    
    html += '</table>';
    return html;
}

// Actualizar UI al cargar la página
document.addEventListener('DOMContentLoaded', actualizarUIAutenticacion);
