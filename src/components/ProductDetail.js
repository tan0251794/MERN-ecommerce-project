import React, { Component } from 'react';
import axios from 'axios'
import AppTop from './AppTop';
import AppBot from './AppBot';

class ProductDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      bigs: new Array(),
      products: new Array(),
      product: [],
      productShop: [],
      productDanhGia: [],
      //relate product
      relateProducts: new Array(),
      productType: "", 
      productId: "", 
      //product of shop
      shopProducts: new Array(), 
      owner: false,
      currentStar: 0,
      user: [],
      review: "",
      averageStar: 0
    }

    this.onChangeReview = this.onChangeReview.bind(this);
  }

  onChangeReview(e) {
    this.setState({
      review: e.target.value,
    })
  }


  componentDidMount() {
    //get id from url
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const productID = urlParams.get('id')

    var dataForm = {
      inputId: productID
    }
    axios.post('http://localhost:5000/product/findById', dataForm)
      .then(
        res => {
          console.log(res.data);
          this.setState({
            product: res.data,
            productType: res.data.smallName,
            productId: res.data._id,
            productDanhGia: res.data.danhGia
          })
          var sumOfStar = 0
          res.data.danhGia.forEach(element => {
            sumOfStar += parseInt(element.star)
          });
          this.setState({
            averageStar: Math.round(sumOfStar / res.data.danhGia.length)
          })

          var dataForm2 = {
            inputId: res.data.id_shop
          }
          axios.post('http://localhost:5000/shop/findById', dataForm2)
            .then(
              res => {
                this.setState({
                  productShop: res.data
                })
              })

          var dataForm = {
            inputId: res.data.id_shop
          }
          axios.post('http://localhost:5000/product/findByShopID', dataForm)
            .then(
              res => {
                var shopProducts = res.data
                this.setState({
                  shopProducts: shopProducts
                })
              })

          if (res.data.id_shop == localStorage.getItem("currentUserShopID")) {
            this.setState({ owner: true })
          }
        })


    let dataForm3 = {
      inputId: localStorage.getItem("currentUserID")
    }
    axios.post('http://localhost:5000/user/findByID', dataForm3)
      .then(
        res => {
          this.setState({
            user: res.data
          })
        })


    axios.get('http://localhost:5000/big/')
      .then(
        res => {
          // console.log(res.data)
          var bigs = res.data
          this.setState({
            bigs: bigs
          })
        })

    axios.get('http://localhost:5000/product/')
      .then(
        res => {
          var products = res.data
          this.setState({
            products: products
          })
          var relateProducts = new Array()
          res.data.forEach(sp => {
            if (sp.smallName == this.state.productType) {
              relateProducts.push(sp)
            }
          });
          this.setState({
            relateProducts: relateProducts
          })
        })


    let dataForm2 = {
      inputId: productID,
    }
    axios.post('http://localhost:5000/product/upView', dataForm2)
      .then(
        res => {
          console.log(res.data);
        })



  }



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
    else if (!localStorage.getItem("currentUserID")) {
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

      axios.post('http://localhost:5000/user/addCart', dataForm)
        .then(
          res => {
            window.location.href = "/cart/"
          })
    }
    else if (!localStorage.getItem("currentUserID")) {
      alert("Vui lòng đăng nhập để thêm vào giỏ hàng!")
      window.location.href = "/user-login/"
    }

  }


  nameDisplay() {
    if (localStorage.getItem("currentUserID")) {
      return (<>{this.state.user.firstName} {this.state.user.lastName}</>)
    } else {
      return (<> chưa đăng nhập</>)
    }
  }

  setStar(e) {
    this.setState({
      currentStar: e.target.value
    })
  }

  starCount(numberOfStar) {
    let menuItems = [];
    for (let index = 0; index < numberOfStar; index++) {
      menuItems.push(<i className="fa fa-star" />);
    }
    if (!numberOfStar) { 
      menuItems.push(<div>Chưa Đánh Giá</div>)
    }
    return (menuItems);
  }

  updateComment() {
    var dataForm = {
      inputId: this.state.productId,
      name: this.state.user.firstName + " " + this.state.user.lastName,
      comment: this.state.review,
      star: this.state.currentStar,
      ngayDang: new Date()
    }
    axios.post('http://localhost:5000/product/addComment', dataForm)
      .then(
        res => {
          this.setState({
            product: res.data
          })
          window.location.href = "/product-detail/?id=" + this.state.productId
        })
  }


  guessForm() {
    return (
      <div>
        <div className="product-detail-top">
          <div className="row align-items-center">
            <div className="col-md-5 ">
              <img src={`http://localhost:3000/img/upload/${this.state.product.hinh}`} className="main_img" />
            </div>
            <div className="col-md-7">
              <div className="product-content">
                <div className="title"><h2>{this.state.product.ten_sp}</h2></div>
                <div className="ratting">
                  {this.starCount(this.state.averageStar)}
                </div>
                <div>Lượt xem: {this.state.product.luot_xem}</div>
                <div className="price">
                  <h4>Price:</h4>
                  <p>${this.state.product.gia} <span>${this.state.product.gia * 1.25}</span></p>
                </div>
                <div className="quantity">
                  <h4>Quantity:</h4>
                  <div className="qty">
                    <button className="btn-minus"><i className="fa fa-minus" /></button>
                    <input type="text" defaultValue={1} />
                    <button className="btn-plus"><i className="fa fa-plus" /></button>
                  </div>
                </div>
                <div className="p-size">
                  <h4>Size:</h4>
                  <div className="btn-group btn-group-sm">
                    <button type="button" className="btn">S</button>
                    <button type="button" className="btn">M</button>
                    <button type="button" className="btn">L</button>
                    <button type="button" className="btn">XL</button>
                  </div>
                </div>
                <div className="p-color">
                  <h4>Color:</h4>
                  <div className="btn-group btn-group-sm">
                    <button type="button" className="btn">White</button>
                    <button type="button" className="btn">Black</button>
                    <button type="button" className="btn">Blue</button>
                  </div>
                </div>
                <div className="action">
                  <a className="btn" onClick={() => { this.addCart(this.state.product._id) }}><i className="fa fa-shopping-cart" />Add to Cart</a>
                  <a className="btn" onClick={() => { this.goToCart(this.state.product._id) }}><i className="fa fa-shopping-bag" />Buy Now</a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row product-detail-bottom">
          <div className="col-lg-12">
            <ul className="nav nav-pills nav-justified">
              <li className="nav-item">
                <a className="nav-link active" data-toggle="pill" href="#description">Mô Tả Sản Phẩm</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" data-toggle="pill" href="#shopInfo">Thông Tin Shop</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" data-toggle="pill" href="#reviews">Đánh Giá (1)</a>
              </li>
            </ul>
            <div className="tab-content">
              <div id="description" className="container tab-pane active">
                <h4>Mô Tả Sản Phẩm</h4>
                <p>
                  {this.state.product.mo_ta}
                </p>
              </div>
              <div id="shopInfo" className="container tab-pane fade">
                <h4>Thông Tin Shop</h4>
                <p>
                  <div className="row shop">
                    <div className="col-md-4">
                      <b><a href={"/shop-detail/" + this.state.productShop._id}>{this.state.productShop.ten_shop}</a></b><br />
                      <img src={`http://localhost:3000/img/upload/${this.state.productShop.anh_cover}`} className="avatar-img" /> </div>

                    <div className="col-md-4">
                      <ul style={{ listStyleType: "square" }}>
                        <li>Đánh Giá: {this.state.productShop.diem_danhgia}</li>
                        <li>Đang Theo:</li>
                        <li>Tỉ lệ phản hồi chat:</li>
                      </ul>
                    </div>
                    <div className="col-md-4">
                      <ul style={{ listStyleType: "square" }}>
                        <li>Tỉ lệ Shop hủy đơn</li>
                        <li>Người Theo Dõi: {this.state.productShop.so_theodoi}</li>
                        <li>Tham Gia: {this.state.productShop.ngay_thamgia} </li>
                      </ul>
                    </div>
                  </div>
                </p>
              </div>
              <div id="reviews" className="container tab-pane fade">
                {this.state.productDanhGia.map((obj, idx) => {
                  return (<div key={idx}>
                    <div className="reviews-submitted">
                      <div className="reviewer">{obj.userName} - <span>{obj.ngayDang}</span></div>
                      <div className="ratting">
                        {this.starCount(obj.star)}
                      </div>
                      <p>
                        {obj.comment}
                      </p>
                    </div>
                  </div>
                  );
                })}

                <div className="reviews-submit">
                  <h4>Viết đánh giá của bạn:</h4>
                  <div className="stars" onChange={this.setStar.bind(this)}>
                    <input className="star star-5" id="star-5" type="radio" name="star" value="5" />
                    <label className="star star-5" htmlFor="star-5" />
                    <input className="star star-4" id="star-4" type="radio" name="star" value="4" />
                    <label className="star star-4" htmlFor="star-4" />
                    <input className="star star-3" id="star-3" type="radio" name="star" value="3" />
                    <label className="star star-3" htmlFor="star-3" />
                    <input className="star star-2" id="star-2" type="radio" name="star" value="2" />
                    <label className="star star-2" htmlFor="star-2" />
                    <input className="star star-1" id="star-1" type="radio" name="star" value="1" />
                    <label className="star star-1" htmlFor="star-1" />
                  </div>
                  <div className="row form">
                    <div className="col-sm-12">
                      <h5>Người dùng: {this.nameDisplay()}</h5>
                    </div>
                    <div className="col-sm-12">
                      <textarea placeholder="Review" onChange={this.onChangeReview} />
                    </div>
                    <div className="col-sm-12">
                      <button onClick={() => {
                        if (!localStorage.getItem("currentUserID")) {
                          return alert("Đăng nhập để bình luận!")
                        }
                        if (this.state.currentStar == 0) {
                          return alert("Bạn chưa đánh giá sao!")
                        }
                        if (this.state.review.length <= 20) {
                          return alert("Bình luận tối thiểu 20 ký tự!")
                        }
                        this.updateComment()
                      }}>Submit</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  contentDisplay() {
    if (!this.state.owner) {
      return this.guessForm()
    } else {
      return this.guessForm()
    }
  }

  render() {
    return (
      <div>
        <AppTop />
        {/* Product Detail Start */}
        <div className="product-detail">
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-8">
                {this.contentDisplay()}
                <div className="product">
                  <div className="section-header">
                    <h1>Có Thể Bạn Thích</h1>
                  </div>
                  <div className="row align-items-center product-slider product-slider-3">
                    {this.state.relateProducts.slice(0, 6).map((obj, idx) => {
                      if (obj._id != this.state.productId) {
                        return (
                          <div className="col-md-4" key={idx}>
                            <div className="product-item mb-3">
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
                                  <a href="#"><i className="fa fa-cart-plus" /></a>
                                  <a href={"/product-detail/?id=" + obj._id}><i className="fa fa-search" /></a>
                                </div>
                              </div>
                              <div className="product-price">
                                <h3 className="price-edit"><span>$</span>{obj.gia}</h3>
                                <a className="btn" href><i className="fa fa-shopping-cart" />Mua Ngay</a>
                              </div>
                            </div>
                          </div>
                        );
                      }
                    } 
                    )}
                  </div>
                </div>
              </div>

              {/* Side Bar Start */}
              <div className="col-lg-4">
                <div className="sidebar-widget widget-slider">
                  <div className="sidebar-slider normal-slider">
                    <h2 className="title">Sản Phẩm Khác Của Shop</h2>
                    {this.state.shopProducts.slice(0, 4).map((obj, idx) => {
                      if (obj._id != this.state.productId) {
                        return (
                          <div key={idx}>
                            <div className="product-item mb-3">
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
                                  <a href="#"><i className="fa fa-cart-plus" /></a>
                                  <a href={"/product-detail/?id=" + obj._id}><i className="fa fa-search" /></a>
                                </div>
                              </div>
                              <div className="product-price">
                                <h3 className="price-edit"><span>$</span>{obj.gia}</h3>
                                <a className="btn" href><i className="fa fa-shopping-cart" />Mua Ngay</a>
                              </div>
                            </div>
                          </div>
                        );
                      }
                    } 
                    )}
                  </div>
                </div>

                <div className="sidebar-widget tag">
                  <h2 className="title">Tags Cloud</h2>
                  <a href="#">Lorem ipsum</a>
                  <a href="#">Vivamus</a>
                  <a href="#">Phasellus</a>
                  <a href="#">pulvinar</a>
                  <a href="#">Curabitur</a>
                  <a href="#">Fusce</a>
                  <a href="#">Sem quis</a>
                  <a href="#">Mollis metus</a>
                  <a href="#">Sit amet</a>
                  <a href="#">Vel posuere</a>
                  <a href="#">orci luctus</a>
                  <a href="#">Nam lorem</a>
                </div>
              </div>
              {/* Side Bar End */}
            </div>
          </div>
        </div>

        {/* Product Detail End */}
        <AppBot />
      </div>

    );
  }
}

export default ProductDetail;