import React from "react";
import Footer from "./Footer";
import ReactGA from "react-ga";

function About() {
  if (process.env.REACT_APP_GA_TRACKING_ID) {
    ReactGA.pageview("/about");
  }

  return (
    <div>
      <section className="section-about">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 text-center">
              <h2 className="section-heading text-uppercase">About Me</h2>
              <p>
                I'm Tyler Hunstock, I am passionate about the web, it's impact
                and it's potential to transform the world, and this is why I
                made the decision to retrain and change careers to become a Web
                Developer back in 2017. I am looking for projects where I can
                work as a Web Developer to build great user friendly solutions.
                If your are looking for someone with dedication,
                professionalism, and problem-solving skills contact me.
              </p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default About;
