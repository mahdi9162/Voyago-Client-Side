import React from 'react';
import HeroSec from './Sections/HeroSec';
import LatestVehiclesSec from './Sections/LatestVehiclesSec';
import TopCategories from './Sections/TopCategories';
import FeaturedOwner from './Sections/FeaturedOwner';

const Home = () => {
  return (
    <>
      <HeroSec></HeroSec>
      <LatestVehiclesSec></LatestVehiclesSec>
      <TopCategories></TopCategories>
      <FeaturedOwner></FeaturedOwner>
    </>
  );
};

export default Home;
