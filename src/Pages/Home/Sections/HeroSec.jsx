import React, { use } from 'react';
import heroLight from '../../../assets/images/heroLight.webp';
import heroDark from '../../../assets/images/heroDark.webp';
import { ThemeContext } from '../../../context/ThemeProvider';
import Container from '../../../components/container/Container';
import ButtonLight from '../../../components/ui/ButtonLight';
import ButtonDark from '../../../components/ui/ButtonDark';
import { Link } from 'react-router';
import { motion } from 'framer-motion';

//Motion Content start
const textParentVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.15,
      when: 'beforeChildren',
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

const textChildVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};
//Motion end

const HeroSec = () => {
  const { theme } = use(ThemeContext);
  const heroImg = theme === 'dark' ? heroDark : heroLight;

  return (
    <>
      <section className=" relative h-[600px] md:h-[800px] ">
        {/* Motion start - hero background fade */}
        <motion.div
          key={theme}
          className={theme === 'dark' ? 'h-full bg-position-[center_bottom] bg-cover w-full ' : 'h-full bg-cover bg-center w-full '}
          style={{ backgroundImage: `url(${heroImg})` }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <div className="absolute inset-0 bg-black/10 "></div>

          <Container className="h-full py-20 md:py-30 px-3 lg:px-0">
            <motion.div className="hero-text h-full" variants={textParentVariants} initial="hidden" animate="visible">
              <motion.h1 className="text-2xl md:text-4xl lg:text-6xl font-bold" variants={textChildVariants}>
                Every Mile,<span className="block">A Story Worth Driving</span>
              </motion.h1>

              <motion.p className="mt-3 mb-5 text-xs md:text-lg opacity-90 hero-text" variants={textChildVariants}>
                Discover premium car rentals built for comfort,
                <span className="block">adventure, and unforgettable journeys.</span>
              </motion.p>

              <div>
                <Link to="/all-vehicles">
                  {theme === 'dark' ? <ButtonDark>All Vehicles</ButtonDark> : <ButtonLight>All Vehicles</ButtonLight>}
                </Link>
              </div>
            </motion.div>
          </Container>
        </motion.div>
        {/* Motion end */}
      </section>
    </>
  );
};

export default HeroSec;
