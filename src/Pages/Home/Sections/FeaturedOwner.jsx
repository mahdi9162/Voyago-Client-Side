import Container from '../../../components/container/Container';
import driverImg from '../../../assets/images/driver.jpg';
import { FaUserShield } from 'react-icons/fa6';
import { ThemeContext } from '../../../context/ThemeProvider';
import { use } from 'react';

const FeaturedOwner = () => {
  const { theme } = use(ThemeContext);

  const host = {
    name: 'Daniel Carter',
    location: 'Los Angeles, CA',
    since: '2021',
    rating: 4.9,
    totalTrips: 120,
    avatar: driverImg,
  };

  return (
    <section className="my-10 lg:my-14 px-3 lg:px-0">
      <Container>
        {/* Header */}
        <div className="mb-8">
          <h2 data-aos="fade-right" className="text-xl md:text-2xl font-semibold text-(--text-primary)">
            Trusted Voyago Owner
          </h2>
          <p data-aos="fade-right" data-aos-delay="80" className="mt-1 text-xs md:text-base text-(--text-muted)">
            Meet a real host you can count on.
          </p>
        </div>

        {/* Spotlight Card */}
        <div
          data-aos="fade-up"
          data-aos-delay="140"
          className={`flex flex-col md:flex-row gap-6 md:gap-8
            rounded-3xl border bg-(--bg-secondary)/70
            backdrop-blur-xl px-5 py-6 md:px-8 md:py-8 ${theme === 'dark' ? 'darkGlow' : 'lightGlow'}`}
        >
          {/* Left: Avatar + badge */}
          <div className="flex flex-col items-center gap-4 md:gap-5 md:w-1/2">
            <div
              data-aos="zoom-in"
              data-aos-delay="200"
              className="
                relative
                w-28 h-28 md:w-32 md:h-32
                rounded-full
                bg-linear-to-b from-(--accent)/30 to-transparent
                flex items-center justify-center
                shadow-[0_0_35px_rgba(0,255,255,0.4)]
              "
            >
              <img
                src={host.avatar}
                alt={host.name}
                className="w-24 h-24 md:w-28 md:h-28 rounded-full object-cover border-4 border-(--accent)"
              />
            </div>
            <div>
              <span
                className="
                  flex items-center gap-2
                  px-4 py-1.5
                  rounded-full
                  bg-(--accent-cyan)/70
                  text-xs font-semibold text-black
                  shadow-[0_10px_25px_rgba(0,255,255,0.45)]
                "
              >
                <span className="text-base">
                  <FaUserShield />
                </span>
                Trusted Host
              </span>
            </div>
          </div>

          {/* Right: Info */}
          <div className="flex-1 flex flex-col gap-4 md:gap-5">
            {/* Name + location + since */}
            <div>
              <p className="text-xs md:text-sm text-(--text-muted) flex items-center gap-1">
                <span className="text-base">📍</span>
                {host.location}
              </p>
              <h3 className="mt-1 text-xl md:text-2xl font-semibold text-(--text-primary)">{host.name}</h3>
              <p className="text-xs md:text-sm text-(--text-muted)">Hosting on Voyago since {host.since}</p>
            </div>

            {/* Rating */}
            <div>
              <div
                className="
                  inline-flex items-center gap-3
                  px-4 py-2
                  rounded-full
                  bg-(--bg-primary)/70
                  border border-(--accent)/40
                  shadow-[0_12px_30px_rgba(0,0,0,0.45)]
                "
              >
                <span className="flex items-center gap-1 text-sm font-semibold text-yellow-500">
                  <span className="text-lg">⭐</span>
                  {host.rating}
                </span>
                <span className="text-xs md:text-sm text-(--text-muted)">Rated by {host.totalTrips}+ guests</span>
              </div>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-2 md:gap-3 text-[11px] md:text-xs">
              <span
                className="
                  inline-flex items-center gap-1
                  px-3 py-1
                  rounded-full
                  bg-primary/20
                  border border-white/10
                  text-(--text-muted)
                "
              >
                🚗 {host.totalTrips}+ Rentals
              </span>
              <span
                className="
                  inline-flex items-center gap-1
                  px-3 py-1
                  rounded-full
                  bg-primary/20
                  border border-white/10
                  text-(--text-muted)
                "
              >
                ⚡ Replies in under 15 min.
              </span>
              <span
                className="
                  inline-flex items-center gap-1
                  px-3 py-1
                  rounded-full
                  bg-primary/20
                  border border-white/10
                  text-(--text-muted)
                "
              >
                ✅ ID & License verified
              </span>
            </div>

            {/* text */}
            <div>
              <p className="text-xs md:text-base text-justify leading-relaxed text-(--text-muted)">
                Daniel keeps his SUV spotless and always shares local tips with travelers.
                <span className=" lg:block"> Guests love his quick responses and flexible pickup options.</span>
              </p>
            </div>

            {/* CTA button */}
            <div>
              <button
                className="
                  inline-flex items-center justify-center
                  px-5 md:px-6 py-2
                  rounded-full
                  bg-(--accent-cyan)/70
                  text-[12px] md:text-sm font-semibold text-black
                  shadow-[0_14px_35px_rgba(0,255,255,0.4)]
                  transition-all duration-500
                  hover:bg-(--accent-purple)
                  hover:text-white
                  hover:scale-105
                  active:scale-95
                  cursor-pointer
                "
              >
                View Daniel's vehicles
              </button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default FeaturedOwner;
