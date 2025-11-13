import React from 'react';
import HeroSec from './Sections/HeroSec';
import LatestVehiclesSec from './Sections/LatestVehiclesSec';
import TopCategories from './Sections/TopCategories';


const Home = () => {
  return (
    <>
      <HeroSec></HeroSec>
      <LatestVehiclesSec></LatestVehiclesSec>
      <TopCategories></TopCategories>
    </>
  );
};

export default Home;
