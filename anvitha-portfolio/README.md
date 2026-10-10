# Anvitha Prasad – Portfolio (React + Node + MongoDB)

A responsive, cinematic portfolio. Pages: **Home, About, Skills, Projects, Contact** (React Router).
The Contact form posts to a **Node.js / Express** API that stores each message in **MongoDB**.
A three.js background flies the camera through a gold ring each time you change page.

```
anvitha-portfolio/
├── frontend/   React + Vite + React Router + CSS
├── backend/    Express API + Mongoose model
└── docs/       Screenshots checklist
```

## Run locally

Requirements: Node.js 18+ and a MongoDB database (see next section).

```bash
# 1) Backend
cd backend
npm install
cp .env.example .env        # then fill in MONGODB_URI and ADMIN_KEY
npm run dev                 # http://localhost:5000

# 2) Frontend (new terminal)
cd frontend
npm install
cp .env.example .env        # VITE_API_URL=http://localhost:5000
npm run dev                 # http://localhost:5173
```

## MongoDB setup (Atlas, free)

1. Create an account at https://www.mongodb.com/atlas and create a free **M0** cluster.
2. **Database Access** → add a user with a password.
3. **Network Access** → add IP `0.0.0.0/0` (needed for Render's changing IPs).
4. **Connect → Drivers** → copy the connection string into `MONGODB_URI` and add the database name `portfolio` before the `?`.
5. The `messages` collection is created automatically by the first form submission.

Schema (`backend/models/Message.js`): `name`, `email`, `message`, plus `createdAt` and `updatedAt`.

## API

| Method | Route | Description |
|---|---|---|
| GET | `/api/health` | Health check |
| POST | `/api/contact` | Body `{name, email, message}`. Saves to MongoDB, returns 201 |
| GET | `/api/messages` | Lists messages. Needs header `x-admin-key: <ADMIN_KEY>` |

## Deploy

**Backend → Render (free)**
1. Push this repo to GitHub.
2. Render → New → Web Service → pick the repo. Root Directory: `backend`. Build: `npm install`. Start: `npm start`.
3. Environment variables: `MONGODB_URI`, `ADMIN_KEY`, and `FRONTEND_URL` (your Vercel URL, set after step below).
4. Check `https://<your-api>.onrender.com/api/health` returns `{"ok":true}`.

**Frontend → Vercel (free)**
1. Vercel → Add New Project → pick the repo. Root Directory: `frontend`. Framework: Vite.
2. Environment variable: `VITE_API_URL` = your Render URL (no trailing slash).
3. Deploy. `vercel.json` makes React Router routes like `/projects` work on refresh.
4. Go back to Render and set `FRONTEND_URL` to the Vercel URL, then redeploy the backend (this fixes CORS).

## Project screenshots on the cards

Drop PNG/JPG screenshots into `frontend/public/projects/` using the file names in `frontend/src/data.js`
(for example `essay-judge.png`). Until a file exists, the card shows a colour gradient.

## Deliverables checklist

- [x] Frontend source code: `frontend/`
- [x] Backend source code: `backend/`
- [x] MongoDB setup: section above + `backend/models/Message.js`
- [ ] Screenshots/demo: see `docs/screenshots/README.md`
- [ ] Deployment links: Frontend `https://...` · Backend `https://...`
- [ ] GitHub repository link: `https://github.com/anveez/<repo-name>`
