import React, { useEffect, useState } from 'react';
import Container from '../../components/container/Container';
import useVehicles from '../../hooks/useVehicles';
import VehicleCard from '../Home/Sections/VehicleCard';
import Spinner from '../../utils/Spinner';
import Lottie from 'react-lottie-player';
import { Link } from 'react-router';

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
  const [searchTerm, setSearchTerm] = useState('');
  const [sortByPrice, setSortByPrice] = useState(SORT.LOW_TO_HIGH);

  const { vehicles, loading, error } = useVehicles('https://voyago-server-side.vercel.app/vehicles');
  const allVehicles = vehicles.data || [];

  // 🔹 Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 6;

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, selectedLocation, sortByPrice, searchTerm]);

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

  // 🔹 Filter pipeline (Category + Location + Search)
  const filteredVehicles = allVehicles.filter((vehicle) => {
    // Category Filter
    const categoryFilter = selectedCategory === 'All' ? true : vehicle.category?.toLowerCase() === selectedCategory.toLowerCase();

    // Location Filter
    const locationFilter = selectedLocation === 'All cities' ? true : vehicle.location?.toLowerCase() === selectedLocation.toLowerCase();

    // Search Filter (name + model)
    const q = searchTerm.trim().toLowerCase();
    const haystack = `${vehicle.vehicleName || ''} ${vehicle.vehicleModel || ''}`.toLowerCase();
    const searchFilter = q ? haystack.includes(q) : true;

    return categoryFilter && locationFilter && searchFilter;
  });

  //Sort Function
  const sortedVehicles = [...filteredVehicles].sort((a, b) => {
    const priceA = a.pricePerDay;
    const priceB = b.pricePerDay;

    if (sortByPrice === SORT.LOW_TO_HIGH) return priceA - priceB;
    return priceB - priceA;
  });

  // Pagination start
  const totalPages = Math.ceil(sortedVehicles.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentVehicles = sortedVehicles.slice(startIndex, endIndex);
  // Pagination end

  // 🔹 Reset helper (empty state CTA)
  const handleResetFilters = () => {
    setSelectedCategory('All');
    setSelectedLocation('All cities');
    setSortByPrice(SORT.LOW_TO_HIGH);
    setSearchTerm('');
  };

  const noResults = filteredVehicles.length === 0;

  return (
    <section className="my-6 md:my-10 lg:my-14 px-3 lg:px-0">
      <Container>
        {/* Page header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3 mb-8 bg-accent/10 rounded-2xl p-4">
          <div>
            <h1 className="text-lg md:text-2xl font-semibold text-(--text-primary)">All Vehicles</h1>
            <p className="mt-1 max-w-[36ch] text-[13px] leading-snug md:text-sm md:leading-normal text-(--text-muted)/80">
              Browse and compare every ride available on Voyago.
            </p>
          </div>
        </div>

        {/* Filter & Sort bar */}
        <div className="bg-(--bg-secondary)/70 border border-white/10 rounded-2xl backdrop-blur-xl px-4 py-4 md:px-6 md:py-5 mb-4">
          {/* Search row */}
          <div className="mb-4">
            <span className="text-xs font-medium uppercase tracking-wide text-(--text-muted)">Search</span>

            <div className="mt-2 flex items-center gap-2 rounded-2xl border border-white/10 bg-black/10 px-3 py-2">
              <span className="text-(--text-muted) text-sm animate-search-float">🔎</span>

              <input
                type="text"
                placeholder="Search by name or model..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-transparent outline-none text-xs text-(--text-primary) placeholder:text-(--text-muted)/60 md:placeholder:text-sm"
              />

              {searchTerm && (
                <button
                  type="button"
                  onClick={() => setSearchTerm('')}
                  className="shrink-0 rounded-full px-2 py-1 text-xs text-(--text-muted) hover:bg-white/5 cursor-pointer"
                  aria-label="Clear search"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Layout wrapper */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
            {/* Category pills */}
            <div className="flex flex-col gap-2">
              <span className="text-xs font-medium uppercase tracking-wide text-(--text-muted)">Category</span>

              <div className="relative">
                <div
                  className="flex items-center gap-1 bg-black/10 rounded-full px-1 py-1 border border-white/10
                        overflow-x-auto whitespace-nowrap [-ms-overflow-style:none] [scrollbar-width:none]
                        [&::-webkit-scrollbar]:hidden"
                >
                  {categoryOptions.map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setSelectedCategory(cat)}
                      className={`shrink-0 px-3 md:px-4 py-2 text-xs md:text-sm rounded-full transition-all duration-500 cursor-pointer ${
                        selectedCategory === cat
                          ? 'bg-(--accent-cyan) text-white text-shadow-lg/10 font-semibold shadow-[0_10px_30px_rgba(34,211,238,0.55)]'
                          : 'text-(--text-muted) hover:text-(--text-primary) hover:bg-white/5'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                <div
                  className="pointer-events-none absolute right-0 top-0 h-full w-8 rounded-r-full
                        bg-linear-to-l from-(--bg-secondary)/70 to-transparent"
                />
              </div>
            </div>

            {/* Location pills */}
            <div className="flex flex-col gap-2">
              <span className="text-xs font-medium uppercase tracking-wide text-(--text-muted)">Location</span>

              <div className="relative">
                <div
                  className="flex items-center gap-1 bg-black/10 rounded-2xl md:rounded-full px-1 py-1 border border-white/10
                        overflow-x-auto md:overflow-visible whitespace-nowrap md:whitespace-normal
                        [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                >
                  {locationOptions.map((loc) => (
                    <button
                      key={loc}
                      type="button"
                      onClick={() => setSelectedLocation(loc)}
                      className={`shrink-0 px-3 md:px-4 py-2 text-xs md:text-sm rounded-full transition-all duration-500 cursor-pointer ${
                        selectedLocation === loc
                          ? 'bg-(--accent-cyan) text-white text-shadow-lg/10 font-semibold shadow-[0_10px_30px_rgba(34,211,238,0.45)]'
                          : 'text-(--text-muted) hover:text-(--text-primary) hover:bg-white/5'
                      }`}
                    >
                      {loc}
                    </button>
                  ))}
                </div>

                <div className="pointer-events-none absolute right-0 top-0 h-full w-8 rounded-r-2xl md:rounded-r-full bg-linear-to-l from-(--bg-secondary)/70 to-transparent" />
              </div>
            </div>

            {/* Sort by price toggle */}
            <div className="flex flex-col gap-2">
              <span className="text-xs font-medium uppercase tracking-wide text-(--text-muted)">Sort by</span>

              <div className="grid grid-cols-2 bg-black/10 rounded-full p-1 border border-white/10">
                <button
                  type="button"
                  onClick={() => setSortByPrice(SORT.LOW_TO_HIGH)}
                  className={`px-3 md:px-4 py-2 text-xs md:text-sm rounded-full transition-all duration-500 cursor-pointer ${
                    sortByPrice === SORT.LOW_TO_HIGH
                      ? 'bg-(--accent-cyan) text-white text-shadow-lg/10 font-semibold shadow-[0_10px_30px_rgba(34,211,238,0.55)]'
                      : 'text-(--text-muted) hover:text-(--text-primary) hover:bg-white/5'
                  }`}
                >
                  Price: Low → High
                </button>

                <button
                  type="button"
                  onClick={() => setSortByPrice(SORT.HIGH_TO_LOW)}
                  className={`px-3 md:px-4 py-2 text-xs md:text-sm rounded-full transition-all duration-500 cursor-pointer ${
                    sortByPrice === SORT.HIGH_TO_LOW
                      ? 'bg-(--accent-cyan) text-white text-shadow-lg/10 font-semibold shadow-[0_10px_30px_rgba(34,211,238,0.55)]'
                      : 'text-(--text-muted) hover:text-(--text-primary) hover:bg-white/5'
                  }`}
                >
                  Price: High → Low
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Total Vehicles */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md shadow-inner">
          <div className="flex items-center gap-3">
            <div className="relative flex items-center justify-center">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-(--accent-cyan) opacity-20"></span>
              <div className="relative h-10 w-10 flex items-center justify-center rounded-full bg-(--accent-cyan)/20 border border-(--accent-cyan)/40 text-(--accent-cyan) font-bold">
                {filteredVehicles.length}
              </div>
            </div>

            <div>
              <h3 className="text-sm md:text-base font-bold text-(--text-primary)">Vehicles Found</h3>
              <p className="text-[10px] md:text-xs text-(--text-muted) uppercase tracking-widest opacity-60">Ready for booking</p>
            </div>
          </div>
        </div>

        {/* empty State */}
        {noResults ? (
          <div className="py-12 md:py-20 flex flex-col items-center text-center px-6 rounded-3xl bg-(--bg-secondary)/30 border border-white/5 backdrop-blur-xl shadow-2xl animate-in fade-in zoom-in duration-500">
            {/* Animated Empty State */}
            <div className="relative mb-6 group">
              {/* Background Glow */}
              <div className="absolute inset-0 bg-(--accent-cyan)/10 blur-3xl rounded-full scale-150 animate-pulse"></div>

              {/* Search Icon */}
              <div className="relative flex items-center justify-center h-24 w-24 md:h-32 md:w-32 rounded-full bg-white/5 border border-white/10 shadow-inner">
                <div className="relative animate-bounce" style={{ animationDuration: '2.2s' }}>
                  <span className="text-5xl md:text-6xl select-none">🔍</span>
                </div>
              </div>
            </div>

            {/* Text Content */}
            <div className="max-w-sm space-y-2 mb-8">
              <h3 className="text-xl md:text-2xl font-black tracking-tight text-(--text-primary)">No Rides Found</h3>
              <p className="text-xs md:text-base text-(--text-muted)/70 leading-relaxed opacity-80">
                Try changing your filters or search criteria to find available vehicles.
              </p>
            </div>

            {/* Reset Button */}
            <button
              type="button"
              onClick={handleResetFilters}
              className="group relative inline-flex items-center gap-3 px-8 py-3 rounded-xl 
      text-xs md:text-sm font-bold tracking-wide transition-all duration-500 cursor-pointer
      bg-(--bg-secondary)/60 backdrop-blur-md border border-white/10
      hover:border-(--accent-cyan)/50 hover:shadow-[0_0_30px_rgba(34,211,238,0.2)]
      active:scale-95 overflow-hidden"
            >
              <div
                className="absolute inset-0 bg-linear-to-r from-(--accent-cyan)/0 via-(--accent-cyan)/5 to-(--accent-cyan)/0 
        -translate-x-full group-hover:translate-x-full transition-transform duration-1000"
              ></div>

              <div
                className="relative flex items-center justify-center h-6 w-6 rounded-lg 
        bg-white/5 border border-white/10 transition-all duration-500
        group-hover:rotate-180 group-hover:bg-(--accent-cyan) group-hover:text-black"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="3"
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
              </div>

              <span className="relative text-(--text-muted) group-hover:text-(--accent-cyan) transition-colors duration-300">
                Reset All Filters
              </span>
            </button>
          </div>
        ) : (
          <>
            <div className="grid gap-4 sm:gap-5 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {currentVehicles.map((vehicle) => (
                <VehicleCard key={vehicle._id} vehicle={vehicle}></VehicleCard>
              ))}
            </div>

            {/* Pagination start */}
            <div className="flex items-center justify-center gap-2 md:mt-8">
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
                        ? 'bg-(--accent-cyan) text-white text-shadow-lg/10 font-semibold border-(--accent-cyan) shadow-[0_10px_30px_rgba(34,211,238,0.6)]'
                        : 'border-white/15 text-(--text-muted) hover:text-(--text-primary) hover:bg-white/5'
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
          </>
        )}
      </Container>
    </section>
  );
};

export default AllVehicles;
