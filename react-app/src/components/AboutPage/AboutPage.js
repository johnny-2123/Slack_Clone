import React from 'react';
import './AboutPage.css';

const AboutPage = () => {
  return (
    <div className="about-container">
      <div className="about-sidebar"></div>
      <div className="about-content">
        <h1 className="about-heading">About Slack</h1>
        <p className="about-text">Slack is a collaboration hub that can replace email to help you and your team work together seamlessly. It’s designed to support the way people naturally work together, so you can collaborate with people online as efficiently as you do face-to-face.</p>
        <h2 className="about-subheading">Our Mission</h2>
        <p className="about-text">Our mission is to make people’s working lives simpler, more pleasant, and more productive.</p>
        <h2 className="about-subheading">Our Story</h2>
        <p className="about-text">Slack was founded in 2009 as a gaming company called Tiny Speck. It later shifted to a communication platform that became its primary focus. The company rebranded as Slack in 2014 and went public in 2019. Today, millions of people around the world use Slack to connect their teams, unify their systems, and drive their business forward.</p>
        <h2 className="about-subheading">Our Headquarters</h2>
        <p className="about-text">Slack’s headquarters are located in San Francisco, California, with offices around the world.</p>
      </div>
      <div className="about-sidebar"></div>
    </div>
  );
};

export default AboutPage;
