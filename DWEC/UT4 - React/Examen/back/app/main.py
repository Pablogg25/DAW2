"""FastAPI application entry point."""

from __future__ import annotations

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .routers import clasificacion, equipos, partidos


def create_app() -> FastAPI:
    app = FastAPI(title="API Baloncesto", version="1.0.0")

    # Allow all origins to simplify local React exercises.
    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    app.include_router(equipos.router)
    app.include_router(partidos.router)
    app.include_router(clasificacion.router)

    return app


app = create_app()


if __name__ == "__main__":
    import uvicorn

    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
