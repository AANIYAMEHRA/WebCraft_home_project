import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import AdminLayout from './components/AdminLayout.jsx'
import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import AiSolutions from './pages/AiSolutions.jsx'
import AdminDashboard from './pages/AdminDashboard.jsx'
import FooterAdmin from './pages/FooterAdmin.jsx'
import HeaderAdmin from './pages/HeaderAdmin.jsx'
import HomeAdmin from './pages/HomeAdmin.jsx'
import AboutAdmin from './pages/AboutAdmin.jsx'

export default function App() {
  return (
    <Routes>
      {/* Public website */}
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/ai-solutions" element={<AiSolutions />} />
      </Route>

      {/* Admin CMS */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} />
        <Route path="header" element={<HeaderAdmin />} />
        <Route path="home" element={<HomeAdmin />} />
        <Route path="about" element={<AboutAdmin />} />
        <Route path="footer" element={<FooterAdmin />} />
      </Route>
    </Routes>
  )
}