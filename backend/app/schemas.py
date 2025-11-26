from typing import Optional

from pydantic import BaseModel, EmailStr


class UserCreate(BaseModel):
    """Schema for creating a new user."""

    email: EmailStr
    username: str
    password: str


class UserRead(BaseModel):
    """Schema for reading user data."""

    id: int
    email: str
    username: str
    is_active: bool


class Token(BaseModel):
    """Schema for JWT token response."""

    access_token: str
    token_type: str = "bearer"


class TokenData(BaseModel):
    """Schema for decoded token data."""

    username: Optional[str] = None


class ItemCreate(BaseModel):
    """Schema for creating a new item."""

    title: str
    description: Optional[str] = None


class ItemRead(BaseModel):
    """Schema for reading item data."""

    id: int
    title: str
    description: Optional[str]
    owner_id: int
