import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import AdminLayout from './components/AdminLayout.jsx'
import Home from './pages/Home.jsx'
import AdminDashboard from './pages/AdminDashboard.jsx'
import FooterAdmin from './pages/FooterAdmin.jsx'
import HeaderAdmin from './pages/HeaderAdmin.jsx'
import HomeAdmin from './pages/HomeAdmin.jsx'
import About from './pages/About.jsx'

export default function App() {
  return (
    <Routes>
      {/* Public website */}
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Route>

      {/* Admin CMS: every page shares the sidebar, navbar and save message */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} />
        <Route path="header" element={<HeaderAdmin />} />
        <Route path="home" element={<HomeAdmin />} />
        <Route path="footer" element={<FooterAdmin />} />
      </Route>
    </Routes>
  )
}