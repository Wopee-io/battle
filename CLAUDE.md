# Battle — Project Context

Full-stack web app: React + TypeScript frontend, FastAPI + Python backend, PostgreSQL.

## Quick Commands

```bash
# VS Code: Press F5 → "Full Stack Dev"
# Or manually:
docker compose up battle-db -d                                    # Database
cd backend && uvicorn app.main:app --reload --port 8000          # Backend
cd frontend && npm run dev                                        # Frontend
```

## Key Locations

- Backend entry: `backend/app/main.py`
- API routes: `backend/app/routes_*.py`, `backend/app/auth_routes.py`
- Database models: `backend/app/models.py`
- Frontend entry: `frontend/src/App.tsx`
- API client: `frontend/src/api/client.ts`
- Config: `.env.example` (copy to `.env`)

## Code Style

- **Python**: Type hints required, SQLModel ORM, Pydantic schemas
- **TypeScript**: Strict mode, path alias `@/` → `src/`
- **General**: Small focused functions, descriptive names, no over-engineering

## Before Coding

1. Read `AGENTS.md` for full project context
2. Check existing code patterns before adding new ones
3. For new features/breaking changes: use OpenSpec workflow

<!-- OPENSPEC:START -->
## OpenSpec Instructions

Always open `@/openspec/AGENTS.md` when the request:
- Mentions planning or proposals (words like proposal, spec, change, plan)
- Introduces new capabilities, breaking changes, architecture shifts, or big performance/security work
- Sounds ambiguous and you need the authoritative spec before coding

Use `@/openspec/AGENTS.md` to learn:
- How to create and apply change proposals
- Spec format and conventions
- Project structure and guidelines

Keep this managed block so 'openspec update' can refresh the instructions.

<!-- OPENSPEC:END -->