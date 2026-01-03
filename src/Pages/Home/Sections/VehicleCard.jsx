import React, { use } from 'react';
import { ThemeContext } from '../../../context/ThemeProvider';
import carImg from '../../../assets/images/carimg.jpg';
import { AuthContext } from '../../../context/AuthProvider';
import { Link } from 'react-router';

const VehicleCard = ({ vehicle, index }) => {
  const { theme } = use(ThemeContext);

  const { _id, vehicleName, vehicleModel, pricePerDay, fuelType, transmission, seats, coverImage } = vehicle || {};

  return (
    <section data-aos="zoom-in" data-aos-delay={index * 80}>
      <div
        className="
        group relative
        rounded-2xl overflow-hidden
        bg-white/5 border border-white/10
        shadow-lg shadow-primary/15
        backdrop-blur-md
        transition-all duration-300
        hover:-translate-y-1
        hover:shadow-[0_25px_70px_rgba(0,0,0,0.9)]
      "
      >
        {/* Image */}
        <div className="h-44 w-full overflow-hidden relative">
          <img
            src={coverImage ? coverImage : carImg}
            alt={`${vehicleName} ${vehicleModel}`}
            className="
            h-full w-full object-cover
            transition-transform duration-500
            group-hover:scale-105
          "
          />

          {/* Dark gradient for text */}
          <div
            className="
            absolute inset-0
            bg-linear-to-t from-black/90 via-black/45 to-transparent
          "
          />

          {/* Title + price */}
          <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between gap-2">
            <h3 className="text-white font-semibold text-sm truncate">
              {vehicleName} {vehicleModel}
            </h3>

            {pricePerDay && (
              <span
                className="
                px-2.5 py-1 rounded-full
                text-[11px] sm:text-xs
                bg-white/15 border border-white/25
                text-white whitespace-nowrap
                backdrop-blur-md
              "
              >
                ${pricePerDay}/day
              </span>
            )}
          </div>
        </div>

        {/* Meta + Button */}
        <div
          className="
          flex items-center justify-between
          px-4 py-3
          text-[11px] sm:text-xs
        "
        >
          {/* Left  */}
          <div className="flex flex-wrap items-center gap-3 text-(--text-muted)">
            {fuelType && (
              <span className="flex items-center gap-1">
                <span className="text-[13px]">⛽</span>
                <span className="opacity-90">{fuelType}</span>
              </span>
            )}
            {transmission && (
              <span className="flex items-center gap-1">
                <span className="text-[13px]">⚙️</span>
                <span className="opacity-90">{transmission}</span>
              </span>
            )}
            {seats && <span className="opacity-90">{seats} Seats</span>}
          </div>

          {/* Right button */}
          <Link to={`/vehicle-details/${_id}`} type="button" className={theme === 'dark' ? 'dark-view' : 'light-view'}>
            View details
          </Link>
        </div>
      </div>
    </section>
  );
};

export default VehicleCard;
