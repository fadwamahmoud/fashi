//input:
//output: handleSearch
import React from "react";
import { Link } from "react-router-dom";
const Search = (props) => {
  return (
    <div className="container">
      <div className="inner-header">
        <div className="row">
          <div className="col-lg-2 col-md-2">
            <div className="logo">
              <a href="./index.html">
                <img src="img/logo.png" alt="" />
              </a>
            </div>
          </div>
          <div className="col-lg-7 col-md-7">
            <div className="advanced-search">
              <button type="button" className="category-btn">
                All Categories
              </button>
              <div className="input-group">
                <input
                  value={props.searchWord}
                  onChange={props.handleSearch}
                  type="text"
                  placeholder="What do you need?"
                />
                <button type="button">
                  <i className="ti-search"></i>
                </button>
              </div>
            </div>
          </div>
          <div className="col-lg-3 text-right col-md-3">
            <ul className="nav-right">
              <li className="cart-icon">
                <a href="#">
                  <i
                    className={
                      props.count === 0
                        ? "fas fa-shopping-cart light"
                        : "fas fa-shopping-cart"
                    }
                  ></i>
                  <span>{props.count}</span>
                </a>
                <div className="cart-hover">
                  <div className="select-items">
                    <table>
                      <tbody>
                        {props.products.map((p) => (
                          <tr>
                            <td className="si-pic">
                              <img src={p.image} alt="" />
                            </td>
                            <td className="si-text">
                              <div className="product-selected">
                                <p>${p.price}</p>
                                <h6>{p.name}</h6>
                              </div>
                            </td>
                            <td className="si-close">
                              <i className="ti-close"></i>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="select-button">
                    <Link to="/shoppingCart" className="primary-btn view-card">
                      VIEW CART
                    </Link>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
