import React, { Component } from 'react';
import {Link} from "react-router-dom";

class AppBot extends Component {
    render() {
        return (
  <div>
    {/* Footer Start */}
    <div className="footer">
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-3 col-md-6">
            <div className="footer-widget">
              <h2>Get in Touch</h2>
              <div className="contact-info">
                <p><i className="fa fa-map-marker" />123 E Store, Los Angeles, USA</p>
                <p><i className="fa fa-envelope" />email@example.com</p>
                <p><i className="fa fa-phone" />+123-456-7890</p>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-6">
            <div className="footer-widget">
              <h2>Follow Us</h2>
              <div className="contact-info">
                <div className="social">
                  <Link to="#"><i className="fa fa-twitter" /></Link>
                  <Link to="#"><i className="fa fa-facebook-f" /></Link>
                  <Link to="#"><i className="fa fa-linkedin" /></Link>
                  <Link to="#"><i className="fa fa-instagram" /></Link>
                  <Link to="#"><i className="fa fa-youtube" /></Link>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-6">
            <div className="footer-widget">
              <h2>Company Info</h2>
              <ul>
                <li><a href="#">About Us</a></li>
                <li><a href="#">Privacy Policy</a></li>
                <li><a href="#">Terms &amp; Condition</a></li>
              </ul>
            </div>
          </div>
          <div className="col-lg-3 col-md-6">
            <div className="footer-widget">
              <h2>Purchase Info</h2>
              <ul>
                <li><a href="#">Payment Policy</a></li>
                <li><a href="#">Shipping Policy</a></li>
                <li><a href="#">Return Policy</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="row payment align-items-center">
          <div className="col-md-6">
            <div className="payment-method">
              <h2>We Accept:</h2>
              <img src="http://localhost:3000/img/payment-method.png" alt="Payment Method" />
            </div>
          </div>
          <div className="col-md-6">
            <div className="payment-security">
              <h2>Secured By:</h2>
              <img src="http://localhost:3000/img/godaddy.svg" alt="Payment Security" />
              <img src="http://localhost:3000/img/norton.svg" alt="Payment Security" />
              <img src="http://localhost:3000/img/ssl.svg" alt="Payment Security" />
            </div>
          </div>
        </div>
      </div>
    </div>
    {/* Footer End */}
    {/* Footer Bottom Start */}
    <div className="footer-bottom">
      <div className="container">
        <div className="row">
          <div className="col-md-6 copyright">
            <p>Copyright © <a href="https://htmlcodex.com">HTML Codex</a>. All Rights Reserved</p>
          </div>
          <div className="col-md-6 template-by">
            <p>Template By <a href="https://htmlcodex.com">HTML Codex</a></p>
          </div>
        </div>
      </div>
    </div>
    {/* Footer Bottom End */}       
    {/* Back to Top */}
    <a href="#" className="back-to-top"><i className="fa fa-chevron-up" /></a>
  </div>
  
        );
    }
}

export default AppBot;