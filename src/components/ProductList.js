import React, { Component } from 'react';

import axios from 'axios'
import AppTop from './AppTop';
import AppBot from './AppBot';
class ProductList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      products: new Array(),
      bigs: new Array(),
      paginationPages: 0,
      currentPages: 1,
      categoryProducts: new Array()
    }
  }


  componentDidMount() {
    const dataForm = {
      name: this.state.name,
    }


    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const category = urlParams.get('id')
    axios.get('http://localhost:5000/product/')
    .then(
      res => {
        var products = res.data
        if (category == "all") {
          this.setState({
            products: products,
            categoryProducts: products,
            paginationPages: Math.floor(res.data.length /12) +1 //chia nguyên
          })
        }
        else{
          var categoryProducts = new Array()
          res.data.forEach(sp => {
            if (sp.bigName == category) {
              categoryProducts.push(sp)
            }
          });
          this.setState({
            products: products,
            categoryProducts: categoryProducts,
            paginationPages: Math.floor(categoryProducts.length /12) +1 //chia nguyên
          })
          console.log(this.state.categoryProducts);
        }

      })


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

paginationDisplay(){
  let menuItems = [];
  for (let index = 2; index <= this.state.paginationPages; index++) {
    menuItems.push(<li className="page-item"><a className="page-link" onClick={()=>{this.setState({currentPages : index})}}>{index}</a></li>);
  }
  return (menuItems);
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
  <AppTop/>
  {/* Breadcrumb Start */}
  <div className="breadcrumb-wrap">
    <div className="container-fluid">
      <ul className="breadcrumb">
      <li className="breadcrumb-item"><a href="#">Trang Chủ</a></li>
      <li className="breadcrumb-item"><a href="#">Sản Phẩm</a></li>
        <li className="breadcrumb-item active">Danh Sách Sản Phẩm</li>
      </ul>
    </div>
  </div>
  {/* Breadcrumb End */}
  {/* Product List Start */}
  <div className="product-view">
    <div className="container-fluid">
      <div className="row">
        <div className="col-lg-8">
          <div className="row">

                        {this.state.categoryProducts.slice(this.state.currentPages*12-12,this.state.currentPages*12).map((obj, idx) => {
                        return (
                            <div className="col-md-4" key={idx}>
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
                                        <a href={"/product-detail/"+obj._id}>
                                            <img src={`http://localhost:3000/img/upload/${obj.hinh}`} alt="Product Image" />
                                        </a>
                                        <div className="product-action">
                                            <a onClick={() => { this.addCart(obj._id) }}><i className="fa fa-cart-plus" /></a>
                                            <a href={"/product-detail/?id="+obj._id}><i className="fa fa-search" /></a>
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

          {/* Pagination Start */}
          <div className="col-md-12 mb-3">
            <nav aria-label="Page navigation example">
              <ul className="pagination justify-content-center">
                <li className="page-item">
                  <a className="page-link"  onClick={()=>{
                    var cur;
                    if (this.state.currentPages>1) {
                      cur = this.state.currentPages-1; 
                    }else{cur = this.state.currentPages}
                    this.setState({currentPages : cur})}
                    }>Previous</a>
                </li>
                <li className="page-item"><a className="page-link" onClick={()=>{this.setState({currentPages : 1})}}>1</a></li>
                {this.paginationDisplay()}
                
                <li className="page-item">
                  <a className="page-link" onClick={()=>{
                    var cur2;
                    if (this.state.currentPages < this.state.paginationPages) {
                      cur2 = this.state.currentPages+1; 
                    }else{cur2 = this.state.currentPages}
                    this.setState({currentPages : cur2})}
                    }>Next</a>
                </li>
              </ul>
            </nav>
          </div>
          {/* Pagination Start */}

                        </div>


        </div>           
        {/* Side Bar Start */}
        <div className="col-lg-4">
          <div className="sidebar-widget category">
            <h2 className="title">Danh Mục</h2>
            <nav className="navbar bg-light">
              <ul className="navbar-nav">
              <li className="nav-item">
                  <a className="nav-link"  href={'/product-list/?id=all'}><i className="fa fa-shirtsinbulk" />Tất Cả</a>
                </li>
              {this.state.bigs.map((obj, idx) => {
              return ( <div key={idx}>
                  <li className="nav-item">
                  <a className="nav-link"  href={"/product-list/?id=" + obj.ten_danh_muc}><i className="fa fa-shirtsinbulk" />{obj.ten_danh_muc}</a>
                </li>
                </div>
                );
              })}
              </ul>
            </nav>
          </div>
          <div className="sidebar-widget widget-slider">
            <div className="sidebar-slider normal-slider">
                   {this.state.products.slice(0,3).map((obj, idx) => {
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
  {/* Product List End */}
  <AppBot/>
</div>

  );
}
}
export default ProductList;