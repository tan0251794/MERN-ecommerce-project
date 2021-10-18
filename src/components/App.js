import React, { Component } from 'react';
import {BrowserRouter as Router,Route} from "react-router-dom";

import '../css/App.css';
import '../css/style.css';

import Main from './Main';
import ProductList  from './ProductList';
import UserDetail  from './UserDetail';
import UserLogin  from './UserLogin'; 
import Contact  from './Contact';
import ProductDetail from './ProductDetail';
import ShopDetail from './ShopDetail';
import Admin  from './Admin';
import UserCart from './UserCart';

class App extends Component {
  render() {
      return (
    <Router>
      <div>
        <Route exact path="/" component={Main}/>
        <Route  path="/product-list" component={ProductList}/>
        <Route  path="/product-detail" component={ProductDetail}/>
        <Route exact path="/user-detail" component={UserDetail}/>
        <Route exact path="/user-login" component={UserLogin}/>
        <Route exact path="/cart" component={UserCart}/>
        <Route path="/shop-detail/:id" component={ShopDetail}/>
        <Route exact path="/contact" component={Contact}/>
        <Route exact path="/admin" component={Admin}/>
      </div>
    </Router>
  );
}
}

export default App;
