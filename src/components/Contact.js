import React, { Component } from 'react';
import AppBot from './AppBot';
import AppTop from './AppTop';


class UserDetail extends Component {
  render() {
      return (
        <div>
        <AppTop/>
<div>
  {/* Breadcrumb Start */}
  <div className="breadcrumb-wrap">
    <div className="container-fluid">
      <ul className="breadcrumb">
        <li className="breadcrumb-item"><a href="#">Home</a></li>
        <li className="breadcrumb-item"><a href="#">Products</a></li>
        <li className="breadcrumb-item active">Contact</li>
      </ul>
    </div>
  </div>
  {/* Breadcrumb End */}
  {/* Contact Start */}
  <div className="contact">
    <div className="container-fluid">
      <div className="row">
        <div className="col-lg-4">
          <div className="contact-info">
            <h2>Our Office</h2>
            <h3><i className="fa fa-map-marker" />123 Office, Los Angeles, CA, USA</h3>
            <h3><i className="fa fa-envelope" />office@example.com</h3>
            <h3><i className="fa fa-phone" />+123-456-7890</h3>
            <div className="social">
                <a href="#"><i className="fa fa-twitter" /></a>
                <a href="#"><i className="fa fa-facebook-f" /></a>
                <a href="#"><i className="fa fa-linkedin" /></a>
                <a href="#"><i className="fa fa-instagram" /></a>
                <a href="#"><i className="fa fa-youtube" /></a>
              </div>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="contact-info">
            <h2>Our Store</h2>
            <h3><i className="fa fa-map-marker" />123 Store, Los Angeles, CA, USA</h3>
            <h3><i className="fa fa-envelope" />store@example.com</h3>
            <h3><i className="fa fa-phone" />+123-456-7890</h3>
            <div className="social">
                <a href><i className="fa fa-twitter" /></a>
                <a href><i className="fa fa-facebook-f" /></a>
                <a href><i className="fa fa-linkedin" /></a>
                <a href><i className="fa fa-instagram" /></a>
                <a href><i className="fa fa-youtube" /></a>
              </div>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="contact-form">
            <form>
              <div className="row">
                <div className="col-md-6">
                  <input type="text" className="form-control" placeholder="Your Name" />
                </div>
                <div className="col-md-6">
                  <input type="email" className="form-control" placeholder="Your Email" />
                </div>
              </div>
              <div className="form-group">
                <input type="text" className="form-control" placeholder="Subject" />
              </div>
              <div className="form-group">
                <textarea className="form-control" rows={5} placeholder="Message" defaultValue={""} />
              </div>
              <div><button className="btn" type="submit">Send Message</button></div>
            </form>
          </div>
        </div>
        <div className="col-lg-12">
          <div className="contact-map">
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.628494044766!2d106.65396131411643!3d10.763088262384535!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752eec6713c88f%3A0xc51d63555e33a34f!2zMTgzIEzDqiDEkOG6oWkgSMOgbmgsIFBoxrDhu51uZyAxMywgUXXhuq1uIDExLCBUaMOgbmggcGjhu5EgSOG7kyBDaMOtIE1pbmgsIFZp4buHdCBOYW0!5e0!3m2!1svi!2stw!4v1612783507932!5m2!1svi!2stw" frameBorder={0} style={{border: 0}} allowFullScreen aria-hidden="false" tabIndex={0} />
          </div>
        </div>
      </div>
    </div>
  </div>
  {/* Contact End */}
</div>
<AppBot/>
</div>
      )

  }

}

export default UserDetail;