# End-Assignement (Rewritten for Vercel)

## What I changed
- Converted backend into a Vercel-compatible serverless function using `serverless-http`.
- Added simple `/api/docs` upload/list endpoints (in-memory, ephemeral).
- Frontend API calls switched to relative `/api/*` so frontend and backend work when deployed together.
- Added `vercel.json` with builds & routes.
- Added `.env.example` for guidance. **Do not commit real secrets.**

## Deploy steps
1. Push this repo to GitHub.
2. In Vercel, import the repo.
3. Add Environment Variables in Vercel project settings:
   - `MONGO_URI` = your MongoDB Atlas connection string
   - `JWT_SECRET` = a strong secret
4. Click Deploy.

## Notes
- Uploaded files are stored in `/tmp` on the serverless instance and metadata is in-memory. For production use, connect to S3 or GridFS.
- Make sure to set `MONGO_URI` for persistent user storage.
