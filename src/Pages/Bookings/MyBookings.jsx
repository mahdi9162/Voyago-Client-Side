import useBookings from '../../hooks/useBookings';
import Container from '../../components/container/Container';
import { format } from 'date-fns';
const MyBookings = () => {
  const { bookings, loading } = useBookings();

  if (loading) {
    return <p className="text-center py-20">Checking bookings...</p>;
  }

  if (bookings.length === 0) {
    return <p className="text-center text-xl py-20">You have no active ride requests.</p>;
  }

  return (
    <section className="my-10 md:my-20  px-3 lg:px-0">
      <Container>
        {/* Page Header */}
        <div className="mb-6 md:mb-10">
          <h2 className="text-xl md:text-3xl font-semibold text-(--text-primary)">My Bookings</h2>
          <p className="text-(--text-muted) text-sm md:text-base mt-1">View and manage your ride requests.</p>
        </div>

        {/* Booking List */}
        <div className="space-y-6">
          {bookings.map((booking) => {
            const { pickupLocation, tripStartDate, userEmail, userName, vehicleId, perDayCost, status, createdAt, _id } = booking;

            const tripStartFormatted = format(new Date(tripStartDate || new Date()), 'MMM dd, yyyy');
            const bookedOnDate = format(new Date(createdAt || new Date()), 'MMM dd, yyyy - h:mm a');
            // Booking card
            return (
              <div
                key={_id || vehicleId}
                className="bg-(--bg-secondary)/70 border border-white/10 rounded-2xl shadow-[0_8px_40px_rgba(0,0,0,0.35)] backdrop-blur-xl px-2 md:px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-6"
              >
                {/* Left: Booking Info */}
                <div className="flex-1 space-y-3">
                  {/* Location + Date */}
                  <div className="flex flex-wrap items-center gap-2 md:gap-4">
                    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 text-(--text-muted) text-xs md:text-sm">
                      📍 {pickupLocation}
                    </span>
                    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 text-(--text-muted) text-xs md:text-sm">
                      📅 {tripStartFormatted}
                    </span>
                  </div>

                  {/* User Info */}
                  <div className="text-(--text-muted) text-sm">
                    <p>
                      Requested by :<span className="font-medium text-xs md:text-base text-(--text-primary)"> {userName}</span>
                    </p>
                    <p className="text-xs md:text-base mt-1">{userEmail}</p>
                  </div>

                  {/* Vehicle ID */}
                  <p className="text-sm text-(--text-muted)">
                    Vehicle ID:
                    <span className="font-medium text-xs md:text-base text-(--text-primary)"> {vehicleId}</span>
                  </p>

                  {/* Status */}
                  <span className="inline-block px-4 py-1.5 text-sm font-semibold rounded-full bg-blue-500/20 text-blue-400 border border-blue-400/30">
                    {status}
                  </span>
                </div>

                {/* Right: Payment + Date */}
                <div className="text-center md:text-right space-y-2">
                  <p className="text-xl font-semibold text-(--text-primary)">
                    ${perDayCost}
                    <span className="text-sm font-normal text-(--text-muted)"> /day</span>
                  </p>

                  <p className="text-xs text-(--text-muted)">Booked on {bookedOnDate}</p>

                  {/* CTA */}
                  <button className="mt-2 inline-flex items-center justify-center rounded-full bg-(--accent) px-5 py-2 text-sm font-semibold text-white shadow-[0_14px_40px_rgba(34,211,238,0.5)] transition-all duration-200 hover:bg-(--accent-cyan) hover:shadow-[0_18px_60px_rgba(34,211,238,0.65)] active:scale-95 cursor-pointer hover:text-black/50">
                    View Details
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
};

export default MyBookings;
