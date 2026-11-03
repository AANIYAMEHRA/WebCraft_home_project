import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import AdminLayout from './components/AdminLayout.jsx'
import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import AiSolutions from './pages/AiSolutions.jsx'
<<<<<<< HEAD
import Research from './pages/Research.jsx'

=======
>>>>>>> origin/feature/products-page
import HomeAdmin from './pages/HomeAdmin.jsx'
import AboutAdmin from './pages/AboutAdmin.jsx'
import HeaderAdmin from './pages/HeaderAdmin.jsx'
import FooterAdmin from './pages/FooterAdmin.jsx'
import AdminDashboard from './pages/AdminDashboard.jsx'
<<<<<<< HEAD
import ResearchAdmin from './pages/ResearchAdmin.jsx'

=======
import AiSolutionsAdmin from './pages/AiSolutionsAdmin.jsx'
>>>>>>> origin/feature/products-page
export default function App() {
  return (
    <Routes>
      {/* Public website */}
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/ai-solutions" element={<AiSolutions />} />
        <Route path="/research" element={<Research />} />
      </Route>

      {/* Admin CMS */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} />
        <Route path="home" element={<HomeAdmin />} />
        <Route path="about" element={<AboutAdmin />} />
        <Route path="header" element={<HeaderAdmin />} />
        <Route path="footer" element={<FooterAdmin />} />
<<<<<<< HEAD
        <Route path="research" element={<ResearchAdmin />} />
=======
        <Route path="ai-solutions" element={<AiSolutionsAdmin />} />
>>>>>>> origin/feature/products-page
      </Route>
    </Routes>
  )
}