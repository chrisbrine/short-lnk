import React from 'react';
import PropTypes from 'prop-types';
import { Session } from 'meteor/session';
import { Accounts } from 'meteor/accounts-base';
import FlipMove from 'react-flip-move';

import Header from '../Header';

import AddLink from './AddLink';
import LinksList from './LinksList';
import ShowHiddenLinks from './ShowHiddenLinks';

const App = ({ hidden }) => {
  Session.set('showHidden', hidden);
  return (
    <div className='links'>
      <Header title='Your Links' subtitle={{
        label: 'Logout',
        onClick: () => Accounts.logout(),
        className: 'button button--white button--extrapadding',
      }}/>
      <div className='wrapper'>
        <ShowHiddenLinks />
        <AddLink />
        <LinksList />
      </div>
    </div>
  );
};

export default App;

App.propTypes = {
  hidden: PropTypes.bool.isRequired,
};
