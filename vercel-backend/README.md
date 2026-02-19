# Vercel Backend Deployment

This directory contains a serverless-ready backend deployment target for Vercel.

## Deploy Steps

1. In Vercel, create a new project and set **Root Directory** to `vercel-backend`.
2. Add environment variables from `vercel-backend/.env.example` (or from `server/.env.example` if present).
3. Deploy.

## API Base URL

After deployment, your API base URL will be:

`https://<your-project>.vercel.app/api`

Use that value in frontend:

`client/.env.local`

```env
NEXT_PUBLIC_API_URL=https://<your-project>.vercel.app/api
```

## Notes

- `/health` is available via rewrite to `/api/health`.
- Auth uses cookies (`refreshToken`), so ensure `CLIENT_ORIGIN` is your frontend URL.
- MongoDB should be hosted remotely (Atlas) for Vercel.
