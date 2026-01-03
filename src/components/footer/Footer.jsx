import Container from '../container/Container';
import lightLogo from '../../assets/images/logo2.webp';
import darkLogo from '../../assets/images/logo.webp';
import { ThemeContext } from '../../context/ThemeProvider';
import { use } from 'react';
import SocialButtons from '../ui/SocialButtons';
import { Link } from 'react-router';

const Footer = () => {
  const { theme } = use(ThemeContext);
  const logoSrc = theme === 'dark' ? darkLogo : lightLogo;
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-14 bg-(--bg-secondary)/30 border-t border-white/5 backdrop-blur-xl px-3 lg:px-0">
      <Container>
        {/* Branding, Links & Socials */}
        <div className="py-12 flex flex-col md:flex-row items-center md:items-start justify-between gap-12 text-center md:text-left">
          {/* Section 1: Branding & Tagline */}
          <div className="flex flex-col items-center md:items-start gap-4">
            <Link to="/" className="flex items-center gap-3 group transition-all duration-300 md:-ml-4">
              <figure className="shrink-0">
                <img
                  src={logoSrc}
                  className="w-12 md:w-16 drop-shadow-[0_0_8px_rgba(34,211,238,0.4)] group-hover:scale-105 transition-transform duration-500"
                  alt="Voyago Logo"
                />
              </figure>
              <div className="leading-tight -ml-8 md:ml-0">
                <h2 className="text-xl md:text-2xl font-black tracking-tighter bg-linear-to-r from-(--accent-cyan) to-(--accent-purple) bg-clip-text text-transparent italic uppercase">
                  Voyago
                </h2>
                <p className="text-[10px] ml-6 md:ml-0 md:text-xs font-bold text-(--text-muted) opacity-80 uppercase tracking-widest">Industries Ltd.</p>
              </div>
            </Link>
            <p className="text-xs lg:text-sm text-(--text-muted) max-w-xs leading-relaxed opacity-70">
              Where every journey feels effortless. Built on trust, comfort, and smart technology.
            </p>
          </div>

          {/* Section 2 links */}
          <nav className="flex flex-col gap-4">
            <h6 className="text-xs font-bold uppercase tracking-[0.3em] text-(--accent-cyan)">Company</h6>
            <div className="flex flex-col gap-2 font-medium">
              <Link to="/about-us" className="text-(--text-muted) hover:text-(--accent-cyan) transition-all duration-300 text-xs lg:text-sm">
                About Us
              </Link>
              <Link to="/contact-us" className="text-(--text-muted) hover:text-(--accent-cyan) transition-all duration-300 text-xs lg:text-sm">
                Contact Us
              </Link>
              <Link to="/all-vehicles" className="text-(--text-muted) hover:text-(--accent-cyan) transition-all duration-300 text-xs lg:text-sm">
                Browse Vehicles
              </Link>
            </div>
          </nav>

          {/* Section 3: Social Links & Contact Info */}
          <div className="flex flex-col gap-6 items-center md:items-end">
            <h6 className="text-xs font-bold uppercase tracking-[0.3em] text-(--accent-cyan)">Connect With Us</h6>
            <div className="flex gap-4">
              <SocialButtons />
            </div>
            <div className="text-[10px] text-(--text-muted) opacity-50 text-center md:text-right italic">
              Empowering your travels since 2024.
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright */}
        <div className="py-6 border-t border-white/5 text-center">
          <p className="text-[11px] font-medium text-(--text-muted) opacity-70">
            Copyright © {year} — All rights reserved by <span className="text-(--text-primary) font-bold">Voyago Industries Ltd.</span>
          </p>
        </div>
      </Container>

      {/* Subtle Background Glow for Modern Feel */}
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-(--accent-cyan)/5 blur-[120px] pointer-events-none rounded-full" />
    </footer>
  );
};

export default Footer;
