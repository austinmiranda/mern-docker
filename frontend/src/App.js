import React, { Component } from 'react';
import './App.css';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink} from "reactstrap";

import { BrowserRouter, Route, Switch } from "react-router-dom";

import Home from './components/Home';
import List from './components/List';
import Insert from './components/Insert';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isOpen: false
    };
  }
  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }



  render() {
    return (
      <div className="App">
        <Navbar color="light" light expand="md">
          <NavbarBrand href="/">React</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink href="/list">List</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/insert">Insert</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
        <br /><br />
        <BrowserRouter>
          <Switch>
            <Route exact path="/" name="home" component={Home} />
            <Route exact path="/list" name="list" component={List} />
            <Route exact path="/insert" name="insert" component={Insert} />
          </Switch>

        </BrowserRouter>
        <br /><br />
      </div>
    );
  }
}

export default App;
