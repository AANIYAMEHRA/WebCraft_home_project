<p align="center">
<img width="648" height="301" alt="image" src="https://github.com/user-attachments/assets/37d501a9-f50e-409d-81a6-a181415152f6" />
</p>
<h1 align="center">Webcraft-IT Website</h1>
 
<p align="center">
  <b>A full-stack corporate website with a built-in admin CMS.</b><br />
  Non-technical editors update the header, home page, about page and footer from a dashboard, with no code changes and no redeploy.
</p>
<p align="center">
  <img src="https://img.shields.io/badge/React-18-102a4f?logo=react&logoColor=6ee7b7" alt="React 18" />
  <img src="https://img.shields.io/badge/Vite-5-1f8a86?logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-3-2aa27c?logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Node.js-Express-102a4f?logo=node.js&logoColor=6ee7b7" alt="Node.js and Express" />
  <img src="https://img.shields.io/badge/MongoDB-Mongoose-1f8a86?logo=mongodb&logoColor=white" alt="MongoDB and Mongoose" />
</p>
<p align="center">
  <a href="#-highlights">Highlights</a> ·
  <a href="#-features">Features</a> ·
  <a href="#-tech-stack">Tech stack</a> ·
  <a href="#-architecture">Architecture</a> ·
  <a href="#-getting-started">Getting started</a> ·
  <a href="#-screenshots">Screenshots</a>
</p>
<br>
<img width="1914" height="970" alt="image" src="https://github.com/user-attachments/assets/c647fdad-2cdd-45d8-b951-063003170dc8" />
 
## 🎯 Highlights
 
- **Full-stack build:** a React 18 frontend, a Node.js and Express REST API, and MongoDB data models, all in one repository.
- **Content management system:** an admin area where editors manage four content areas of a live site without touching code.
- **Reusable admin UI:** one shared component library (fields, icon picker, dialogs, save bar) keeps every editor consistent.
- **Careful validation:** required fields are marked with a red `*`, and saving explains exactly what is missing.
- **Clean API design:** every content type has the same `GET` and `PUT` routes, backed by its own Mongoose model.
## ✨ Features
 
**Public website**
 
- Responsive Home and About pages with scroll-triggered animations (GSAP)
- Shared header and footer, driven by CMS content
- Logo and text update as soon as an editor saves
**Admin CMS (`/admin`)**
 
- Sidebar navigation with a dropdown for each page's sections, which scrolls to and expands that section
- **Header:** logo upload, navigation links, contact button
- **Home:** hero, statistics, services, why Webcraft, approach, products, AI solutions and call to action
- **About:** hero and chips, milestones, six ways, values, delivery philosophy, statistics, careers and call to action
- **Footer:** footer text and links
- Logo and icon uploads: choose an SVG and the app stores its drawing path, with a camera or pencil button for each icon
- Confirmation dialogs before any item, icon or logo is removed
- Toast notifications for every save, error and validation message
## 🛠 Tech stack
 
<p align="center">
  <img src="docs/images/tech-stack.svg" alt="Tech stack: React 18, Vite 5, Tailwind CSS 3, GSAP, Express 4, MongoDB with Mongoose 8" width="100%" />
</p>
<table>
  <tr>
    <th align="left">Layer</th>
    <th align="left">Technology</th>
    <th align="left">Why</th>
  </tr>
  <tr>
    <td>Frontend</td>
    <td>React 18, React Router 6, Vite</td>
    <td>Component-based UI, nested admin routes, fast builds</td>
  </tr>
  <tr>
    <td>Styling</td>
    <td>Tailwind CSS 3</td>
    <td>Consistent design tokens and responsive layouts</td>
  </tr>
  <tr>
    <td>Motion</td>
    <td>GSAP + ScrollTrigger</td>
    <td>Smooth, scroll-linked section animations</td>
  </tr>
  <tr>
    <td>Backend</td>
    <td>Node.js, Express 4</td>
    <td>Lightweight REST endpoints (GET and PUT per content type)</td>
  </tr>
  <tr>
    <td>Database</td>
    <td>MongoDB, Mongoose 8</td>
    <td>Flexible document models for page content</td>
  </tr>
</table>

## 🏗 Architecture
 
<p align="center">
  <img src="docs/images/architecture.svg" alt="Architecture: the admin CMS and public site both talk to the Express API, which reads and writes MongoDB" width="100%" />
</p>
Each content type (`header`, `home`, `about`, `footer`) has its own model, route and admin page. The public pages read the same content back, so an edit appears on the live site after saving.
 
## 📁 Project structure
 
```
WebCraft_home_project/
├── src/                       # Frontend (React)
│   ├── components/            # Header, Footer, layout and admin shell
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
└── docs/
    ├── images/                # README banner and diagrams
    └── screenshots/           # Screenshots used in this README
```
 
## 🚀 Getting started
 
**Prerequisites:** Node.js 18 or newer, and a MongoDB database (a local instance or MongoDB Atlas).
 
**1. Install the frontend**
 
```bash
npm install
```
 
**2. Install the backend**
 
```bash
cd backend
npm install
```
 
**3. Configure the backend**
 
