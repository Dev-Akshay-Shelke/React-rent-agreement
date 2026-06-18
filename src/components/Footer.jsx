import { Link } from 'react-router-dom'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-brand-deep text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10">

        {/* Brand */}
        <div className="lg:col-span-1">
          <div className="flex items-center gap-3 mb-4">
            <img
              src="/images/logo.jpeg"
              alt="Prime Document Solutions"
              className="h-10 w-auto object-contain rounded-lg"
            />
            <div>
              <p className="font-extrabold text-white text-sm leading-tight">Prime Document</p>
              <p className="text-brand-teal text-[11px] font-semibold tracking-wide uppercase">Solutions</p>
            </div>
          </div>
          <p className="text-gray-400 text-sm leading-relaxed mb-5">
            Pune's most trusted platform for Leave &amp; License registration. Government-approved,
            fully online, doorstep biometric service.
          </p>
          <div className="flex gap-3">
            <a
              href="https://wa.me/918767393079"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center hover:bg-green-500 transition-colors"
              aria-label="WhatsApp"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-bold text-white text-sm mb-5 uppercase tracking-widest">Quick Links</h4>
          <ul className="space-y-2.5 text-sm text-gray-400">
            {[
              { to: '/',         label: 'Home'       },
              { to: '/about',    label: 'About Us'   },
              { to: '/services', label: 'Services'   },
              { to: '/contact',  label: 'Contact Us' },
            ].map(({ to, label }) => (
              <li key={to}>
                <Link
                  to={to}
                  className="hover:text-brand-teal transition-colors duration-200 flex items-center gap-1.5"
                >
                  <svg className="w-3 h-3 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Services */}
        <div>
          <h4 className="font-bold text-white text-sm mb-5 uppercase tracking-widest">Our Services</h4>
          <ul className="space-y-2.5 text-sm text-gray-400">
            {[
              'Leave & License Registration',
              'Rent Agreement Drafting',
              'e-KYC & Biometric Coordination',
              'Stamp Duty Calculation',
              'Certified Digital Delivery',
            ].map(s => (
              <li key={s} className="flex items-center gap-1.5">
                <svg className="w-3 h-3 text-brand-teal flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>{s}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-bold text-white text-sm mb-5 uppercase tracking-widest">Contact Info</h4>
          <div className="space-y-3 text-sm text-gray-400">
            <div className="flex items-start gap-2.5">
              <span className="text-brand-teal mt-0.5 flex-shrink-0">📍</span>
              <span className="leading-relaxed">Walhekar Properties, Flat No. 405, 4th Floor, Nanded City, Pune-411041</span>
            </div>
            <div className="flex items-center gap-2.5">
              <span className="text-brand-teal flex-shrink-0">📞</span>
              <a href="tel:+919356480165" className="hover:text-brand-teal transition-colors">+91 93564 80165</a>
            </div>
            <div className="flex items-center gap-2.5">
              <span className="text-brand-teal flex-shrink-0">📞</span>
              <a href="tel:+919356480165" className="hover:text-brand-teal transition-colors">+91 93564 80165</a>
            </div>
            <div className="flex items-center gap-2.5">
              <span className="text-brand-teal flex-shrink-0">✉️</span>
              <a href="mailto:info@primedocs.com" className="hover:text-brand-teal transition-colors">info@primedocs.com</a>
            </div>
            <div className="flex items-center gap-2.5">
              <span className="text-brand-teal flex-shrink-0">⏰</span>
              <span>Mon – Sun · 10 AM – 7 PM</span>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 py-5 text-center text-xs text-gray-500">
        &copy; {year} Prime Document Solutions. All Rights Reserved. · Pune, Maharashtra, India.
      </div>
    </footer>
  )
}
