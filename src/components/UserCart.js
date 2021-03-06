import React, { Component } from 'react';
import axios from 'axios'
import AppTop from './AppTop';
import AppBot from './AppBot';


class UserCart extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      myCart: new Array(),
      tongGia: 0,
      ship: 2,
      thanhTien: 0
    }
  }
  componentDidMount() {
    var dataForm = {
      inputId: localStorage.getItem("currentUserID")
    }
    axios.post('http://localhost:5000/user/findById', dataForm)
      .then(
        res => {
          console.log(res.data.userCart);
          this.setState({
            myCart: res.data.userCart,
          })

          var sumary = 0;
          for (let index = 0; index < res.data.userCart.length; index++) {
            const sp = res.data.userCart[index];
            sumary += sp.quantily * sp.productPrice;
            this.setState({ tongGia: sumary })
          }
        })
  }


  modifyCart(productId, quantily) {
    if (localStorage.getItem("currentUserID")) {
      var dataForm = {
        productId: productId,
        userId: localStorage.getItem("currentUserID"),
        quantily: quantily 
      }
      console.log(dataForm);
      axios.post('http://localhost:5000/user/addCart', dataForm)
        .then(
          res => {
            window.location.href = "/cart/"
          })
    }
  }

  removeCart(productId) {
    var dataForm = {
      userId: localStorage.getItem("currentUserID"),
      productId: productId
    }
    axios.post('http://localhost:5000/user/removeCart', dataForm)
      .then(
        res => {
          console.log(res.data.userCart);
          this.setState({
            myCart: res.data.userCart,
          })
        })
  }

  createBill(){
    var dataForm = {
      "sanpham": this.state.myCart,
      "id_buyer": localStorage.getItem("currentUserID"),
      "total_price": this.state.tongGia + this.state.ship,
  };
  console.log(dataForm);

  axios.post('http://localhost:5000/bill/add', dataForm)
      .then(res => {
        console.log('successed');
      })
      .catch(err => console.log(err));
}
clearCart(){
  let dataForm = {
    "userId": localStorage.getItem("currentUserID"),
};
  axios.post('http://localhost:5000/user/removeAllCart', dataForm)
  .then(
    res => {
      console.log(res.data.userCart);
      this.setState({
        myCart: res.data.userCart,
      })
    })
}

  render() {
    return (
      <div>
        <AppTop />
        {/* Breadcrumb Start */}
        <div className="breadcrumb-wrap">
          <div className="container-fluid">
            <ul className="breadcrumb mb-4">
              <li className="breadcrumb-item"><a href="#">Trang Ch???</a></li>
              <li className="breadcrumb-item"><a href="#">S???n Ph???m</a></li>
              <li className="breadcrumb-item active">Gi??? H??ng</li>
            </ul>
          </div>
        </div>
        {/* Breadcrumb End */}

        {/* Cart Start */}
        <div className="cart-page">
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-8">
                <div className="cart-page-inner">
                  <div className="table-responsive">
                    <table className="table table-bordered">
                      <thead className="thead-dark">
                        <tr>
                          <th>S???n Ph???m</th>
                          <th>Gi??</th>
                          <th>S??? L?????ng</th>
                          <th>T???ng</th>
                          <th>X??a</th>
                        </tr>
                      </thead>
                      <tbody className="align-middle">
                        {this.state.myCart.map((obj, idx) => {
                          return (
                            <tr key={idx}>
                              <td>
                                <div className="img">
                                  <a href={"/product-detail/?id=" + obj.productId}><img src={`http://localhost:3000/img/upload/${obj.productImg}`} alt="Image" /></a>
                                  <p>{obj.productName}</p>
                                </div>
                              </td>
                              <td>${obj.productPrice}</td>
                              <td>
                                <div className="qty">
                                  <button onClick={() => { this.modifyCart(obj.productId, -1) }} className="btn-minus"><i className="fa fa-minus" /></button>
                                  <input type="text" defaultValue={obj.quantily} />
                                  <button onClick={() => { this.modifyCart(obj.productId, +1) }} className="btn-plus"><i className="fa fa-plus" /></button>
                                </div>
                              </td>
                              <td>${obj.productPrice * obj.quantily}</td>
                              <td><button onClick={() => { this.removeCart(obj._id) }}><i className="fa fa-trash" /></button></td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="cart-page-inner">
                  <div className="row">

                    <div className="col-md-12">
                      <div className="cart-summary">
                        <div className="cart-content">
                          <h1>T???ng Gi??? H??ng</h1>
                          <p>Gi?? S???n Ph???m<span>${this.state.tongGia}</span></p>
                          <p>Ph?? V???n Chuy???n<span>${this.state.ship}</span></p>
                          <h2>Th??nh Ti???n<span>${this.state.tongGia + this.state.ship} (???? VAT)</span></h2>
                        </div>
                        <div className="cart-btn">
                          <button className="float-right" onClick={() => {
                            if (this.state.myCart.length != 0) { //gi??? h??ng ph???i c?? h??ng m???i thanh to??n ???????c
                              alert('Thanh to??n th??nh c??ng!\n????n h??ng s??? v???n chuy???n ?????n b???n trong 2 ng??y l??m vi???c!')
                              this.createBill()
                              this.clearCart()
                            }
                          }}>Thanh To??n</button>

                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Cart End */}

        <AppBot />
      </div>

    );
  }
}


export default UserCart;