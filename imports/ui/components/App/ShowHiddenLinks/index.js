import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Session } from 'meteor/session';

class ShowHiddenLinks extends Component {
  handleHidden = () => {
    if (Session.get('showHidden')) {
      return this.props.history.replace('/links');
    } else {
      return this.props.history.replace('/links/hidden')
    }
  }
  render() {
    return (
      <div className='showhiddenlinks'>
        <button onClick={this.handleHidden} className='button button--larger button--fullwidth button--extrapadding'>
          {Session.get('showHidden') ? 'Show Visible Links' : 'Show Hidden Links'}
        </button>
      </div>
    );
  }
};

export default withRouter(ShowHiddenLinks);
