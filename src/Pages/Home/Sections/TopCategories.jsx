import React, { use } from 'react';
import Container from '../../../components/container/Container';
import { Link } from 'react-router';
import { PiCarProfileFill, PiCarSimple, PiLightningFill, PiMountains } from 'react-icons/pi';
import { ThemeContext } from '../../../context/ThemeProvider';

const TopCategories = () => {
  const { theme } = use(ThemeContext);

  const categories = [
    {
      id: 1,
      title: 'SUV',
      subtitle: 'Spacious & family-ready',
      Icon: PiCarProfileFill,
    },
    {
      id: 2,
      title: 'Sedan',
      subtitle: 'Comfort for city drives',
      Icon: PiCarSimple,
    },
    {
      id: 3,
      title: 'Electric',
      subtitle: 'Eco-friendly rides',
      Icon: PiLightningFill,
    },
    {
      id: 4,
      title: 'Luxury & Off-road',
      subtitle: 'Adventure-ready 4x4s',
      Icon: PiMountains,
    },
  ];

  return (
    <>
      <section className="my-16 md:my-30 px-3 lg:px-0 ">
        <Container>
          {/* Header */}
          <div className="flex items-center flex-col md:flex-row text-center md:text-left  md:justify-between gap-4 mb-8 ">
            <div>
              <h2 className="text-2xl md:text-3xl font-semibold text-(--text-primary)">Top Categories</h2>
              <p className="mt-1 text-sm text-(--text-muted)">Find the perfect ride by type</p>
            </div>

            <div>
              <Link to="/all-vehicles" className={theme === 'dark' ? 'dark-view' : 'light-view'}>
                View all vehicles →
              </Link>
            </div>
          </div>

          {/* Cards */}
          <div
            className="
              grid gap-4 sm:gap-5 md:gap-6
              grid-cols-1 sm:grid-cols-2 lg:grid-cols-4
            "
          >
            {categories.map(({ id, title, subtitle, Icon }) => (
              <div
                key={id}
                className="group rounded-3xl border border-white/10 bg-(--bg-secondary)/70 dark:bg-white/5 shadow-lg backdrop-blur-xl px-5 py-7 md:px-6 md:py-8 flex flex-col items-center text-center transition-all duration-700 hover:-translate-y-1.5 hover:shadow-2xl
                "
              >
                {/* Icon wrapper */}
                <div className="mb-5 md:mb-6">
                  <div
                    className=" relative w-16 h-16 md:w-18 md:h-18 rounded-full bg-(--accent)/15
                      flex items-center justify-center border border-(--accent)/40
                      shadow-[0_0_0_1px_rgba(255,255,255,0.2)] group-hover:bg-(--accent) transition-all duration-500
                    "
                  >
                    <Icon className="text-xl md:text-2xl text-(--accent) group-hover:text-white transition-colors duration-500" />

                    {/* Electric special glow */}
                    {title === 'Electric' && (
                      <span
                        className="
                          absolute -inset-1.5
                          rounded-full
                          opacity-0 group-hover:opacity-100
                          bg-(--accent)/25
                          blur-sm
                          transition-opacity duration-500
                        "
                      />
                    )}
                  </div>
                </div>

                {/* Texts */}
                <h3 className="text-sm md:text-base font-semibold text-(--text-primary)">{title}</h3>
                <p className="mt-1 text-[11px] md:text-xs text-(--text-muted)">{subtitle}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
};

export default TopCategories;
