import React, { use } from 'react';
import { Link, NavLink, Outlet } from 'react-router';
import { LayoutDashboard, PlusCircle, CarFront, Home, LogOut, Menu, UserCircle } from 'lucide-react';
import { ThemeContext } from '../../context/ThemeProvider';
import { AuthContext } from '../../context/AuthProvider';
import lightLogo from '../../assets/images/logo2.webp';
import darkLogo from '../../assets/images/logo.webp';
import Spinner from '../../utils/Spinner';
import { notifyError, notifySuccess } from '../../utils/toastService';

const DashboardLayout = () => {
  const { theme } = use(ThemeContext);
  const { loading, user, UserSignOut } = use(AuthContext);
  const logoSrc = theme === 'dark' ? darkLogo : lightLogo;

  const navLinks = [
    { name: 'Dashboard Home', path: '/dashboard', icon: <LayoutDashboard size={20} /> },
    { name: 'Add Vehicle', path: '/dashboard/add-vehicle', icon: <PlusCircle size={20} /> },
    { name: 'My Vehicles', path: '/dashboard/my-vehicles', icon: <CarFront size={20} /> },
  ];

  if (loading) {
    return (
      <div className="mt-70">
        <Spinner></Spinner>
      </div>
    );
  }

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
    <div className="flex min-h-screen bg-(--bg-primary) text-(--text-primary)">
      {/* Sidebar - Desktop */}
      <aside className="hidden lg:flex w-72 flex-col fixed inset-y-0 z-50 border-r border-white/10 bg-(--bg-secondary)/50 backdrop-blur-xl">
        {/* Logo Section */}
        <div className="p-6">
          <Link to="/" className="flex items-center gap-3 group">
            <img src={logoSrc} alt="Voyago" className="w-10 transition-transform group-hover:rotate-12" />
            <h2 className="text-2xl font-black tracking-tighter bg-linear-to-r from-(--accent-cyan) to-(--accent-purple) bg-clip-text text-transparent italic">
              VOYAGO
            </h2>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 space-y-2 mt-4">
          <div className="text-[10px] uppercase tracking-widest text-(--text-muted) opacity-50 font-bold mb-4 ml-2">Main Menu</div>
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              end
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 font-medium group ${
                  isActive
                    ? 'bg-linear-to-r from-(--accent-cyan)/20 to-(--accent-purple)/20 text-(--accent-cyan) border border-white/10 shadow-lg'
                    : 'text-(--text-muted) hover:bg-white/5 hover:text-(--text-primary)'
                }`
              }
            >
              <span className="shrink-0">{link.icon}</span>
              {link.name}
            </NavLink>
          ))}
        </nav>

        {/* Bottom Actions */}
        <div className="p-4 border-t border-white/10 space-y-2">
          <Link to="/" className="flex items-center gap-3 px-4 py-3 rounded-xl text-(--text-muted) hover:bg-white/5 transition-all">
            <Home size={20} />
            <span>Back to Home</span>
          </Link>
          <button
            onClick={handleUserSignout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 transition-all font-bold"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 lg:ml-72 flex flex-col">
        {/* Top Header */}
        <header className="sticky top-0 z-40 h-20 border-b border-white/10 bg-(--bg-primary)/80 backdrop-blur-md px-4 sm:px-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* Mobile Menu Toggle (Drawer Trigger) */}
            <label htmlFor="dashboard-drawer" className="btn btn-ghost lg:hidden">
              <Menu size={24} />
            </label>
            <h1 className="text-lg font-bold hidden md:block">Dashboard Overview</h1>
          </div>

          {/* User Profile Info */}
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-bold">{user?.displayName}</p>
              <p className="text-[10px] text-(--text-muted) opacity-70">Host Account</p>
            </div>
            <div className="avatar p-0.5 rounded-full bg-linear-to-tr from-(--accent-cyan) to-(--accent-purple)">
              <div className="w-10 rounded-full border-2 border-(--bg-primary)">
                {user?.photoURL ? <img src={user.photoURL} alt="profile" /> : <UserCircle className="w-full h-full opacity-50" />}
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-4 sm:p-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="max-w-6xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>

      {/* Mobile Drawer (DaisyUI) */}
      <div className="drawer lg:hidden">
        <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-side z-100">
          <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
          <div className="menu p-4 w-80 min-h-full bg-(--bg-secondary) text-(--text-primary)">
            {/* Mobile Sidebar Content (Repeat NavLinks) */}
            <div className="mb-8 mt-4 px-4">
              <img src={logoSrc} alt="Voyago" className="w-12 mb-2" />
              <h2 className="text-xl font-black italic text-(--accent-cyan)">VOYAGO</h2>
            </div>
            {navLinks.map((link) => (
              <NavLink key={link.path} to={link.path} className="flex items-center gap-3 p-4 rounded-xl mb-2">
                {link.icon} {link.name}
              </NavLink>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
