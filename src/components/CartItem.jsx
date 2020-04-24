import React, { Component } from "react";
import { BrowserRouter, Route, Link, Switch } from "react-router-dom";


const CartItem = props => {
  // state = {
  //   name: props.name,
  //   count: this.props.count
  // };

  //1. constructor ===> rebind This
  // constructor() {
  //   super();
  //   this.handleClick = this.handleClick.bind(this);
  // }


    return (
      // <div>
      //   <img src={props.image}/>
      //   <span>{props.name}</span>
      //   <span
      //     className={
      //       props.count === 0 ? "badge m-2 badge-warning" : "badge m-2 badge-primary"
      //     }
      //   >
      //     {props.count}
      //   </span>
      //   <button
      //     onClick={() => props.handleIncrement(props.id)}
      //     className="btn btn-primary btn-sm m-2"
      //   >
      //     +
      //   </button>
      //   <button
      //     onClick={() => props.handleDecrement(props.id)}
      //     className="btn btn-primary btn-sm m-2"
      //   >
      //     -
      //   </button>
        

      //   <button
      //     onClick={() => props.handleDelete(props.id)}
      //     className="btn btn-danger btn-sm m-2"
      //   >
      //     <i className="fas fa-trash-alt"></i>
      //   </button>
      // </div>
      <tr>
        <td class="cart-pic first-row"><img src={props.image}/></td>
        <td class="cart-title first-row">
            
        {props.name}
        </td>
        <td class="p-price first-row">{props.newPrice}</td>
        <td class="qua-col first-row">
            <div class="quantity">
                <div class="pro-qty">
                    <button
          onClick={() => props.handleIncrement(props.id)}
          className="btn btn-primary btn-sm m-2"
        >
          +
        </button>
        <button
          onClick={() => props.handleDecrement(props.id)}
          className="btn btn-primary btn-sm m-2"
        >
          -
        </button>
        <button
          onClick={() => props.handleDelete(props.id)}
          className="btn btn-danger btn-sm m-2"
        >
          <i className="fas fa-trash-alt"></i>
        </button>
        <span
          className={
            props.count === 0 ? "badge m-2 badge-warning" : "badge m-2 badge-primary"
          }
        >
          {props.count}
        </span>
        </div>
    </div>
</td>

</tr>
                               
    );
  }


export default CartItem;
