from typing import List

from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import Session, select

from .auth_jwt import get_current_user
from .db import get_session
from .models import Item, User
from .schemas import ItemCreate, ItemRead

router = APIRouter(prefix="/items", tags=["items"])


@router.get("", response_model=List[ItemRead])
def list_items(
    current_user: User = Depends(get_current_user),
    session: Session = Depends(get_session),
):
    """List all items owned by the current user."""
    items = session.exec(
        select(Item).where(Item.owner_id == current_user.id)
    ).all()
    return items


@router.post("", response_model=ItemRead, status_code=status.HTTP_201_CREATED)
def create_item(
    item_in: ItemCreate,
    current_user: User = Depends(get_current_user),
    session: Session = Depends(get_session),
):
    """Create a new item for the current user."""
    item = Item(**item_in.model_dump(), owner_id=current_user.id)
    session.add(item)
    session.commit()
    session.refresh(item)
    return item


@router.delete("/{item_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_item(
    item_id: int,
    current_user: User = Depends(get_current_user),
    session: Session = Depends(get_session),
):
    """Delete an item owned by the current user."""
    item = session.get(Item, item_id)
    if not item:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Item not found",
        )
    if item.owner_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not authorized to delete this item",
        )
    session.delete(item)
    session.commit()
