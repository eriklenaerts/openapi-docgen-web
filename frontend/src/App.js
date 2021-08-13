import React, { Component } from 'react';
import { Link, Route, Switch, withRouter } from "react-router-dom";
import {
  Header,
  Footer,
  UserMenu,
} from '@acpaas-ui/react-components';
/**
 * More ACPaaS UI documentation can be found here:
 * https://digipolisantwerp.github.io/antwerp-ui_react/
 */
import './App.scss';
import Home from './components/Home/Home';
import About from './components/About/About';
import Login from './components/Login/Login';


class App extends Component {
  state = {
    isLoggedin: false,
    user: undefined,
  }

  componentDidMount() {
    fetch('/auth/isloggedin')
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw Error('Request rejected with status ' + response.status);
        }
      })
      .then(data => this.setState({ isLoggedin: data.isLoggedin, user: data.user }))
      .catch(console.error);
  }

  render() {
    return (
      <div className="App">
        <header>
          <Header logoAlt="Antwerpen logo." logoSrc="https://cdn.antwerpen.be/core_branding_scss/5.0.1/assets/images/a-logo.svg">
            <div className="o-header__content-wrapper">
              <div className="o-header__menu-items">
                <div className="o-header__menu-item">
                  <Link to={'/'} className="a-button-negative o-header__button">Home</Link>
                </div>
                <div className="o-header__menu-item">
                  <Link to={'/about'} className="a-button-negative o-header__button">About</Link>
                </div>
                <div className="o-header__menu-item">
                  <UserMenu
                    user={this.state.user}
                    loggedIn={this.state.isLoggedin}
                    loginUrl="/login"
                    logoutUrl="/auth/logout/callback/mprofiel">
                  </UserMenu>
                </div>
              </div>
            </div>
          </Header>
        </header>
        <div className="main u-wrapper">
          <div className="u-container u-margin-top-xx u-margin-bottom-lg" role="main">
            <div className="row">
              <div className="col-xs-12">
                <h1 className="u-margin-top-xl">Hello Starter app!</h1>
                <Switch>
                  <Route path="/about" component={About}></Route>
                  <Route path="/login" component={Login}></Route>
                  <Route path="/" component={Home} />
                </Switch>
              </div>
            </div>
          </div>
        </div>
        <footer>
          <Footer />
        </footer>
      </div>
    );
  }
}

export default withRouter(App);
