
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import Home from './pages/Home.jsx'
import FooterAdmin from './pages/FooterAdmin.jsx'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
      </Route>

      <Route path="/admin/footer" element={<FooterAdmin />} />
    </Routes>
  )
}
