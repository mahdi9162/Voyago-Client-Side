import React, { use, useEffect } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { Outlet } from 'react-router';
import Navbar from '../../components/navbar/Navbar';
import { ToastContainer } from 'react-toastify';
import Footer from '../../components/footer/Footer';
import Spinner from '../../utils/Spinner';

import AOS from 'aos';
import 'aos/dist/aos.css';
import { ThemeContext } from '../../context/ThemeProvider';

const MainLayout = () => {
  const { theme } = use(ThemeContext);

  useEffect(() => {
    AOS.init({
      duration: 700,
      easing: 'ease-out-cubic',
      offset: 80,
    });
  }, []);

  useEffect(() => {
    AOS.refresh();
  }, [theme]);

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
