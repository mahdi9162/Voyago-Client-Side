import React, { useEffect, useState, use } from 'react';
import { AuthContext } from '../../../context/AuthProvider';
import Spinner from '../../../utils/Spinner';
import { notifyError } from '../../../utils/toastService';
import axiosPublic from '../../../api/axiosPublic';
import { motion } from 'framer-motion';

import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { FiPackage, FiMapPin, FiCalendar, FiActivity } from 'react-icons/fi';

const UserDashHome = () => {
  const { user, loading } = use(AuthContext);

  const [bookings, setBookings] = useState([]);
  const [dataLoading, setDataLoading] = useState(true);

  useEffect(() => {
    const loadBookings = async () => {
      try {
        setDataLoading(true);
        const res = await axiosPublic.get(`/bookings?email=${user?.email}`);
        const data = Array.isArray(res?.data) ? res.data : [];
        setBookings(data);
      } catch (err) {
        console.log(err);
        notifyError('⚠️ Failed to load bookings.');
      } finally {
        setDataLoading(false);
      }
    };

    if (user?.email) loadBookings();
  }, [user?.email]);

  if (loading || dataLoading) {
    return (
      <div className="min-h-[60vh] grid place-items-center">
        <Spinner />
      </div>
    );
  }

  const total = bookings.length;
  const recent = bookings.slice(-3).reverse();

  const chartData = [{ name: 'Total Bookings', value: total }];
  const chartColor = 'var(--accent-cyan)';

  const getStatusStyle = (status) => {
    const s = String(status || '').toLowerCase();
    if (s === 'requested' || s === 'pending') return 'bg-amber-500/10 text-amber-500 border-amber-500/20';
    if (s === 'approved' || s === 'confirmed') return 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20';
    return 'bg-slate-500/10 text-slate-400 border-slate-500/20';
  };

  return (
    <div className="space-y-6 sm:space-y-7 md:space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header */}
      <div className="flex flex-col gap-1">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight text-(--text-primary)">
          Welcome back, <span className="text-(--accent-cyan)">{user?.displayName?.split(' ')[0] || 'User'}</span>
        </h1>
        <p className="text-xs sm:text-sm text-(--text-muted) font-medium opacity-70">Here's a quick look at your booking activity.</p>
      </div>

      {/* Summary */}
      <div className="relative overflow-hidden rounded-[1.75rem] sm:rounded-4xl border border-white/10 bg-linear-to-br from-(--bg-secondary)/40 to-(--bg-secondary)/10 backdrop-blur-xl p-5 sm:p-6 md:p-8 shadow-xl">
        <div className="absolute -right-10 -top-10 h-28 w-28 sm:h-32 sm:w-32 rounded-full bg-(--accent-cyan)/10 blur-3xl" />

        <div className="relative z-10 flex items-center justify-between gap-4">
          <div>
            <p className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.18em] text-(--text-muted) opacity-60">Insight Summary</p>

            {/* number big, but responsive */}
            <h2 className="mt-2 text-3xl sm:text-4xl md:text-5xl font-black text-(--text-primary) tracking-tighter leading-none">
              {total.toString().padStart(2, '0')}
            </h2>

            <p className="mt-2 text-xs sm:text-sm font-bold text-(--accent-cyan) flex items-center gap-2">
              <FiActivity className="animate-pulse" /> Total Active Bookings
            </p>
          </div>

          {/* Cube */}
          <div className="hidden sm:grid place-items-center relative">
            {/* 1. Background Glow */}
            <div className="absolute inset-0 bg-(--accent-cyan)/10 blur-2xl rounded-full animate-pulse" />

            {/* 2. 3D Container */}
            <motion.div
              animate={{
                y: [0, -12, 0],
                rotateX: [0, 10, 0],
                rotateY: [0, 25, 0],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="relative z-10 size-20 preserve-3d group"
            >
              {/* 3. animated Cube Layers */}
              <div className="absolute inset-0 rounded-3xl bg-linear-to-br from-(--accent-cyan)/20 to-(--accent-purple)/30 border border-white/20 backdrop-blur-md shadow-[inset_0_0_20px_rgba(255,255,255,0.1)] transition-all duration-500 group-hover:scale-110 group-hover:border-(--accent-cyan)/50">
                {/* 4. Shine Effect */}
                <motion.div
                  animate={{
                    left: ['-100%', '200%'],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: 'linear',
                    repeatDelay: 1,
                  }}
                  className="absolute inset-0 w-1/2 h-full bg-linear-to-r from-transparent via-white/20 to-transparent -skew-x-12"
                />

                {/* 5. Center Icon with Pulsing Effect */}
                <div className="grid place-items-center h-full">
                  <motion.div
                    animate={{
                      scale: [1, 1.15, 1],
                      opacity: [0.8, 1, 0.8],
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    <FiPackage className="text-(--accent-cyan) text-4xl drop-shadow-[0_0_15px_rgba(34,211,238,0.8)]" />
                  </motion.div>
                </div>
              </div>

              {/* 6. Bottom Shadow */}
              <motion.div
                animate={{
                  scale: [0.8, 1.1, 0.8],
                  opacity: [0.2, 0.4, 0.2],
                }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-12 h-2 bg-black/40 blur-md rounded-full"
              />
            </motion.div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 sm:gap-5 md:gap-6">
        {/* Chart */}
        <div className="lg:col-span-2 rounded-[1.75rem] sm:rounded-4xl border border-white/10 bg-(--bg-secondary)/30 backdrop-blur-md p-4 sm:p-5 md:p-6 shadow-lg">
          <div className="flex items-center justify-between mb-4 sm:mb-5 md:mb-6">
            <h3 className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-(--text-primary) opacity-80">Activity Ratio</h3>
            <div className="size-2 rounded-full bg-(--accent-cyan) shadow-[0_0_10px_var(--accent-cyan)]" />
          </div>

          {total === 0 ? (
            <div className="h-[220px] sm:h-60 grid place-items-center text-xs sm:text-sm font-semibold text-(--text-muted) italic">
              No data available
            </div>
          ) : (
            <div className="h-[220px] sm:h-60 md:h-[260px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Tooltip
                    contentStyle={{
                      borderRadius: '14px',
                      backgroundColor: 'var(--bg-secondary)',
                      border: '1px solid rgba(255,255,255,0.10)',
                      color: '#fff',
                    }}
                    itemStyle={{ color: 'var(--text-primary)', fontSize: '12px', fontWeight: 700 }}
                  />
                  <Pie data={chartData} dataKey="value" nameKey="name" innerRadius={58} outerRadius={84} paddingAngle={5} stroke="none">
                    <Cell fill={chartColor} />
                  </Pie>
                  <Legend
                    iconType="circle"
                    wrapperStyle={{
                      fontSize: '11px',
                      fontWeight: 800,
                      textTransform: 'uppercase',
                      letterSpacing: '1px',
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>

        {/* Recent */}
        <div className="lg:col-span-3 rounded-[1.75rem] sm:rounded-4xl border border-white/10 bg-(--bg-secondary)/30 backdrop-blur-md p-4 sm:p-5 md:p-6 shadow-lg">
          <div className="flex items-center justify-between mb-4 sm:mb-5 md:mb-6">
            <h3 className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-(--text-primary) opacity-80">
              Recent Activity
            </h3>
            <span className="text-[9px] sm:text-[10px] font-extrabold py-1 px-3 bg-white/5 rounded-full border border-white/10 text-(--text-muted)">
              HISTORY
            </span>
          </div>

          {recent.length === 0 ? (
            <div className="py-14 sm:py-20 text-center text-xs sm:text-sm font-semibold text-(--text-muted) opacity-50">
              Start your first journey today!
            </div>
          ) : (
            <div className="space-y-3 sm:space-y-4">
              {recent.map((b) => (
                <div
                  key={b?._id}
                  className="group flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 rounded-2xl border border-white/5 bg-white/3 p-3 sm:p-4 hover:bg-white/[0.07] hover:border-white/10 transition-all duration-300 shadow-sm"
                >
                  <div className="space-y-2 sm:space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-(--accent-cyan)/10 text-(--accent-cyan)">
                        <FiMapPin size={14} />
                      </div>
                      <span className="text-[11px] sm:text-xs font-semibold text-(--text-primary) tracking-tight">
                        {b?.pickupLocation || 'Main Terminal'}
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-(--accent-purple)/10 text-(--accent-purple)">
                        <FiCalendar size={14} />
                      </div>
                      <span className="text-[10px] sm:text-[11px] font-semibold text-(--text-muted)">{b?.tripStartDate || 'N/A'}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:flex-col sm:items-end gap-2 border-t sm:border-t-0 border-white/5 pt-3 sm:pt-0">
                    <span
                      className={`px-3 sm:px-4 py-1.5 rounded-xl text-[9px] sm:text-[10px] font-extrabold uppercase tracking-tighter border ${getStatusStyle(
                        b?.status
                      )}`}
                    >
                      {b?.status || 'PENDING'}
                    </span>

                    <div className="flex items-baseline gap-1">
                      <span className="text-base sm:text-lg font-bold text-(--text-primary)">${b?.perDayCost ?? '-'}</span>
                      <span className="text-[9px] sm:text-[10px] font-semibold text-(--text-muted) opacity-60">/DAY</span>
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

export default UserDashHome;
