//input:
//output: handleinput
import React, { Component } from "react";
import Joi from "joi-browser";
import "bootstrap/dist/css/bootstrap.css";
import axios from "axios";

class PostItem extends Component {
  componentDidMount() {
    if (this.props.match.params.id !== "add") {
      const product = this.props.products.find(
        (p) => p.id == this.props.match.params.id
      );
      // console.log(product);
      this.setState({
        name: product.name,
        price: product.price,
        typeId: product.typeId,
        image: product.image,
      });
    }
  }
  state = {
    name: "",
    price: "",
    typeId: 1,
    errors: {},
  };
  schema = {
    name: Joi.string().required().label("name"),
    price: Joi.number().max(100).required().label("price"),
  };

  validateProperty = (property, propertyName) => {
    //instead of validating whole state and whole schema I only want whats being changed aka property
    const schema = { [propertyName]: this.schema[propertyName] };
    const data = { [propertyName]: property.value };

    //i want error property from object
    const { error } = Joi.validate(data, schema, { abortEarly: false });
    // console.log(error);

    if (error) {
      //clone
      const errors = { ...this.state.errors };
      //edit
      errors[propertyName] = error.details[0].message;
      //set state
      this.setState({ errors });
    } else {
      delete this.state.errors[propertyName];
    }
  };

  handleInput = (e) => {
    // console.log(e.target.name);
    if (e.target.type == "text") {
      this.validateProperty(e.target, e.target.name);
    }
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  validate = () => {
    const errors = {};
    const data = { ...this.state };
    delete data.errors;
    delete data.typeId;
    delete data.image;
    const result = Joi.validate(data, this.schema, { abortEarly: false });
    console.log(result.error);
    if (result.error) {
      for (const detail of result.error.details) {
        errors[detail.path[0]] = detail.message;
      }
      this.setState({
        errors,
      });
      return false;
    } else {
      this.setState({ errors });
      return true;
    }
  };

  handleSubmit = async (e) => {
    e.preventDefault();

    if (this.validate()) {
      let newImage = this.state.image;
      if (this.props.match.params.id == "add") {
        newImage = "img/products/product-4.jpg";
      }
      const product = {
        name: this.state.name,
        price: this.state.price,
        typeId: parseInt(this.state.typeId),
        isSelected: false,
        image: newImage,
        count: 0,

        newPrice: this.state.price,
      };
      console.log(this.state.typeId);

      if (this.props.match.params.id !== "add") {
        const { data } = await axios.put(
          "http://localhost:3000/products/" + this.props.match.params.id,
          product
        );
        this.props.onEdit(data);
        this.props.history.push("/admin");
      } else {
        const { data } = await axios.post(
          "http://localhost:3000/products",
          product
        );
        this.props.onAdd(data);
        this.props.history.replace("/admin");
      }
    } else {
      console.log(this.state.errors);
    }
  };

  render() {
    return (
      <div className="register-login-section spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 offset-lg-3">
              <div className="login-form">
                <h2>
                  {this.props.match.params.id == "add"
                    ? "Add Product"
                    : "Edit Product"}
                </h2>
                <form onSubmit={this.handleSubmit} action="post">
                  <div className="group-input">
                    <label htmlFor="name">Product Name </label>
                    <input
                      value={this.state.name}
                      onChange={this.handleInput}
                      type="text"
                      name="name"
                    />
                    {this.state.errors["name"] && (
                      <div class="alert alert-danger" role="alert">
                        {this.state.errors["name"]}
                      </div>
                    )}
                  </div>
                  <div className="group-input">
                    <label htmlFor="price">Price</label>
                    <input
                      value={this.state.price}
                      onChange={this.handleInput}
                      type="text"
                      name="price"
                    />
                    {this.state.errors["price"] && (
                      <div class="alert alert-danger" role="alert">
                        {this.state.errors["price"]}
                      </div>
                    )}
                  </div>

                  <label htmlFor="type">Choose a type:</label>

                  <select onChange={this.handleInput} name="typeId" id="type">
                    {this.props.types.map((t) => {
                      return (
                        <option
                          value={t.id}
                          selected={t.id == this.state.typeId ? "selected" : ""}
                        >
                          {t.name}
                        </option>
                      );
                    })}
                  </select>

                  <button type="submit" className="site-btn login-btn">
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PostItem;
