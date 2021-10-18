import React, { Component } from 'react';
import axios from 'axios'

class AdminUser extends Component {

    constructor(props) {
        super(props);

        this.onChangeId = this.onChangeId.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            id: "",
            name: "",
            user: null,
            //shop
            shopId: "",
            tenShop: "",
        }
    }


    onChangeId(e) {
        this.setState({
            id: e.target.value,
        })
    }
    onChangeName(e) {
        this.setState({
            name: e.target.value,
        })
    }

    onSubmit(e) {
        e.preventDefault();

        var dataForm = {
            email: this.state.name + "@gmail.com",
        }

        //find by name
        axios.post('http://localhost:5000/user/findByEmail', dataForm)
            .then(
                res => {
                    console.log(res.data)
                    if (res.data) {
                        var user = res.data
                        console.log(res.data.shopId);
                        this.setState({
                            user: user,
                            shopId: res.data.shopId
                        })
                        this.loadShop();
                    } else {
                        alert("Không tìm thấy " + dataForm.email)
                    }
                })

        this.setState({
            name: ""
        })
    }


    loadShop() {
        var dataForm = {
            inputId: this.state.shopId,
        }
        axios.post('http://localhost:5000/shop/findById', dataForm)
            .then(
                res => {
                    console.log(res.data)
                    this.setState({
                        tenShop: res.data.ten_shop,
                    })
                }
            )
    }

    deactiveUser() {
        var inputId = this.state.user._id;
        axios.post('http://localhost:5000/user/updateDeactive/', { inputId: inputId })
            .then(
                res => {
                    alert("Đã vô hiệu người dùng")
                    var user = res.data;
                    this.setState({ user: user })
                })
    }

    activeUser() {
        var inputId = this.state.user._id;
        axios.post('http://localhost:5000/user/updateActive/', { inputId: inputId })
            .then(
                res => {
                    alert("Người dùng được kích hoạt lại")
                    var user = res.data;
                    this.setState({ user: user })
                })
    }


    deactiveBtn() {
        if (this.state.user.deactive == false) {
            return (<div><button className="btn ml-2" onClick={() => { this.deactiveUser() }}>Vô hiệu người dùng</button></div>)
        } else {
            return (<div><button className="btn ml-2" onClick={() => { this.activeUser() }}>Kích hoạt người dùng</button></div>)
        }

    }

    showUserDisplay() {
        if (this.state.user) {
            return (
                <div>
                    <h5>Kết Quả Tìm Kiếm</h5>
                    <div className="card bg-light mb-3" style={{ maxWidth: '100%' }}>
                        <div className="card-header">Người dùng: <b>{this.state.user.email}</b></div>
                        <div className="card-body">
                            <h5 className="card-title">ID: {this.state.user._id}</h5>
                            <h5 className="card-title">Tên: {this.state.user.firstName}</h5>
                            <h5 className="card-title">Họ: {this.state.user.lastName}</h5>
                            <p className="card-text">Ngày Tham Gia: {this.state.user.createdAt}</p>
                            <h5 className="card-title">Tên Shop: {this.state.tenShop}</h5>
                            <h5 className="card-title">ID Shop:  {this.state.shopId}</h5>
                        </div>
                    </div>
                </div>
            )
        }
    }

    render() {
        return (
            <div>
                <h1>Người Dùng và Shop</h1>
                <form className="example" onSubmit={this.onSubmit}>
                    <table className="admin-table">
                        <tr className="table-title">
                            <th>Nhập Tên</th>
                            <th></th>
                        </tr>
                        <tr>

                            {/* <td><input type="text" placeholder="Search.." value={this.state.id} onChange={this.onChangeId} /></td> */}
                            <td><input type="text" placeholder="Search.." value={this.state.name} onChange={this.onChangeName} /></td>
                            <td><b>{"\u00A0@gmail.com"}</b></td>
                        </tr>
                    </table>
                    <button type="submit"><i className="fa fa-search" /></button>
                    <br /><br />
                </form>
                {this.showUserDisplay()}
            </div>
        )
    }


}

export default AdminUser;