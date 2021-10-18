import React, { Component } from 'react';
import axios from 'axios'
import AppTop from './AppTop';
import AppBot from './AppBot';
class ShopDetail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            anh_avatar: "",
            anh_cover: "",
            createdAt: "",
            diem_danhgia: 0,
            mo_ta: "",
            ngay_thamgia: "",
            sanpham: [],
            so_danhgia: 0,
            so_theodoi: 0,
            ten_shop: "",
            tenShopChange: "",
            moTaChange: "",
            photoName: "default_avatar.png",
            bigs: new Array(),
            bigChoosen: "",
            smalls: new Array(),
            smallName: "",
            productPhoto: "",
            tenSP: "",
            giaSP: "",
            hangTon: "",
            moTaSP: "",
            products: new Array(),
        }

        this.onChangeTenShop = this.onChangeTenShop.bind(this);
        this.onChangeMota = this.onChangeMota.bind(this);
        this.uploadHandler = this.uploadHandler.bind(this);

        this.onChangeBig = this.onChangeBig.bind(this);
        this.onChangeSmall = this.onChangeSmall.bind(this);
        this.uploadHandler2 = this.uploadHandler2.bind(this);
        this.onChangeProductName = this.onChangeProductName.bind(this);
        this.onChangePrice = this.onChangePrice.bind(this);
        this.onChangeStock = this.onChangeStock.bind(this);
        this.onChangeMotaSP = this.onChangeMotaSP.bind(this);
    }

    onChangeTenShop(e) {
        this.setState({
            tenShopChange: e.target.value,
        })
    }
    changeName() {
        if (this.state.tenShopChange < 3) {
            return alert('Tên Shop phải từ 3 ký tự');
        }

        var dataForm = {
            "inputId": localStorage.getItem("currentUserShopID"),
            "ten_shop": this.state.tenShopChange,
        };

        axios.post('http://localhost:5000/shop/updateName', dataForm)
            .then(res => {
                alert("đã cập nhật thông tin vào database");
                this.setState({ ten_shop: this.state.tenShopChange });//làm mới trang
            })
            .catch(err => console.log(err));
    }

    onChangeMota(e) {
        this.setState({
            moTaChange: e.target.value,
        })
    }
    changeMota() {
        if (this.state.moTaChange < 3) {
            return alert('Mota phải từ 20 ký tự');
        }

        var dataForm = {
            "inputId": localStorage.getItem("currentUserShopID"),
            "mo_ta": this.state.moTaChange,
        };

        axios.post('http://localhost:5000/shop/updateDescription', dataForm)
            .then(res => {
                alert("đã cập nhật thông tin vào database");
                this.setState({ mo_ta: this.state.moTaChange });//làm mới trang
            })
            .catch(err => console.log(err));
    }

    componentDidMount() {
        var dataForm = {
            inputId: this.props.match.params.id
        }
        axios.post('http://localhost:5000/shop/findById', dataForm)
            .then(
                res => {
                    this.setState({
                        ten_shop: res.data.ten_shop,
                        anh_avatar: res.data.anh_avatar,
                        anh_cover: res.data.anh_cover,
                        createdAt: res.data.createdAt,
                        diem_danhgia: res.data.diem_danhgia,
                        mo_ta: res.data.mo_ta,
                        ngay_thamgia: res.data.ngay_thamgia,
                        so_danhgia: res.data.so_danhgia,
                        so_theodoi: res.data.so_theodoi,
                        sanpham: res.data.sanpham,
                    })
                })

        axios.get('http://localhost:5000/big/')
            .then(
                res => {
                    var bigs = res.data
                    this.setState({
                        bigs: bigs
                    })
                })

        this.productLoad() 
    }

    onChangeBig(e) {
        const inputId = JSON.parse(e.target.value)._id;

        axios.post('http://localhost:5000/big/findById', { inputId })
            .then(
                res => {
                    var smalls = res.data.danh_muc_con;
                    this.setState({
                        smalls: smalls
                    })
                })

        var bigChoosen = JSON.parse(e.target.value).ten_danh_muc;
        this.setState({
            bigChoosen: bigChoosen,
            smallName: "" 
        })
    }

    onChangeSmall(e) {
        var choosen = JSON.parse(e.target.value).ten_danh_muc;
        document.getElementById("choosen").innerHTML = "Danh mục bạn đang chọn là: <b>" + this.state.bigChoosen + " / " + choosen + "</b>"
            + "<br><i style='color:red'>(kiểm tra kỹ đường dẫn này trước khi xác nhận tạo sản phẩm!)</red></i>"

        this.setState({
            smallName: choosen
        })
    }

    uploadHandler2(event) {
        var data2 = new FormData();
        data2.append('file', event.target.files[0]);
        axios.post('http://localhost:5000/upload', data2)
            .then((res) => {
                this.setState({ productPhoto: res.data.filename });
            })
    }
    onChangeProductName(e) {
        this.setState({
            tenSP: e.target.value,
        })
    }
    onChangePrice(e) {
        this.setState({
            giaSP: e.target.value,
        })
    }
    onChangeStock(e) {
        this.setState({
            hangTon: e.target.value,
        })
    }
    onChangeMotaSP(e) {
        this.setState({
            moTaSP: e.target.value,
        })
    }
    createProduct() {
        if (this.state.smallName.length == 0 || this.state.bigChoosen.length == 0) {
            return alert('Cần chọn phân loại');
        }
        if (this.state.tenSP.length < 3) {
            return alert('Tên SP từ 3 ký tự');
        }
        if (Number.isNaN(this.state.giaSP) || this.state.giaSP <= 0 || this.state.giaSP.length == 0) {
            return alert('Giá SP không hợp lệ');
        }
        if (Number.isNaN(this.state.hangTon) || this.state.hangTon <= 0 || this.state.hangTon.length == 0) {
            return alert('Số lượng tồn kho không hợp lệ');
        }
        if (this.state.productPhoto.length == 0) {
            return alert('Cần upload ảnh');
        }
        if (this.state.moTaSP.length == 0) {
            return alert('Cần điền mô tả');
        }

        var product = {
            ten_sp: this.state.tenSP,
            gia: this.state.giaSP,
            hang_ton: this.state.hangTon,
            mo_ta: this.state.moTaSP,
            id_shop: localStorage.getItem("currentUserShopID"),
            bigName: this.state.bigChoosen,
            smallName: this.state.smallName,
            hinh: this.state.productPhoto
        }

        console.log(product);
        axios.post('http://localhost:5000/product/add', product)
            .then(res => {
                alert("Thêm thành công!")
                this.productLoad()
            })
    }

    deleteProduct(productId) {
        axios.delete('http://localhost:5000/product/delete/' + productId)
            .then(res => {
                alert("đã xóa sản phẩm!")
            })
        window.location.reload();
    }


    uploadHandler(event) {
        var data = new FormData();
        data.append('file', event.target.files[0]);
        console.log(event.target.files[0]);
        axios.post('http://localhost:5000/upload', data)
            .then((res) => {
                this.setState({ photoName: res.data.filename });
            });
    }

    onFileUpload = () => {
        var dataForm = {
            "inputId": localStorage.getItem("currentUserShopID"),
            "anh_cover": this.state.photoName
        };
        axios.post('http://localhost:5000/shop/updateCover', dataForm)
            .then(res => {
                alert("đã cập nhật ảnh vào database");
                this.setState({ anh_cover: this.state.photoName });//làm mới trang
            })
            .catch(err => console.log(err));
    }

    productLoad = () => {
        var dataForm = {
            inputId: this.props.match.params.id
        }
        axios.post('http://localhost:5000/product/findByShopID', dataForm)
            .then(
                res => {
                    var products = res.data
                    this.setState({
                        products: products
                    })
                })
    }


    loggedForm = () => {
        return (
            <div>
                <div className="row shop">
                    <div className="col-md-4">
                        <label>Tên Shop</label>
                        <div className="row">
                            <div className="col-md-10">
                                <input className="form-control" type="text" defaultValue={this.state.ten_shop} onChange={this.onChangeTenShop} />
                            </div>
                            <div className="col-md-2">
                                <button className="btn" onClick={() => { this.changeName() }}>Sửa</button> <br /><br />
                            </div>
                        </div>
                    </div>

                    <div className="col-md-2">
                        <ul>
                            <li>Sản Phẩm: {this.state.sanpham.length}</li>
                            <li>Đang Theo:</li>
                            <li>Tỉ lệ phản hồi chat:</li>
                        </ul>
                    </div>
                    <div className="col-md-2">
                        <ul>
                            <li>Tỉ lệ Shop hủy đơn</li>
                            <li>Người Theo Dõi: {this.state.so_theodoi}</li>
                            <li>Đánh Giá: {this.state.diem_danhgia}</li>
                        </ul>
                    </div>
                    <div className="col-md-3">
                        <ul>
                            <li>Tham Gia: {this.state.ngay_thamgia} </li>
                        </ul>
                    </div>
                </div>

                <div className="shop">
                    <h2>THÔNG TIN SHOP</h2>
                    <div className="row">

                        <div className="col-md-6">
                            <p className="col-12"><input type="file" className="btn form-control col-8" onChange={this.uploadHandler} /><button className="btn col-3 ml-3" onClick={() => { this.onFileUpload() }}>Xác Nhận Đổi</button></p>
                            <img src={`http://localhost:3000/img/upload/${this.state.anh_cover}`} className="cover-img" />

                        </div>

                        <div className="col-md-6">
                            <div>
                                <p>Mô tả:</p>
                                <textarea className="form-control" rows="10" cols="50" defaultValue={this.state.mo_ta} onChange={this.onChangeMota} />
                                <p><button className="btn" onClick={() => { this.changeMota() }}>Sửa</button> <br /><br /></p>
                            </div>
                        </div>
                    </div>
                </div>


                <div className="product-view shop">
                <h2>SẢN PHẨM</h2>
                    <div className="container-fluid">
                        <div className="row ">


                            {this.state.products.map((obj, idx) => {
                                return (
                                    <div className="col-md-2" key={idx}>
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
                                                    <a href={"/product-detail/?id=" + obj._id}><i className="fa fa-search" /></a>
                                                </div>
                                            </div>
                                            <div className="product-price">
                                                <h3 className="price-edit"><span>$</span>{obj.gia}</h3>
                                                <a className="btn" onClick={() => { this.deleteProduct(obj._id) }}><i className="fa fa-trash" />Delete</a>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}

                        </div>
                    </div>
                </div>


                <div className="col-lg-12 shop">
                    <div className="register-form" >
                        <h3>THÊM SẢN PHẨM</h3>
                        <div className="row">
                            <p className="col-md-12">Danh mục:
                            <select onChange={this.onChangeBig} ><option disabled selected value> -- chọn danh mục -- </option>{this.state.bigs.map((x, y) => <option key={y} value={JSON.stringify(x)}>{x.ten_danh_muc}</option>)}</select>;
                            Phân Loại:
                            <select onChange={this.onChangeSmall} ><option value="..."></option>{this.state.smalls.map((x, y) => <option key={y} value={JSON.stringify(x)}>{x.ten_danh_muc}</option>)}</select>;
                            <div id="choosen">Danh mục bạn đang chọn là: ___</div>
                            </p>

                            <div className="col-md-12">
                                <input className="form-control" type="text" placeholder="Tên Sản Phẩm" onChange={this.onChangeProductName} />
                            </div>
                            <div className="col-md-6">
                                <input className="form-control" type="text" placeholder="Giá" onChange={this.onChangePrice} />
                            </div>
                            <div className="col-md-6">
                                <input className="form-control" type="text" placeholder="Hàng Tồn Kho" onChange={this.onChangeStock} />
                            </div>
                            <div className="col-md-12">
                                <input className="form-control" type="file" onChange={this.uploadHandler2} />
                            </div>
                            <textarea className="form-control" rows="4" cols="50" placeholder="Mô tả sản phẩm" onChange={this.onChangeMotaSP} />
                            <div className="col-md-12">
                                <button className="btn" onClick={() => { this.createProduct() }}>Thêm Sản Phẩm</button>
                            </div>
                            <br /><br />
                        </div>
                    </div>
                </div>
            </div >
        )
    }

    guessForm = () => {
        return (
            <div>
                <div className="row shop">
                    <div className="col-md-4">
                        <b>{this.state.ten_shop}</b><br />
                        <img src={`http://localhost:3000/img/upload/${this.state.anh_cover}`} className="avatar-img" /> </div>

                    <div className="col-md-2">
                        <ul>
                            <li>Sản Phẩm: {this.state.sanpham.length}</li>
                            <li>Đang Theo:</li>
                            <li>Tỉ lệ phản hồi chat:</li>
                        </ul>
                    </div>
                    <div className="col-md-2">
                        <ul>
                            <li>Tỉ lệ Shop hủy đơn</li>
                            <li>Người Theo Dõi: {this.state.so_theodoi}</li>
                            <li>Đánh Giá: {this.state.diem_danhgia}</li>
                        </ul>
                    </div>
                    <div className="col-md-3">
                        <ul>
                            <li>Tham Gia: {this.state.ngay_thamgia} </li>
                        </ul>
                    </div>
                </div>


                <div className="shop">
                    <h2>THÔNG TIN SHOP</h2>
                    <div className="row">

                        <div className="col-md-6">
                            <img src={`http://localhost:3000/img/upload/${this.state.anh_cover}`} className="cover-img" />

                        </div>

                        <div className="col-md-6">
                            <div>
                                <p>{this.state.mo_ta} </p>
                            </div>
                        </div>
                    </div>
                </div>

                SẢN PHẨM
                <div className="product-view">
                    <div className="container-fluid">

                        <div className="row">
                            {this.state.products.map((obj, idx) => {
                                return (
                                    <div className="col-md-2" key={idx}>
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
                                                    <a href="#"><i className="fa fa-cart-plus" /></a>
                                                    <a href={"/product-detail/?id=" + obj._id}><i className="fa fa-search" /></a>
                                                </div>
                                            </div>
                                            <div className="product-price">
                                                <h3 className="price-edit"><span>$</span>{obj.gia}</h3>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div >
        )
    }
    displayCheck = () => {
        var inputId = this.props.match.params.id;
        if (inputId == localStorage.getItem("currentUserShopID")) {
            return this.loggedForm()
        } else {
            return this.guessForm()
        }
    }

    render() {
        return (
            <div>
                <AppTop/>
                {/* Breadcrumb Start */}
                <div className="breadcrumb-wrap">
                    <div className="container-fluid">
                        <ul className="breadcrumb mb-4">
                            <li className="breadcrumb-item"><a href="#">Trang Chủ</a></li>
                            <li className="breadcrumb-item"><a href="#">Sản Phẩm</a></li>
                            <li className="breadcrumb-item active">Kênh Người Bán</li>
                        </ul>
                    </div>
                </div>
                {/* Breadcrumb End */}
                {this.displayCheck()}
                <AppBot/>
            </div>
        );
    }
}

export default ShopDetail;