from fastapi import APIRouter

router = APIRouter(tags=["public"])


@router.get("/health")
def health_check():
    """Health check endpoint."""
    return {"status": "healthy"}


@router.get("/")
def root():
    """Root endpoint with API info."""
    return {
        "name": "Battle API",
        "version": "0.1.0",
        "docs": "/docs",
    }
