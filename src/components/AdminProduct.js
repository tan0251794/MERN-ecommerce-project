import React, { Component } from 'react';
import axios from 'axios'

class AdminProduct extends Component {

    constructor(props) {
        super(props);

        this.onChangeId = this.onChangeId.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        this.deleteProduct = this.deleteProduct.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.onChangeStart = this.onChangeStart.bind(this);
        this.onChangeEnd = this.onChangeEnd.bind(this);
        this.searchSubmit = this.searchSubmit.bind(this);

        this.state = {
            id: "",
            name: "",
            product: null,
            //by date
            startDay: "",
            endDay: "",
            products: new Array()
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

        const dataForm = {
            inputId: this.state.id,
            name: this.state.name,
        }

        axios.post('http://localhost:5000/product/findById', dataForm)
            .then(
                res => {
                    console.log(res.data)
                    var product = res.data
                    // window.location.href = '/'
                    this.setState({
                        products: [product]
                    })

                }
            )
            .catch(res => {
                //find by name
                axios.post('http://localhost:5000/product/findByName', dataForm)
                    .then(
                        res => {
                            console.log(res.data)
                            if (res.data) {
                                var product = res.data
                                this.setState({
                                    products: [product]
                                })
                            }
                        })
            }

            );
        this.setState({
            id: "",
            name: ""
        })
    }

    deleteProduct() {
        var inputId = this.state.product._id;
        axios.delete('http://localhost:5000/product/delete/' + inputId)
            .then(
                res => {
                    //
                })
        window.location.href = '/admin'
    }

    // find by date
    onChangeStart(e) {
        this.setState({
            startDay: e.target.value,
        })
    }
    onChangeEnd(e) {
        this.setState({
            endDay: e.target.value,
        })
    }

    searchSubmit(e) {
        e.preventDefault();

        if (this.state.startDay == "" || this.state.endDay == "") {
            return alert("Vui lòng nhập ngày")
        }

        const dataForm = {
            start: new Date(this.state.startDay).toISOString(),
            end: new Date(this.state.endDay).toISOString(),
        }
        console.log(dataForm);
        axios.post('http://localhost:5000/product/findByDate', dataForm)
            .then(
                res => {
                    console.log(res.data)
                    this.setState({
                        products: res.data
                    })
                }
            )
    }

    displayProduct() {
        return (
            <div>
                <table className="admin-table">
                    <tr className="table-title">
                        <th>User</th>
                        <th>Shop</th>
                        <th>Sản Phẩm</th>
                        <th>Doanh Thu</th>
                    </tr>
                    <tr>
                        <th>User</th>
                        <th>Shop</th>
                        <th>Sản Phẩm</th>
                        <th>Doanh Thu</th>
                    </tr>
                </table>
            </div>
        )
    }

    render() {
        return (
            <div>
                <h1>Sản Phẩm</h1>
                <form className="example" onSubmit={this.onSubmit}>
                    <table className="admin-table">
                        <tr className="table-title">
                            <th>Nhập ID Sản Phẩm</th>
                            <th>Nhập Tên Sản Phẩm</th>
                        </tr>
                        <tr>
                            <td><input type="text" placeholder="Search.." value={this.state.id} onChange={this.onChangeId}/></td>
                            <td><input type="text" placeholder="Search.." value={this.state.name} onChange={this.onChangeName}/></td>
                        </tr>
                    </table>
                    <button type="submit"><i className="fa fa-search" />Tìm</button>
                </form>

                <form className="example" onSubmit={this.searchSubmit}>
                    <h5>Tìm theo Thời Gian</h5>
                    <table className="admin-table">
                        <tr className="table-title">
                            <th>Thời gian bắt đầu</th>
                            <th>Đến</th>
                        </tr>
                        <tr>
                            <td><input type="date" type="datetime-local" onChange={this.onChangeStart} /></td>
                            <td><input type="date" type="datetime-local" onChange={this.onChangeEnd} /></td>
                        </tr>
                    </table>
                    <button type="submit" ><i className="fa fa-search" />Tìm</button>
                    <br /><br />
                </form>

                <div>
                    <h5>Kết Quả Tìm Kiếm</h5>
                    <table className="table table-bordered">
                      <thead className="thead-dark">
                        <tr>
                            <th>Tên Sản Phẩm</th>
                            <th>Giá</th>
                            <th>Hàng Tồn</th>
                            <th>Ngày đăng</th>
                            <th>ID Shop</th>
                        </tr>
                        </thead>
                        {this.state.products.map((obj, idx) => {
                            return (
                                <tr key={idx}>
                                    <th>{obj.ten_sp}</th>
                                    <th>{obj.gia}</th>
                                    <th>{obj.hang_ton}</th>
                                    <th>{obj.createdAt.substring(0,10)}</th>
                                    <th>{obj.id_shop}</th>
                                </tr>
                            );
                        })}

                    </table>
                </div>
            </div>
        )


    }

}

export default AdminProduct;