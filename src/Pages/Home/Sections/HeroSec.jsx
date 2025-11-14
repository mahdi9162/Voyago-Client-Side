import React, { use } from 'react';
import heroLight from '../../../assets/images/heroLight.jpg';
import heroDark from '../../../assets/images/heroDark.jpg';
import { ThemeContext } from '../../../context/ThemeProvider';
import Container from '../../../components/container/Container';
import Button from '../../../components/ui/ButtonLight';
import ButtonLight from '../../../components/ui/ButtonLight';
import ButtonDark from '../../../components/ui/ButtonDark';
import { Link } from 'react-router';

const HeroSec = () => {
  const { theme } = use(ThemeContext);
  const heroImg = theme === 'dark' ? heroDark : heroLight;

  return (
    <>
      <section className=" relative h-[600px] md:h-[800px] ">
        <div
          className={theme === 'dark' ? 'h-full bg-position-[center_bottom] bg-cover w-full ' : 'h-full bg-cover bg-center w-full'}
          style={{ backgroundImage: `url(${heroImg})` }}
        >
          <div className="absolute inset-0 bg-black/10 "></div>
          <Container className="h-full py-20 md:py-30 px-3 lg:px-0">
            <div className="hero-text h-full">
              <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold">
                Every Mile,<span className="block">A Story Worth Driving</span>
              </h1>
              <p className="mt-3 mb-5 text-xs md:text-lg opacity-90 hero-text">
                Discover premium car rentals built for comfort, adventure,<span className="block"> and unforgettable journeys.</span>
              </p>
              <Link to="/all-vehicles">
                {theme === 'dark' ? <ButtonDark>All Vehicles</ButtonDark> : <ButtonLight>All Vehicles</ButtonLight>}
              </Link>
            </div>
          </Container>
        </div>
      </section>
    </>
  );
};

export default HeroSec;
