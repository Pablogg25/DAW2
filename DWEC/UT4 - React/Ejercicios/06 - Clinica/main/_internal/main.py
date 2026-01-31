"""
Aplicación principal de la API REST de la Clínica.

Esta aplicación FastAPI proporciona servicios REST para gestionar:
- Pacientes: CRUD completo con filtrado y paginación
- Expedientes: Consulta y actualización de historiales médicos
- Usuarios: Gestión de usuarios y validación de credenciales

Características:
- Datos almacenados en memoria (se reinician al arrancar)
- CORS habilitado para permitir acceso desde aplicaciones web
- Validaciones automáticas con Pydantic
- Documentación interactiva en /docs (Swagger UI)
- Documentación alternativa en /redoc (ReDoc)
"""

from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

from app.data.datos_iniciales import reiniciar_datos
from app.routers import pacientes, expedientes, usuarios


@asynccontextmanager
async def lifespan(app: FastAPI):
    """
    Gestor del ciclo de vida de la aplicación.
    
    Se ejecuta al iniciar y al cerrar la aplicación.
    En el startup: Carga los datos iniciales en memoria.
    En el shutdown: Limpieza de recursos (si fuera necesario).
    """
    # Startup: Cargar datos iniciales
    print("="*60)
    print("Iniciando API de la Clínica...")
    reiniciar_datos()
    print("API lista para recibir peticiones")
    print("="*60)
    
    yield  # La aplicación se ejecuta aquí
    
    # Shutdown: Limpieza de recursos
    print("Cerrando API de la Clínica...")


# Crear la aplicación FastAPI con configuración
app = FastAPI(
    title="API Clínica Médica",
    description="API REST para gestión de pacientes, expedientes médicos y usuarios de una clínica",
    version="1.0.0",
    lifespan=lifespan,
    # Configuración de documentación
    docs_url="/docs",  # Swagger UI
    redoc_url="/redoc",  # ReDoc
    openapi_url="/openapi.json"
)


# Configurar CORS (Cross-Origin Resource Sharing)
# Esto permite que aplicaciones web en otros dominios puedan acceder a la API
# Por razones educativas, permitimos todos los orígenes (*), pero en producción
# se debería especificar una lista de dominios permitidos
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Lista de orígenes permitidos. "*" = todos
    allow_credentials=True,  # Permitir cookies y credenciales
    allow_methods=["*"],  # Métodos HTTP permitidos: GET, POST, PUT, DELETE, etc.
    allow_headers=["*"],  # Headers permitidos en las peticiones
)


# Registrar los routers de cada módulo
# El prefijo /api agrupa todos los endpoints bajo esta ruta
app.include_router(pacientes.router, prefix="/api")
app.include_router(expedientes.router, prefix="/api")
app.include_router(usuarios.router, prefix="/api")


@app.get("/")
def root():
    """
    Endpoint raíz de la API.
    Proporciona información básica y enlaces a la documentación.
    """
    return {
        "mensaje": "API Clínica Médica - Bienvenido",
        "version": "1.0.0",
        "documentacion": {
            "swagger": "http://127.0.0.1:8000/docs",
            "redoc": "http://127.0.0.1:8000/redoc"
        },
        "endpoints": {
            "pacientes": "/api/pacientes",
            "expedientes": "/api/expedientes",
            "usuarios": "/api/usuarios"
        }
    }


@app.get("/health")
def health_check():
    """
    Endpoint de verificación de salud.
    Útil para monitoreo y verificar que la API está funcionando.
    """
    return {"status": "healthy", "message": "API funcionando correctamente"}


# Punto de entrada para ejecutar la aplicación directamente
# Esto permite ejecutar el archivo con: python main.py
if __name__ == "__main__":
    uvicorn.run(
        "main:app",  # Ruta al objeto app (módulo:variable)
        host="127.0.0.1",  # Escuchar en localhost
        port=8000,  # Puerto de la aplicación
        # reload=True  # Recargar automáticamente al detectar cambios en el código
        reload=False # ALEX: Para el empaquetado de pyinstaller
    )
