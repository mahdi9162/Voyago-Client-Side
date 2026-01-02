import React, { use } from 'react';
import useVehicles from '../../../hooks/useVehicles';
import Container from '../../../components/container/Container';
import VehicleCard from './VehicleCard';
import { Link } from 'react-router';
import { ThemeContext } from '../../../context/ThemeProvider';
import Spinner from '../../../utils/Spinner';
import { Element } from 'react-scroll';

const TopNewArrivals = () => {
  const { theme } = use(ThemeContext);
  const { vehicles, loading, error } = useVehicles('https://voyago-server-side.vercel.app/latest-vehicles/');
  const latestVehicles = vehicles.data;

  if (loading) {
    return (
      <div className="mt-20">
        <Spinner></Spinner>
      </div>
    );
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <Element name="top-arrivals">
      <section className="my-10 lg:my-20 px-3 lg:px-0">
        <Container>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-(--text-primary)">Top New Arrivals</h2>

            <Link to="/all-vehicles" className={theme === 'dark' ? 'dark-view' : 'light-view'}>
              View all
            </Link>
          </div>

          <div className="grid gap-4 sm:gap-5 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {latestVehicles.map((vehicle, i) => (
              <VehicleCard key={vehicle._id} vehicle={vehicle} index={i} />
            ))}
          </div>
        </Container>
      </section>
    </Element>
  );
};

export default TopNewArrivals;
