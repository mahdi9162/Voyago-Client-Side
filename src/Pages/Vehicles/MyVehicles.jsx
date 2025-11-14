import React, { use } from 'react';
import Container from '../../components/container/Container';
import useMyVehicles from '../../hooks/useMyVehicles';
import carImg from '../../assets/images/carimg.jpg';
import { format } from 'date-fns';
import { AuthContext } from '../../context/AuthProvider';
import { Link, useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import axios from 'axios';
import { notifyError } from '../../utils/toastService';
import emptyVehicleAnimation from '../../assets/images/Searching for a car.json';
import Lottie from 'lottie-react';

const MyVehicles = () => {
  const { myVehicles, loading } = useMyVehicles();
  const { user, loading: authLoading } = use(AuthContext);
  const navigate = useNavigate();

  if (authLoading) {
    return;
  }

  if (loading) {
    return;
  }

  if (myVehicles.length === 0) {
    return (
      <div className="py-20 flex flex-col items-center text-center gap-4">
        {/* Animation */}
        <div className="w-32 opacity-90">
          <Lottie animationData={emptyVehicleAnimation} loop autoplay />
        </div>

        {/* Message */}
        <p className="text-lg font-medium text-(--text-primary)">No vehicles added yet.</p>

        <p className="text-sm text-(--text-muted) max-w-xs">Add your first vehicle and make it available for booking.</p>

        {/* Button */}
        <Link
          to="/all-vehicles"
          className="mt-2 text-sm px-4 py-2 rounded-full bg-(--accent) text-white 
               shadow-[0_6px_20px_rgba(34,211,238,0.35)] 
               hover:bg-(--accent-cyan) transition-all duration-500 active:scale-95"
        >
          Add Vehicle
        </Link>
      </div>
    );
  }

  const handleDeleteBtn = (vehicleId) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`https://voyago-server-side.vercel.app/vehicles/${vehicleId}`)
          .then((res) => {
            Swal.fire({
              title: 'Deleted!',
              text: 'Your vehicle has been deleted.',
              icon: 'success',
              showConfirmButton: false,
              timer: 2000,
            });
            window.location.reload();
          })
          .catch((error) => {
            notifyError('Failed to delete vehicle. Server error.');
          });
      }
    });
  };

  const handleViewDetails = (vehicleId) => {
    navigate(`/vehicle-details/${vehicleId}`);
  };

  return (
    <section className="my-16 px-3 lg:px-0">
      <Container>
        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-semibold text-(--text-primary)">My Vehicles</h1>
            <p className="text-(--text-muted) text-xs md:text-base">Manage all the vehicles you've added to Voyago.</p>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden text-xs text-(--text-muted) lg:inline-block">
              Logged in as: <span className="font-medium text-(--text-primary)">{user.email}</span>
            </span>
            <div className="rounded-full bg-(--bg-secondary)/80 px-4 py-2 text-xs text-(--text-muted) border border-white/10">
              Total Vehicles: <span className="font-semibold text-(--text-primary) ml-1">{myVehicles.length}</span>
            </div>
          </div>
        </div>

        {/* Top toolbar */}
        <div className="mb-5 flex px-5 py-3 items-center justify-end md:justify-between rounded-2xl border border-white/10 bg-(--bg-secondary)/70  text-sm text-(--text-muted) shadow-[0_14px_50px_rgba(0,0,0,0.45)] backdrop-blur-xl">
          <p className="hidden md:block">
            You've added <span className="font-semibold text-(--text-primary)">{myVehicles.length}</span> vehicles
          </p>
        </div>

        {/* Desktop table */}
        <div className="hidden md:block">
          <div className="overflow-hidden rounded-3xl border border-white/10 bg-(--bg-secondary)/75 shadow-[0_24px_80px_rgba(0,0,0,0.65)] backdrop-blur-2xl">
            {/* Table head */}
            <div className="grid grid-cols-[minmax(0,2.4fr)_minmax(0,1.1fr)_minmax(0,1fr)_minmax(0,1.2fr)_minmax(0,1.3fr)] border-b border-white/10 bg-white/5 px-6 py-3 text-xs font-semibold uppercase tracking-wide text-(--text-muted)">
              <span>Vehicle</span>
              <span>Category</span>
              <span>Price/Day</span>
              <span>Added On</span>
              <span className="text-right">Actions</span>
            </div>

            {/* Table body */}
            <div className="divide-y divide-white/8">
              {myVehicles.map((vehicle) => {
                const formattedDate = format(new Date(vehicle.createdAt), 'MMM dd, yyyy');
                return (
                  <div
                    key={vehicle._id}
                    className="grid grid-cols-[minmax(0,2.4fr)_minmax(0,1.1fr)_minmax(0,1fr)_minmax(0,1.2fr)_minmax(0,1.3fr)] items-center px-6 py-4 text-sm text-(--text-muted) hover:bg-white/3 transition-colors duration-150"
                  >
                    {/* Vehicle cell */}
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-16 overflow-hidden rounded-xl bg-black/30">
                        <img
                          src={vehicle.coverImage ? vehicle.coverImage : carImg}
                          alt={vehicle.vehicleName}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="space-y-0.5">
                        <p className="text-sm font-semibold text-(--text-primary)">
                          {vehicle.vehicleName} <span className="font-normal text-(--text-muted)">{vehicle.vehicleModel}</span>
                        </p>
                        <p className="text-[11px] text-(--text-muted)">Location: {vehicle.location}</p>
                        <button
                          onClick={() => handleViewDetails(vehicle._id)}
                          className="text-[11px] font-medium text-(--accent) hover:text-(--accent-cyan) cursor-pointer"
                        >
                          View details
                        </button>
                      </div>
                    </div>

                    {/* Category */}
                    <div>
                      <span className="inline-flex items-center rounded-full bg-white/5 px-3 py-1 text-xs font-medium text-(--text-muted)">
                        {vehicle.category}
                      </span>
                    </div>

                    {/* Price / day */}
                    <div className="font-semibold text-(--text-primary)">
                      ${vehicle.pricePerDay}
                      <span className="text-xs font-normal text-(--text-muted)"> /day</span>
                    </div>

                    {/* Added on + status badge */}
                    <div className="space-y-1">
                      <p className="text-xs text-(--text-muted)">{formattedDate}</p>
                      <span
                        className={`inline-flex items-center rounded-full px-3 py-1 text-[11px] font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-400/40`}
                      >
                        Active
                      </span>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        to={`/update-vehicle/${vehicle._id}`}
                        className="inline-flex items-center justify-center rounded-full border border-(--accent)/60 bg-(--accent)/10 px-3 py-1.5 text-xs font-semibold text-(--accent) hover:bg-(--accent-cyan) hover:border-transparent hover:text-slate-900 transition-all duration-500 cursor-pointer"
                      >
                        Update
                      </Link>
                      <button
                        onClick={() => handleDeleteBtn(vehicle._id)}
                        className="inline-flex items-center justify-center rounded-full border border-rose-500/60 bg-rose-500/10 px-3 py-1.5 text-xs font-semibold text-rose-400 hover:bg-rose-500 hover:text-white transition-all duration-500 cursor-pointer"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Mobile cards */}
        <div className="space-y-4 md:hidden mt-4">
          {myVehicles.map((vehicle) => {
            const formattedDate = format(new Date(vehicle.createdAt), 'MMM dd, yyyy');
            return (
              <div
                key={vehicle._id}
                className="rounded-2xl border border-white/10 bg-(--bg-secondary)/80 p-4 shadow-[0_16px_60px_rgba(0,0,0,0.55)] backdrop-blur-xl"
              >
                <div className="flex items-center gap-4 mb-3">
                  <div className="h-14 w-20 overflow-hidden rounded-xl bg-black/30">
                    <img
                      src={vehicle.coverImage ? vehicle.coverImage : carImg}
                      alt={vehicle.vehicleName}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex-1 space-y-0.5">
                    <p className="text-sm font-semibold text-(--text-primary)">{vehicle.vehicleName}</p>
                    <p className="text-[11px] text-(--text-muted)">
                      {vehicle.vehicleModel} • {vehicle.category}
                    </p>
                    <p className="text-[11px] text-(--text-muted)">Location: {vehicle.location}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-3">
                  <p className="text-sm font-semibold text-(--text-primary)">
                    ${vehicle.pricePerDay}
                    <span className="text-xs font-normal text-(--text-muted)"> /day</span>
                  </p>
                  <span
                    className={`inline-flex items-center rounded-full px-3 py-1 text-[11px] font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-400/40`}
                  >
                    Active
                  </span>
                </div>

                <p className="mb-3 text-[11px] text-(--text-muted)">Added on {formattedDate}</p>

                <div className="flex items-center justify-between gap-2">
                  <button className="text-xs font-medium text-(--accent) hover:text-(--accent-cyan)">View details</button>
                  <div className="flex gap-2">
                    <Link
                      to={`/update-vehicle/${vehicle._id}`}
                      className="inline-flex items-center justify-center rounded-full border border-(--accent)/60 bg-(--accent)/10 px-3 py-1.5 text-xs font-semibold text-white/80 hover:bg-(--accent) hover:text-slate-900 transition-all duration-150"
                    >
                      Update
                    </Link>
                    <button
                      onClick={() => handleDeleteBtn(vehicle._id)}
                      className="inline-flex items-center justify-center rounded-full border border-rose-500/60 bg-rose-500/10 px-3 py-1.5 text-xs font-semibold text-rose-400 hover:bg-rose-500 hover:text-white transition-all duration-150"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
};

export default MyVehicles;
