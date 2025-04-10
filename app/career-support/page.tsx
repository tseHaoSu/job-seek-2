import React from 'react'
import Hero from './_components/Hero'
import Banner from '../_components/Banner';
import CareerCards from './_components/CareerCards';


const page = () => {
  return (
    <div className="space-y-20 p-4 sm:px-6 lg:px-8">
      <Hero />
      <Banner />
      <CareerCards />
    </div>
  );
}

export default page