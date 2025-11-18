import React, { useEffect, useState } from 'react';
import Container from '../../components/container/Container';
import useVehicles from '../../hooks/useVehicles';
import VehicleCard from '../Home/Sections/VehicleCard';
import Spinner from '../../utils/Spinner';

// Categories
const categoryOptions = ['All', 'SUV', 'Sedan', 'Electric', 'Van'];
const locationOptions = ['All cities', 'Los Angeles, CA', 'Austin, TX', 'Chicago, IL'];
const SORT = {
  LOW_TO_HIGH: 'LOW_TO_HIGH',
  HIGH_TO_LOW: 'HIGH_TO_LOW',
};

const AllVehicles = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedLocation, setSelectedLocation] = useState('All cities');
  const [sortByPrice, setSortByPrice] = useState(SORT.LOW_TO_HIGH);

  const { vehicles, loading, error } = useVehicles('https://voyago-server-side.vercel.app/vehicles');
  const allVehicles = vehicles.data || [];

  // 🔹 Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 6;

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, selectedLocation, sortByPrice]);

  if (loading) {
    return (
      <div className="mt-20">
        <Spinner></Spinner>
      </div>
    );
  }
  if (error) {
    return <p className="text-center text-red-500 py-20">{error}</p>;
  }

  // Category Function
  const filteredVehicles = allVehicles.filter((vehicle) => {
    // Category Filter
    const categoryFilter = selectedCategory === 'All' ? true : vehicle.category.toLowerCase() === selectedCategory.toLowerCase();

    // Location Filter
    const locationFilter = selectedLocation === 'All cities' ? true : vehicle.location.toLowerCase() === selectedLocation.toLowerCase();

    return categoryFilter && locationFilter;
  });

  //   Sort Function
  const sortedVehicles = [...filteredVehicles].sort((a, b) => {
    const priceA = a.pricePerDay;
    const priceB = b.pricePerDay;

    if (sortByPrice === SORT.LOW_TO_HIGH) {
      return priceA - priceB;
    } else {
      return priceB - priceA;
    }
  });

  // Pagination start
  const totalPages = Math.ceil(sortedVehicles.length / pageSize);

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  const currentVehicles = sortedVehicles.slice(startIndex, endIndex);
  // Pagination end

  return (
    <section className="my-6 md:my-10 lg:my-20 px-3 lg:px-0">
      <Container>
        {/* Page header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3 mb-8">
          <div>
            <h1 className="text-2xl md:text-4xl font-semibold text-(--text-primary)">All Vehicles</h1>
            <p className="text-sm md:text-base text-(--text-muted)">Browse and compare every ride available on Voyago.</p>
          </div>
        </div>

        {/* Filter & Sort bar */}
        <div className="bg-(--bg-secondary)/70 border border-white/10 rounded-2xl backdrop-blur-xl px-4 py-3 md:px-6 md:py-4 mb-4 flex flex-wrap items-center gap-6">
          {/* Category pills */}
          <div className="flex flex-col gap-2">
            <span className="text-xs font-medium uppercase tracking-wide text-(--text-muted)">Category</span>
            <div className="inline-flex items-center gap-1 bg-black/10 rounded-full px-1 py-1 border border-white/10">
              {categoryOptions.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 cursor-pointer md:px-4 py-1.5 text-xs md:text-sm rounded-full transition-all ${
                    selectedCategory === cat
                      ? 'bg-(--accent-cyan) text-black font-semibold shadow-[0_10px_30px_rgba(34,211,238,0.6)]'
                      : 'text-(--text-muted) hover:text-(--text-primary)'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Location pills */}
          <div className="flex flex-col gap-2">
            <span className="text-xs font-medium uppercase tracking-wide text-(--text-muted)">Location</span>
            <div className="inline-flex flex-wrap md:flex-nowrap items-center gap-1 bg-black/10 rounded-2xl md:rounded-full px-4 md:px-1 py-4 md:py-1 border border-white/10">
              {locationOptions.map((loc) => (
                <button
                  key={loc}
                  type="button"
                  onClick={() => setSelectedLocation(loc)}
                  className={`px-3 md:px-4 py-1.5 cursor-pointer text-xs md:text-sm rounded-full transition-all text-left ${
                    selectedLocation === loc
                      ? 'bg-(--accent-cyan) text-black font-semibold'
                      : 'text-(--text-muted) hover:text-(--text-primary)'
                  }`}
                >
                  {loc === 'All cities' ? (
                    <span className="inline-flex items-center gap-1">
                      <span className="text-lg">📍</span>
                      <span>{loc}</span>
                    </span>
                  ) : (
                    loc
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Sort by price toggle */}
          <div className="flex flex-col gap-2">
            <span className="text-xs font-medium uppercase tracking-wide text-(--text-muted)">Sort by</span>
            <div className="inline-flex items-center bg-black/10 rounded-full p-1 border border-white/10">
              <button
                type="button"
                onClick={() => setSortByPrice(SORT.LOW_TO_HIGH)}
                className={`px-4 py-1.5 text-xs md:text-sm cursor-pointer rounded-full transition-all ${
                  sortByPrice === SORT.LOW_TO_HIGH
                    ? 'bg-(--accent-cyan) text-black font-semibold shadow-[0_10px_30px_rgba(34,211,238,0.6)]'
                    : 'text-(--text-muted) hover:text-(--text-primary)'
                }`}
              >
                Price: Low → High
              </button>
              <button
                type="button"
                onClick={() => setSortByPrice(SORT.HIGH_TO_LOW)}
                className={`px-4 py-1.5 text-xs cursor-pointer md:text-sm rounded-full transition-all ${
                  sortByPrice === SORT.HIGH_TO_LOW
                    ? 'bg-(--accent-cyan) text-black font-semibold shadow-[0_10px_30px_rgba(34,211,238,0.6)]'
                    : 'text-(--text-muted) hover:text-(--text-primary)'
                }`}
              >
                Price: High → Low
              </button>
            </div>
          </div>
        </div>

        {/* Total Vehicles */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-6 text-xs md:text-sm text-(--text-muted)">
          <p>Showing {filteredVehicles.length} vehicles</p>
          <p>
            Filters: {selectedCategory} · {selectedLocation} ·{' '}
            {sortByPrice === SORT.LOW_TO_HIGH ? 'Price: Low → High' : 'Price: High → Low'}
          </p>
        </div>
        <div className="grid gap-4 sm:gap-5 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {currentVehicles.map((vehicle) => (
            <VehicleCard key={vehicle._id} vehicle={vehicle}></VehicleCard>
          ))}
        </div>

        {/* Pagination start */}
        <div className="flex items-center justify-center gap-2 mt-8">
          {/* Prev */}
          <button
            type="button"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 cursor-pointer py-1.5 rounded-full text-xs md:text-sm border border-white/15 text-(--text-primary)
               disabled:opacity-40 disabled:cursor-not-allowed hover:bg-white/5"
          >
            Prev
          </button>

          {/* Page numbers */}
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              type="button"
              onClick={() => setCurrentPage(page)}
              className={`px-3 py-1.5 rounded-full text-xs md:text-sm border cursor-pointer
        ${
          page === currentPage
            ? 'bg-(--accent-cyan) text-black font-semibold border-(--accent-cyan) shadow-[0_10px_30px_rgba(34,211,238,0.6)] cursor-pointer'
            : 'border-white/15 text-(--text-muted) hover:text-(--text-primary) cursor-pointer hover:bg-white/5'
        }`}
            >
              {page}
            </button>
          ))}

          {/* Next */}
          <button
            type="button"
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages || totalPages === 0}
            className="px-3 py-1.5 rounded-full cursor-pointer text-xs md:text-sm border border-white/15 text-(--text-primary)
               disabled:opacity-40 disabled:cursor-not-allowed hover:bg-white/5"
          >
            Next
          </button>
        </div>
        {/* Pagination end */}
      </Container>
    </section>
  );
};

export default AllVehicles;
