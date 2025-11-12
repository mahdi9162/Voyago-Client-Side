import React, { use } from 'react';
import Container from '../container/Container';
import { Link } from 'react-router';
import { NavLink } from 'react-router';
import lightLogo from '../../assets/images/logo2.webp';
import darkLogo from '../../assets/images/logo.webp';
import ThemeToggle from '../ui/ThemeToggle';
import { ThemeContext } from '../../context/ThemeProvider';

const Navbar = () => {
  const { theme } = use(ThemeContext);

  const logoSrc = theme === 'dark' ? darkLogo : lightLogo

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/all-vehicles', label: 'All Vehicles' },
    { path: '/add-vehicle', label: 'Add Vehicle' },
    { path: '/my-vehicles', label: 'My Vehicles' },
    { path: '/my-bookings', label: 'My Bookings' },
  ];

  const desktopLinks = navItems.map((item) => (
    <li key={item.path}>
      <NavLink to={item.path} className={({ isActive }) => `navlink-style ${isActive ? 'active-style' : 'inActive-style'}`}>
        {item.label}
      </NavLink>
    </li>
  ));

  const mobileLinks = navItems.map((item) => (
    <li key={item.path}>
      <NavLink
        to={item.path}
        className={({ isActive }) =>
          `
        block w-full rounded-md px-3 py-2 text-sm
        ${isActive ? 'bg-(--accent-cyan)/10 text-(--accent-cyan) font-semibold' : 'text-(--text-primary) hover:bg-(--bg-secondary)/60'}
        `
        }
      >
        {item.label}
      </NavLink>
    </li>
  ));

  return (
    <>
      <nav className="py-2 px-3">
        <Container>
          <div className="navbar px-0">
            {/* LEFT: hamburger + logo */}
            <div className="navbar-start gap-2">
              {/* Mobile menu button */}
              <div className="dropdown lg:hidden">
                <div tabIndex={0} role="button" className="btn btn-ghost btn-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </div>

                {/* Mobile dropdown */}
                <ul tabIndex={-1} className="dropdown-content bg-base-100 rounded-box z-10 mt-3 w-56 p-3 shadow flex flex-col gap-1">
                  {mobileLinks}

                  <div className="my-2 border-t border-base-300" />

                  {/* mobile login / signup */}
                  <Link
                    to="/login"
                    className="w-full text-center px-4 py-2 text-sm font-medium rounded-lg border 
                         border-(--accent-cyan) text-(--accent-cyan) 
                         hover:bg-(--accent-cyan) hover:text-white 
                         transition-all duration-300"
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="w-full text-center px-4 py-2 text-sm font-semibold rounded-lg 
                         bg-(--accent-cyan) text-white 
                         hover:bg-(--accent) hover:shadow-[0_0_12px_rgba(14,165,233,0.5)] 
                         transition-all duration-300"
                  >
                    Signup
                  </Link>
                </ul>
              </div>

              {/* Logo + text */}
              <Link to="/" className="flex  items-center gap-3 group transition-all duration-300 hover:opacity-90">
                <figure className="shrink-0">
                  <img
                    src={logoSrc}
                    alt="Voyago Logo"
                    className="w-10 sm:w-12 md:w-14 drop-shadow-[0_0_6px_rgba(14,165,233,0.4)] 
                 transition-transform duration-300 group-hover:scale-105"
                  />
                </figure>

                <div className="leading-tight -ml-1">
                  <h2 className="text-lg md:text-xl -ml-3 font-extrabold tracking-tight text-(--accent-cyan)">
                    Voyago
                    {/* subtitle */}
                    <span className=" hidden md:block lg:inline text-sm font-medium text-(--text-muted)"> — Smart Vehicle Booking Platform</span>
                  </h2>

                  {/* tagline */}
                  <p className="hidden lg:block text-xs text-(--text-muted)">Where Every Journey Feels Effortless.</p>
                </div>
              </Link>
            </div>

            {/* CENTER: desktop nav links */}
            <div className="navbar-center hidden lg:flex">
              <ul className="flex gap-4 px-1">{desktopLinks}</ul>
            </div>

            {/* RIGHT: desktop buttons + toggle */}
            <div className="navbar-end gap-4 hidden lg:flex">
              <Link
                to="/login"
                className="px-5 py-2 text-sm font-medium rounded-lg border 
                     border-(--accent-cyan) text-(--accent-cyan) 
                     hover:bg-(--accent-cyan) hover:text-white 
                     transition-all duration-300 shadow-sm"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="px-5 py-2 text-sm font-semibold rounded-lg 
                     bg-(--accent-cyan) text-white 
                     hover:bg-(--accent) hover:shadow-[0_0_12px_rgba(14,165,233,0.5)] 
                     transition-all duration-300"
              >
                Signup
              </Link>

              <ThemeToggle />
            </div>

            {/* Theme toggle  */}
            <div className="navbar-end lg:hidden">
              <ThemeToggle />
            </div>
          </div>
        </Container>
      </nav>
    </>
  );
};

export default Navbar;
