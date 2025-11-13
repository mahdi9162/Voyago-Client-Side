// src/Pages/Dashboard/MyVehicles.jsx
import React from 'react';
import Container from '../../components/container/Container';

const MyVehicles = () => {
  
  const vehicles = [
    {
      id: 'v1',
      name: 'Tesla Model 3',
      model: 'Long Range',
      location: 'Los Angeles, CA',
      category: 'Sedan',
      status: 'Active',
      pricePerDay: 120,
      addedOn: 'Nov 12, 2024',
      thumb: 'https://i.ibb.co.com/pZt4f5w/tesla-thumb.jpg',
    },
    {
      id: 'v2',
      name: 'Ford Mustang GT',
      model: 'Sport',
      location: 'Austin, TX',
      category: 'Sports Car',
      status: 'Active',
      pricePerDay: 130,
      addedOn: 'Nov 18, 2024',
      thumb: 'https://i.ibb.co.com/9vH0RDP/mustang-thumb.jpg',
    },
    {
      id: 'v3',
      name: 'Ford 1550 Lightning',
      model: 'EV Truck',
      location: 'Seattle, WA',
      category: 'Truck',
      status: 'Pending',
      pricePerDay: 150,
      addedOn: 'Dec 1, 2024',
      thumb: 'https://i.ibb.co.com/bH5wV0R/lightning-thumb.jpg',
    },
    {
      id: 'v4',
      name: 'Mazda MX Miata',
      model: 'Roadster',
      location: 'San Diego, CA',
      category: 'Convertible',
      status: 'Active',
      pricePerDay: 90,
      addedOn: 'Jan 5, 2025',
      thumb: 'https://i.ibb.co.com/FzjmcqT/miata-thumb.jpg',
    },
  ];

  const getStatusClasses = (status) => {
    if (status === 'Active') {
      return 'bg-emerald-500/15 text-emerald-400 border border-emerald-400/40';
    }
    if (status === 'Pending') {
      return 'bg-amber-500/15 text-amber-400 border border-amber-400/40';
    }
    return 'bg-slate-500/15 text-slate-300 border border-slate-400/30';
  };

  return (
    <section className="my-16 px-3 lg:px-0">
      <Container>
        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-(--text-primary)">My Vehicles</h1>
            <p className="text-(--text-muted)">Manage all the vehicles you've added to Voyago.</p>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden text-xs text-(--text-muted) md:inline-block">
              Logged in as: <span className="font-medium text-(--text-primary)">mahdi@email.com</span>
            </span>
            <div className="rounded-full bg-(--bg-secondary)/80 px-4 py-2 text-xs text-(--text-muted) border border-white/10">
              Total Vehicles: <span className="font-semibold text-(--text-primary) ml-1">{vehicles.length}</span>
            </div>
          </div>
        </div>

        {/* Top toolbar */}
        <div className="mb-5 flex px-5 py-3 items-center justify-between rounded-2xl border border-white/10 bg-(--bg-secondary)/70  text-sm text-(--text-muted) shadow-[0_14px_50px_rgba(0,0,0,0.45)] backdrop-blur-xl">
          <p>
            You've added <span className="font-semibold text-(--text-primary)">{vehicles.length}</span> vehicles
          </p>
          <div className="flex items-center gap-2">
            <span>Sort by:</span>
            <button className="inline-flex items-center gap-1 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium text-(--text-primary)">
              Newest <span>▾</span>
            </button>
          </div>
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
              {vehicles.map((vehicle) => (
                <div
                  key={vehicle.id}
                  className="grid grid-cols-[minmax(0,2.4fr)_minmax(0,1.1fr)_minmax(0,1fr)_minmax(0,1.2fr)_minmax(0,1.3fr)] items-center px-6 py-4 text-sm text-(--text-muted) hover:bg-white/3 transition-colors duration-150"
                >
                  {/* Vehicle cell */}
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-16 overflow-hidden rounded-xl bg-black/30">
                      <img src={vehicle.thumb} alt={vehicle.name} className="h-full w-full object-cover" />
                    </div>
                    <div className="space-y-0.5">
                      <p className="text-sm font-semibold text-(--text-primary)">
                        {vehicle.name} <span className="font-normal text-(--text-muted)">{vehicle.model}</span>
                      </p>
                      <p className="text-[11px] text-(--text-muted)">Location: {vehicle.location}</p>
                      <button className="text-[11px] font-medium text-(--accent) hover:text-(--accent-cyan)">View details</button>
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
                    <p className="text-xs text-(--text-muted)">{vehicle.addedOn}</p>
                    <span
                      className={`inline-flex items-center rounded-full px-3 py-1 text-[11px] font-semibold ${getStatusClasses(
                        vehicle.status
                      )}`}
                    >
                      {vehicle.status}
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-end gap-2">
                    <button className="inline-flex items-center justify-center rounded-full border border-(--accent)/60 bg-(--accent)/10 px-3 py-1.5 text-xs font-semibold text-(--accent) hover:bg-(--accent-cyan) hover:border-transparent hover:text-slate-900 transition-all duration-500 cursor-pointer">
                      Update
                    </button>
                    <button className="inline-flex items-center justify-center rounded-full border border-rose-500/60 bg-rose-500/10 px-3 py-1.5 text-xs font-semibold text-rose-400 hover:bg-rose-500 hover:text-white transition-all duration-500 cursor-pointer">
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile cards */}
        <div className="space-y-4 md:hidden mt-4">
          {vehicles.map((vehicle) => (
            <div
              key={vehicle.id}
              className="rounded-2xl border border-white/10 bg-(--bg-secondary)/80 p-4 shadow-[0_16px_60px_rgba(0,0,0,0.55)] backdrop-blur-xl"
            >
              <div className="flex items-center gap-4 mb-3">
                <div className="h-14 w-20 overflow-hidden rounded-xl bg-black/30">
                  <img src={vehicle.thumb} alt={vehicle.name} className="h-full w-full object-cover" />
                </div>
                <div className="flex-1 space-y-0.5">
                  <p className="text-sm font-semibold text-(--text-primary)">{vehicle.name}</p>
                  <p className="text-[11px] text-(--text-muted)">
                    {vehicle.model} • {vehicle.category}
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
                  className={`inline-flex items-center rounded-full px-3 py-1 text-[11px] font-semibold ${getStatusClasses(
                    vehicle.status
                  )}`}
                >
                  {vehicle.status}
                </span>
              </div>

              <p className="mb-3 text-[11px] text-(--text-muted)">Added on {vehicle.addedOn}</p>

              <div className="flex items-center justify-between gap-2">
                <button className="text-xs font-medium text-(--accent) hover:text-(--accent-cyan)">View details</button>
                <div className="flex gap-2">
                  <button className="inline-flex items-center justify-center rounded-full border border-(--accent)/60 bg-(--accent)/10 px-3 py-1.5 text-xs font-semibold text-(--accent) hover:bg-(--accent) hover:text-slate-900 transition-all duration-150">
                    Update
                  </button>
                  <button className="inline-flex items-center justify-center rounded-full border border-rose-500/60 bg-rose-500/10 px-3 py-1.5 text-xs font-semibold text-rose-400 hover:bg-rose-500 hover:text-white transition-all duration-150">
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default MyVehicles;
