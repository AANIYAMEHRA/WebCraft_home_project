
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import Home from './pages/Home.jsx'
import FooterAdmin from './pages/FooterAdmin.jsx'
import HeaderAdmin from './pages/HeaderAdmin.jsx'
import HomeAdmin from './pages/HomeAdmin.jsx'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
      </Route>

      <Route path="/admin/header" element={<HeaderAdmin />} />
      <Route path="/admin/footer" element={<FooterAdmin />} />
      <Route path="/admin/home" element={<HomeAdmin />} />
    </Routes>
  )
}
