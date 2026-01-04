import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../context/AuthProvider';
import axiosPublic from '../../../api/axiosPublic';
import Spinner from '../../../utils/Spinner';
import { notifyError, notifySuccess } from '../../../utils/toastService';
import { FiUser, FiMail, FiImage, FiSave, FiCamera } from 'react-icons/fi';
import { motion } from 'framer-motion';
import avatar from '../../../assets/images/avater.png';

const MyProfile = () => {
  const { user, loading } = useContext(AuthContext);
  const [profile, setProfile] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!user?.email) return;

    axiosPublic
      .get(`/users/${user.email}`)
      .then((res) => setProfile(res.data))
      .catch((err) => {
        console.log(err);
        notifyError('Failed to load profile');
      });
  }, [user?.email]);

  const avatarSrc = profile?.photoURL && profile.photoURL.startsWith('http') ? profile.photoURL : avatar;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      await axiosPublic.patch(`/users/${profile._id}`, {
        name: profile.name,
        photoURL: profile.photoURL,
      });
      notifySuccess('Profile updated successfully');
    } catch (err) {
      notifyError('Update failed');
      console.log(err);
    } finally {
      setSaving(false);
    }
  };

  if (loading || !profile) {
    return (
      <div className="min-h-[60vh] grid place-items-center">
        <Spinner />
      </div>
    );
  }

  // Common border class for light/dark mode visibility
  const dynamicBorder = 'border border-slate-200 dark:border-white/10';
  const dynamicInput =
    'w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-4 sm:px-5 py-3 text-sm focus:outline-none focus:border-(--accent-cyan)/50 dark:focus:border-(--accent-cyan)/40 transition-all';

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full max-w-4xl mx-auto"
    >
      {/* Header */}
      <div className="mb-6 sm:mb-8 text-center md:text-left">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-black tracking-tight text-(--text-primary)">
          Account <span className="text-(--accent-cyan)">Settings</span>
        </h1>
        <p className="text-xs sm:text-sm text-(--text-muted) opacity-80 mt-1 font-medium">
          Manage your public profile and account information.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6">
        {/* Left Column (Avatar Card) */}
        <div className="lg:col-span-4 flex flex-col gap-5">
          <div
            className={`rounded-4xl ${dynamicBorder} bg-(--bg-secondary)/10 dark:bg-(--bg-secondary)/30 backdrop-blur-md p-6 sm:p-8 text-center shadow-xl`}
          >
            <div className="relative inline-block group">
              <div className="size-24 sm:size-28 md:size-32 rounded-full p-1 bg-linear-to-tr from-(--accent-cyan) to-(--accent-purple) shadow-lg shadow-(--accent-cyan)/20">
                <img src={avatarSrc} alt="Profile" className="w-full h-full rounded-full object-cover border-4 border-(--bg-primary)" />
              </div>

              <div className="absolute bottom-1 right-1 size-8 sm:size-9 rounded-full bg-(--bg-secondary) border border-slate-200 dark:border-white/10 grid place-items-center text-(--accent-cyan) shadow-lg">
                <FiCamera size={16} />
              </div>
            </div>

            <div className="mt-5">
              <h3 className="text-base sm:text-lg font-black text-(--text-primary) truncate">{profile.name}</h3>
              <p className="text-[11px] sm:text-xs text-(--text-muted) font-bold opacity-70 truncate mt-0.5">{profile.email}</p>
            </div>
          </div>

          <div className={`hidden lg:block rounded-3xl ${dynamicBorder} bg-linear-to-br from-(--accent-cyan)/5 to-transparent p-5`}>
            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-(--accent-cyan) mb-2">Security Tip</h4>
            <p className="text-xs text-(--text-muted) font-medium leading-relaxed italic">
              Keep your profile image updated to maintain a trusted presence on Voyago.
            </p>
          </div>
        </div>

        {/* Right Column */}
        <div
          className={`lg:col-span-8 rounded-4xl ${dynamicBorder} bg-(--bg-secondary)/5 dark:bg-(--bg-secondary)/20 backdrop-blur-xl p-5 sm:p-10 shadow-2xl`}
        >
          <div className="space-y-6">
            {/* Name */}
            <div className="space-y-2">
              <label className="text-[11px] font-black uppercase tracking-widest text-(--text-muted) flex items-center gap-2 ml-1">
                <FiUser className="text-(--accent-cyan)" /> Full Name
              </label>
              <input
                type="text"
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                className={dynamicInput}
                placeholder="Ex: Mahdi Hasan"
              />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label className="text-[11px] font-black uppercase tracking-widest text-(--text-muted) flex items-center gap-2 ml-1 opacity-60">
                <FiMail className="text-(--accent-purple)" /> Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={profile.email}
                  readOnly
                  className="w-full bg-slate-100/50 dark:bg-white/3 border border-slate-200 dark:border-white/5 rounded-xl px-4 sm:px-5 py-3 text-sm text-(--text-muted) cursor-not-allowed italic"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[9px] font-bold text-emerald-500 uppercase tracking-tighter">
                  Verified
                </span>
              </div>
            </div>

            {/* Photo URL */}
            <div className="space-y-2">
              <label className="text-[11px] font-black uppercase tracking-widest text-(--text-muted) flex items-center gap-2 ml-1">
                <FiImage className="text-(--accent-cyan)" /> Profile Image URL
              </label>
              <input
                type="text"
                value={profile.photoURL || ''}
                onChange={(e) => setProfile({ ...profile, photoURL: e.target.value })}
                className={dynamicInput}
                placeholder="https://example.com/avatar.jpg"
              />
            </div>

            {/* Save Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={saving}
                className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-linear-to-r from-(--accent-cyan) to-(--accent-purple) text-white font-black text-xs sm:text-sm tracking-widest shadow-xl shadow-(--accent-cyan)/20 hover:scale-[1.03] active:scale-95 transition-all disabled:opacity-50 cursor-pointer"
              >
                {saving ? (
                  <span className="loading loading-spinner loading-sm"></span>
                ) : (
                  <>
                    <FiSave size={18} />
                    SAVE CHANGES
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </form>
    </motion.div>
  );
};

export default MyProfile;
