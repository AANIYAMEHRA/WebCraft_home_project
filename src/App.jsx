
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import AdminLayout from './components/AdminLayout.jsx'

import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import AiSolutions from './pages/AiSolutions.jsx'
import Research from './pages/Research.jsx'
import Products from './pages/Products.jsx'
import Services from './pages/Services.jsx'
import Contact from './pages/Contact.jsx'
import Careers from './pages/Careers.jsx'

import HomeAdmin from './pages/HomeAdmin.jsx'
import AboutAdmin from './pages/AboutAdmin.jsx'
import HeaderAdmin from './pages/HeaderAdmin.jsx'
import FooterAdmin from './pages/FooterAdmin.jsx'
import AdminDashboard from './pages/AdminDashboard.jsx'
import AiSolutionsAdmin from './pages/AiSolutionsAdmin.jsx'
import ResearchAdmin from './pages/ResearchAdmin.jsx'
import ProductsAdmin from './pages/ProductsAdmin.jsx'
import ServicesAdmin from './pages/ServicesAdmin.jsx'

export default function App() {
  return (
    <Routes>
      {/* Public website */}
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/ai-solutions" element={<AiSolutions />} />
        <Route path="/research" element={<Research />} />
        <Route path="/products" element={<Products />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/careers" element={<Careers />} />
      </Route>

      {/* Admin CMS */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} />
        <Route path="home" element={<HomeAdmin />} />
        <Route path="about" element={<AboutAdmin />} />
        <Route path="header" element={<HeaderAdmin />} />
        <Route path="footer" element={<FooterAdmin />} />
        <Route path="ai-solutions" element={<AiSolutionsAdmin />} />
        <Route path="research" element={<ResearchAdmin />} />
        <Route path="products" element={<ProductsAdmin />} />
        <Route path="services" element={<ServicesAdmin />} />
      </Route>
    </Routes>
  )
}
