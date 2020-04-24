//input: types and active filter
//output: onfilterchange
import React, { Component } from "react";
import "../css/style.css";
import { Slider, Rail, Handles, Tracks, Ticks } from "react-compound-slider";

import { BrowserRouter, Route, Link, Switch, NavLink } from "react-router-dom";
import axios from "axios";

export function Handle({ handle: { id, value, percent }, getHandleProps }) {
  return (
    <div
      style={{
        left: `${percent}%`,
        position: "absolute",
        marginLeft: -15,
        marginTop: 25,
        zIndex: 2,
        width: 20,
        height: 20,
        border: 0,
        textAlign: "center",
        cursor: "pointer",
        borderRadius: "50%",
        backgroundColor: "#e7ab3c",
        color: "#252525",
      }}
      {...getHandleProps(id)}
    >
      <div style={{ fontFamily: "Roboto", fontSize: 11, marginTop: -35 }}>
        {value}
      </div>
    </div>
  );
}

class Filter extends Component {
  state = {
    values: [0, 100],
    renderedTypes: [],
  };
  onChange = (values) => {
    this.setState({ values });
    this.props.handlePrice(values);
  };
  //to add All category
  async componentDidMount() {
    const { data: types } = await axios.get("http://localhost:3000/types");
    const renderedTypes = [{ id: 0, name: "All" }, ...types];

    this.setState({ renderedTypes: renderedTypes });
    console.log(types);
  }

  sliderStyle = {
    // Give the slider some width
    position: "relative",
    width: "100%",
    height: 80,
  };

  railStyle = {
    position: "absolute",
    width: "100%",
    height: 3,
    marginTop: 35,
    borderRadius: 5,
    backgroundColor: "#252525",
  };
  render() {
    return (
      <div class="col-lg-3 col-md-6 col-sm-8 order-2 order-lg-1 produts-sidebar-filter">
        <div class="filter-widget">
          <h4 class="fw-title">Categories</h4>
          <ul class="filter-catagories">
            {this.state.renderedTypes.map((t) => (
              <NavLink to={t.name === "All" ? "/" : `/${t.name}`}>
                <li
                  className={
                    this.props.activeFilter === t.id ? "dark-active" : "dark"
                  }
                  key={t.id}
                  onClick={() => this.props.handleFilteration(t)}
                >
                  {t.name}
                </li>
              </NavLink>
            ))}
          </ul>
        </div>
        <div>
          <div class="filter-widget">
            <h4 class="fw-title">Price</h4>
            <div class="filter-range-wrap">
              <Slider
                onChange={this.onChange}
                rootStyle={this.sliderStyle}
                domain={[0, 100]}
                step={1}
                mode={2}
                values={this.state.values}
              >
                <div style={this.railStyle} />
                <Handles>
                  {({ handles, getHandleProps }) => (
                    <div className="slider-handles">
                      {handles.map((handle) => (
                        <Handle
                          key={handle.id}
                          handle={handle}
                          getHandleProps={getHandleProps}
                        />
                      ))}
                    </div>
                  )}
                </Handles>
              </Slider>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Filter;
