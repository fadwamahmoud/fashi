import React, { Component } from 'react';
import { BrowserRouter, Route, Link, Switch } from "react-router-dom";

import CartItem from './CartItem';
import '@fortawesome/fontawesome-free/css/all.css'

const ShoppingCart = props => {

        return ( 
            // <div>
            //     <h2 className='m-2'>Shopping Cart</h2>
            //     <button className="btn btn-info m-2" onClick={props.handleReset}>Reset</button>
            //     {
                    
            //         props.products.map(p => <CartItem handleDelete ={props.handleDelete} handleIncrement={props.handleIncrement}
            //             handleDecrement={props.handleDecrement} key={p.id} id={p.id} name={p.name} count={p.count} image={p.image} isSelected={p.isSelected}></CartItem>)

            //     }
                

            // </div>


<section class="shopping-cart spad">
    <div class="container">
        <div class="row">
            <div class="col-lg-12">
                <div class="cart-table">
                    <table>
                        <thead>
                            <tr>
                                <th>Image</th>
                                <th class="p-name">Product Name</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th><i class="ti-close"></i></th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                    
                    props.products.map(p => <CartItem handleDelete ={props.handleDelete} handleIncrement={props.handleIncrement}
                    handleDecrement={props.handleDecrement} newPrice={p.newPrice} key={p.id} id={p.id} name={p.name} count={p.count} image={p.image} isSelected={p.isSelected}></CartItem>)
        
                    }
                        </tbody>
                        </table>
                    </div>
                    
                </div>
            </div>
        </div>
    </section>
         );
    }

 
export default ShoppingCart;