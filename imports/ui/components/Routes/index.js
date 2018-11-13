import React, { Component, Fragment } from 'react';
import {
  Route,
  Switch,
  Link,
  Redirect,
  withRouter,
} from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';

import Login from './../Login';
import Signup from './../Signup';
import App from './../App';
import NotFound from './../NotFound';

class Routes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: false,
    };
  }
  componentWillMount() {
    this.tracker = Tracker.autorun(() => {
      const isAuthenticated = !!Meteor.userId();
      this.setState({ isAuthenticated });
    })
  }
  componentWillUnmount() {
    this.tracker.stop();
  }
  onEnterPublicPage = () => {
    if (this.state.isAuthenticated) {
      return <Redirect to='/links' />;
    }
  }
  onEnterPrivatePage = () => {
    if (!this.state.isAuthenticated) {
      return <Redirect to='/' />;
    }
  }
  render() {
    return (
      <div className='container'>
        <Switch>
          <Route path='/' exact component={() => (
            <Fragment>
              {this.onEnterPublicPage()}
              <Login />
            </Fragment>
          )} />
          <Route path='/signup' exact component={() => (
            <Fragment>
              {this.onEnterPublicPage()}
              <Signup />
            </Fragment>
          )} />
          <Route path='/links' exact component={() => (
            <Fragment>
              {this.onEnterPrivatePage()}
              <App hidden={false} />
            </Fragment>
          )} />
          <Route path='/links/hidden' exact component={() => (
            <Fragment>
              {this.onEnterPrivatePage()}
              <App hidden={true} />
            </Fragment>
          )} />
          <Route component={() => (
            <Fragment>
              <NotFound />
            </Fragment>
          )} />
        </Switch>
      </div>
    );
  }
}

export default withRouter(Routes);
