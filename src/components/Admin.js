import React, { Component } from 'react';
import axios from 'axios'

import AdminBig from './AdminBig';
import AdminUser from './AdminUser';
import AdminProduct from './AdminProduct';
import AdminGrossing from './AdminGrossing';

class Admin extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      userAmount : 0,
      shopAmount : 0,
      productAmount : 0,
      grossing : 0
    }
  }
  componentDidMount(){
    axios.get('http://localhost:5000/user/')
    .then(
      res => {
        this.setState({
          userAmount : res.data.length,
          shopAmount : res.data.length,
        })
      })
      
    axios.get('http://localhost:5000/product/')
    .then(
      res => {
        this.setState({
          productAmount : res.data.length,
        })
      })
  }

  render() {

    return (
      <div>
        {/* Top bar Start */}
        <div className="top-bar">
          <div className="container-fluid">
            <div className="row">
              <div className="col-sm-6">
                <i className="fa fa-user" />
                Login by: Administrator
              </div>
              <div className="col-sm-6">
                <i className="fa fa-phone" />
                0969.71.88.04
              </div>
            </div>
          </div>
        </div>
        {/* Top bar End */}

        {/* Bottom Bar Start */}
        <div className="bottom-bar">
          <div className="container-fluid">
            <div className="row align-items-center">
              <div className="col-md-3">
                <div className="logo">
                  <a>
                    <img src="http://localhost:3000/img/e.png" alt="Logo" />
                  </a>
                </div>
              </div>
              <div className="col-md-6">
                <table className="admin-table">
                  <tr className="table-title">
                    <th>User</th>
                    <th>Shop</th>
                    <th>Sản Phẩm</th>
                  </tr>
                  <tr>
                    <td>{this.state.userAmount}</td>
                    <td>{this.state.shopAmount}</td>
                    <td>{this.state.productAmount}</td>
                  </tr>
                </table>
              </div>
              <div className="col-md-3">
                <marquee className="admin-marquee">Welcome to Administrator Page!</marquee>
              </div>
            </div>
          </div>
        </div>
        {/* Bottom Bar End */}

        {/* My Account Start */}
        <div className="my-account">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-3">
                <div className="nav flex-column nav-pills" role="tablist" aria-orientation="vertical">
                  <a className="nav-link active" id="dashboard-nav" data-toggle="pill" href="#dashboard-tab" role="tab"><i className="fa fa-tachometer" />Quản lý Danh Mục</a>
                  {/* <a className="nav-link" id="orders-nav" data-toggle="pill" href="#orders-tab" role="tab"><i className="fa fa-shopping-bag" />Orders</a> */}
                  <a className="nav-link" id="address-nav" data-toggle="pill" href="#address-tab" role="tab"><i className="fa fa-user" />Quản lý User/Shop</a>
                  <a className="nav-link" id="product-nav" data-toggle="pill" href="#product-tab" role="tab"><i className="fa fa-user" />Quản lý Sản Phẩm</a>
                  <a className="nav-link" id="payment-nav" data-toggle="pill" href="#grossing-tab" role="tab"><i className="fa fa-user" />Tổng Doanh Thu</a>
                </div>
              </div>
              <div className="col-md-9">
                <div className="tab-content">
                  <div className="tab-pane fade show active" id="dashboard-tab" role="tabpanel" aria-labelledby="dashboard-nav">
                  <AdminBig/>
                  </div>
                  <div className="tab-pane fade" id="address-tab" role="tabpanel" aria-labelledby="address-nav">
                  <AdminUser/>
                  </div>
                  <div className="tab-pane fade" id="product-tab" role="tabpanel" aria-labelledby="product-nav">
                  <AdminProduct/>
                  </div>
                  <div className="tab-pane fade" id="grossing-tab" role="tabpanel" aria-labelledby="payment-nav">
                  <AdminGrossing/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* My Account End */}

      </div>
    )

  }

}

export default Admin;