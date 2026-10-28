
## 🚀 Getting started

**Prerequisites:** Node.js 18+, and a MongoDB database (local or MongoDB Atlas).

```bash
# 1. Frontend
npm install

# 2. Backend
cd backend
npm install
```

Create `backend/.env` (this file is git-ignored):

```env
MONGODB_URI=your-mongodb-connection-string
PORT=5000
```

Run both servers in two terminals:

```bash
# Terminal 1: backend
cd backend && npm run dev

# Terminal 2: frontend (from the project root)
npm run dev
```

| What | Where |
| --- | --- |
| Public website | http://localhost:5173 |
| Admin CMS | http://localhost:5173/admin |
| API | http://localhost:5000/api |

## 🔌 API

| Method | Endpoint | Description |
| --- | --- | --- |
| `GET` | `/api/header` | Read header content (logo, links, contact button) |
| `PUT` | `/api/header` | Save header content |
| `GET` | `/api/home` | Read Home page content |
| `PUT` | `/api/home` | Save Home page content |
| `GET` | `/api/about` | Read About page content |
| `PUT` | `/api/about` | Save About page content |
| `GET` | `/api/footer` | Read footer content |
| `PUT` | `/api/footer` | Save footer content |

## 🖼 Screenshots

<details open>
<summary><b>Public website</b></summary>

| Home | About |
| --- | --- |
| ![Home page](docs/screenshots/home.png) | ![About page](docs/screenshots/about.png) |

</details>

<details open>
<summary><b>Admin CMS</b></summary>

| Dashboard | Header CMS |
| --- | --- |
| ![Admin dashboard](docs/screenshots/admin-dashboard.png) | ![Header CMS](docs/screenshots/admin-header.png) |

| Home Page CMS | About Page CMS |
| --- | --- |
| ![Home Page CMS](docs/screenshots/admin-home.png) | ![About Page CMS](docs/screenshots/admin-about.png) |

</details>

## 🤝 Contributing

Contributions are welcome.

1. Fork the repository and create a branch from `feature/header-cms`.
2. Make your change and test it locally with both servers running.
3. Commit with a clear message, for example `Add validation to Footer CMS`.
4. Open a pull request against `feature/header-cms`, and describe what changed and why.

## 👤 Author

**[Your Name]**: [LinkedIn](https://www.linkedin.com/in/your-profile) · [Email](mailto:you@example.com)

Built as a full-stack project covering frontend UI, REST API design, database modelling and a custom admin CMS.

## 📄 License

This project is private. All rights reserved.
'@

Set-Content -Path README.md -Value $readme -Encoding UTF8
Test-Path README.md
