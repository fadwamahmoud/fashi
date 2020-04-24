import React, { Component } from "react";
import { BrowserRouter, Route, Link, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import NavBar from "./components/NavBar";
import ShoppingCart from "./components/ShoppingCart.jsx";
import Main from "./components/Main.jsx";
import "@fortawesome/fontawesome-free/css/all.css";
import Login from "./components/Login";
import PostItem from "./components/PostItem";
import axios from "axios";
import Admin from "./components/Admin";

// import "../css/bootstrap.min.css"
// import "../css/font-awesome.min.css"
// import "../css/themify-icons.css"
// import "../css/elegant-icons.css"
// // import "../css/owl.carousel.min.css"
// import "../css/nice-select.css"
// // import "../css/jquery-ui.min.css"
// import "../css/slicknav.min.css"
// import "../css/style.css"

class App extends Component {
  //state
  state = {
    products: [],
    types: [],
    activeFilter: 0,
    pageSize: 3,
    activePage: 1,
    searchWord: "",
    priceRange: [0, 100],
  };

  //fetch from db.js
  async componentDidMount() {
    const { data: products } = await axios.get(
      "http://localhost:3000/products"
    );
    const { data: types } = await axios.get("http://localhost:3000/types");
    this.setState({
      products,
      types,
    });
  }

  handlePrice = (values) => {
    //setstate
    this.setState({ priceRange: values, activePage: 1 });
  };

  handlePagination = (pageNumber) => {
    this.setState({
      activePage: pageNumber,
    });
  };

  handleFilteration = (type) => {
    //edit
    const newActiveFilter = type.id;
    //set state
    this.setState({
      activePage: 1,
      activeFilter: newActiveFilter,
      searchWord: "",
    });
  };

  handleSelection = (product) => {
    //clone
    const products = [...this.state.products];

    const i = products.indexOf(product);

    products[i] = { ...products[i] };

    //edit
    products[i].isSelected = !products[i].isSelected;

    this.setState({
      products,
    });
    console.log(products);
  };

  handleSearch = (e) => {
    const searchWord = e.target.value;
    this.setState({
      searchWord: searchWord,
      activePage: 1,
    });
  };

  ///////////////////////////////////////
  // shopping cart functions
  ///////////////////////////////////////

  handleReset = () => {
    //clone
    const products = [...this.state.products];

    //edit
    const newp = products.map((p) => {
      return { ...p, isSelected: false };
    });
    ///setstate
    this.setState({
      products: newp,
    });
  };

  handleDelete = (id) => {
    //clone
    const products = [...this.state.products];
    const obj = products.filter((p) => p.id === id)[0];

    const i = products.indexOf(obj);
    //deep clone
    products[i] = { ...products[i] };

    //edit
    products[i].isSelected = false;

    // products.splice(i,1)
    //setstate
    this.setState({
      products: products,
    });
  };

  handleIncrement = (id) => {
    //clone
    const products = [...this.state.products];

    //use id to get obj
    const obj = products.filter((p) => p.id === id)[0];
    //use obj to get index
    const i = products.indexOf(obj);
    //use index to deep clone
    //creating a brand new variable by using the properties from the original
    products[i] = { ...products[i] }; ///??
    //edit
    products[i].count++;
    //set state
    this.setState({
      products: products,
    });
  };
  handleDecrement = (id) => {
    //clone
    const products = [...this.state.products];

    //use id to get obj
    const obj = products.filter((p) => p.id === id)[0];
    //use obj to get index
    const i = products.indexOf(obj);
    //use index to deep clone
    //creating a brand new variable by using the properties from the original
    products[i] = { ...products[i] }; ///??
    //edit
    if (products[i].count > 0) {
      products[i].count--;
      //set state
      this.setState({
        products: products,
      });
    }
  };

  onAdd = (product) => {
    //clone
    const products = [...this.state.products];
    //edit
    products.push(product);
    //set state
    this.setState({
      products,
    });
    console.log(this.state.products);
  };
  onEdit = (newproduct) => {
    //clone
    const products = [...this.state.products];
    const product = products.find((p) => p.id == newproduct.id);
    const i = products.indexOf(product);
    //edit

    products[i] = newproduct;
    //set state
    this.setState({
      products,
    });
    console.log(this.state.products);
  };
  onDelete = async (id) => {
    //optimistic update
    //clone
    const products = [...this.state.products];
    const originalproducts = [...this.state.products];
    const product = products.find((p) => p.id == id);
    console.log(product);

    const i = products.indexOf(product);
    console.log(i);
    //edit
    products.splice(i, 1);
    //setstate
    this.setState({
      products: products,
    });

    //backend
    try {
      await axios.delete("http://localhost:3000/products/" + id);
    } catch (error) {
      //set state to original
      this.setState({ products: originalproducts });
    }
  };

  //render
  render() {
    return (
      <React.Fragment>
        <NavBar
          count={this.state.products.filter((p) => p.isSelected).length}
        ></NavBar>

        <Switch>
          <Route
            path="/shoppingCart"
            render={() => (
              <ShoppingCart
                handleDecrement={this.handleDecrement}
                handleDelete={this.handleDelete}
                handleIncrement={this.handleIncrement}
                handleReset={this.handleReset}
                products={this.state.products.filter((p) => p.isSelected)}
              ></ShoppingCart>
            )}
          ></Route>
          <Route
            path="/login"
            render={(props) => <Login {...props}></Login>}
          ></Route>
          <Route
            path="/admin"
            render={(props) => (
              <Admin
                {...props}
                types={this.state.types}
                products={this.state.products}
                onDelete={this.onDelete}
              ></Admin>
            )}
          ></Route>
          <Route
            path="/Item/:id"
            render={(props) => (
              <PostItem
                {...props}
                types={this.state.types}
                products={this.state.products}
                onAdd={this.onAdd}
                onEdit={this.onEdit}
              ></PostItem>
            )}
          ></Route>

          <Route
            path="/"
            render={(props) => (
              <Main
                {...props}
                priceRange={this.state.priceRange}
                handlePrice={this.handlePrice}
                searchWord={this.state.searchWord}
                handleSearch={this.handleSearch}
                handlePagination={this.handlePagination}
                pageSize={this.state.pageSize}
                activePage={this.state.activePage}
                types={this.state.types}
                products={this.state.products}
                activeFilter={this.state.activeFilter}
                handleFilteration={this.handleFilteration}
                handleSelection={this.handleSelection}
              ></Main>
            )}
          ></Route>
        </Switch>
      </React.Fragment>
    );
  }
}

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

export default App;
