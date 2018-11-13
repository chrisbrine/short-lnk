import { Meteor } from 'meteor/meteor';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, browserHistory } from 'react-router-dom';

import Routes from './../imports/ui/components/Routes';
import '../imports/startup/simple-schema-configuration.js';

Meteor.startup(() => {
  ReactDOM.render(
    <BrowserRouter history={browserHistory}>
      <Routes />
    </BrowserRouter>
  ,
    document.getElementById('app')
  );
});
