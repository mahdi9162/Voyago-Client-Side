import React from 'react';
import HeroSec from './Sections/HeroSec';
import TopCategories from './Sections/TopCategories';
import FeaturedOwner from './Sections/FeaturedOwner';
import TopNewArrivals from './Sections/TopNewArrivals';
import AboutVoyago from '../Home/Sections/AboutVoyago';
import ScrollHint from './Sections/ScrollHint';

const Home = () => {
  return (
    <>
      <HeroSec></HeroSec>
      {/* Scroll Hint */}
      <ScrollHint></ScrollHint>
      <TopNewArrivals></TopNewArrivals>
      <TopCategories></TopCategories>
      <FeaturedOwner></FeaturedOwner>
      <AboutVoyago></AboutVoyago>
    </>
  );
};

export default Home;
