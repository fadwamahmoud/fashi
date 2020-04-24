import React, { Component } from "react";
import "../css/style.css";
class ProductDetails extends Component {
  componentDidMount() {
    const product = this.props.products.find(
      (p) => p.id == this.props.match.params.id
    );
    this.setState({ product });
  }

  state = {
    product: {
      id: 0,
      name: "",
      count: 0,
      isSelected: false,
      image: "",
      price: 0,
      newPrice: 0,
      typeId: 0,
    },
  };

  //changes both states
  handleSelection = (k) => {
    this.props.handleSelection(k);
    //clone
    const product = { ...this.state.product };

    //edit
    product.isSelected = !product.isSelected;

    this.setState({
      product,
    });
    console.log(product);
  };

  render() {
    return (
      <React.Fragment>
        <div class="col-lg-9 order-1 order-lg-2">
          <div className="product-list">
            <div className="row">
              <div className="col-lg-6">
                <div className="product-pic-zoom">
                  <img
                    className="product-big-img"
                    src={"../" + this.state.product.image}
                  />

                  <div className="zoom-icon">
                    <i className="fa fa-search-plus"></i>
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="product-details">
                  <div className="pd-title">
                    <span>oranges</span>

                    <h3>{this.state.product.name}</h3>
                    <a href="#" className="heart-icon">
                      <i className="icon_heart_alt"></i>
                    </a>
                  </div>
                  <div className="pd-rating">
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star-o"></i>
                    <span>(5)</span>
                  </div>
                  <div className="pd-desc">
                    <p>
                      Lorem ipsum dolor sit amet, consectetur ing elit, sed do
                      eiusmod tempor sum dolor sit amet, consectetur adipisicing
                      elit, sed do mod tempor
                    </p>
                    <h4>
                      ${this.state.product.newPrice}
                      <span>{this.state.product.price}</span>
                    </h4>
                  </div>
                  <div className="pd-color">
                    <h6>Color</h6>
                    <div className="pd-color-choose">
                      <div className="cc-item">
                        <input type="radio" id="cc-black" />
                        <label for="cc-black"></label>
                      </div>
                      <div className="cc-item">
                        <input type="radio" id="cc-yellow" />
                        <label for="cc-yellow" className="cc-yellow"></label>
                      </div>
                      <div className="cc-item">
                        <input type="radio" id="cc-violet" />
                        <label for="cc-violet" className="cc-violet"></label>
                      </div>
                    </div>
                  </div>
                  <div className="pd-size-choose">
                    <div className="sc-item">
                      <input type="radio" id="sm-size" />
                      <label for="sm-size">s</label>
                    </div>
                    <div className="sc-item">
                      <input type="radio" id="md-size" />
                      <label for="md-size">m</label>
                    </div>
                    <div className="sc-item">
                      <input type="radio" id="lg-size" />
                      <label for="lg-size">l</label>
                    </div>
                    <div className="sc-item">
                      <input type="radio" id="xl-size" />
                      <label for="xl-size">xs</label>
                    </div>
                  </div>
                  <div className="quantity">
                    {!this.state.product.isSelected && (
                      <a
                        onClick={() => this.handleSelection(this.state.product)}
                        className="primary-btn pd-cart pointer"
                      >
                        Add To Cart
                      </a>
                    )}
                    {this.state.product.isSelected && (
                      <a
                        onClick={() => this.handleSelection(this.state.product)}
                        className="primary-btn pd-cart dark"
                      >
                        Added to Cart
                      </a>
                    )}
                  </div>
                  <ul className="pd-tags"></ul>
                  <div className="pd-share">
                    <div className="pd-social">
                      <a href="#">
                        <i className="ti-facebook"></i>
                      </a>
                      <a href="#">
                        <i className="ti-twitter-alt"></i>
                      </a>
                      <a href="#">
                        <i className="ti-linkedin"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default ProductDetails;
