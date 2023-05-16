import React from "react";
import "./AboutPage.css";

const AboutPage = () => {
    return (
        <div className="about-container">
            <div className="about-sidebar"></div>
            <div className="about-content">
                <h1 className="about-heading">About Slack</h1>
                <p className="about-text">
                    Slack is a collaboration hub that can replace email to help
                    you and your team work together seamlessly. It’s designed to
                    support the way people naturally work together, so you can
                    collaborate with people online as efficiently as you do
                    face-to-face.
                </p>
                <h2 className="about-subheading">Our Mission</h2>
                <p className="about-text">
                    Our mission is to make people’s working lives simpler, more
                    pleasant, and more productive.
                </p>
                <h2 className="about-subheading">Our Story</h2>
                <p className="about-text">
                    Slack was founded in 2009 as a gaming company called Tiny
                    Speck. It later shifted to a communication platform that
                    became its primary focus. The company rebranded as Slack in
                    2014 and went public in 2019. Today, millions of people
                    around the world use Slack to connect their teams, unify
                    their systems, and drive their business forward.
                </p>
                <h2 className="about-subheading">Our Headquarters</h2>
                <p className="about-text">
                    Slack’s headquarters are located in San Francisco,
                    California, with offices around the world.
                </p>
                <div className="about-metrics-container">
                    <div className="about-metric">
                        <img
                            src="https://cdn-icons-png.flaticon.com/512/25/25437.png?w=826&t=st=1683679541~exp=1683680141~hmac=3857624361985a30bef0e90ccf7641ad699eea7df3d85c55f87bf07cf5134978"
                            alt="Users Icon"
                            className="about-metric-icon"
                            style={{ width: "50px", height: "50px" }}
                        />
                        <p className="about-metric-text">
                            Currently 2 million users worldwide
                        </p>
                    </div>
                    <div className="about-metric">
                        <img
                            src="https://cdn-icons-png.flaticon.com/512/245/245904.png"
                            alt="Fortune500 Icon"
                            className="about-metric-icon"
                            style={{ width: "50px", height: "50px" }}
                        />
                        <p className="about-metric-text">
                            Used by 50 of Fortune500 companies
                        </p>
                    </div>
                    <div className="about-metric">
                        <img
                            src="https://icons.veryicon.com/png/o/commerce-shopping/jkd_wap/clock-137.png"
                            alt="Timeline Icon"
                            className="about-metric-icon"
                            style={{ width: "50px", height: "50px" }}
                        />
                        <p className="about-metric-text">
                            Created site in less than a month
                        </p>
                    </div>
                    <div className="about-metric">
                        <img
                            src="https://cdn-icons-png.flaticon.com/512/615/615075.png"
                            alt="Timeline Icon"
                            className="about-metric-icon"
                            style={{ width: "50px", height: "50px" }}
                        />
                        <p className="about-metric-text">
                            Created by AJ, Ethan, and Johnny
                        </p>
                    </div>
                </div>
            </div>
            <div className="about-sidebar"></div>
        </div>
    );
};

export default AboutPage;
