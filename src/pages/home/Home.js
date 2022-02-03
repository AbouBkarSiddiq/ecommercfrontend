import React from 'react'
// import '../assets/css/bootstrap.css'
// import '../assets/css/bootstrap.css'
import 'bootstrap/dist/css/bootstrap.css';
import Navbar from '../../components/common/Navbar';
import Product from '../../components/product/Products';
import HeroSection from '../../components/home/HeroSection';
import WhySection from '../../components/home/WhySection';
import NewArrivals from '../../components/home/NewArrivals';
import SubscribeSection from '../../components/home/SubscribeSection';
import ClientSection from '../../components/home/ClientSection';
import Footer from '../../components/home/Footer';

const HomePage = () => {
  return (
    <div className="">
      <HeroSection />
      <WhySection />
      <NewArrivals />
      <Product />
      <SubscribeSection />
      <ClientSection />
      <Footer />
      <div className="cpy_">
        <p className="mx-auto">© 2021 All Rights Reserved By <a href="https://html.design/">Free Html Templates</a><br />
          Distributed By <a href="https://themewagon.com/" target="_blank">ThemeWagon</a>
        </p>
      </div>
    </div>
  )
}

export default HomePage