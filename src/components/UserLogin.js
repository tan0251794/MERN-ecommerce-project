
import '../css/App.css';
import React, { Component } from 'react';
import axios from 'axios'
import AppTop from './AppTop';
import AppBot from './AppBot';
class UserLogin extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      registered : true,
      email: "",
      password: "",
      password2: "",
      firstName: "",
      lastName: "",
      phoneNo: "",
    }

    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangePassword2 = this.onChangePassword2.bind(this);
    this.onChangeFirstName = this.onChangeFirstName.bind(this);
    this.onChangeLastName = this.onChangeLastName.bind(this);
    this.onChangePhoneNo = this.onChangePhoneNo.bind(this);
    
    this.onRegister = this.onRegister.bind(this);
    this.onLoginSubmit = this.onLoginSubmit.bind(this);
  }
  onChangeEmail(e){
    this.setState({
      email: e.target.value,
  })
  }
onChangePassword(e){
  this.setState({
    password: e.target.value,
})
}
onChangePassword2(e){
this.setState({
  password2: e.target.value,
})
}
onChangeFirstName(e){
  this.setState({
    firstName: e.target.value,
})
}
onChangeLastName(e){
  this.setState({
    lastName: e.target.value,
})
}
onChangePhoneNo(e){
  this.setState({
    phoneNo: e.target.value,
})
}

onRegister() {
  const user = {
    email: this.state.email,
    password: this.state.password,
    password2: this.state.password2,
    firstName: this.state.firstName,
    lastName: this.state.lastName,
    phoneNo: this.state.phoneNo
  }

  if(!user.firstName || !user.lastName){
    return alert("Vui lòng điền đầy đủ thông tin!!")
  }

    var pattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/; 
    if(!pattern.test(String(user.email).toLowerCase())){
      return alert("Email không hợp lệ!")
    }

    axios.post('http://localhost:5000/user/findByEmail', user)
    .then(res=>{console.log(res.data)
      if (res.data) {
        return alert("Email đã sử dụng!")
      }
    })

  if(user.password.length < 6){
    return alert("Mật Khẩu tối thiểu 6 ký tự!")
  }

  if(user.phoneNo.length < 9){
    return alert("Số điện thoại không hợp lệ!")
  }

  if(user.password != user.password2){
    return alert("Nhập lại mật khẩu không đúng!")
  }


  axios.post('http://localhost:5000/user/add', user)
    .then(res=>{
      this.setState({
        email: "",
        password: "",
        password2: "",
        firstName: "",
        lastName: "",
        phoneNo: "",
        registered : true, 
      })
    })


}  
onLoginSubmit() {
  const user = {
    email: this.state.email,
    password: this.state.password
  }

  axios.post('http://localhost:5000/user/login', user)
      .then(
        res=>{
          if (res.data) {
            console.log('Đăng nhập thành công')
            localStorage.setItem("currentUserID", res.data._id);
            localStorage.setItem("currentUserName", res.data.firstName);
            localStorage.setItem("currentUserShopID", res.data.shopId);
            window.location.href = '/'
          }else{
            alert('Đăng nhập thất bại!')
          }
        }
        )


}  
  
  registerForm = () => {
    return(
    <div className="col-lg-6">    
    <div className="register-form" >
      <div className="row">
        <div className="col-md-6">
          <label>First Name</label>
          <input className="form-control" type="text" placeholder="First Name" onChange={this.onChangeFirstName}/>  

        </div>
        <div className="col-md-6">
          <label>Last Name"</label>
          <input className="form-control" type="text" placeholder="Last Name" onChange={this.onChangeLastName}/>
        </div>
        <div className="col-md-6">
          <label>E-mail</label>
          <input className="form-control" type="email" placeholder="E-mail" onChange={this.onChangeEmail}/>
        </div>
        <div className="col-md-6">
          <label>Mobile No</label>
          <input className="form-control" type="text" placeholder="Mobile No" onChange={this.onChangePhoneNo}/>
        </div>
        <div className="col-md-6">
          <label>Password</label>
          <input className="form-control" type="password" placeholder="Password" onChange={this.onChangePassword}/>
        </div>
        <div className="col-md-6">
          <label>Retype Password</label>
          <input className="form-control" type="password" placeholder="Password" onChange={this.onChangePassword2}/>
        </div>
        <div className="col-md-12">
          <button className="btn" onClick={()=>{this.onRegister()}}>Submit</button>
        </div>
      </div>
    </div>
  </div>
  )
  }
    
  loginForm = () => {
    return(
    <div className="col-lg-6">
    <div className="login-form">
      <div className="row">
        <div className="col-md-6">
          <label>E-mail / Username</label>
          <input className="form-control" type="text" placeholder="E-mail / Username" value={this.state.email} onChange={this.onChangeEmail}/>
        </div>
        <div className="col-md-6">
          <label>Password</label>
          <input className="form-control" type="password" placeholder="Password" value={this.state.password} onChange={this.onChangePassword}/>
        </div>
        <div className="col-md-12">
          <div className="custom-control custom-checkbox">
            <input type="checkbox" className="custom-control-input" id="newaccount" />
            <label className="custom-control-label" htmlFor="newaccount">Keep me signed in</label>
            
          </div>
        </div>
        <div className="col-md-12">
          <button className="btn" onClick={()=>{this.onLoginSubmit()}}>Submit</button>
          <br/><br/><button type="button" className="btn" onClick={()=>{this.setState({registered:false})}} >Register New Account!</button>
        </div>
      </div>
    </div>
  </div>
  )
  }
  displayCheck = ()=> {
    if (!this.state.registered) {
      return this.registerForm()
    }else {
      return this.loginForm()
    }
  }

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
        <li className="breadcrumb-item active">Login &amp; Register</li>
      </ul>
    </div>
  </div>
  {/* Breadcrumb End */}
  <div className="login">
  <div className="container-fluid">
    <div className="row">
      {/* form */}
      {this.displayCheck()}

      </div>
    </div>
  </div>
</div>
    <AppBot/>
    </div>
    );
  }
}

export default UserLogin;
