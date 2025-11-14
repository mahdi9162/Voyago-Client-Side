import React, { use } from 'react';
import Container from '../container/Container';
import { Link } from 'react-router';
import { NavLink } from 'react-router';
import lightLogo from '../../assets/images/logo2.webp';
import darkLogo from '../../assets/images/logo.webp';
import ThemeToggle from '../ui/ThemeToggle';
import { ThemeContext } from '../../context/ThemeProvider';
import { AuthContext } from '../../context/AuthProvider';
import { notifyError, notifySuccess } from '../../utils/toastService';
import avaterImg from '../../assets/images/avater.png';
import Spinner from '../../utils/Spinner';

const Navbar = () => {
  const { theme } = use(ThemeContext);
  const { UserSignOut, user, loading } = use(AuthContext);
  console.log(user);

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
        <NavLink
          to="/add-vehicle"
          className={({ isActive }) => `navlink-style ${isActive ? 'active-style' : 'inActive-style'} ${user ? 'inline' : 'hidden'}`}
        >
          Add Vehicle
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/my-vehicles"
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
        notifySuccess('👋 You’ve been logged out successfully. See you next time on Voyago!');
      })
      .catch((error) => {
        notifyError('⚠️ Logout failed! Please try again.');
        console.log(error);
      });
  };
  return (
    <>
      <nav className="bg-base-100 shadow-sm">
        <Container>
          <div className="navbar ">
            <div className="navbar-start">
              <div className="dropdown">
                <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                  </svg>
                </div>
                <ul tabIndex="-1" className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                  {links}
                  <li className="mx-auto mt-2">
                    <ThemeToggle />
                  </li>
                </ul>
              </div>
              <Link to="/" className="flex items-center gap-3 group transition-all duration-300 hover:opacity-90 -ml-4 md:ml-0">
                <figure className="shrink-0">
                  <img
                    src={logoSrc}
                    alt="Voyago Logo"
                    className="w-10 sm:w-12 md:w-14 drop-shadow-[0_0_6px_rgba(14,165,233,0.4)] 
                 transition-transform duration-300 group-hover:scale-105"
                  />
                </figure>

                <div className="leading-tight -ml-3 ">
                  <h2 className="text-lg md:text-xl font-extrabold tracking-tight text-(--accent-cyan)">
                    Voyago
                    {/* subtitle */}
                    <span className=" hidden md:block lg:inline text-sm font-medium text-(--text-muted)">
                      {' '}
                      — Smart Vehicle Booking Platform
                    </span>
                  </h2>

                  {/* tagline */}
                  <p className="hidden lg:block text-xs text-(--text-muted)">Where Every Journey Feels Effortless.</p>
                </div>
              </Link>
            </div>
            <div className="navbar-center hidden lg:flex">
              <ul className="menu menu-horizontal gap-4 px-1">{links}</ul>
            </div>
            <div className="navbar-end gap-4">
              {loading ? (
                <div className="flex items-center gap-4">
                  <div className="h-10 w-24 rounded-lg bg-white/10 animate-pulse"></div>
                  <div className="h-10 w-10 rounded-full bg-white/10 animate-pulse"></div>
                </div>
              ) : user ? (
                // login (Show Logout and Avatar)
                <>
                  <button
                    onClick={handleUserSignout}
                    className="px-5 py-2 text-sm font-medium rounded-lg border 
                 border-(--accent-cyan) text-(--accent-cyan) 
                 hover:bg-(--accent-cyan) hover:text-white 
                 transition-all duration-300 shadow-sm"
                  >
                    Logout
                  </button>

                  {/* User Avatar with Tooltip */}
                  <Link to="/" className="inline">
                    <div className="tooltip tooltip-bottom" data-tip={user?.displayName}>
                      <div className="avatar avatar-online">
                        <div className="w-10 rounded-full">
                          <img src={user?.photoURL ? user?.photoURL : avaterImg} alt={user?.displayName || 'User Avatar'} />
                        </div>
                      </div>
                    </div>
                  </Link>
                </>
              ) : (
                //  logout (Show Login and Signup)
                <>
                  <Link
                    to="/login"
                    className="px-5 py-2 text-sm font-medium rounded-lg border border-(--accent-cyan) text-(--accent-cyan) hover:bg-(--accent-cyan) hover:text-white transition-all duration-300 shadow-sm"
                  >
                    Login
                  </Link>

                  <Link
                    to="/signup"
                    className="px-5 py-2 text-sm font-semibold rounded-lg bg-(--accent) text-white 
                 hover:bg-(--accent-cyan) hover:text-black transition-all duration-300 shadow-sm"
                  >
                    Signup
                  </Link>
                </>
              )}
              <div className="hidden lg:flex">
                <ThemeToggle />
              </div>
            </div>
          </div>
        </Container>
      </nav>
    </>
  );
};

export default Navbar;
