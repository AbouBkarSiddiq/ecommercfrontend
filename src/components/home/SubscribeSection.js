import React from 'react';

const SubscribeSection = () => {
  return (
    <section className="subscribe_section">
      <div className="container-fuild">
        <div className="box">
          <div className="row">
            <div className="col-md-6 offset-md-3">
              <div className="subscribe_form ">
                <div className="heading_container heading_center">
                  <h3>Subscribe To Get Discount Offers</h3>
                </div>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor</p>
                <form action>
                  <input type="email" placeholder="Enter your email" />
                  <button>
                    subscribe
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
};

export default SubscribeSection;
