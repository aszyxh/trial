import logging

from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

from app.api.routes.dashboard import router as dashboard_router
from app.api.routes.maintenance import router as maintenance_router
from app.api.routes.onboarding import router as onboarding_router
from app.core.config import get_settings
from app.core.errors import AppError
from app.core.logging import configure_logging

configure_logging()
logger = logging.getLogger(__name__)

settings = get_settings()

app = FastAPI(title=settings.app_name)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_allow_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.exception_handler(AppError)
async def app_error_handler(_: Request, exc: AppError) -> JSONResponse:
    return JSONResponse(status_code=exc.status_code, content={"error": {"code": exc.code, "message": exc.message}})


@app.exception_handler(RuntimeError)
async def runtime_error_handler(_: Request, exc: RuntimeError) -> JSONResponse:
    logger.exception("Runtime error", exc_info=exc)
    return JSONResponse(status_code=500, content={"error": {"code": "internal_error", "message": str(exc)}})


app.include_router(onboarding_router, prefix=settings.api_prefix)
app.include_router(maintenance_router, prefix=settings.api_prefix)
app.include_router(dashboard_router, prefix=settings.api_prefix)
