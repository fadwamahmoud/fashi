import React from "react";
import Filter from "./Filter";
import Shop from "./Shop.jsx";
import Pagination from "./Pagination";
import _ from "lodash";

import { BrowserRouter, Route, Link, Switch } from "react-router-dom";
import Search from "./Search";
import ProductDetails from "./ProductDetails";

const Main = (props) => {
  //filteration
  var newproducts = props.products;
  if (props.activeFilter !== 0) {
    newproducts = props.products.filter((p) => p.typeId === props.activeFilter);
  }
  //search
  if (props.searchWord) {
    newproducts = newproducts.filter((p) =>
      p.name.toLowerCase().includes(props.searchWord.toLowerCase())
    );
  }
  //price range
  newproducts = newproducts.filter(
    (p) =>
      p.newPrice <= props.priceRange[1] && p.newPrice >= props.priceRange[0]
  );
  //pagination
  const numberOfPages = Math.ceil(newproducts.length / props.pageSize);
  const pages = _.range(1, numberOfPages + 1);
  const pagedProducts = newproducts.slice(
    (props.activePage - 1) * props.pageSize,
    props.pageSize * props.activePage
  );

  return (
    <React.Fragment>
      <Search
        searchWord={props.searchWord}
        handleSearch={props.handleSearch}
        count={props.products.filter((p) => p.isSelected).length}
        products={props.products.filter((p) => p.isSelected)}
      ></Search>
      <section class="product-shop spad">
        <div class="container">
          <div class="row">
            <Filter
              activeFilter={props.activeFilter}
              handleFilteration={props.handleFilteration}
              types={props.types}
              handlePrice={props.handlePrice}
            ></Filter>
            <Switch>
              <Route
                products={props.products}
                path="/product/:id"
                render={(pr) => (
                  <ProductDetails
                    {...pr}
                    products={props.products}
                    handleSelection={props.handleSelection}
                  ></ProductDetails>
                )}
              ></Route>

              {props.types.map((t) => (
                <Route
                  path={`/${t.name}`}
                  render={() => (
                    <React.Fragment>
                      <div class="col-lg-9 order-1 order-lg-2">
                        <div className="product-list">
                          <div className="row">
                            <Shop
                              products={pagedProducts}
                              handleSelection={props.handleSelection}
                              activeFilter={props.activeFilter}
                            ></Shop>
                          </div>
                          <div
                            style={{ "justify-content": "center" }}
                            className="row"
                          >
                            <Pagination
                              handlePagination={props.handlePagination}
                              pages={pages}
                              activePage={props.activePage}
                            ></Pagination>
                          </div>
                        </div>
                      </div>
                    </React.Fragment>
                  )}
                ></Route>
              ))}

              <Route
                path="/"
                render={() => (
                  <React.Fragment>
                    <div class="col-lg-9 order-1 order-lg-2">
                      <div className="product-list">
                        <div className="row">
                          <Shop
                            activeFilter={0}
                            products={pagedProducts}
                            handleSelection={props.handleSelection}
                          ></Shop>
                        </div>
                        <div
                          style={{ "justify-content": "center" }}
                          className="row"
                        >
                          <Pagination
                            handlePagination={props.handlePagination}
                            pages={pages}
                            activePage={props.activePage}
                          ></Pagination>
                        </div>
                      </div>
                    </div>
                  </React.Fragment>
                )}
              ></Route>
            </Switch>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};

export default Main;
