import React, { Component } from 'react';
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";


//nav
class AppTop extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      logged: false
    }
  }

  loggedContent = () => {
    return (
      <div>
        <a href="#" className="nav-link dropdown-toggle" data-toggle="dropdown">
          Xin chào &nbsp;{localStorage.getItem("currentUserName")}!
          </a>
        <div className="dropdown-menu">
          <NavLink to="/user-detail" className="dropdown-item">Tài Khoản Của Tôi</NavLink >
          <NavLink to="/cart" className="dropdown-item">Giỏ Hàng</NavLink >
          <li className="dropdown-item" onClick={() => {
            localStorage.removeItem("currentUserID");
            localStorage.removeItem("currentUserName");
            localStorage.removeItem("currentUserShopID");
            window.location.href = "/"
          }}>Đăng Xuất</li>
        </div>
      </div>
    )
  }

  yetLoggedContent = () => {
    return (
      <div>
        <a href="#" className="nav-link dropdown-toggle" data-toggle="dropdown">Tài Khoản</a>
        <div className="dropdown-menu">
          <NavLink to="/user-login" className="dropdown-item">Đăng Ký & Đăng Nhập</NavLink >
        </div>
      </div>
    )
  }

  displayCheck = () => {
    if (!localStorage.getItem("currentUserID")) {
      return this.yetLoggedContent()
    } else {
      return this.loggedContent()
    }
  }

  displayMyshopCheck = () => {
    if (localStorage.getItem("currentUserID")) {
      return (
        <div>
          <NavLink to={"/shop-detail/" + localStorage.getItem("currentUserShopID")} className="nav-item nav-link">Kênh Người Bán</NavLink >
        </div>
      )
    }
  }

  render() {
    return (
      <div>
        {/* Top bar Start */}
        <div className="top-bar">
          <div className="container-fluid">
            <div className="row">
              <div className="col-sm-6">
                <i className="fa fa-envelope" />
                eShop@gmail.com
              </div>
              <div className="col-sm-6">
                <i className="fa fa-phone" />
                0969.71.88.04
              </div>
            </div>
          </div>
        </div>
        {/* Top bar End */}
        {/* Nav Bar Start */}
        <div className="nav">
          <div className="container-fluid">
            <nav className="navbar navbar-expand-md bg-dark navbar-dark">
              <a href="#" className="navbar-brand">Mục Lục</a>
              <button type="button" className="navbar-toggler" data-toggle="collapse" data-target="#navbarCollapse">
                <span className="navbar-toggler-icon" />
              </button>
              <div className="collapse navbar-collapse justify-content-between" id="navbarCollapse">
                <div className="navbar-nav mr-auto">
                  <NavLink to="/" className="nav-item nav-link active">Trang Chủ</NavLink >
                  <NavLink to="/product-list/?id=all" className="nav-item nav-link">Sản Phẩm</NavLink >
                  {this.displayMyshopCheck()}
                  <NavLink to="/contact" className="nav-item nav-link">Liên Hệ</NavLink >
                  <div className="nav-item dropdown">
                    <a href="#" className="nav-link dropdown-toggle" data-toggle="dropdown">Tin Tức</a>
                    <div className="dropdown-menu">
                      <NavLink to="/" className="nav-item nav-link">Bài Viết</NavLink >
                      <NavLink to="/" className="nav-item nav-link">Tin Khuyến Mãi</NavLink >
                    </div>
                  </div>
                </div>
                <div className="navbar-nav ml-auto mr-5">
                  <div className="nav-item dropdown">
                    {this.displayCheck()}
                  </div>
                </div>
              </div>
            </nav>
          </div>
        </div>
        {/* Nav Bar End */}
        {/* Bottom Bar Start */}
        <div className="bottom-bar">
          <div className="container-fluid">
            <div className="row align-items-center">
              <div className="col-md-3">
                <div className="logo">
                  <NavLink to="/">
                    <img src="http://localhost:3000/img/e.png" alt="Logo" />
                  </NavLink>
                </div>
              </div>
              <div className="col-md-6">
                <div className="search">
                  <input type="text" placeholder="Search" />
                  <button><i className="fa fa-search" /></button>
                </div>
              </div>
              <div className="col-md-3">
                <div className="user">
                  <a href="cart.html" className="btn cart">
                    <i className="fa fa-shopping-cart" />
                    <span>(0)</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Bottom Bar End */}
      </div>
    )
  }
}

export default AppTop;