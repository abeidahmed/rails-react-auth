// Run this example by adding <%= javascript_pack_tag 'hello_react' %> to the head of your layout file,
// like app/views/layouts/application.html.erb. All it does is render <div>Hello React</div> at the bottom
// of the page.

import React, { Component } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import axios from "axios";

import { GlobalStyle } from "./styles";
import Header from "./components/Header";
import Home from "./Home";
import Contact from "./Contact";

class App extends Component {
  state = {
    loggedInStatus: "Not logged in",
    user: {},
    loggedInError: ""
  };

  handleLogin = data => {
    this.setState({
      // ...this.state,
      loggedInStatus: "Logged in",
      user: data
    });
  };

  handleLogOut = () => {
    this.setState({
      // ...this.state,
      loggedInStatus: "Not logged in",
      user: {}
    });
  };

  checkLoginStatus = () => {
    axios
      .get("http://localhost:3000/logged_in", { withCredentials: true })
      .then(response => {
        if (response.data.logged_in && this.state.loggedInStatus === "Not logged in") {
          this.setState({
            loggedInStatus: "Logged in",
            user: response.data.user
          });
        } else if (!response.data.logged_in && this.state.loggedInStatus === "Logged in") {
          this.setState({
            loggedInStatus: "Not logged in",
            user: {}
          });
        }
      })
      .catch(error => {
        this.setState({ loggedInError: error });
      });
  };

  componentDidMount() {
    this.checkLoginStatus();
  }

  render() {
    return (
      <>
        <GlobalStyle />
        <Router>
          <Header />
          <Switch>
            <Route
              exact
              path={"/"}
              render={props => (
                <Home
                  {...props}
                  handleLogin={this.handleLogin}
                  handleLogOut={this.handleLogOut}
                  loggedInStatus={this.state.loggedInStatus}
                />
              )}
            />
            <Route
              exact
              path={"/contact"}
              render={props => <Contact {...props} loggedInStatus={this.state.loggedInStatus} />}
            />
          </Switch>
        </Router>
      </>
    );
  }
}

document.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(<App />, document.body.appendChild(document.createElement("div")));
});
