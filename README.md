# Webcraft-IT Website
 
The public website for Webcraft-IT, with an admin CMS for editing the Header, Home, About and Footer content without touching code.
 
<img width="1914" height="970" alt="image" src="https://github.com/user-attachments/assets/c647fdad-2cdd-45d8-b951-063003170dc8" />


 
## Features
 
- **Public website:** Home and About pages with a shared header and footer.
- **Admin CMS:** a sidebar admin area (`/admin`) with one page per section of the site:
  - Dashboard
  - Header CMS: logo, navigation links, contact button
  - Home Page CMS: hero, statistics, services, why Webcraft, approach, products, AI solutions, CTA
  - About Page CMS: hero and chips, milestones, six ways, values, delivery philosophy, statistics, careers, CTA
  - Footer CMS: footer text
- **Content saved to a database:** each admin page saves to its own API route, and the public pages read from it.
## Tech stack
 
| Part | Technology |
| --- | --- |
| Frontend | React 18, Vite, React Router, Tailwind CSS, GSAP |
| Backend | Node.js, Express, Mongoose |
| Database | MongoDB |
 
## Project structure
 
```
WebCraft_home_project/
├── src/                       # Frontend (React)
│   ├── components/            # Shared pieces: Header, Footer, Layout, admin shell
│   │   ├── AdminLayout.jsx    # Admin sidebar, navbar and save button
│   │   └── AdminUi.jsx        # Shared admin fields, icon picker and styles
│   ├── pages/                 # One file per page (public and admin)
│   ├── hooks/                 # Animation hooks
│   └── styles/                # Global styles
├── public/                    # Static files and images
├── backend/                   # Backend (Express + MongoDB)
│   ├── server.js              # Starts the server and mounts the routes
│   └── src/
│       ├── config/db.js       # Database connection
│       ├── models/            # Mongoose models (Header, Home, About, Footer)
│       └── routes/            # API routes (GET and PUT for each model)
└── docs/screenshots/          # Screenshots used in this README
```
 
## Getting started
 
### Prerequisites
 
- Node.js 18 or newer
- A MongoDB database (a local instance or MongoDB Atlas)
### 1. Install the frontend
 
```bash
npm install
```
 
### 2. Install the backend
 
```bash
cd backend
npm install
```
 
### 3. Configure the backend
 
Create a file named `.env` inside `backend/` (it is ignored by Git):
 
```
MONGODB_URI=your-mongodb-connection-string
PORT=5000
```
 
### 4. Run both servers
 
In one terminal, start the backend:
 
```bash
cd backend
npm run dev
```
 
In a second terminal, start the frontend from the project root:
 
```bash
npm run dev
```
 
Then open:
 
- Public site: http://localhost:5173
- Admin CMS: http://localhost:5173/admin
- Backend API: http://localhost:5000/api
## API routes
 
Each content type has a `GET` route to read it and a `PUT` route to save it.
 
| Route | Used by |
| --- | --- |
| `/api/header` | Header CMS and the public header |
| `/api/home` | Home CMS and the public Home page |
| `/api/about` | About CMS and the public About page |
| `/api/footer` | Footer CMS and the public footer |
 
## Screenshots
 
Add screenshots to `docs/screenshots/` and link them here. Suggested files:
 
| File | What it shows |
| --- | --- |
| `docs/screenshots/home.png` | Public Home page |
| `docs/screenshots/about.png` | Public About page |
| `docs/screenshots/admin-dashboard.png` | Admin dashboard |
| `docs/screenshots/admin-header.png` | Header CMS, logo settings |
| `docs/screenshots/admin-home.png` | Home Page CMS |
| `docs/screenshots/admin-about.png` | About Page CMS |
| `docs/screenshots/admin-footer.png` | Footer CMS |
 
## Contributing
 
1. Create a branch from `feature/header-cms`.
2. Make your changes and test them locally.
3. Commit with a short message that says what changed.
4. Open a pull request into `feature/header-cms`.
## Licence
 
Private project. All rights reserved by Webcraft-IT.
