"""
GitHub OAuth placeholder.

This module provides stub endpoints for GitHub OAuth integration.
The actual implementation will require:
1. GitHub OAuth App credentials (GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET)
2. Redirect URL configuration in the GitHub OAuth App settings

GitHub OAuth flow:
1. User clicks "Login with GitHub"
2. Frontend redirects to GET /auth/github/login
3. Backend redirects to GitHub authorization URL
4. User authorizes the app on GitHub
5. GitHub redirects to GET /auth/github/callback with code
6. Backend exchanges code for access token
7. Backend fetches user info from GitHub API
8. Backend creates/links local user account
9. Backend issues local JWT and redirects to frontend

References:
- https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/authorizing-oauth-apps
- https://fastapi.tiangolo.com/advanced/security/oauth2-scopes/
"""

from fastapi import APIRouter, HTTPException, status

from .config import get_settings

router = APIRouter(prefix="/auth/github", tags=["github-oauth"])
settings = get_settings()

# GitHub OAuth URLs
GITHUB_AUTHORIZE_URL = "https://github.com/login/oauth/authorize"
GITHUB_TOKEN_URL = "https://github.com/login/oauth/access_token"
GITHUB_USER_URL = "https://api.github.com/user"


@router.get("/login")
def github_login():
    """
    Initiate GitHub OAuth login flow.

    TODO: Implement actual redirect to GitHub authorization URL.

    Implementation steps:
    1. Validate GITHUB_CLIENT_ID is configured
    2. Generate state parameter for CSRF protection
    3. Store state in session/cache
    4. Build authorization URL with:
       - client_id
       - redirect_uri (callback URL)
       - scope (e.g., "read:user user:email")
       - state
    5. Return RedirectResponse to GitHub

    Example authorization URL:
    https://github.com/login/oauth/authorize?
        client_id={GITHUB_CLIENT_ID}&
        redirect_uri={callback_url}&
        scope=read:user%20user:email&
        state={random_state}
    """
    if not settings.github_client_id:
        raise HTTPException(
            status_code=status.HTTP_501_NOT_IMPLEMENTED,
            detail="GitHub OAuth not configured. Set GITHUB_CLIENT_ID and GITHUB_CLIENT_SECRET.",
        )

    return {
        "message": "GitHub OAuth login placeholder",
        "status": "not_implemented",
        "hint": "Configure GITHUB_CLIENT_ID and GITHUB_CLIENT_SECRET to enable",
    }


@router.get("/callback")
def github_callback(code: str = None, state: str = None):
    """
    Handle GitHub OAuth callback.

    TODO: Implement actual OAuth callback handling.

    Implementation steps:
    1. Validate state parameter matches stored state (CSRF protection)
    2. Exchange authorization code for access token:
       POST https://github.com/login/oauth/access_token
       Body: client_id, client_secret, code, redirect_uri
       Headers: Accept: application/json
    3. Use access token to fetch user info:
       GET https://api.github.com/user
       Headers: Authorization: Bearer {access_token}
    4. Extract user data (id, login, email, name, avatar_url)
    5. Look up existing user by GitHub ID or email
    6. If not found, create new user
    7. If found, optionally update user info
    8. Generate local JWT access token
    9. Redirect to frontend with token in URL fragment or set cookie

    Example frontend redirect:
    return RedirectResponse(f"{FRONTEND_URL}?token={jwt_token}")
    """
    if not settings.github_client_id or not settings.github_client_secret:
        raise HTTPException(
            status_code=status.HTTP_501_NOT_IMPLEMENTED,
            detail="GitHub OAuth not configured",
        )

    if not code:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Missing authorization code",
        )

    return {
        "message": "GitHub OAuth callback placeholder",
        "status": "not_implemented",
        "code_received": bool(code),
        "state_received": bool(state),
        "hint": "Implement token exchange and user lookup",
    }
