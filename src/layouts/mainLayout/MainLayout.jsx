import React from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { Outlet } from 'react-router';
import Footer from '../../components/Footer/Footer';
import Navbar from '../../components/navbar/Navbar';
import { ToastContainer } from 'react-toastify';

const MainLayout = () => {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Navbar></Navbar>
        <main className="flex-1">
          <Outlet></Outlet>
        </main>
        <Footer></Footer>
        <ToastContainer />
      </div>
    </>
  );
};

export default MainLayout;
