import React from 'react';
import Navigation from '../components/HomePage/navigation'
import Header from '../components/HomePage/header';
import Features from '../components/HomePage/features';
import Blog from '../components/HomePage/Blog';
import Contact from '../components/HomePage/contact';
import Footer from '../components/HomePage/footer'
import Subscription from '../components/HomePage/subscription'

function Home() {
  return (
    <div className="Home">
        <Navigation />
        <Header />
        <Features />
        <Subscription />
        <Blog />
        <Contact />
        <Footer />
    </div>
  );
}

export default Home;
