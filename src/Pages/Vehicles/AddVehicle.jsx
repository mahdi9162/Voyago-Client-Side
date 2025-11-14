import React, { use, useState } from 'react';
import Container from '../../components/container/Container';
import { AuthContext } from '../../context/AuthProvider';
import axios from 'axios';
import { notifyError, notifySuccess } from '../../utils/toastService';
import { Link, useNavigate } from 'react-router';
import previewCarImg from '../../assets/images/previewCar.jpg';

const AddVehicle = () => {
  const { user, loading: authLoading } = use(AuthContext);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  if (authLoading) {
    return;
  }

  if (loading) {
    return;
  }

  const { email, displayName } = user;

  const handleaAddVehicle = async (e) => {
    e.preventDefault();
    const form = e.target;

    // Form Data
    const vehicleName = form.name.value;
    const vehicleModel = form.model.value;
    const userEmail = email;
    const ownerName = displayName;
    const category = form.category.value;
    const location = form.location.value;
    const fuelType = form.fuelType.value;
    const transmission = form.transmission.value;
    const pricePerDay = form.price.value;
    const seats = form.seat.value;
    const coverImage = form.photoURL.value;
    const availability = form.availability.value;
    const description = form.description.value;
    const features = form.features.value.split(',').map((feature) => feature.trim());
    const createdAt = new Date().toISOString();

    // Object Data
    const vehicleData = {
      vehicleName,
      vehicleModel,
      userEmail,
      ownerName,
      category,
      location,
      fuelType,
      transmission,
      pricePerDay,
      seats,
      coverImage,
      availability,
      description,
      features,
      createdAt,
    };

    try {
      const response = await axios.post('http://localhost:3000/vehicles', vehicleData);
      setLoading(true);
      notifySuccess('Your vehicle is now live on Voyago! 🎉');
      form.reset();
      navigate('/my-vehicles');
    } catch (error) {
      notifyError('Couldn’t add the vehicle. Please try again.');
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section className="mt-10 mb-20 px-3 lg:px-0">
        <Container>
          {/* Header */}
          <div className="mb-10 flex flex-col lg:flex-row text-center lg:text-left items-center bg-accent/10 rounded-2xl p-4 justify-between gap-4">
            <div>
              <h2 className="text-2xl md:text-4xl font-semibold text-(--text-primary)">Add a new vehicle</h2>
              <p className="mt-1 text-xs md:text-base text-(--text-muted)">Fill in the details below to list your vehicle on Voyago.</p>
            </div>

            <div className="flex items-center gap-2 rounded-full bg-(--accent-cyan)/20 px-4 py-2 text-xs md:text-sm text-(--text-muted) border border-white/10">
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-(--accent)/20 text-(--accent) text-xs font-semibold">
                •
              </span>
              <span className="font-medium text-(--text-primary)">Logged in as</span>
              <span className="text-xs md:text-sm text-(--text-muted)">{email}</span>
            </div>
          </div>

          {/* Main glass panel */}
          <div
            className="
        rounded-3xl border border-cyan-400/20
        bg-(--bg-secondary)/80
        shadow-[0_0_0_1px_rgba(15,23,42,0.75),0_40px_120px_rgba(0,0,0,0.85)]
        backdrop-blur-2xl
        px-6 py-8 md:px-10 md:py-10
      "
          >
            {/* Form */}
            <form onSubmit={handleaAddVehicle}>
              <div className="flex flex-col lg:flex-row gap-10 lg:gap-12">
                {/* LEFT: Form side */}
                <div className="flex-1 space-y-10">
                  {/* Basic Vehicle Info */}
                  <div>
                    <h3 className="text-lg font-semibold text-(--text-primary)">Basic Vehicle Info</h3>
                    <p className="text-xs md:text-sm text-(--text-muted) mt-1">Provide the essential details of the vehicle.</p>

                    <div className="mt-5 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                      <div className="space-y-1">
                        <label className="text-xs uppercase tracking-wide text-(--text-muted)">Vehicle Name *</label>
                        <input
                          className="w-full rounded-xl bg-(--accent-cyan)/20 border border-white/10 px-4 py-2.5 text-sm text-(--text-primary) placeholder:text-(--text-muted) focus:outline-none focus:ring-2 focus:ring-(--accent)/70 focus:border-(--accent)"
                          placeholder="e.g. Toyota"
                          type="text"
                          name="name"
                          required
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs uppercase tracking-wide text-(--text-muted)">Model / Trim *</label>
                        <input
                          className="w-full rounded-xl bg-(--accent-cyan)/20 border border-white/10 px-4 py-2.5 text-sm text-(--text-primary) placeholder:text-(--text-muted) focus:outline-none focus:ring-2 focus:ring-(--accent)/70 focus:border-(--accent)"
                          placeholder="Corolla Altis"
                          type="text"
                          name="model"
                          required
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs uppercase tracking-wide text-(--text-muted)">Category *</label>
                        <input
                          className="w-full rounded-xl bg-(--accent-cyan)/20 border border-white/10 px-4 py-2.5 text-sm text-(--text-primary) placeholder:text-(--text-muted) focus:outline-none focus:ring-2 focus:ring-(--accent)/70 focus:border-(--accent)"
                          placeholder="SUV, Sedan, Electric..."
                          type="text"
                          name="category"
                          required
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs uppercase tracking-wide text-(--text-muted)">Location *</label>
                        <input
                          className="w-full rounded-xl bg-(--accent-cyan)/20 border border-white/10 px-4 py-2.5 text-sm text-(--text-primary) placeholder:text-(--text-muted) focus:outline-none focus:ring-2 focus:ring-(--accent)/70 focus:border-(--accent)"
                          placeholder="Los Angeles, CA"
                          type="text"
                          name="location"
                          required
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs uppercase tracking-wide text-(--text-muted)">Fuel Type</label>
                        <input
                          className="w-full rounded-xl bg-(--accent-cyan)/20 border border-white/10 px-4 py-2.5 text-sm text-(--text-primary) placeholder:text-(--text-muted) focus:outline-none focus:ring-2 focus:ring-(--accent)/70 focus:border-(--accent)"
                          placeholder="Hybrid, Petrol, Electric..."
                          type="text"
                          name="fuelType"
                          required
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs uppercase tracking-wide text-(--text-muted)">Transmission</label>
                        <input
                          className="w-full rounded-xl bg-(--accent-cyan)/20 border border-white/10 px-4 py-2.5 text-sm text-(--text-primary) placeholder:text-(--text-muted) focus:outline-none focus:ring-2 focus:ring-(--accent)/70 focus:border-(--accent)"
                          placeholder="Automatic / Manual"
                          type="text"
                          name="transmission"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {/* Pricing & specs */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-sm font-semibold text-(--text-primary)">Pricing & Capacity</h4>
                      <div className="mt-3 grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-xs uppercase tracking-wide text-(--text-muted)">Price per day (USD)</label>
                          <input
                            className="w-full rounded-xl bg-(--accent-cyan)/20 border border-white/10 px-4 py-2.5 text-sm text-(--text-primary) placeholder:text-(--text-muted) focus:outline-none focus:ring-2 focus:ring-(--accent)/70 focus:border-(--accent)"
                            placeholder="120"
                            type="number"
                            name="price"
                            required
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-xs uppercase tracking-wide text-(--text-muted)">Seats</label>
                          <input
                            className="w-full rounded-xl bg-(--accent-cyan)/20 border border-white/10 px-4 py-2.5 text-sm text-(--text-primary) placeholder:text-(--text-muted) focus:outline-none focus:ring-2 focus:ring-(--accent)/70 focus:border-(--accent)"
                            placeholder="5"
                            type="number"
                            name="seat"
                            required
                          />
                        </div>
                      </div>

                      <div className="mt-4 space-y-1">
                        <label className="text-xs uppercase tracking-wide text-(--text-muted)">Availability</label>
                        <input
                          className="w-full rounded-xl bg-(--accent-cyan)/20 border border-white/10 px-4 py-2.5 text-sm text-(--text-primary) placeholder:text-(--text-muted) focus:outline-none focus:ring-2 focus:ring-(--accent)/70 focus:border-(--accent)"
                          placeholder="Available / Unavailable"
                          type="text"
                          name="availability"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-semibold text-(--text-primary)">Media</h4>
                      <div className="mt-3 space-y-1">
                        <label className="text-xs uppercase tracking-wide text-(--text-muted)">Cover Image URL</label>
                        <input
                          className="w-full rounded-xl bg-(--accent-cyan)/20 border border-white/10 px-4 py-2.5 text-sm text-(--text-primary) placeholder:text-(--text-muted) focus:outline-none focus:ring-2 focus:ring-(--accent)/70 focus:border-(--accent)"
                          placeholder="https://..."
                          type="text"
                          name="photoURL"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-sm font-semibold text-(--text-primary)">Description</h4>
                      <p className="text-xs text-(--text-muted) mt-1">Write a short description of the vehicle.</p>
                      <textarea
                        rows={4}
                        className="mt-3 w-full rounded-2xl bg-(--accent-cyan)/20 border border-white/10 px-4 py-3 text-sm text-(--text-primary) placeholder:text-(--text-muted) resize-none focus:outline-none focus:ring-2 focus:ring-(--accent)/70 focus:border-(--accent)"
                        placeholder="E.g. Smooth hybrid sedan, perfect for city trips and weekend getaways."
                        name="description"
                        required
                      />
                    </div>
                    {/* Key Features */}
                    <div>
                      <h4 className="text-sm font-semibold text-(--text-primary)">Key Features</h4>
                      <p className="text-xs text-(--text-muted) mt-1">Comma separated features (e.g. Bluetooth, Sport Mode).</p>
                      <textarea
                        rows={4}
                        className="mt-3 w-full rounded-2xl bg-(--accent-cyan)/20 border border-white/10 px-4 py-3 text-sm text-(--text-primary) placeholder:text-(--text-muted) resize-none focus:outline-none focus:ring-2 focus:ring-(--accent)/70 focus:border-(--accent)"
                        placeholder="Premium audio, Sunroof, Wireless CarPlay"
                        name="features"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* RIGHT: Host + Preview */}
                <div className="w-full lg:w-[32%] space-y-6">
                  {/* Host info */}
                  <div className="rounded-2xl border border-white/10 bg-(--accent-cyan)/20 px-5 py-4 shadow-lg">
                    <h3 className="text-sm font-semibold text-(--text-primary)">Host Info</h3>
                    <p className="mt-1 text-xs text-(--text-muted)">These details are pulled from your account.</p>

                    <div className="mt-4 space-y-1 text-sm">
                      <p>
                        <span className="font-medium text-(--text-primary)">Owner:</span>{' '}
                        <span className="text-(--text-muted)">{displayName}</span>
                      </p>
                      <p>
                        <span className="font-medium text-(--text-primary)">Email:</span>{' '}
                        <span className="text-(--text-muted)">{email}</span>
                      </p>
                    </div>
                  </div>

                  {/* Preview card */}
                  <div className="rounded-2xl border border-white/10 bg-(--accent-cyan)/20 px-5 py-5 shadow-lg">
                    <h3 className="text-sm font-semibold text-(--text-primary)">Preview Card</h3>

                    <div className="mt-3 overflow-hidden rounded-2xl bg-black/40">
                      <img src={previewCarImg} alt="Vehicle preview" className="h-40 w-full object-cover" />
                    </div>

                    <div className="mt-4 space-y-1 text-sm">
                      <p className="font-semibold text-(--text-primary)">Tesla Model 3 Long-Range</p>
                      <p className="text-xs text-(--text-muted)">Los Angeles, CA • Electric • $120/day</p>
                      <p className="text-xs text-(--text-muted)/70 mt-4">* This is how your vehicle will appear on Voyago.</p>
                    </div>
                  </div>
                </div>
              </div>
              {/* Buttons */}
              <div className="mt-8 flex items-center justify-end gap-4">
                <Link
                  to="/my-vehicles"
                  type="button"
                  className="rounded-full border bg-(--accent-cyan)/20 px-6 py-2.5 text-sm font-medium text-(--text-muted) hover:bg-red-400 hover:text-white transition cursor-pointer"
                >
                  Cancel
                </Link>
                <button className="rounded-full bg-(--accent) px-7 py-2.5 text-sm font-semibold text-white shadow-[0_18px_60px_rgba(34,211,238,0.7)] hover:bg-(--accent-cyan) transition active:scale-95 cursor-pointer">
                  Add Vehicle
                </button>
              </div>
            </form>
          </div>
        </Container>
      </section>
    </>
  );
};

export default AddVehicle;
