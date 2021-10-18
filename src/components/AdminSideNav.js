import React, { Component } from 'react';
import {BrowserRouter as Router,Route,NavLink} from "react-router-dom";
class AdminSideNav extends Component {
    render() {
        return (
            <div id="layoutSidenav" className="sidebar">
                <div id="layoutSidenav_nav">
                    <nav className="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
                        <div className="sb-sidenav-menu">
                            <div className="nav">
                                <div className="sb-sidenav-menu-heading">Trung Tâm</div>
                                <NavLink to="/admin" className="nav-link" >
                                    <div className="sb-nav-link-icon"><i className="fa fa-tachometer-alt" /></div>
                        Trang Chủ
                        </NavLink>
                                <div className="sb-sidenav-menu-heading" hidden>Giao Diện</div>
                                <a hidden className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseLayouts" aria-expanded="false" aria-controls="collapseLayouts">
                                    <div className="sb-nav-link-icon"><i className="fa fa-columns" /></div>
                        Trình Bày
                        <div className="sb-sidenav-collapse-arrow"><i className="fa fa-angle-down" /></div>
                                </a>
                                <div className="collapse" id="collapseLayouts" aria-labelledby="headingOne" data-parent="#sidenavAccordion">
                                    <nav className="sb-sidenav-menu-nested nav">
                                        <a className="nav-link" href="layout-static.html">Quản Lý Mục</a>
                                        <a className="nav-link" href="layout-sidenav-light.html">Liên kết</a>
                                    </nav>
                                </div>
                                <a hidden className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapsePages" aria-expanded="false" aria-controls="collapsePages">
                                    <div className="sb-nav-link-icon"><i className="fa fa-book-open" /></div>
                        Trang
                        <div className="sb-sidenav-collapse-arrow"><i className="fa fa-angle-down" /></div>
                                </a>
                                <div className="collapse" id="collapsePages" aria-labelledby="headingTwo" data-parent="#sidenavAccordion">
                                    <nav className="sb-sidenav-menu-nested nav accordion" id="sidenavAccordionPages">
                                        <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#pagesCollapseAuth" aria-expanded="false" aria-controls="pagesCollapseAuth">
                                            Ủy Quyền
                            <div className="sb-sidenav-collapse-arrow"><i className="fa fa-angle-down" /></div>
                                        </a>
                                        <div className="collapse" id="pagesCollapseAuth" aria-labelledby="headingOne" data-parent="#sidenavAccordionPages">
                                            <nav className="sb-sidenav-menu-nested nav">
                                                <a className="nav-link" href="login.html">Đăng Nhập</a>
                                                <a className="nav-link" href="register.html">Đăng Ký</a>
                                                <a className="nav-link" href="password.html">Quên Mật Khẩu</a>
                                            </nav>
                                        </div>
                                        <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#pagesCollapseError" aria-expanded="false" aria-controls="pagesCollapseError">
                                            Error
                            <div className="sb-sidenav-collapse-arrow"><i className="fa fa-angle-down" /></div>
                                        </a>
                                        <div className="collapse" id="pagesCollapseError" aria-labelledby="headingOne" data-parent="#sidenavAccordionPages">
                                            <nav className="sb-sidenav-menu-nested nav">
                                                <a className="nav-link" href="401.html">401 Page</a>
                                                <a className="nav-link" href="404.html">404 Page</a>
                                                <a className="nav-link" href="500.html">500 Page</a>
                                            </nav>
                                        </div>
                                    </nav>
                                </div>
                                <div className="sb-sidenav-menu-heading">Quản Lý</div>
                                <NavLink to="/adminShop" className="nav-link" >
                                    Doanh Nghiệp
                        </NavLink >
                                <NavLink to="/adminUser" className="nav-link" >
                                    Người Dùng
                        </NavLink >
                                <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#pagesCollapseError" aria-expanded="false" aria-controls="pagesCollapseError">
                                    Danh Mục
                            <div className="sb-sidenav-collapse-arrow"><i className="fa fa-angle-down" /></div>
                                </a>
                                <div className="collapse" id="pagesCollapseError" aria-labelledby="headingOne" data-parent="#sidenavAccordionPages">
                                    <nav className="sb-sidenav-menu-nested nav">
                                        <NavLink to="/adminBig" className="nav-link">Danh Mục Lớn</NavLink>
                                        <NavLink to="/adminSmall" className="nav-link">Danh Mục Nhỏ</NavLink>
                                    </nav>
                                </div>
                                <NavLink to="/adminProduct" className="nav-link" >
                                    <div className="sb-nav-link-icon"><i className="fa fa-table" /></div>
                        Sản Phẩm
                        </NavLink >
                            </div>
                        </div>
                        <div className="sb-sidenav-footer">
                            <div className="small">Đang đăng nhập bởi:</div>
                    tanlc
                    </div>
                    </nav>
                </div></div>
        );
    }
}

export default AdminSideNav;