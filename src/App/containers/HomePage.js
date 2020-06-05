import React from 'react';
import Header from '../components/HomePage/header';
// import Pricing from '../components/pricing';
import Features from '../components/HomePage/footer';
import Blog from '../components/HomePage/Blog';
import Contact from '../components/HomePage/contact';
import Subscription from './Subscription'

function Home() {
  return (
    <div className="Home">
        <Header />
        <Features />
        <Subscription />
        {/* <Pricing /> */}
        <Blog />
        <Contact />
    </div>
  );
}

export default Home;
