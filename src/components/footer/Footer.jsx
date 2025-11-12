import Container from '../container/Container';
import lightLogo from '../../assets/images/logo2.webp';
import darkLogo from '../../assets/images/logo.webp';
import { ThemeContext } from '../../context/ThemeProvider';
import { use } from 'react';
import SocialButtons from '../ui/SocialButtons';

const Footer = () => {
  const { theme } = use(ThemeContext);

  const logoSrc = theme === 'dark' ? darkLogo : lightLogo;
  const year = new Date().getFullYear();

  return (
    <footer className="mt-16 p-3 bg-(--bg-secondary) text-(--text-muted)">
      <Container>
        {/* Top section: links */}
        <div className="py-10 border-b border-white/5 flex flex-col gap-8 md:flex-row md:justify-between">
          <nav className="space-y-3 min-w-[140px] flex flex-col">
            <h6 className="text-sm font-semibold tracking-wide uppercase text-(--text-primary)">Services</h6>
            <a className="text-sm hover:text-(--accent-cyan) transition-colors cursor-pointer">Branding</a>
            <a className="text-sm hover:text-(--accent-cyan) transition-colors cursor-pointer">Design</a>
            <a className="text-sm hover:text-(--accent-cyan) transition-colors cursor-pointer">Marketing</a>
            <a className="text-sm hover:text-(--accent-cyan) transition-colors cursor-pointer">Advertisement</a>
          </nav>

          <nav className="space-y-3 min-w-[140px] flex flex-col">
            <h6 className="text-sm font-semibold tracking-wide uppercase text-(--text-primary)">Company</h6>
            <a className="text-sm hover:text-(--accent-cyan) transition-colors cursor-pointer">About us</a>
            <a className="text-sm hover:text-(--accent-cyan) transition-colors cursor-pointer">Contact</a>
            <a className="text-sm hover:text-(--accent-cyan) transition-colors cursor-pointer">Jobs</a>
            <a className="text-sm hover:text-(--accent-cyan) transition-colors cursor-pointer">Press kit</a>
          </nav>

          <nav className="space-y-3 min-w-[140px] flex flex-col">
            <h6 className="text-sm font-semibold tracking-wide uppercase text-(--text-primary)">Legal</h6>
            <a className="text-sm hover:text-(--accent-cyan) transition-colors cursor-pointer">Terms of use</a>
            <a className="text-sm hover:text-(--accent-cyan) transition-colors cursor-pointer">Privacy policy</a>
            <a className="text-sm hover:text-(--accent-cyan) transition-colors cursor-pointer">Cookie policy</a>
          </nav>
        </div>

        {/* Middle: logo + socials */}
        <div className="py-6 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          {/* Logo + text */}
          <div className="flex items-cente justify-center gap-4">
            <figure>
              <img src={logoSrc} className="w-16 sm:w-20 drop-shadow-[0_0_6px_rgba(14,165,233,0.35)]" alt="Voyago logo" />
            </figure>
            <div className="-ml-4 text-xs sm:text-sm">
              <p className="font-semibold text-(--text-primary)">Voyago Industries Ltd.</p>
              <p>Where every journey feels effortless.</p>
            </div>
          </div>

          {/* Social icons */}
          <div className="flex justify-center gap-4 text-(--text-muted)">
            <SocialButtons></SocialButtons>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="py-4 border-t border-white/5 text-center text-[11px] sm:text-xs text-(--text-muted)">
          <p>
            Copyright © {year} — All rights reserved by <span className="text-(--text-primary)">Voyago Industries Ltd.</span>
          </p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
