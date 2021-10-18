import React, { Component } from 'react';
import axios from 'axios'

class AdminBig extends Component {

    constructor(props) {
        super(props);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeChildName = this.onChangeChildName.bind(this);
        this.submitCreate = this.submitCreate.bind(this);


        this.state = {
            bigs: new Array(),
            name: "",
            childName: ""
        }
    }
    onChangeName(e) {
        this.setState({
            name: e.target.value,
        })
    }

    onChangeChildName(e) {
        this.setState({
            childName: e.target.value,
        })
    }

    submitCreate(e) {
        e.preventDefault();

        const dataForm = {
            ten_danh_muc: this.state.name,
        }

        //Find by name
        axios.post('http://localhost:5000/big/add', dataForm)
            .then(
                res => {
                    alert("thêm thành công " + res.data.ten_danh_muc)
                    this.reloadBig()
                })
    }

    createChild(inputId) {

        const dataForm = {
            id_cha: inputId,
            ten_danh_muc: this.state.childName,
        }
        console.log(dataForm);

        axios.post('http://localhost:5000/big/addChild', dataForm)
            .then(
                res => {
                    alert("thêm thành công danh mục con: " + dataForm.ten_danh_muc)
                    this.setState({
                        childName: " ",
                    })
                    this.reloadBig()
                })
    }

    componentDidMount() {
        this.reloadBig()
    }

    reloadBig() {
        //Find all big category
        axios.get('http://localhost:5000/big/')
            .then(
                res => {
                    var bigs = res.data
                    this.setState({
                        bigs: bigs
                    })
                    
                })
    }


    deleteBig(inputId, child) {
        if (child.length > 0) {
            alert("Không thể xóa danh mục khi còn danh mục con")
        } else {
            axios.delete('http://localhost:5000/big/delete/' + inputId)
                .then(
                    res => {
                        alert("Xóa thành công!")
                        this.reloadBig()
                    })
        }

    }
    deleteSmall(inputId) {
        axios.delete('http://localhost:5000/big/deleteChild/' + inputId)
                .then(
                    res => {
                        alert("Xóa thành công!")
                        this.reloadBig()
                    })
    }

    render() {
        return (
            <div>
                <h1>Danh Mục</h1>

                <p>Kết Quả Tìm Kiếm</p>
                {this.state.bigs.map((obj, idx) => {
                    return (
                        <div key={idx}>
                            <div className="card bg-light mb-3" style={{ maxWidth: '100%' }}>
                                <h5 className="card-header">Tên danh mục: {obj.ten_danh_muc} <button className="btn btn-danger float-right" onClick={() => this.deleteBig(obj._id, obj.danh_muc_con)}>Xóa Danh Mục</button></h5>
                                <div className="card-body">
                                    <p className="card-text "><small><i>(Danh mục con)</i></small></p >
                                    {
                                        obj.danh_muc_con.map((sub, subindex) =>
                                            <p className="card-text alert alert-primary">
                                                {sub.ten_danh_muc} <small> (ID: {sub._id}) </small>
                                                <button className="btn btn-secondary float-right" style={{ marginTop: '-7px' }} onClick={()=>{this.deleteSmall(sub._id)}}>Xóa</button>
                                            </p>)
                                    }

                                    <div className="form-control" >
                                        <input type="text" placeholder="Tạo thêm danh mục con .." value={this.state.childName} onChange={this.onChangeChildName} />
                                        <button onClick={() => { this.createChild(obj._id) }}>Tạo</button>
                                    </div>


                                </div>
                            </div>
                        </div>
                    );
                })}

                <form className="example" onSubmit={this.submitCreate}>
                    <h5>Tạo danh mục mới</h5>
                    <input type="text" placeholder="Đặt tên.." value={this.state.name} onChange={this.onChangeName} />
                    <br /><br />
                    <button type="submit">Tạo</button>
                    <br /><br />
                </form>
            </div>

        )
    }




}
export default AdminBig;