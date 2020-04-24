import React from "react";
import { BrowserRouter, Route, Link, NavLink } from "react-router-dom";
import PostItem from "./PostItem";

const Admin = (props) => {
  return (
    <div className={"admin"}>
      <button className={"btn btn-primary add"}>
        {" "}
        <Link style={{ color: "white" }} to={"/Item/" + "add"}>
          +Add
        </Link>
      </button>

      <table class="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Price</th>
            <th scope="col">Type</th>
            <th scope="col">Delete</th>
            <th scope="col">Edit</th>
          </tr>
        </thead>
        <tbody>
          {props.products.map((p) => (
            <tr>
              <th scope="row">{p.id}</th>
              <td>{p.name}</td>
              <td>{p.price}</td>
              <td>{p.typeId}</td>
              <td>
                <button
                  onClick={() => props.onDelete(p.id)}
                  type="button"
                  class="btn btn-danger"
                >
                  Delete
                </button>
              </td>
              <td>
                <Link to={"/Item/" + p.id}>
                  <button type="button" class="btn btn-warning">
                    Edit
                  </button>
                </Link>
              </td>

              {/* <button onClick={() => props.handleEdit(p.id)} type="button" class="btn btn-warning">Edit</button> */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Admin;
