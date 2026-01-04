import React, { useEffect, useState, use } from 'react';
import { AuthContext } from '../../../context/AuthProvider';
import axiosPublic from '../../../api/axiosPublic';
import Spinner from '../../../utils/Spinner';
import { notifyError } from '../../../utils/toastService';
import { motion } from 'framer-motion';

import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { FiTruck, FiMapPin, FiActivity, FiLayers } from 'react-icons/fi';

const HostDashHome = () => {
  const { user, loading } = use(AuthContext);

  const [vehicles, setVehicles] = useState([]);
  const [dataLoading, setDataLoading] = useState(true);

  useEffect(() => {
    const loadVehicles = async () => {
      try {
        setDataLoading(true);
        const res = await axiosPublic.get('/vehicles');
        const all = Array.isArray(res?.data) ? res.data : [];
        const myVehicles = all.filter((v) => v?.userEmail === user?.email);
        setVehicles(myVehicles);
      } catch (err) {
        console.log(err);
        notifyError('⚠️ Failed to load vehicles.');
      } finally {
        setDataLoading(false);
      }
    };

    if (user?.email) loadVehicles();
  }, [user?.email]);

  if (loading || dataLoading) {
    return (
      <div className="min-h-[60vh] grid place-items-center">
        <Spinner />
      </div>
    );
  }

  const totalVehicles = vehicles.length;
  const availableCount = vehicles.filter((v) => v?.availability?.toLowerCase() === 'available').length;
  const unavailableCount = totalVehicles - availableCount;

  // ✅ chart always show: if no vehicles, show dummy slice
  const chartData =
    totalVehicles === 0
      ? [{ name: 'No Vehicles', value: 1 }]
      : [
          { name: 'Available', value: availableCount },
          { name: 'Unavailable', value: unavailableCount },
        ];

  const chartColors = totalVehicles === 0 ? ['rgba(148,163,184,0.35)'] : ['var(--accent-cyan)', 'var(--accent-purple)'];

  const recentVehicles = vehicles.slice(-3).reverse();

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header Section */}
      <div className="flex flex-col gap-1">
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-(--text-primary)">
          Host <span className="text-(--accent-cyan)">Overview</span>
        </h1>
        <p className="text-xs sm:text-sm text-(--text-muted) font-medium opacity-70">Manage and monitor your vehicle fleet activity.</p>
      </div>

      {/* Hero Stats Card */}
      <div className="relative overflow-hidden rounded-4xl border border-white/10 bg-linear-to-br from-(--bg-secondary)/40 to-(--bg-secondary)/10 backdrop-blur-xl p-5 sm:p-8 shadow-2xl">
        <div className="absolute -right-10 -top-10 h-28 w-28 sm:h-32 sm:w-32 rounded-full bg-(--accent-cyan)/10 blur-3xl" />

        <div className="relative z-10 flex items-center justify-between gap-4">
          <div>
            <p className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-(--text-muted) opacity-60">Fleet Summary</p>
            <h2 className="mt-2 text-4xl sm:text-5xl font-bold text-(--text-primary) tracking-tighter">
              {totalVehicles.toString().padStart(2, '0')}
            </h2>
            <p className="mt-2 text-xs sm:text-sm font-semibold text-(--accent-cyan) flex items-center gap-2">
              <FiActivity className="animate-pulse" /> Listed Vehicles
            </p>
          </div>

          <div className="hidden sm:grid place-items-center relative">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-0 rounded-3xl border border-dashed border-(--accent-cyan)/30 scale-125"
            />
            <div className="size-16 sm:size-20 rounded-3xl bg-linear-to-br from-(--accent-cyan)/20 to-(--accent-purple)/20 border border-white/10 shadow-inner grid place-items-center">
              <FiTruck className="text-(--accent-cyan) text-2xl sm:text-3xl" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5 sm:gap-6">
        {/* Availability Analytics Card */}
        <div className="lg:col-span-2 rounded-4xl border border-white/10 bg-(--bg-secondary)/30 backdrop-blur-md p-5 sm:p-6 shadow-xl">
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <h3 className="text-xs sm:text-sm font-bold uppercase tracking-widest text-(--text-primary) opacity-80">Vehicle Status</h3>
            <FiLayers className="text-(--text-muted) opacity-40" />
          </div>

          <div className="h-[220px] sm:h-[260px] w-full relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Tooltip
                  contentStyle={{
                    borderRadius: '16px',
                    backgroundColor: 'var(--bg-secondary)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    color: '#fff',
                  }}
                  itemStyle={{ fontSize: '12px', fontWeight: 'bold' }}
                />
                <Pie data={chartData} dataKey="value" nameKey="name" innerRadius={60} outerRadius={88} paddingAngle={8} stroke="none">
                  {chartData.map((_, i) => (
                    <Cell key={i} fill={chartColors[i % chartColors.length]} />
                  ))}
                </Pie>

                <Legend
                  iconType="circle"
                  wrapperStyle={{
                    fontSize: '11px',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>

            {/* center text */}
            <div className="pointer-events-none absolute inset-0 grid place-items-center">
              <div className="text-center">
                <p className="text-2xl sm:text-3xl font-bold text-(--text-primary)">{totalVehicles}</p>
                <p className="text-[10px] sm:text-[11px] font-bold text-(--text-muted) uppercase tracking-widest opacity-70">Vehicles</p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Vehicles Activity */}
        <div className="lg:col-span-3 rounded-4xl border border-white/10 bg-(--bg-secondary)/30 backdrop-blur-md p-5 sm:p-6 shadow-xl overflow-hidden">
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <div>
              <h3 className="text-xs sm:text-sm font-bold uppercase tracking-widest text-(--text-primary) opacity-80">Recent Additions</h3>
              <p className="text-[10px] text-(--text-muted) font-bold opacity-50 mt-1 uppercase tracking-tighter italic">Voyago Fleet</p>
            </div>

            <span className="text-[10px] font-bold py-1 px-3 bg-(--accent-cyan)/10 rounded-full border border-(--accent-cyan)/20 text-(--accent-cyan)">
              LATEST
            </span>
          </div>

          {recentVehicles.length === 0 ? (
            <div className="py-14 sm:py-20 text-center">
              <p className="text-xs sm:text-sm font-semibold text-(--text-muted) opacity-60 italic">No vehicles found in your fleet.</p>
            </div>
          ) : (
            <div className="flex flex-col gap-3 sm:gap-4">
              {recentVehicles.map((v) => (
                <div
                  key={v?._id}
                  className="
            group relative
            rounded-2xl border border-white/10 bg-white/3
            p-4 transition-all duration-300
            hover:bg-(--bg-secondary)/50 hover:border-(--accent-cyan)/30
            sm:hover:translate-x-1
          "
                >
                  {/* Side border on hover */}
                  <div className="absolute left-0 top-1/4 h-1/2 w-[3px] bg-linear-to-b from-(--accent-cyan) to-(--accent-purple) rounded-r-full opacity-0 group-hover:opacity-100 transition-opacity" />

                  {/* ✅ Mobile column, sm row */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    {/* Left */}
                    <div className="flex items-start sm:items-center gap-3 sm:gap-4 min-w-0">
                      <div className="size-10 sm:size-12 shrink-0 rounded-xl bg-(--bg-primary) border border-white/10 grid place-items-center font-bold text-(--accent-cyan)">
                        {v?.vehicleName?.charAt(0) || 'V'}
                      </div>

                      <div className="flex flex-col min-w-0">
                        <p className="text-sm sm:text-[15px] font-semibold text-(--text-primary) group-hover:text-(--accent-cyan) transition-colors tracking-tight truncate">
                          {v?.vehicleName || 'Vehicle Name'}
                        </p>

                        {/*  wrap + smaller text on mobile */}
                        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mt-1">
                          <p className="text-[10px] sm:text-[11px] text-(--text-muted) flex items-center gap-1 font-medium">
                            <FiMapPin size={12} className="text-(--accent-purple)" />
                            <span className="truncate max-w-[180px] sm:max-w-none">{v?.location || 'Unknown'}</span>
                          </p>

                          <span className="text-[10px] text-(--text-muted) opacity-40 font-bold hidden sm:inline">|</span>

                          <p className="text-[10px] text-(--text-muted) font-bold uppercase tracking-widest opacity-60">
                            {v?.fuelType || 'Fuel'}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Right */}
        
                    <div className="w-full sm:w-auto flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-2 border-t border-white/10 pt-3 sm:pt-0 sm:border-t-0">
                      <span
                        className={`px-3 sm:px-4 py-1.5 rounded-xl text-[10px] font-bold uppercase tracking-tighter border ${
                          v?.availability?.toLowerCase() === 'available'
                            ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20'
                            : 'bg-slate-500/10 text-slate-400 border-slate-500/20'
                        }`}
                      >
                        {v?.availability || 'N/A'}
                      </span>

                      <p className="text-[11px] sm:text-xs font-semibold text-(--text-primary) tracking-tight opacity-80 whitespace-nowrap">
                        ${v?.pricePerDay}/Day
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HostDashHome;
