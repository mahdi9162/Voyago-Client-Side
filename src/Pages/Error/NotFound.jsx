import React from 'react';
import notFoundAnimation from '../../assets/images/404-notfound.json';
import { Link } from 'react-router';
import Lottie from 'lottie-react';

const NotFound = () => {
  return (
    <>
      <section className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
        {/* Animation */}
        <div className="w-48 mb-6 opacity-90">
          <Lottie animationData={notFoundAnimation} loop autoplay />
        </div>

        {/* Text */}
        <h2 className="text-2xl font-semibold text-(--text-primary)">Page Not Found</h2>

        <p className="text-(--text-muted) mt-2 max-w-md">Looks like this page doesn’t exist anymore or has moved somewhere else.</p>

        {/* Button */}
        <Link
          to="/"
          className="mt-6 px-6 py-3 rounded-full bg-(--accent) text-white
                   hover:bg-(--accent-cyan) transition shadow-md text-sm"
        >
          Go back home
        </Link>
      </section>
    </>
  );
};

export default NotFound;
