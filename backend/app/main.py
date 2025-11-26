import logging
from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .auth_routes import router as auth_router
from .config import get_settings
from .db import init_db
from .github_oauth import router as github_router
from .routes_items import router as items_router
from .routes_public import router as public_router

settings = get_settings()

# Configure logging based on environment
logging.basicConfig(
    level=getattr(logging, settings.log_level.upper(), logging.INFO),
    format="%(asctime)s - %(levelname)s - %(name)s - %(message)s",
)
logger = logging.getLogger(__name__)


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Application lifespan handler for startup/shutdown."""
    logger.info("Starting Battle API (env=%s, log_level=%s)", settings.app_env, settings.log_level)
    init_db()
    logger.debug("Database initialized")
    yield
    logger.info("Shutting down Battle API")


app = FastAPI(
    title="Battle API",
    version="0.1.0",
    lifespan=lifespan,
)

# Configure CORS
origins = [origin.strip() for origin in settings.cors_origins.split(",")]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(public_router)
app.include_router(auth_router)
app.include_router(github_router)
app.include_router(items_router)
