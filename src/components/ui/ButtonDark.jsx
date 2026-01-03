import React from 'react';

const Button = ({ children }) => {
  return (
    <button
      className="
        relative inline-flex overflow-hidden rounded-lg p-px focus:outline-none 
        active:scale-95 transition-transform duration-500 hover:scale-105 h-8 md:h-12 cursor-pointer              
      "
    >
      <span
        className="
          absolute inset-[-1000%] 
          animate-[spin_2s_linear_infinite] 
          bg-[conic-gradient(from_90deg_at_50%_50%,#e7029a_0%,#f472b6_50%,#bd5fff_100%)]
        "
      ></span>

      <span
        className="
          inline-flex h-full w-full items-center justify-center gap-2 rounded-lg 
          bg-slate-950 backdrop-blur-3xl text-sm font-medium text-white
          px-5 md:px-7
        "
      >
        {children}

        <svg
          stroke="currentColor"
          fill="currentColor"
          strokeWidth={0}
          viewBox="0 0 448 512"
          height="1em"
          width="1em"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M429.6 92.1c4.9-11.9 2.1-25.6-7-34.7s-22.8-11.9-34.7-7l-352 144c-14.2 5.8-22.2 20.8-19.3 35.8s16.1 25.8 31.4 25.8H224V432c0 15.3 10.8 28.4 25.8 31.4s30-5.1 35.8-19.3l144-352z" />
        </svg>
      </span>
    </button>
  );
};

export default Button;