Create a file named `.env` inside `backend/`. It is git-ignored, so your connection string stays private.
 
```env
MONGODB_URI=your-mongodb-connection-string
PORT=5000
```
 
**4. Run both servers**
 
In one terminal, start the backend:
 
```bash
cd backend
npm run dev
```
 
In a second terminal, start the frontend from the project root:
 
```bash
npm run dev
```
 
<table>
  <tr>
    <th align="left">What</th>
    <th align="left">Where</th>
  </tr>
  <tr>
    <td>Public site</td>
    <td>http://localhost:5173</td>
  </tr>
  <tr>
    <td>Admin CMS</td>
    <td>http://localhost:5173/admin</td>
  </tr>
  <tr>
    <td>Backend API</td>
    <td>http://localhost:5000/api</td>
  </tr>
</table>

## 🔌 API
 
Each content type has a `GET` route to read it and a `PUT` route to save it.
 
<table>
  <tr>
    <th align="left">Method</th>
    <th align="left">Endpoint</th>
    <th align="left">Used by</th>
  </tr>
  <tr>
    <td><code>GET</code> / <code>PUT</code></td>
    <td><code>/api/header</code></td>
    <td>Header CMS and the public header</td>
  </tr>
  <tr>
    <td><code>GET</code> / <code>PUT</code></td>
    <td><code>/api/home</code></td>
    <td>Home CMS and the public Home page</td>
  </tr>
  <tr>
    <td><code>GET</code> / <code>PUT</code></td>
    <td><code>/api/about</code></td>
    <td>About CMS and the public About page</td>
  </tr>
  <tr>
    <td><code>GET</code> / <code>PUT</code></td>
    <td><code>/api/footer</code></td>
    <td>Footer CMS and the public footer</td>
  </tr>
</table>
 
**5. Public website**
 
<table>
  <tr>
    <th align="center">Home</th>
    <th align="center">About</th>
  </tr>
  <tr>
    <td><img width="1911" height="978" alt="image" src="https://github.com/user-attachments/assets/137faa78-f924-4a4d-9145-478a10d76b31" /></td>
    <td><img width="1875" height="956" alt="image" src="https://github.com/user-attachments/assets/c3fde28a-7295-4fe0-8673-84f8336b41fc" /></td>
  </tr>
</table>


**6. Admin CMS website**
 
<table>
  <tr>
    <th align="center">Dashboard</th>
    <th align="center">Header CMS</th>
  </tr>
  <tr>
    <td><img width="1871" height="907" alt="image" src="https://github.com/user-attachments/assets/9b715366-0f35-4edb-9bd3-e41eeffe2df6" />
    <img width="1881" height="234" alt="image" src="https://github.com/user-attachments/assets/d2e063dd-8b68-44a0-ae93-7b36ec6dc224" /></td>
    <td><img width="1867" height="835" alt="image" src="https://github.com/user-attachments/assets/1c12f7e8-706c-423b-af2e-572e5924e024" />
    <img width="1458" height="964" alt="image" src="https://github.com/user-attachments/assets/8e75cf79-8e49-4d73-b7fe-c41ea9eb462c" /></td>
  </tr>
  <tr>
    <th align="center">Home Page CMS</th>
    <th align="center">About Page CMS</th>
  </tr>
  <tr>
    <td><img width="1907" height="960" alt="image" src="https://github.com/user-attachments/assets/195753e5-a312-4e8d-b43c-1d607992ef52" />
    <img width="1907" height="960" alt="image" src="https://github.com/user-attachments/assets/7aa59b41-c518-4f70-9fec-11307eb476c2" /></td>
    <td><img width="1907" height="960" alt="image" src="https://github.com/user-attachments/assets/7c1ad37c-48bf-48df-86e0-c1eeec5a9fbb" />
      <img width="1907" height="960" alt="image" src="https://github.com/user-attachments/assets/80d1dc11-bcc2-4ef1-8697-2e4f6287e750" />
</td>
  </tr>
  <tr>
    <th align="center">Footer CMS</th>
    <td><img width="1909" height="967" alt="image" src="https://github.com/user-attachments/assets/ce968fde-3eac-4f58-9428-9d7c43c0e12b" /></td>
  </tr>
  <tr>
    <th align="center">Footer CMS Main</th>
    <td><img width="1908" height="963" alt="image" src="https://github.com/user-attachments/assets/0d14d277-4613-4bd0-a5f4-c8ba17825cdd" /></td>
</table>

## 🤝 Contributing
 
Contributions are welcome.
 
1. Create a branch from `feature/header-cms`.
2. Make your changes and test them locally with both servers running.
3. Commit with a short message that says what changed, for example `Add validation to Footer CMS`.
4. Open a pull request into `feature/header-cms`, and describe what changed and why.
## 👤 Author
 
**Aniya Mehra** · [GitHub](https://github.com/AANIYAMEHRA) · [LinkedIn](https://www.linkedin.com/in/aniya-mehra-743a0a2b1/) · [Email](mailto:maanya335@gmail.com)
 
Built as a full-stack project covering frontend UI, REST API design, database modelling and a custom admin CMS.
 
## 📄 License
 
Private project. All rights reserved by Webcraft-IT.
