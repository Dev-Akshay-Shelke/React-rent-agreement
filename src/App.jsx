import { useEffect, lazy, Suspense } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import WhatsAppFloat from './components/WhatsAppFloat'

const Home     = lazy(() => import('./pages/Home'))
const About    = lazy(() => import('./pages/About'))
const Services = lazy(() => import('./pages/Services'))
const Contact  = lazy(() => import('./pages/Contact'))
const Blog     = lazy(() => import('./pages/Blog'))
const BlogPost = lazy(() => import('./pages/BlogPost'))

function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [pathname])

  return null
}

export default function App() {
  return (
    <>
      <ScrollToTop />

      <Suspense fallback={null}>
        <Routes>
          <Route path="/"         element={<Home />} />
          <Route path="/about"    element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact"  element={<Contact />} />
          <Route path="/blog"     element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="*"         element={<Home />} />
        </Routes>
      </Suspense>

      <WhatsAppFloat />
    </>
  )
}
