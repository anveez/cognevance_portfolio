# Screenshots to capture

Save PNGs in this folder using these names, then reference them in the main README.

1. `home.png.png` – Home page (desktop)
2. `about.png.png` -About page
3. `project1.png.png` – Projects page
4. `project2.png.png` – Projects page
5. `project3.png.png` – Projects page
6. `project4.png.png` – Projects page
7. `project5.png.png` – Projects page
8. `project6.png.png` – Projects page
9. `project7.png.png` – Projects page
10. `contact.png.png` – Contact form filled in
11. `mobile.png.png` – Any page at phone width (browser DevTools, device toolbar)
12. `mongodb-atlas.png.png` – The `messages` collection in MongoDB Atlas showing a saved submission
13. `deployed.png.png` – The live Vercel URL in the browser
14. `skill.png.png` -skill section
## Deployment

Both parts are deployed on Vercel as two separate projects from the same repository.

**Backend (Vercel)**
1. Import the repository into Vercel and set **Root Directory** to `backend`.
2. Add environment variables: `MONGODB_URI`, `ADMIN_KEY`, `FRONTEND_URL` (the frontend address, with no `/` at the end).
3. In MongoDB Atlas, allow `0.0.0.0/0` under Network Access.
4. Deploy, then check `https://<backend>.vercel.app/api/health` returns `{"ok":true}`.

**Frontend (Vercel)**
1. Import the same repository and set **Root Directory** to `frontend` (framework: Vite).
2. Add the environment variable `VITE_API_URL` set to the backend address, with no `/` at the end.
3. Deploy. `vercel.json` makes React Router routes work on refresh.

**Live links**
- Frontend: https://YOUR-FRONTEND-LINK.vercel.app
- Backend: https://cognevance-portfolio-lsue.vercel.app/api/health