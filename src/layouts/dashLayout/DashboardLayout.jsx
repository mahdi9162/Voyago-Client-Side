import React, { use } from 'react';
import { Link, NavLink, Outlet, useNavigate } from 'react-router';
import { IoIosAddCircleOutline } from 'react-icons/io';
import { PiBuildingOffice, PiCarProfile } from 'react-icons/pi';
import { FaRegCalendarAlt } from 'react-icons/fa';
import { IoHomeOutline } from 'react-icons/io5';
import getUserRole from '../../utils/getUserRole';
import { ThemeContext } from '../../context/ThemeProvider';
import lightLogo from '../../assets/images/logo2.webp';
import darkLogo from '../../assets/images/logo.webp';
import { FiUser, FiLogOut, FiHome } from 'react-icons/fi';
import { AuthContext } from '../../context/AuthProvider';
import Spinner from '../../utils/Spinner';
import { notifyError, notifySuccess } from '../../utils/toastService';
import ThemeToggle from '../../components/ui/ThemeToggle';
import { CgProfile } from 'react-icons/cg';

const DashboardLayout = () => {
  const { theme } = use(ThemeContext);
  const role = getUserRole();
  const { UserSignOut, user, loading } = use(AuthContext);
  const navigate = useNavigate();

  if (loading) {
    return (
      <div>
        <Spinner></Spinner>
      </div>
    );
  }
  const logoSrc = theme === 'dark' ? darkLogo : lightLogo;

  // User Signout
  const handleUserSignout = () => {
    UserSignOut()
      .then(() => {
        localStorage.removeItem('user-role');
        localStorage.removeItem('user-email');
        notifySuccess('👋 You’ve been logged out successfully. See you next time on Voyago!');
        navigate('/');
      })
      .catch((error) => {
        console.log(error);
        notifyError('⚠️ Logout failed! Please try again.');
      });
  };

  //  collapsed mode
  const linkBase =
    'group flex items-center gap-3 rounded-2xl px-3 py-2.5 transition-all duration-300 leading-none ' +
    'is-drawer-close:justify-center is-drawer-close:px-2 is-drawer-close:gap-0';

  const linkInactive = 'text-(--text-muted) hover:text-(--text-primary) hover:bg-(--bg-secondary)/60';

  // active shadow toned + clipped
  const linkActive =
    'bg-linear-to-r from-(--accent-cyan)/15 via-(--accent)/15 to-(--accent-purple)/15 text-(--text-primary) ' +
    'border border-white/10 shadow-[0_10px_22px_rgba(34,211,238,0.10)]';

  return (
    <>
      <div className="drawer lg:drawer-open bg-(--bg-primary) text-(--text-primary)">
        <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />

        {/* CONTENT */}
        <div className="drawer-content min-h-screen flex flex-col">
          {/* TOPBAR */}
          <nav
            className="
            top-0 z-30 w-full border-b border-white/10 bg-primary/10 backdrop-blur-xl
            shadow-lg relative after:content-[''] after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-(--gradient) after:opacity-35"
          >
            <div className="px-3 sm:px-6">
              <div className="navbar min-h-[74px] px-0">
                <div className="navbar-start gap-2">
                  {/* --- COLLAPSE BUTTON  --- */}
                  <label
                    htmlFor="my-drawer-4"
                    aria-label="open sidebar"
                    className="
                      btn btn-square btn-sm lg:btn-md
                      rounded-xl
                      border border-white/10
                      bg-(--bg-secondary)/70
                      hover:bg-(--bg-secondary)
                      transition-all duration-300
                      shadow-[0_10px_22px_rgba(0,0,0,0.22)]
                      lg:absolute lg:-left-5 lg:top-1/2 lg:-translate-y-1/2 z-50
                      focus:outline-none focus-visible:ring-2 focus-visible:ring-(--accent-cyan)/50
                    "
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      strokeWidth="2.5"
                      fill="none"
                      stroke="currentColor"
                      className="inline-block size-5"
                    >
                      <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z" />
                      <path d="M9 4v16" />
                      <path d="M14 10l2 2l-2 2" />
                    </svg>
                  </label>

                  {/* LOGO  */}
                  <Link to="/" className="flex items-center gap-2 group transition-all duration-300 ml-1 lg:ml-6 md:ml-0 min-w-0">
                    <figure className="shrink-0">
                      <img
                        src={logoSrc}
                        alt="Voyago Logo"
                        className="w-10 hidden md:block md:w-12 drop-shadow-[0_0_10px_rgba(34,211,238,0.6)] transition-transform duration-500 group-hover:rotate-360 group-hover:scale-110"
                      />
                    </figure>

                    <div className="leading-tight min-w-0">
                      <h2 className="text-xl md:text-2xl font-black tracking-tighter bg-linear-to-r from-(--accent-cyan) via-blue-400 to-(--accent-purple) bg-clip-text text-transparent italic">
                        VOYAGO
                      </h2>
                      <p className="text-[9px] md:text-[10px] uppercase tracking-[0.12em] md:tracking-[0.2em] font-bold text-(--text-muted) opacity-70 whitespace-nowrap hidden md:block">
                        Smart Booking Platform
                      </p>
                    </div>
                  </Link>
                </div>

                <div className="navbar-center hidden md:flex">
                  <div className="flex items-center gap-2 rounded-full border border-white/10 bg-(--bg-secondary)/35 px-4 py-2 shadow-[0_10px_24px_rgba(0,0,0,0.16)]">
                    <span className="text-xs font-semibold text-(--text-muted) tracking-wide">Dashboard</span>
                    <span className="h-1 w-1 rounded-full bg-white/30" />
                    <span className="text-xs font-bold text-(--text-primary) capitalize">{role}</span>
                  </div>
                </div>

                {/* dropdown */}
                <div className="navbar-end gap-2">
                  {/* Role  */}
                  <div className="hidden sm:flex items-center gap-2 rounded-full border border-white/10 bg-(--bg-secondary)/45 px-3 py-1.5 shadow-md">
                    <span className="h-2 w-2 rounded-full bg-(--accent-cyan) shadow-[0_0_10px_rgba(34,211,238,0.6)]" />
                    <span className="text-xs font-bold uppercase tracking-widest text-(--text-muted)">{role}</span>
                  </div>

                  {/* Profile Dropdown */}
                  <div className="dropdown dropdown-end">
                    <div
                      tabIndex={0}
                      role="button"
                      aria-label="Open profile menu"
                      className="relative cursor-pointer transition-all duration-300 active:scale-95"
                    >
                      {/* Gradient ring avatar */}
                      <div className="p-0.5 rounded-full bg-linear-to-tr from-(--accent-cyan) to-(--accent-purple) shadow-lg">
                        <div className="h-10 w-10 rounded-full bg-(--bg-secondary)/60 grid place-items-center border border-white/10">
                          <span className="text-sm font-black text-(--accent-cyan)">{role?.charAt(0).toUpperCase()}</span>
                        </div>
                      </div>

                      {/* Online dot */}
                      <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-(--accent-cyan) ring-2 ring-(--bg-primary)" />
                    </div>

                    {/* Dropdown content */}
                    <ul
                      tabIndex={0}
                      className="dropdown-content mt-4 w-56 rounded-2xl bg-(--bg-primary)/90 backdrop-blur-xl border border-white/10 shadow-2xl p-2 z-999"
                    >
                      {/* Header */}
                      <div className="px-4 py-3">
                        <p className="text-sm font-bold text-(--text-primary) truncate">{user?.displayName || 'User Name'}</p>
                        <p className="text-[11px] text-(--text-muted) truncate opacity-80">{user?.email}</p>
                      </div>

                      <div className="divider my-1 opacity-10" />

                      {/* Profile */}
                      <li>
                        <Link
                          to="/dashboard/my-profile"
                          type="button"
                          className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold text-(--text-primary) hover:bg-primary/20 transition-all duration-500 cursor-pointer"
                        >
                          <FiUser className="text-base opacity-90" />
                          Profile
                        </Link>
                      </li>

                      {/* Dashboard Home */}
                      <li>
                        <Link
                          to="/dashboard"
                          type="button"
                          className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold text-(--text-primary) hover:bg-primary/20 transition-all duration-500 cursor-pointer"
                        >
                          <FiHome className="text-base opacity-90" />
                          Dashboard Home
                        </Link>
                      </li>

                      <div className="divider my-1 opacity-10" />

                      {/* Logout */}
                      <li>
                        <button
                          onClick={handleUserSignout}
                          type="button"
                          className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-bold text-red-500 hover:bg-red-500/10 transition cursor-pointer"
                        >
                          <FiLogOut className="text-base" />
                          Logout
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* theme toogle */}
                <div className="hidden lg:flex border-l border-gray-400/20 pl-4 ml-2">
                  <ThemeToggle />
                </div>
              </div>
            </div>
          </nav>

          {/* PAGE CONTENT WRAPPER */}
          <main className="px-3 sm:px-6 py-5 sm:py-7 flex-1">
            <div className="rounded-3xl border border-white/10 bg-(--bg-secondary)/30 backdrop-blur-md shadow-[0_18px_60px_rgba(0,0,0,0.25)] p-4 sm:p-6 min-h-[calc(100vh-140px)]">
              <Outlet />
            </div>
          </main>
        </div>

        {/* SIDEBAR */}
        <div className="drawer-side is-drawer-close:overflow-visible z-50 bg-primary/40">
          <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay" />

          <aside
            className="
              min-h-full
              w-72 is-drawer-close:w-20
              bg-(--bg-primary)/82 backdrop-blur-xl
              border-r border-white/10
              transition-all duration-300
              overflow-hidden
            "
          >
            <div className="flex h-full flex-col px-3 py-4 is-drawer-close:px-2">
              <div className="lg:hidden mb-6 px-2">
                <img src={logoSrc} alt="Logo" className="w-10 mb-2" />
                <h2 className="text-xl font-black italic text-(--accent-cyan)">VOYAGO</h2>
              </div>

              <ul className="menu w-full grow p-0 gap-1.5">
                {/* collapse mode */}
                <li className="menu-title px-2 mt-0 is-drawer-close:hidden">
                  <span className="text-[10px] tracking-[0.3em] uppercase text-(--text-muted)">Main</span>
                </li>

                <li className="mt-0">
                  <NavLink to="/" end className={({ isActive }) => `${linkBase} ${isActive ? linkActive : linkInactive}`}>
                    <span className="grid place-items-center size-10 rounded-xl bg-white/0 group-hover:bg-white/5 transition">
                      <IoHomeOutline className="size-5 shrink-0 opacity-90" />
                    </span>

                    <span className="is-drawer-close:hidden font-semibold">Homepage</span>

                    <span className="ml-auto is-drawer-close:hidden h-2 w-2 rounded-full bg-(--accent-cyan)/0 group-hover:bg-(--accent-cyan)/40 transition" />
                  </NavLink>
                </li>

                {role === 'host' && (
                  <>
                    {/* collapse mode */}
                    <li className="menu-title px-2 mt-4 is-drawer-close:hidden">
                      <span className="text-[10px] tracking-[0.3em] uppercase text-(--text-muted)">Host</span>
                    </li>

                    <li className="mt-0 bg-secondary/10 rounded-2xl">
                      <NavLink to="/dashboard" end className={({ isActive }) => `${linkBase} ${isActive ? linkActive : linkInactive}`}>
                        <span className="grid place-items-center size-10 rounded-xl bg-white/0 group-hover:bg-white/5 transition">
                          <PiBuildingOffice className="size-5 shrink-0 opacity-90" />
                        </span>
                        <span className="is-drawer-close:hidden font-semibold">Dashboard Home</span>
                        <span className="ml-auto is-drawer-close:hidden h-2 w-2 rounded-full bg-(--accent-cyan)/0 group-hover:bg-(--accent-cyan)/40 transition" />
                      </NavLink>
                    </li>

                    <li className="mt-0 bg-secondary/10 rounded-2xl">
                      <NavLink
                        to="/dashboard/add-vehicle"
                        className={({ isActive }) => `${linkBase} ${isActive ? linkActive : linkInactive}`}
                      >
                        <span className="grid place-items-center size-10 rounded-xl bg-white/0 group-hover:bg-white/5 transition">
                          <IoIosAddCircleOutline className="size-5 shrink-0 opacity-90" />
                        </span>
                        <span className="is-drawer-close:hidden font-semibold">Add Vehicle</span>
                        <span className="ml-auto is-drawer-close:hidden h-2 w-2 rounded-full bg-(--accent-cyan)/0 group-hover:bg-(--accent-cyan)/40 transition" />
                      </NavLink>
                    </li>

                    <li className="mt-0 bg-secondary/10 rounded-2xl">
                      <NavLink
                        to="/dashboard/my-vehicles"
                        className={({ isActive }) => `${linkBase} ${isActive ? linkActive : linkInactive}`}
                      >
                        <span className="grid place-items-center size-10 rounded-xl bg-white/0 group-hover:bg-white/5 transition">
                          <FaRegCalendarAlt className="size-5 shrink-0 opacity-90" />
                        </span>
                        <span className="is-drawer-close:hidden font-semibold">My Bookings</span>
                        <span className="ml-auto is-drawer-close:hidden h-2 w-2 rounded-full bg-(--accent-cyan)/0 group-hover:bg-(--accent-cyan)/40 transition" />
                      </NavLink>
                    </li>

                    {/* my profile */}
                    <li className="mt-0 bg-secondary/10 rounded-2xl">
                      <NavLink
                        to="/dashboard/my-profile"
                        end
                        className={({ isActive }) => `${linkBase} ${isActive ? linkActive : linkInactive}`}
                      >
                        <span className="grid place-items-center size-10 rounded-xl bg-white/0 group-hover:bg-white/5 transition">
                          <CgProfile className="size-5 shrink-0 opacity-90" />
                        </span>
                        <span className="is-drawer-close:hidden font-semibold">My Profile</span>
                        <span className="ml-auto is-drawer-close:hidden h-2 w-2 rounded-full bg-(--accent-cyan)/0 group-hover:bg-(--accent-cyan)/40 transition" />
                      </NavLink>
                    </li>
                  </>
                )}

                {role === 'user' && (
                  <>
                    {/* collapse mode */}
                    <li className="menu-title px-2 mt-4 is-drawer-close:hidden">
                      <span className="text-[10px] tracking-[0.3em] uppercase text-(--text-muted)">User</span>
                    </li>

                    <li className="mt-0 bg-secondary/10 rounded-2xl">
                      <NavLink to="/dashboard" end className={({ isActive }) => `${linkBase} ${isActive ? linkActive : linkInactive}`}>
                        <span className="grid place-items-center size-10 rounded-xl bg-white/0 group-hover:bg-white/5 transition">
                          <PiBuildingOffice className="size-5 shrink-0 opacity-90" />
                        </span>
                        <span className="is-drawer-close:hidden font-semibold">Dashboard Home</span>
                        <span className="ml-auto is-drawer-close:hidden h-2 w-2 rounded-full bg-(--accent-cyan)/0 group-hover:bg-(--accent-cyan)/40 transition" />
                      </NavLink>
                    </li>

                    <li className="mt-0 bg-secondary/10 rounded-2xl">
                      <NavLink
                        to="/dashboard/my-bookings"
                        className={({ isActive }) => `${linkBase} ${isActive ? linkActive : linkInactive}`}
                      >
                        <span className="grid place-items-center size-10 rounded-xl bg-white/0 group-hover:bg-white/5 transition">
                          <PiCarProfile className="size-5 shrink-0 opacity-90" />
                        </span>
                        <span className="is-drawer-close:hidden font-semibold">My Bookings</span>
                        <span className="ml-auto is-drawer-close:hidden h-2 w-2 rounded-full bg-(--accent-cyan)/0 group-hover:bg-(--accent-cyan)/40 transition" />
                      </NavLink>
                    </li>

                    {/* My Profile */}
                    <li className="mt-0 bg-secondary/10 rounded-2xl">
                      <NavLink
                        to="/dashboard/my-profile"
                        end
                        className={({ isActive }) => `${linkBase} ${isActive ? linkActive : linkInactive}`}
                      >
                        <span className="grid place-items-center size-10 rounded-xl bg-white/0 group-hover:bg-white/5 transition">
                          <CgProfile className="size-5 shrink-0 opacity-90" />
                        </span>
                        <span className="is-drawer-close:hidden font-semibold">My Profile</span>
                        <span className="ml-auto is-drawer-close:hidden h-2 w-2 rounded-full bg-(--accent-cyan)/0 group-hover:bg-(--accent-cyan)/40 transition" />
                      </NavLink>
                    </li>
                  </>
                )}
              </ul>

              <div className="mt-5 is-drawer-close:hidden rounded-2xl border border-white/10 bg-linear-to-br from-white/6 to-transparent p-4 shadow-[0_16px_40px_rgba(0,0,0,0.18)] ">
                <p className="text-[10px] font-bold uppercase text-(--accent-cyan)">Voyago Host</p>
                <p className="text-[11px] text-(--text-muted) mt-1 opacity-75">Manage your fleet with ease.</p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
};

export default DashboardLayout;
