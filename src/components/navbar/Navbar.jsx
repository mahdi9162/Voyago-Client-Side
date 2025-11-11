import React from 'react';
import Container from '../container/Container';
import { Link } from 'react-router';

const Navbar = () => {
  const links = (
    <>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/all-vehicles">All Vehicles</Link>
      </li>
      <li>
        <Link to="/add-vehicle">Add Vehicle</Link>
      </li>
      <li>
        <Link to="/my-vehicles" className="">
          My Vehicles
        </Link>
      </li>
      <li>
        <Link to="/my-bookings">My Bookings</Link>
      </li>
    </>
  );
  return (
    <>
      <nav className=" bg-base-100 shadow-sm py-2">
        <Container>
          <div className="navbar">
            <div className="navbar-start">
              <div className="dropdown">
                <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    {' '}
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />{' '}
                  </svg>
                </div>
                <ul tabIndex="-1" className="dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                  {links}
                </ul>
              </div>
              <Link to='/'>
                <h2 className="text-xl">
                  Voyago <span className="text-sm"> — Smart Vehicle Booking Platform</span>
                </h2>
                <p className="text-xs">Where Every Journey Feels Effortless.</p>
              </Link>
            </div>
            <div className="navbar-center hidden lg:flex">
              <ul className=" flex gap-4 px-1">{links}</ul>
            </div>
            <div className="navbar-end gap-4">
              <Link className="btn">Login</Link>
              <Link className="btn">Signup</Link>
            </div>
          </div>
        </Container>
      </nav>
    </>
  );
};

export default Navbar;
