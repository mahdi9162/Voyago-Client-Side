import React from 'react';
import HeroSec from './Sections/HeroSec';
import TopCategories from './Sections/TopCategories';
import FeaturedOwner from './Sections/FeaturedOwner';
import TopNewArrivals from './Sections/TopNewArrivals';

const Home = () => {
  return (
    <>
      <HeroSec></HeroSec>
      <TopNewArrivals></TopNewArrivals>
      <TopCategories></TopCategories>
      <FeaturedOwner></FeaturedOwner>
    </>
  );
};

export default Home;
