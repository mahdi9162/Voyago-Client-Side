import React, { use } from 'react';
import { useNavigate, useParams } from 'react-router';
import useVehicles from '../../hooks/useVehicles';
import Container from '../../components/container/Container';
import { ThemeContext } from '../../context/ThemeProvider';
import { AuthContext } from '../../context/AuthProvider';
import axios from 'axios';
import { notifyError, notifySuccess } from '../../utils/toastService';
import Spinner from '../../utils/Spinner';

const VehicleDetails = () => {
  const { theme } = use(ThemeContext);
  const { user } = use(AuthContext);
  const navigate = useNavigate();
  const { id } = useParams();

  const { vehicles, loading } = useVehicles('https://voyago-server-side.vercel.app/vehicles');
  const allVehicles = vehicles?.data || [];

  if (loading) {
    return (
      <div className="mt-20">
        <Spinner></Spinner>;
      </div>
    );
  }

  const vehicle = allVehicles.find((vehicle) => vehicle._id == id);

  if (!vehicle) {
    return (
      <section className="py-16">
        <Container>
          <p className="text-center text-(--text-muted)">Vehicle not found.</p>
        </Container>
      </section>
    );
  }

  const {
    vehicleName,
    vehicleModel,
    userEmail,
    ownerName,
    coverImage,
    category,
    pricePerDay,
    seats,
    fuelType,
    transmission,
    location,
    rating,
    description,
    features,
    availability,
  } = vehicle;

  const handleReqRideButton = async (e) => {
    e.preventDefault();

    if (!user) {
      navigate('/login');
    }
    const form = e.target;
    const location = form.location.value;
    const date = form.date.value;
    const userName = user.displayName;
    const userEmail = user.email;
    const vehicleID = id;
    const perDayPrice = pricePerDay;
    const createdAt = new Date().toISOString();

    const bookingData = {
      pickupLocation: location,
      tripStartDate: date,
      userEmail: userEmail,
      userName: userName,
      vehicleId: vehicleID,
      perDayCost: perDayPrice,
      status: 'Requested',
      createdAt: createdAt,
    };

    try {
      await axios.post('https://voyago-server-side.vercel.app/bookings', bookingData);
      notifySuccess('Ride request sent! Your host will respond shortly.💖');
      form.reset();
      navigate('/my-bookings');
    } catch (error) {
      notifyError('Something went wrong.Please try again in a moment.😕');
    }
  };

  return (
    <section className="py-6 md:py-16 lg:py-20">
      <Container>
        {/* Outer card */}
        <div className="rounded-3xl border border-white/5 bg-(--bg-secondary)/80 shadow-[0_24px_80px_rgba(0,0,0,0.55)] backdrop-blur-xl px-4 py-6 md:px-8 md:py-8 lg:px-10 lg:py-10">
          <div className="flex flex-col-reverse md:flex-row items-center justify-between mb-10">
            {/* Left Div */}
            <div>
              {/* Title + price + CTA */}
              <div className="flex flex-col gap-4 mb-6 md:mb-4">
                <div className="space-y-2 lg:space-y-4">
                  <h1 className="text-xl md:text-3xl lg:text-5xl font-semibold text-(--text-primary) ">
                    {vehicleName} {vehicleModel && <span className="font-light">{vehicleModel}</span>}
                  </h1>
                  <p className="text-xs md:text-base text-(--text-muted)">
                    {location && <span>{location}</span>}
                    {location && ' • '}
                    {category && <span>{category}</span>}
                    {availability && <span> • {availability}</span>}
                  </p>
                </div>
                {/* Rating */}
                <div className="flex items-end md:items-center gap-4">
                  <div className="text-right">
                    {rating && (
                      <span className="text-xs md:text-xl text-(--text-muted) mr-4">
                        ⭐ {rating.toFixed ? rating.toFixed(1) : rating} rated
                      </span>
                    )}
                    <span className="text-xs md:text-xl font-semibold text-(--text-primary)">
                      ${pricePerDay}
                      <span className="text-sm font-normal text-(--text-muted)">/day</span>
                    </span>
                  </div>
                </div>
              </div>
              {/* Feature badges */}
              <div className="flex flex-wrap gap-5">
                {fuelType && (
                  <span
                    className={`rounded-full px-3 py-1 text-xs md:text-sm font-medium ${
                      theme === 'dark' ? 'bg-white/5' : 'bg-(--accent-cyan)/50'
                    }`}
                  >
                    ⚡ <span>{fuelType}</span>
                  </span>
                )}
                {transmission && (
                  <span
                    className={`rounded-full px-3 py-1 text-xs md:text-sm font-medium ${
                      theme === 'dark' ? 'bg-white/5' : 'bg-(--accent-cyan)/50'
                    }`}
                  >
                    ⚙ <span>{transmission}</span>
                  </span>
                )}
                {seats && (
                  <span
                    className={`rounded-full px-3 py-1 text-xs md:text-sm font-medium ${
                      theme === 'dark' ? 'bg-white/5' : 'bg-(--accent-cyan)/50'
                    }`}
                  >
                    🪑 <span>{seats} Seats</span>
                  </span>
                )}
                {category && (
                  <span
                    className={`rounded-full px-3 py-1 text-xs md:text-sm font-medium ${
                      theme === 'dark' ? 'bg-white/5' : 'bg-(--accent-cyan)/50'
                    }`}
                  >
                    🚗 <span>{category}</span>
                  </span>
                )}
              </div>
            </div>
            {/* Right Div */}
            <div>
              {/* img */}
              <div className="w-full mb-8">
                <div className="overflow-hidden rounded-2xl bg-black/20">
                  <img
                    src={coverImage}
                    alt={`${vehicleName} ${vehicleModel}`}
                    className="w-full h-80 object-contain rounded-2xl bg-black/10"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Bottom: two-column layout */}
          <div className="flex flex-col gap-8 lg:flex-row lg:gap-10">
            {/* Left column */}
            <div className="flex-1 space-y-6">
              {/* About */}
              <div>
                <h3 className="text-lg font-semibold text-(--text-primary)">About this vehicle</h3>
                <p className="mt-2 text-xs md:text-base text-justify leading-relaxed text-(--text-muted)">{description}</p>
              </div>

              {/* Features list*/}
              {Array.isArray(features) && features.length > 0 && (
                <div>
                  <h4 className="text-sm font-semibold text-(--text-primary) mb-2">Key features</h4>
                  <ul className="flex flex-wrap gap-2 text-xs md:text-sm text-(--text-muted)">
                    {features.map((item, idx) => (
                      <li key={idx} className={`rounded-full px-3 py-1 ${theme === 'dark' ? 'bg-white/5' : 'bg-(--accent-cyan)/50'}`}>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Host info mini card */}
              <div className="mt-4 rounded-2xl border border-white/10 bg-(--accent-cyan)/20 px-4 py-4 md:px-5 md:py-5 flex items-center gap-4">
                {/* Static avatar / placeholder */}
                <div className="h-14 w-14 rounded-full bg-linear-to-br from-(--accent) to-(--accent-cyan) p-0.5">
                  <div className="h-full w-full rounded-full bg-(--bg-secondary) flex items-center justify-center text-sm font-semibold text-(--accent)">
                    {ownerName ? ownerName[0] : 'H'}
                  </div>
                </div>

                <div className="flex-1">
                  <p className="text-xs font-medium uppercase tracking-wide text-(--text-muted)">Host Info</p>
                  <p className="text-sm font-semibold text-(--text-primary)">{ownerName}</p>
                  <p className="text-xs text-(--text-muted)">Trusted Voyago host • 4.5 ★ rating</p>
                  {userEmail && <p className="mt-1 text-[12px] text-(--text-muted)/90">Contact: {userEmail}</p>}
                </div>
              </div>
            </div>

            {/* Right column – Booking card */}
            <div className="w-full lg:w-[340px]">
              <div className="rounded-2xl border border-white/10 bg-(--accent-cyan)/20 px-4 py-5 md:px-5 md:py-6 space-y-4">
                <div>
                  <h3 className="text-base font-semibold text-(--text-primary)">Booking Details</h3>
                  <p className="mt-1 text-xs text-(--text-muted)">Choose your pickup info and request this ride.</p>
                </div>

                <form onSubmit={handleReqRideButton}>
                  <div className="space-y-3">
                    <div className="space-y-1">
                      <label className="text-xs font-medium text-(--text-muted)">Pick-up Location</label>
                      <input
                        type="text"
                        name="location"
                        placeholder="e.g. Los Angeles Downtown"
                        className="w-full rounded-xl border border-white/10 bg-(--bg-primary) px-3 py-2 text-sm text-(--text-primary) placeholder:text-(--text-muted) focus:outline-none focus:ring-2 focus:ring-(--accent)"
                        required
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-medium text-(--text-muted)">Schedule</label>
                      <input
                        type="date"
                        name="date"
                        className="w-full rounded-xl border border-white/10 bg-(--bg-primary) px-3 py-2 text-sm text-(--text-primary) placeholder:text-(--text-muted) focus:outline-none focus:ring-2 focus:ring-(--accent)"
                        required
                      />
                    </div>
                  </div>

                  <button className="mt-3 w-full rounded-full bg-(--accent) px-4 py-2.5 text-sm font-semibold text-white shadow-[0_14px_40px_rgba(34,211,238,0.5)] transition-all duration-500 hover:bg-(--accent-cyan) hover:text-black hover:shadow-[0_18px_60px_rgba(34,211,238,0.65)] active:scale-95 cursor-pointer">
                    Request Ride
                  </button>
                </form>

                <p className="text-[11px] text-(--text-muted) mt-1">*Your host will confirm the pickup details shortly.</p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default VehicleDetails;
