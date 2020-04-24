import React, { Component } from "react";
import { BrowserRouter, Route, Link, Switch } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.css";
import "@fortawesome/fontawesome-free/css/all.css";

import "../css/bootstrap.min.css";
import "../css/font-awesome.min.css";
import "../css/themify-icons.css";
import "../css/elegant-icons.css";
// import "../css/owl.carousel.min.css"
import "../css/nice-select.css";
// import "../css/jquery-ui.min.css"
import "../css/slicknav.min.css";
import "../css/style.css";

// import "./js/jquery-3.3.1.min.js"
// import "./js/bootstrap.min.js"
// import "./js/jquery-ui.min.js"
// import "./js/jquery.countdown.min.js"
// import "./js/jquery.nice-select.min.js"
// import "./js/jquery.zoom.min.js"
// import "./js/jquery.dd.min.js"
// import "./js/jquery.slicknav.js"
// import "./js/owl.carousel.min.js"
// import "./js/main.js"

// import Product from './Product';
const Product = (props) => {
  return (
    <div className="col-lg-4 col-sm-6">
      <div className="product-item">
        <div className="pi-pic">
          <Link to={"/product/" + props.product.id}>
            <img src={props.product.image} alt="" />
          </Link>

          <div className="sale pp-sale">Sale</div>
          <div className="icon">
            <i className="icon_heart_alt"></i>
          </div>
          <ul>
            <li className="w-icon active">
              <a>
                <i
                  onClick={() => props.handleSelection(props.product)}
                  className={
                    props.product.isSelected
                      ? "fas fa-shopping-cart dark pointer"
                      : "fas fa-shopping-cart pointer"
                  }
                ></i>
              </a>
            </li>
            <li className="quick-view">
              <a href="#">+ Quick View</a>
            </li>
            <li className="w-icon">
              <a href="#">
                <i className="fa fa-random"></i>
              </a>
            </li>
          </ul>
        </div>
        <div className="pi-text">
          <div className="catagory-name">Towel</div>
          <a href="#">
            <h5>{props.product.name}</h5>
          </a>
          <div className="product-price">
            ${props.product.newPrice}
            <span>${props.product.price}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
