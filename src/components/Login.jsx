//input:
//output: handleinput
import React, { Component } from "react";
import Joi from "joi-browser";

class Login extends Component {
  state = {
    email: "",
    password: "",
    errors: {},
  };
  schema = {
    email: Joi.string().required().label("email"),
    password: Joi.string().required().label("password"),
  };
  validate = (e) => {
    e.preventDefault();
    const errors = {};
    const data = { ...this.state };
    delete data.errors;
    const result = Joi.validate(data, this.schema, { abortEarly: false });
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
      this.props.history.replace("/");
      return true;
    }
  };

  validateProperty = (property, propertyName) => {
    //instead of validating whole state and whole schema I only want whats being changed aka property
    const schema = { [propertyName]: this.schema[propertyName] };
    const data = { [propertyName]: property.value };

    //i want error property from object
    const { error } = Joi.validate(data, schema, { abortEarly: false });
    console.log(error);

    if (error) {
      //clone
      console.log(error.details);
      const errors = { ...this.state.errors };
      //edit
      //0 because onchange????
      errors[propertyName] = error.details[0].message;
      this.setState({ errors });
    } else {
      delete this.state.errors[propertyName];
    }
  };

  handleInput = (e) => {
    // console.log(e.target.name);
    this.validateProperty(e.target, e.target.name);
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    return (
      <div className="register-login-section spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 offset-lg-3">
              <div className="login-form">
                <h2>Login</h2>
                <form onSubmit={this.validate}>
                  <div className="group-input">
                    <label htmlFor="email">Username or email address </label>
                    <input
                      onChange={this.handleInput}
                      type="text"
                      name="email"
                    />
                    {this.state.errors["email"] && (
                      <div class="alert alert-danger" role="alert">
                        {this.state.errors["email"]}
                      </div>
                    )}
                  </div>
                  <div className="group-input">
                    <label htmlFor="password">Password *</label>
                    <input
                      onChange={this.handleInput}
                      type="password"
                      name="password"
                    />
                    {this.state.errors["password"] && (
                      <div class="alert alert-danger" role="alert">
                        {this.state.errors["password"]}
                      </div>
                    )}
                  </div>
                  <div className="group-input gi-check">
                    <div className="gi-more">
                      <label htmlFor="save-pass">
                        Save Password
                        <input type="checkbox" id="save-pass" />
                        <span className="checkmark"></span>
                      </label>
                      <a href="#" className="forget-pass">
                        Forget your Password
                      </a>
                    </div>
                  </div>
                  <button type="submit" className="site-btn login-btn">
                    Sign In
                  </button>
                </form>
                <div className="switch-login">
                  <a href="./register.html" className="or-login">
                    Or Create An Account
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
