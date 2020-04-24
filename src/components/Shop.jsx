//input: activefilter and filteredproducts
//output: selected items for cart
import React, { Component } from "react";
import "../css/style.css";
import { BrowserRouter, Route, Link, Switch, NavLink } from "react-router-dom";
import Product from "./Product";
const Shop = (props) => {
  return (
    <React.Fragment>
      {props.products.map((p) => (
        <Product
          handleSelection={props.handleSelection}
          product={p}
          key={p.id}
        ></Product>
      ))}
    </React.Fragment>
  );
};

export default Shop;
