import React from 'react';
import ClientSlider from './ClientSlider';

const ClientSection = () => {
  return(
    <section className="client_section layout_padding" >
    <div className="container">
      <div className="heading_container heading_center">
        <h2>
          Customer's Testimonial
        </h2>
      </div>
      <ClientSlider />
    </div>
  </section>
  )
};

export default ClientSection;
