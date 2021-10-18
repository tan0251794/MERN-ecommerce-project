import React, { Component } from 'react';
import axios from 'axios'
import '../css/App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch
} from "react-router-dom";
import AppBot from './AppBot';
import AppTop from './AppTop';

class Categories extends Component {
  constructor(props) {
    super(props);

    this.state = {
      bigs: new Array(),
    }
  }


  componentDidMount() {
    //find all Big category
    axios.get('http://localhost:5000/big/')
      .then(
        res => {
          console.log(res.data)
          var bigs = res.data
          this.setState({
            bigs: bigs
          })
        })

  }

  render() {
    return (
      <div>
        <div id="category" className="category">
          <div className="container-fluid">
            <div className="row">
              <div className="cate-box-header col-12">
                <h1>DANH MỤC</h1>
              </div>
              {this.state.bigs.map((obj, idx) => {
                return (<div key={idx}>
                  <div className="category-icon">
                    <a className="category-icon-name" href={"/product-list/?id=" + obj.ten_danh_muc}>
                      <p><h4>{obj.ten_danh_muc}</h4></p>
                    </a>
                  </div>
                </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

class Home extends Component {

  render() {
    return (
      <div>

        {/* Main Slider Start */}
        <div className="header">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-3">
                <nav className="navbar bg-light">
                  <ul className="navbar-nav">
                    <li className="nav-item">
                      <a className="nav-link" href="#category"><i className="fa fa-home" />Danh Mục</a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="#article "><i className="fa fa-calendar" />Top Cửa Hàng</a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="#featured"><i className="fa fa-shopping-bag" />Top Bán Chạy Nhất</a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="#recent"><i className="fa fa-plus-square" />Hàng Mới Về</a>
                    </li>
                  </ul>
                </nav>
              </div>
              <div className="col-md-6">
                <div className="header-slider normal-slider">
                  <div className="header-slider-item">
                    <img src="http://localhost:3000/img/slider-1.jpg" alt="Slider Image" />
                    <div className="header-slider-caption">
                      <p>Top sản phẩm bán chạy tuần này!</p>
                      <a className="btn" href="/product-list/?id=all">Vào Xem Ngay</a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="header-img">
                  <div className="img-item">
                    <img src="http://localhost:3000/img/category-1.jpg" />
                    <a className="img-text" href>
                      <p>Bài viết</p>
                    </a>
                  </div>
                  <div className="img-item">
                    <img src="http://localhost:3000/img/category-2.jpg" />
                    <a className="img-text" href>
                      <p>Tin Khuyến Mãi</p>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    );
  }
}

class Mid extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      products: new Array(),
      productSortDate: new Array(),
      productSortRate: new Array(),
      paginationPages: 0,
      currentPage1: 1,
      currentPage2: 1,
      email: ""
    }

    this.onChangeMail = this.onChangeMail.bind(this);
  }

  onChangeMail(e) {
    this.setState({
      email: e.target.value,
    })
  }

  componentDidMount() {
    //find all products
    axios.get('http://localhost:5000/product/')
      .then(
        res => {
          console.log(res.data)
          var products = res.data
          var productSortDate = products.slice(0);
          productSortDate.sort((a, b) => (a.createdAt < b.createdAt) ? 1 : -1)
          var productSortRate = products.slice(0);
          productSortRate.sort((a, b) => (a.gia > b.gia) ? 1 : -1)
          this.setState({
            products: products,
            productSortDate: productSortDate,
            productSortRate: productSortRate,
            paginationPages: Math.floor(res.data.length / 4) + 1 //chia nguyên
          })
        })

  }

  paginationDisplay1() {
    let menuItems = [];
    for (let index = 2; index <= this.state.paginationPages; index++) {
      menuItems.push(<li className="page-item">
        <a className="page-link" onClick={() => { this.setState({ currentPage1: index }) }}>{index}</a>
        </li>);
    }
    return (menuItems);
  }

  paginationDisplay2() {
    let menuItems = [];
    for (let index = 2; index <= this.state.paginationPages; index++) {
      menuItems.push(<li className="page-item"><a className="page-link" onClick={() => { this.setState({ currentPage2: index }) }}>{index}</a></li>);
    }
    return (menuItems);
  }

  //cart

  addCart(productId) {
    if (localStorage.getItem("currentUserID")) {
      var dataForm = {
        productId: productId,
        userId: localStorage.getItem("currentUserID"),
        quantily: 1
      }
      console.log(dataForm);
      axios.post('http://localhost:5000/user/addCart', dataForm)
        .then(
          res => {
            alert("Sản Phẩm đã được thêm, đến Tài khoản->Giỏ hàng xem!")
          })
    }
    else if(!localStorage.getItem("currentUserID")) {
      alert("Vui lòng đăng nhập để thêm vào giỏ hàng!")
      window.location.href = "/user-login/"
    }
  }

  goToCart(productId) {
      if (localStorage.getItem("currentUserID")) {
        var dataForm = {
          productId: productId,
          userId: localStorage.getItem("currentUserID"),
          quantily: 1
        }
        console.log(dataForm);
        axios.post('http://localhost:5000/user/addCart', dataForm)
          .then(
            res => {
              window.location.href = "/cart/"
            })
      }
      else if(!localStorage.getItem("currentUserID")) {
        alert("Vui lòng đăng nhập để thêm vào giỏ hàng!")
        window.location.href = "/user-login/"
      }

  }

  render() {
    return (
      <div>
        <Categories />
        {/* Feature Start*/}
        <div className="feature">
          <div className="container-fluid">
            <div className="row align-items-center">
              <div className="col-lg-3 col-md-6 feature-col">
                <div className="feature-content">
                  <i className="fa fa-cc-mastercard" />
                  <h2>Thanh Toán An Toàn</h2>
                  <p>
                    Bảo đảm an toàn khi thực hiện thanh toán mua hàng hóa.
            </p>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 feature-col">
                <div className="feature-content">
                  <i className="fa fa-truck" />
                  <h2>Giao Dịch Quốc Tế</h2>
                  <p>
                    Giao dịch quốc tế gồm nhiều phương thức khác nhau.
            </p>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 feature-col">
                <div className="feature-content">
                  <i className="fa fa-retweet" />
                  <h2>90 Ngày Đổi Trả</h2>
                  <p>
                    Chủ động gọi điện thông báo cho Quý khách đến nhận hàng sớm hơn.
            </p>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 feature-col">
                <div className="feature-content">
                  <i className="fa fa-comments" />
                  <h2>Hỗ Trợ 24/7</h2>
                  <p>
                    Hỗ trợ Quý khách hàng mọi lúc mọi nơi với các kênh hỗ trợ đa dạng.
            </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Feature End*/}
        {/* Category Start*/}
        <div id="article" className="category">
          <div className="container-fluid">
            <div className="row">
              <div className="cate-box-header col-12">
                <h1>CỬA HÀNG ĐỀ CỬ</h1>
              </div>
              <div className="col-md-3">
                <div className="category-item ch-400">
                  <img src="http://localhost:3000/img/category-3.jpg" />
                  <a className="category-name" href={'http://localhost:3000/shop-detail/6044fe2d2b156c15145fcd20'}>
                    <p>ViVi Shop</p>
                  </a>
                </div>
              </div>
              <div className="col-md-3">
                <div className="category-item ch-250">
                  <img src="http://localhost:3000/img/category-4.jpg" />
                  <a className="category-name" href={"http://localhost:3000/shop-detail/6035257e09144924d4c2d8ea"}>
                    <p>Local Shop</p>
                  </a>
                </div>
                <div className="category-item ch-150">
                  <img src="http://localhost:3000/img/category-5.jpg" />
                  <a className="category-name" href={"http://localhost:3000/shop-detail/602e352e84e1532798f97c7a"}>
                    <p>BB Shop</p>
                  </a>
                </div>
              </div>
              <div className="col-md-3">
                <div className="category-item ch-150">
                  <img src="http://localhost:3000/img/category-6.jpg" />
                  <a className="category-name" href={"http://localhost:3000/shop-detail/603513ea09144924d4c2d8df"}>
                    <p>Tiki Shop</p>
                  </a>
                </div>
                <div className="category-item ch-250">
                  <img src="http://localhost:3000/img/category-7.jpg" />
                  <a className="category-name" href={"http://localhost:3000/shop-detail/603779a5d8d4db215000d39f"}>
                    <p>BookStore</p>
                  </a>
                </div>
              </div>
              <div className="col-md-3">
                <div className="category-item ch-400">
                  <img src="http://localhost:3000/img/category-8.jpg" />
                  <a className="category-name" href={"http://localhost:3000/shop-detail/604746494ed1e23674d9b34b"}>
                    <p>GG Shop</p>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Category End*/}
        {/* Call to Action Start */}
        <div className="call-to-action">
          <div className="container-fluid">
            <div className="row align-items-center">
              <div className="col-md-6">
                <h1>Gọi số này nếu bạn có thắc mắc</h1>
              </div>
              <div className="col-md-6">
                <a href="tel:0123456789">+012-345-6789</a>
              </div>
            </div>
          </div>
        </div>
        {/* Call to Action End */}
        {/* Featured Product Start */}
        <div id="featured" className="featured-product product">
          <div className="container-fluid">
            <div className="section-header">
              <h1>Sản Phẩm Nổi Bật</h1>
            </div>
            <div className="row align-items-center product-slider product-slider-4">
              {/* loop part */}
              {this.state.productSortRate.slice(this.state.currentPage1 * 4 - 4, this.state.currentPage1 * 4).map((obj, idx) => {
                return (
                  <div className="col-lg-3" key={idx}>
                    <div className="product-item">
                      <div className="product-title">
                        <a href="#">{obj.ten_sp}</a>
                        <div className="ratting">
                          <i className="fa fa-star" />
                          <i className="fa fa-star" />
                          <i className="fa fa-star" />
                          <i className="fa fa-star" />
                          <i className="fa fa-star" />
                        </div>
                      </div>
                      <div className="product-image">
                        <a href={"/product-detail/" + obj._id}>
                          <img src={`http://localhost:3000/img/upload/${obj.hinh}`} alt="Product Image" />
                        </a>
                        <div className="product-action">
                          <a onClick={() => { this.addCart(obj._id) }}><i className="fa fa-cart-plus" /></a>
                          <a href={"/product-detail/?id=" + obj._id}><i className="fa fa-search" /></a>
                        </div>
                      </div>
                      <div className="product-price">
                        <h3 className="price-edit"><span>$</span>{obj.gia}</h3>
                        <a className="btn" onClick={() => { this.goToCart(obj._id) }}><i className="fa fa-shopping-cart" />Mua Ngay</a>
                      </div>
                    </div>
                  </div>
                );
              })}
              {/* end loop */}

              {/* Pagination Start , featuring products*/}
              <div className="col-md-12 mt-3">
                <nav aria-label="Page navigation example">
                  <ul className="pagination justify-content-center">
                    <li className="page-item">
                      <a className="page-link" onClick={() => {
                        var cur;
                        if (this.state.currentPage1 > 1) {
                          cur = this.state.currentPage1 - 1;
                        } else { cur = this.state.currentPage1 }
                        this.setState({ currentPage1: cur })
                      }
                      }>Trước</a>
                    </li>
                    <li className="page-item"><a className="page-link" onClick={() => { this.setState({ currentPage1: 1 }) }}>1</a></li>
                    {this.paginationDisplay1()}

                    <li className="page-item">
                      <a className="page-link" onClick={() => {
                        var cur2;
                        if (this.state.currentPage1 < this.state.paginationPages) {
                          cur2 = this.state.currentPage1 + 1;
                        } else { cur2 = this.state.currentPage1 }
                        this.setState({ currentPage1: cur2 })
                      }
                      }>Tiếp</a>
                    </li>
                  </ul>
                </nav>
              </div>
              {/* Pagination Start */}

            </div>
          </div>
        </div>
        {/* Featured Product End */}
        {/* Newsletter Start */}
        <div className="newsletter">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-6">
                <h1>Đăng ký nhận thư thông báo</h1>
              </div>
              <div className="col-md-6">
                <div className="form">
                  <input type="email" defaultValue="Điền email của bạn" onChange={this.onChangeMail} />
                  <button onClick={() => {
                    //email validate
                    var pattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
                    if (!pattern.test(String(this.state.email).toLowerCase())) {
                      return alert("Email không hợp lệ!")
                    } else {
                      return alert("Đăng ký thành công! Chúng tôi sẽ gửi thông báo đến " + this.state.email)
                    }
                  }}>Gửi</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Newsletter End */}
        {/* Recent Product Start */}
        <div id="recent" className="recent-product product">
          <div className="container-fluid">
            <div className="section-header">
              <h1>Sản Phẩm Mới Đăng</h1>
            </div>
            <div className="row align-items-center product-slider product-slider-4">
              {this.state.productSortDate.slice(this.state.currentPage2 * 4 - 4, this.state.currentPage2 * 4).map((obj, idx) => {
                return (
                  <div className="col-lg-3" key={idx}>
                    <div className="product-item">
                      <div className="product-title">
                        <a href="#">{obj.ten_sp}</a>
                        <div className="ratting">
                          <i className="fa fa-star" />
                          <i className="fa fa-star" />
                          <i className="fa fa-star" />
                          <i className="fa fa-star" />
                          <i className="fa fa-star" />
                        </div>
                      </div>
                      <div className="product-image">
                        <a href={"/product-detail/" + obj._id}>
                          <img src={`http://localhost:3000/img/upload/${obj.hinh}`} alt="Product Image" />
                        </a>
                        <div className="product-action">
                          <a onClick={() => { this.addCart(obj._id) }}><i className="fa fa-cart-plus" /></a>
                          <a href={"/product-detail/?id=" + obj._id}><i className="fa fa-search" /></a>
                        </div>
                      </div>
                      <div className="product-price">
                        <h3 className="price-edit"><span>$</span>{obj.gia}</h3>
                        <a className="btn" onClick={() => { this.goToCart(obj._id) }}><i className="fa fa-shopping-cart" />Mua Ngay</a>
                      </div>
                    </div>
                  </div>
                );
              })}


              {/* Pagination Start , newest products*/}
              <div className="col-md-12 mt-3">
                <nav aria-label="Page navigation example">
                  <ul className="pagination justify-content-center">
                    <li className="page-item">
                      <a className="page-link" onClick={() => {
                        var cur;
                        if (this.state.currentPage2 > 1) {
                          cur = this.state.currentPage2 - 1;
                        } else { cur = this.state.currentPage2 }
                        this.setState({ currentPage2: cur })
                      }
                      }>Trước</a>
                    </li>
                    <li className="page-item"><a className="page-link" onClick={() => { this.setState({ currentPage2: 1 }) }}>1</a></li>
                    {this.paginationDisplay2()}

                    <li className="page-item">
                      <a className="page-link" onClick={() => {
                        var cur2;
                        if (this.state.currentPage2 < this.state.paginationPages) {
                          cur2 = this.state.currentPage2 + 1;
                        } else { cur2 = this.state.currentPage2 }
                        this.setState({ currentPage2: cur2 })
                      }
                      }>Tiếp</a>
                    </li>
                  </ul>
                </nav>
              </div>
              {/* Pagination Start */}

            </div>
          </div>
        </div>
        {/* Recent Product End */}

      </div>


    )
  }
}


class Main extends Component {

  render() {
    return (
      <div>
        <AppTop />
        <Home />
        <Mid />
        <AppBot />
      </div>
    );
  }
}

export default Main;
