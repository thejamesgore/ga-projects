import React from 'react'

const Home = () => {
  return (
    <section className="home-page-section">
      <div className="home-title">
        <h1 className="home-title">TRAVEL APP - Map your world!</h1>
      </div>

      <div className="hero-image-container">
        <img
          className="image2"
          src="https://user-images.githubusercontent.com/83005220/148244081-f1e61867-5dcc-4ae8-99ce-e9286506345d.png"
          alt="picture of an iphone"
        />
      </div>

      <div className="links-container">
        <div className="links-card">
          <div className="country-card-content">
            <h3>Map your travels</h3>
            <h4>
              Log into our members dashboard to plot countries on our
              interactive map
            </h4>
          </div>
        </div>

        <div className="links-card">
          <div className="country-card-content">
            <h3>Share</h3>
            <h4>Tell your friends about our Travel App</h4>
          </div>
        </div>

        <div className="links-card">
          <div className="country-card-content">
            <h3>Create Memories</h3>
            <h4>Save all of places you have visted to create memories</h4>
          </div>
        </div>
      </div>

      <footer className="footer">
        <div className="footer-container">
          <p className="footer-title">© Travel App</p>
        </div>
      </footer>
    </section>
  )
}

export default Home
