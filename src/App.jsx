import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Services from './pages/Services'
import Contact from './pages/Contact'
import Blog from './pages/Blog'
import BlogPost from './pages/BlogPost'
import WhatsAppFloat from './components/WhatsAppFloat'

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/"         element={<Home />} />
        <Route path="/about"    element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact"  element={<Contact />} />
        <Route path="/blog"     element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="*"         element={<Home />} />
      </Routes>

      <WhatsAppFloat />
    </>
  )
}
