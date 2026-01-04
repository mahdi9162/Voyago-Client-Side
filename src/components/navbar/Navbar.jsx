import React, { use, useState } from 'react';
import Container from '../container/Container';
import { Link } from 'react-router';
import { NavLink } from 'react-router';
import lightLogo from '../../assets/images/logo2.webp';
import darkLogo from '../../assets/images/logo.webp';
import ThemeToggle from '../ui/ThemeToggle';
import { ThemeContext } from '../../context/ThemeProvider';
import { AuthContext } from '../../context/AuthProvider';
import { notifyError, notifySuccess } from '../../utils/toastService';
import { Link as ScrollLink } from 'react-scroll';

const Navbar = () => {
  const { theme } = use(ThemeContext);
  const { UserSignOut, user, loading } = use(AuthContext);
  const [avatarError, setAvatarError] = useState(false);
  const avatarLetter = (user?.displayName || 'U').charAt(0);

  const links = (
    <>
      <li>
        <NavLink to="/" className={({ isActive }) => `navlink-style ${isActive ? 'active-style' : 'inActive-style'}`}>
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/all-vehicles" className={({ isActive }) => `navlink-style ${isActive ? 'active-style' : 'inActive-style'}`}>
          All Vehicles
        </NavLink>
      </li>
      <li>
        <NavLink to="/about-us" className={({ isActive }) => `navlink-style ${isActive ? 'active-style' : 'inActive-style'}`}>
          About Us
        </NavLink>
      </li>
      <li>
        <NavLink to="/contact-us" className={({ isActive }) => `navlink-style ${isActive ? 'active-style' : 'inActive-style'}`}>
          Contact Us
        </NavLink>
      </li>
      <li>
        <Link to="/dashboard" className="navlink-style inActive-style">
          Dashboard
        </Link>
      </li>
      <li>
        <NavLink
          to="/dashboard/add-vehicle"
          className={({ isActive }) => `navlink-style ${isActive ? 'active-style' : 'inActive-style'} ${user ? 'inline' : 'hidden'}`}
        >
          Add Vehicle
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/dashboard/my-vehicles"
          className={({ isActive }) => `navlink-style ${isActive ? 'active-style' : 'inActive-style'} ${user ? 'inline' : 'hidden'}`}
        >
          My Vehicles
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/my-bookings"
          className={({ isActive }) => `navlink-style ${isActive ? 'active-style' : 'inActive-style'} ${user ? 'inline' : 'hidden'}`}
        >
          My Bookings
        </NavLink>
      </li>
    </>
  );
  const logoSrc = theme === 'dark' ? darkLogo : lightLogo;

  // User Signout
  const handleUserSignout = () => {
    UserSignOut()
      .then(() => {
        localStorage.removeItem('user-role');
        localStorage.removeItem('user-email');
        notifySuccess('👋 You’ve been logged out successfully. See you next time on Voyago!');
      })
      .catch((error) => {
        console.log(error);
        notifyError('⚠️ Logout failed! Please try again.');
      });
  };
  return (
    <div className="sticky top-0 z-100 w-full py-0 md:py-3 transition-all duration-300 container mx-auto">
      <nav className="bg-base-100/70 md:rounded-2xl border-b md:border border-white/10 backdrop-blur-sm shadow-lg transition-all duration-300">
        <Container>
          <div className="navbar min-h-14 md:min-h-16 px-2 sm:px-3">
            {/* Start: Logo & Mobile Menu */}
            <div className="navbar-start">
              <div className="dropdown">
                <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden hover:bg-white/10">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                  </svg>
                </div>
                <ul
                  tabIndex="-1"
                  className="menu menu-sm dropdown-content bg-base-200/95 backdrop-blur-2xl rounded-2xl z-50 mt-4 w-64 p-4 shadow-2xl border border-white/10"
                >
                  {links}
                  <div className="divider opacity-20 my-2"></div>
                  <li className="flex justify-center">
                    <ThemeToggle />
                  </li>
                </ul>
              </div>

              <Link to="/" className="flex items-center gap-2 group transition-all duration-300 ml-1 md:ml-0 min-w-0">
                <figure className="shrink-0">
                  <img
                    src={logoSrc}
                    alt="Voyago Logo"
                    className="w-10 hidden md:block md:w-12 drop-shadow-[0_0_10px_rgba(34,211,238,0.6)] transition-transform duration-500 group-hover:rotate-360 group-hover:scale-110"
                  />
                </figure>

                <div className="leading-tight min-w-0">
                  <h2 className="text-xl md:text-2xl font-black tracking-tighter bg-linear-to-r from-(--accent-cyan) via-blue-400 to-(--accent-purple) bg-clip-text text-transparent italic -ml-4 md:ml-0">
                    VOYAGO
                  </h2>

                  <p className="text-[9px] md:text-[10px] uppercase tracking-[0.12em] md:tracking-[0.2em] font-bold text-(--text-muted) opacity-70 whitespace-nowrap -ml-4 md:ml-0 hidden md:block">
                    Smart Booking Platform
                  </p>
                </div>
              </Link>
            </div>

            {/* Center: Desktop Navigation Links */}
            <div className="navbar-center hidden lg:flex">
              {loading ? (
                <div className="flex items-center gap-6">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="h-4 w-16 rounded-full bg-slate-200/20 animate-pulse" />
                  ))}
                </div>
              ) : (
                <ul className="menu menu-horizontal gap-1 px-1">{links}</ul>
              )}
            </div>

            {/* End: Auth & Actions */}
            <div className="navbar-end gap-2 md:gap-4 flex-nowrap pr-2">
              {loading ? (
                <div className="flex items-center gap-2 flex-nowrap whitespace-nowrap">
                  <div className="h-10 w-24 rounded-xl bg-slate-200/20 animate-pulse" />
                  <div className="h-10 w-10 rounded-full bg-slate-200/20 animate-pulse" />
                </div>
              ) : user ? (
                <>
                  {/*  Dropdown */}
                  <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="relative transition-all duration-300 active:scale-95 cursor-pointer">
                      {/* avatar with theme Gradient Border */}
                      <div className="avatar avatar-online p-0.5 rounded-full bg-linear-to-tr from-(--accent-cyan) to-(--accent-purple) shadow-lg">
                        <div className="w-8 md:w-10 rounded-full ring-2 ring-base-100 overflow-hidden bg-(--bg-secondary) text-(--text-primary) font-bold flex items-center justify-center">
                          {!avatarError && user?.photoURL ? (
                            <img src={user.photoURL} alt={user?.displayName} onError={() => setAvatarError(true)} />
                          ) : (
                            <span className="text-lg uppercase">{avatarLetter}</span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/*Dropdown Content */}
                    <ul
                      tabIndex={0}
                      className="dropdown-content mt-4 w-56 rounded-2xl bg-base-200/95 backdrop-blur-2xl border border-white/10 shadow-2xl p-2 z-100"
                    >
                      {/* User Info Header */}
                      <div className="px-4 py-3 mb-1">
                        <p className="text-sm font-bold text-(--text-primary) truncate">{user?.displayName || 'User Name'}</p>
                        <p className="text-[11px] text-(--text-muted) truncate opacity-80 mt-0.5">{user?.email}</p>
                      </div>

                      <div className="divider my-1 opacity-10"></div>

                      {/* Logout Button Only */}
                      <li>
                        <button
                          onClick={handleUserSignout}
                          className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-bold text-red-500 rounded-xl hover:bg-red-500/10 transition-all duration-500 cursor-pointer"
                          type="button"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                            />
                          </svg>
                          Logout
                        </button>
                      </li>
                    </ul>
                  </div>
                </>
              ) : (
                <div className="flex items-center gap-2 flex-nowrap whitespace-nowrap">
                  <Link to="/login" className="auth-login-btn">
                    Login
                  </Link>
                  <Link to="/signup" className="auth-signup-btn">
                    Signup
                  </Link>
                </div>
              )}

              <div className="hidden lg:flex border-l border-white/10 pl-4 ml-2">
                <ThemeToggle />
              </div>
            </div>
          </div>
        </Container>
      </nav>
    </div>
  );
};

export default Navbar;
