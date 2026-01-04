import React, { useState, useContext } from 'react';
import Container from '../../components/container/Container';
import { AuthContext } from '../../context/AuthProvider';
import axios from 'axios';
import { notifyError, notifySuccess } from '../../utils/toastService';
import { Link, useNavigate } from 'react-router';
import previewCarImg from '../../assets/images/previewCar.jpg';
import Spinner from '../../utils/Spinner';

const AddVehicle = () => {
  const { user, loading: authLoading } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  if (authLoading || loading) {
    return (
      <div className="mt-20">
        <Spinner />
      </div>
    );
  }

  const { email, displayName } = user;

  const handleaAddVehicle = async (e) => {
    e.preventDefault();
    const form = e.target;

    const vehicleData = {
      vehicleName: form.name.value,
      vehicleModel: form.model.value,
      userEmail: email,
      ownerName: displayName,
      category: form.category.value,
      location: form.location.value,
      fuelType: form.fuelType.value,
      transmission: form.transmission.value,
      pricePerDay: form.price.value,
      seats: form.seat.value,
      coverImage: form.photoURL.value,
      availability: form.availability.value,
      description: form.description.value,
      features: form.features.value.split(',').map((f) => f.trim()),
      createdAt: new Date().toISOString(),
    };

    try {
      setLoading(true);
      await axios.post('https://voyago-server-side.vercel.app/vehicles', vehicleData);
      notifySuccess('Your vehicle is now live on Voyago! 🎉');
      form.reset();
      navigate('/dashboard/my-vehicles');
    } catch (err) {
      console.log(err);
      notifyError('Couldn’t add the vehicle. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="mt-6 mb-16 px-2 sm:px-3">
      <Container>
        {/* Header */}
        <div className="mb-6 flex flex-col lg:flex-row gap-4 items-center justify-between bg-(--accent-cyan)/10 rounded-2xl p-4">
          <div>
            <h2 className="text-lg sm:text-xl font-semibold text-(--text-primary)">
              Add a new vehicle
            </h2>
            <p className="text-xs sm:text-sm text-(--text-muted)">
              Fill in the details below to list your vehicle.
            </p>
          </div>

          <div className="text-xs sm:text-sm rounded-full bg-(--accent-cyan)/20 px-4 py-2 border border-white/10">
            Logged in as <span className="font-semibold">{email}</span>
          </div>
        </div>

        {/* MAIN CARD */}
        <div className="rounded-3xl bg-(--bg-secondary)/60 border border-white/10 backdrop-blur-xl p-4 sm:p-6 lg:p-8">
          <form onSubmit={handleaAddVehicle}>
            <div className="flex flex-col lg:flex-row gap-8">
              {/* LEFT */}
              <div className="flex-1 space-y-8">
                {/* Basic Info */}
                <div>
                  <h3 className="text-base font-semibold">Basic Vehicle Info</h3>

                  <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                    {[
                      ['Vehicle Name', 'name', 'Toyota'],
                      ['Model / Trim', 'model', 'Corolla Altis'],
                      ['Category', 'category', 'SUV, Sedan'],
                      ['Location', 'location', 'Los Angeles, CA'],
                      ['Fuel Type', 'fuelType', 'Hybrid, Petrol'],
                      ['Transmission', 'transmission', 'Automatic'],
                    ].map(([label, name, ph]) => (
                      <div key={name}>
                        <label className="text-xs text-(--text-muted)">{label}</label>
                        <input
                          name={name}
                          required
                          placeholder={ph}
                          className="mt-1 w-full rounded-xl bg-(--accent-cyan)/20 border border-white/10 px-4 py-2 text-sm"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Pricing */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-(--text-muted)">Price / Day</label>
                    <input name="price" type="number" required className="w-full rounded-xl bg-(--accent-cyan)/20 px-4 py-2 text-sm" placeholder='150$'/>
                  </div>
                  <div>
                    <label className="text-xs text-(--text-muted)">Seats</label>
                    <input name="seat" type="number" required className="w-full rounded-xl bg-(--accent-cyan)/20 px-4 py-2 text-sm" placeholder='6'/>
                  </div>
                </div>

                {/* Media + Description */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input name="photoURL" placeholder="Image URL" className="rounded-xl bg-(--accent-cyan)/20 px-4 py-2 text-sm" />
                  <input name="availability" placeholder="Available / Unavailable" className="rounded-xl bg-(--accent-cyan)/20 px-4 py-2 text-sm" />
                </div>

                <textarea
                  name="description"
                  rows={4}
                  placeholder="Vehicle description"
                  className="w-full rounded-2xl bg-(--accent-cyan)/20 px-4 py-3 text-sm"
                />

                <textarea
                  name="features"
                  rows={3}
                  placeholder="Bluetooth, Sunroof"
                  className="w-full rounded-2xl bg-(--accent-cyan)/20 px-4 py-3 text-sm"
                />
              </div>

              {/* RIGHT – mobile friendly */}
              <div className="w-full lg:w-[32%] space-y-5">
                <div className="rounded-2xl bg-(--accent-cyan)/15 p-4 border border-white/10">
                  <h4 className="text-sm font-semibold">Host Info</h4>
                  <p className="text-xs mt-1">{displayName}</p>
                  <p className="text-xs opacity-70">{email}</p>
                </div>

                <div className="rounded-2xl bg-(--accent-cyan)/15 p-4 border border-white/10">
                  <h4 className="text-sm font-semibold mb-2">Preview</h4>
                  <img src={previewCarImg} className="rounded-xl w-full h-40 object-cover" />
                </div>
              </div>
            </div>

            {/* ACTIONS */}
            <div className="mt-6 flex justify-end gap-3">
              <Link to="/dashboard/my-vehicles" className="px-6 py-2 rounded-full border text-sm">
                Cancel
              </Link>
              <button className="px-6 py-2 rounded-full bg-(--accent) text-white text-sm font-semibold">
                Add Vehicle
              </button>
            </div>
          </form>
        </div>
      </Container>
    </section>
  );
};

export default AddVehicle;
