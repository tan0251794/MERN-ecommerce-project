import React, { Component } from 'react';
import axios from 'axios'
import AppBot from './AppBot';
import AppTop from './AppTop';



class UserDetail extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      firstName: "",
      lastName: "",
      phoneNo: "",
      address: "",
      userID: "",
      password: "",
      bills: [],
      curPass: "",
      newPass: "",
      confirmPass: "",
      firstNameChange: "",
      lastNameChange: "",
      phoneNoChange: "",
      addressChange: "",
      //modal
      modalbillProduct: [],
      modalbillTotalPrice: 0
    }

    this.onChangeCurPass = this.onChangeCurPass.bind(this);
    this.onChangeNewPass = this.onChangeNewPass.bind(this);
    this.onChangeConfirmPass = this.onChangeConfirmPass.bind(this);

    this.onChangeFirst = this.onChangeFirst.bind(this);
    this.onChangeLast = this.onChangeLast.bind(this);
    this.onChangePhone = this.onChangePhone.bind(this);
    this.onChangeAddress = this.onChangeAddress.bind(this);
  }
  onChangeCurPass(e) {
    this.setState({
      curPass: e.target.value,
    })
  }
  onChangeNewPass(e) {
    this.setState({
      newPass: e.target.value,
    })
  }
  onChangeConfirmPass(e) {
    this.setState({
      confirmPass: e.target.value,
    })
  }
  changePass() {
    if (this.state.password == this.state.curPass) {
      if (this.state.newPass === this.state.confirmPass && this.state.newPass != this.state.password) {
        if (this.state.newPass.length < 6) {
          alert('Pass quá ngắn!');
        } else {
          alert('sửa pass thành ' + this.state.newPass);
          const user = { "inputId": localStorage.getItem("currentUserID"), "password": this.state.newPass };
          axios.post('http://localhost:5000/user/updatePass', user)
            .then(res => {
              alert("mật khẩu mới đã thêm vào database");
              window.location.href = '/user-detail'
            })
            .catch(err => console.log(err));
        }
      } else {
        alert('Mật khẩu mới không thể giống mật khẩu cũ hoặc nhập lại mật khẩu không đúng!');
      }
    }
    else {
      alert('pass không đúng');
    }
  }


  onChangeFirst(e) {
    this.setState({
      firstNameChange: e.target.value,
    })
  }

  onChangeLast(e) {
    this.setState({
      lastNameChange: e.target.value,
    })
  }

  onChangePhone(e) {
    this.setState({
      phoneNoChange: e.target.value,
    })
  }

  onChangeAddress(e) {
    this.setState({
      addressChange: e.target.value,
    })
  }

  changeInfo() {
    if (this.state.firstNameChange < 3) {
      return alert('First name phải từ 3 ký tự');
    }
    if (this.state.lastNameChange < 3) {
      return alert('Last name phải từ 3 ký tự');
    }
    if (this.state.phoneNoChange < 9) {
      return alert('Phone phải từ 9 ký tự');
    }
    if (this.state.addressChange < 3) {
      return alert('Address phải từ 3 ký tự');
    }
    const user = {
      "inputId": localStorage.getItem("currentUserID"),
      "firstName": this.state.firstNameChange,
      "lastName": this.state.lastNameChange,
      "phoneNo": this.state.phoneNoChange,
      "address": this.state.addressChange
    };
    axios.post('http://localhost:5000/user/updateInfo', user)
      .then(res => {
        alert("đã cập nhật thông tin vào database");
        this.setState({ //load lại trang
          firstName: this.state.firstNameChange,
          lastName: this.state.lastNameChange,
          phoneNo: this.state.phoneNoChange,
          address: this.state.addressChange
        })
      })
      .catch(err => console.log(err));
  }


  componentDidMount() {
    const user = { "inputId": localStorage.getItem("currentUserID") };
    axios.post('http://localhost:5000/user/findById', user)
      .then(res => {
        this.setState({
          email: res.data.email,
          firstName: res.data.firstName,
          lastName: res.data.lastName,
          phoneNo: res.data.phoneNo,
          address: res.data.address,
          userID: res.data._id,
          password: res.data.password,
          bills: res.data.userBill
        });
      })
  }

  calculatorDate(createdDate) {
    var d1 = new Date(createdDate) 
    var d2 = new Date() 
    var diff = d2 - d1; 
    console.log(diff);
    if (diff > 300000000) {
      return(<div><b>Đã Giao</b></div>)
    }else{
      return(<div style={{color:"green"}}>Đang Giao...</div>)
    }
  }

  modalDataSet(billId){
    const dataform = { inputId: billId };
    axios.post('http://localhost:5000/bill/findById', dataform)
      .then(res => {
        this.setState({
          modalbillProduct: res.data.sanpham,
          modalbillTotalPrice: res.data.total_price
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
            <ul className="breadcrumb">
              <li className="breadcrumb-item"><a href="#">Home</a></li>
              <li className="breadcrumb-item"><a href="#">User</a></li>
              <li className="breadcrumb-item active">Detail</li>
            </ul>
          </div>
        </div>
        {/* Breadcrumb End */}
        {/* My Account Start */}
        <div className="my-account">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-3">
                <div className="nav flex-column nav-pills" role="tablist" aria-orientation="vertical">
                  <a className="nav-link active" id="dashboard-nav" data-toggle="pill" href="#dashboard-tab" role="tab"><i className="fa fa-tachometer" />Dashboard</a>
                  <a className="nav-link" id="orders-nav" data-toggle="pill" href="#orders-tab" role="tab"><i className="fa fa-shopping-bag" />Orders</a>
                  <a className="nav-link" id="payment-nav" data-toggle="pill" href="#payment-tab" role="tab"><i className="fa fa-credit-card" />Payment Method</a>
                  <a className="nav-link" id="address-nav" data-toggle="pill" href="#address-tab" role="tab"><i className="fa fa-map-marker" />Address</a>
                  <a className="nav-link" id="account-nav" data-toggle="pill" href="#account-tab" role="tab"><i className="fa fa-user" />Account Details</a>
                  <a className="nav-link" id="shop-nav" data-toggle="pill" href="#shop-tab" role="tab"><i className="fa fa-user" />Own Shop</a>
                  <a className="nav-link" onClick={() => {
                    localStorage.removeItem("currentUserID");
                    localStorage.removeItem("currentUserName");
                    localStorage.removeItem("currentUserShopID");
                    window.location.href = "/"
                  }}><i className="fa fa-sign-out" />Logout</a>
                </div>
              </div>
              <div className="col-md-9">
                <div className="tab-content">
                  <div className="tab-pane fade show active" id="dashboard-tab" role="tabpanel" aria-labelledby="dashboard-nav">
                    <h4>Xin chào  &nbsp;{this.state.lastName} &nbsp;{this.state.firstName}</h4>
                    <p>
                      <p>Sự tin tưởng của quý vị đã góp phần lớn quyết định sự phát triển và thành công của chúng tôi trong thời gian qua.</p>

                      <p> Với phương châm “Vì sự hài lòng cao nhất của khách hàng”, trong những năm qua, chúng tôi đã và đang không ngừng phấn đấu, nâng cao chất lượng dịch vụ để mang lại nhiều lợi ích hơn và có thể đáp ứng mọi yêu cầu của khách hàng.</p>

Chúng tôi luôn biết rằng, sự ủng hộ và sự tin yêu của Quý khách hàng là tài sản vô giá với chúng tôi, để đạt được điều này chúng tôi luôn nỗ lực không ngừng, hướng tới mục tiêu phát triển bền vững, chú trọng xây dựng các chính sách chăm sóc khách hàng,mang lại những giá trị thiết thực để luôn làm hài lòng khách hàng ở mức cao nhất nhằm đáp lại tình cảm và sự tin yêu của Quý khách.
            </p>
                  </div>
                  <div className="tab-pane fade" id="orders-tab" role="tabpanel" aria-labelledby="orders-nav">
                    <div className="table-responsive">
                      <table className="table table-bordered">
                        <thead className="thead-dark">
                          <tr>
                            <th>STT</th>
                            <th>Mã Hóa Đơn</th>
                            <th>Tổng Tiền</th>
                            <th>Ngày Mua</th>
                            <th>Trạng Thái</th>
                            <th>Chi Tiết</th>
                          </tr>
                        </thead>
                        <tbody>
                          {this.state.bills.map((obj, idx) => {
                            return (<tr key={idx}>
                              <td>{idx}</td>
                              <td>{obj._id}</td>
                              <td>${obj.total_price}</td>
                              <td>{obj.createdAt.substring(0, 10)}</td>
                              <td>{this.calculatorDate(obj.createdAt)}</td>
                              <td><button type="button" class="btn" data-toggle="modal" data-target="#exampleModalScrollable" onClick={()=>{this.modalDataSet(obj._id)}}>
  Xem
</button></td>
                            </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>

 {/* Modal */}
<div className="modal fade" id="exampleModalScrollable" tabIndex={-1} role="dialog" aria-labelledby="exampleModalScrollableTitle" aria-hidden="true">
  <div className="modal-dialog modal-dialog-scrollable" role="document">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalScrollableTitle">Modal title</h5>
        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">×</span>
        </button>
      </div>
      <div className="modal-body">
      {this.state.modalbillProduct.map((obj, idx) => {
            return (<div key={idx}>
              <p>Sản Phẩm {idx+1}: <b>{obj.productName}</b>, Đơn Giá: {obj.productPrice}, SL: {obj.quantily}</p>
            </div>
            );
          })}    
          <hr/>
        <b>Tổng tiền: </b>${this.state.modalbillTotalPrice}
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" className="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>


                  <div className="tab-pane fade" id="payment-tab" role="tabpanel" aria-labelledby="payment-nav">
                    <h4>Hướng dẫn thanh toán</h4>
                    <p>
                      <p><b>1. Thanh toán tiền mặt tại nhà khi nhận hàng</b></p>
                      <p> thông qua hình thức giao hàng trực tiếp, chuyển phát nhanh hoặc COD:

                      Khi nhân viên giao hàng giao phát, khách hàng kiểm tra sản phẩm về hình thức đảm bảo, khách hàng nhận hàng và thanh toán trực tiếp cho nhân viên giao hàng theo giá trị tiền trên hóa đơn. Ngoài ra khách hàng không phải thanh toán bất kỳ 1 chi phí nào khác.</p>

                      <p><b>2. Thanh toán tiền mặt tại cửa hàng:</b></p>

                      <p>Khách hàng đến cửa hàng tham quan, mua sản phẩm sẽ thanh toán trực tiếp bằng tiền mặt hoặc quẹt thẻ qua POS ngân hàng tại cửa hàng.</p>

                      <p><b>3. Chuyển khoản qua ngân hàng:</b></p>

                      <p>Nếu địa điểm giao hàng là ngoại thành, ngoại tỉnh nhưng khác với địa điểm thanh toán (trong trường hợp Quý khách gửi quà, gửi hàng cho bạn bè, đối tác …) chúng tôi sẽ thu tiền trước 100% giá trị hàng bằng phương thức chuyển khoản trước khi giao hàng. Khách hàng được miễn phí vận chuyển</p>

                      <p>Khách hàng có thể hoàn toàn yên tâm với hình thức thanh toán này. vì khi chuyển tiền ở ngân hàng , ngân hàng sẽ đưa cho bạn một giấy ủy nhiệm chi trong đó có số tiền và số TK mà  bạn chuyển tiền tới, nên các bạn  không phải lo lắng mình chuyển tiền rồi mà Galle Watch không chuyển hàng, giấy ủy nhiệm chi đó chính là bằng chứng bạn đã chuyển tiền  và  ngân hàng  mà bạn chuyên tiền có thể làm rõ điều đó cho bạn. Chúng tôi  bán hàng luôn đăt chữ  tín  lên đầu và luôn cố gắng có những chất lượng dịch vụ tốt nhất với khách hàng.</p>
                    </p>
                  </div>
                  <div className="tab-pane fade" id="address-tab" role="tabpanel" aria-labelledby="address-nav">
                    <h4>Address</h4>
                    <div className="row">
                      <div className="col-md-6">
                        <h5>Payment Address</h5>
                        <p>{this.state.address}</p>
                        <p>Mobile: {this.state.phoneNo}</p>
                      </div>
                      <div className="col-md-6">
                        <h5>Shipping Address</h5>
                        <p>{this.state.address}</p>
                        <p>Mobile: {this.state.phoneNo}</p>
                      </div>
                    </div>
                  </div>
                  <div className="tab-pane fade" id="shop-tab" role="tabpanel" aria-labelledby="shop-nav">
                    <h4>Cửa hàng riêng của bạn</h4>
                    <div className="row">
                      <div className="col-md-12">
                        <p>Nơi bạn có thể bày bán các sản phẩm của mình!</p>
                        <button className="btn" onClick={() => { window.location.href = "/shop-detail/" + localStorage.getItem("currentUserShopID") }}>Đến Kênh Người Bán</button>
                      </div>
                    </div>
                  </div>
                  <div className="tab-pane fade" id="account-tab" role="tabpanel" aria-labelledby="account-nav">
                    <h4>Account Details</h4>
                    <div className="row">
                      <div className="col-md-6">
                        <label>First Name</label>
                        <input className="form-control" type="text" placeholder="First Name" defaultValue={this.state.firstName} onChange={this.onChangeFirst} />
                      </div>
                      <div className="col-md-6">
                        <label>Last Name</label>
                        <input className="form-control" type="text" placeholder="Last Name" defaultValue={this.state.lastName} onChange={this.onChangeLast} />
                      </div>
                      <div className="col-md-6">
                        <label>Mobile Name</label>
                        <input className="form-control" type="text" placeholder="Mobile" defaultValue={this.state.phoneNo} onChange={this.onChangePhone} />
                      </div>
                      <div className="col-md-12">
                        <label>Address Name</label>
                        <input className="form-control" type="text" placeholder="Address" defaultValue={this.state.address} onChange={this.onChangeAddress} />
                      </div>
                      <div className="col-md-12">
                        <button className="btn" onClick={() => { this.changeInfo() }}>Update Account</button>
                        <br /><br />
                      </div>
                    </div>
                    <h4>Password change</h4>
                    <div className="row">
                      <div className="col-md-12">
                        <input className="form-control" type="password" placeholder="Current Password" onChange={this.onChangeCurPass} />
                      </div>
                      <div className="col-md-6">
                        <input className="form-control" type="password" placeholder="New Password" onChange={this.onChangeNewPass} />
                      </div>
                      <div className="col-md-6">
                        <input className="form-control" type="password" placeholder="Confirm Password" onChange={this.onChangeConfirmPass} />
                      </div>
                      <div className="col-md-12">
                        <button className="btn" onClick={() => { this.changePass() }}>Save Changes</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* My Account End */}
        <AppBot />
      </div>
    )

  }

}

export default UserDetail;