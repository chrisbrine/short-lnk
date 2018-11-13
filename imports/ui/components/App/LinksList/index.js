import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import { Session } from 'meteor/session';
import FlipMove from 'react-flip-move';

import LinkListItem from './../LinkListItem';

import { Links } from '../../../../api/links';

class LinksList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      links: [],
      hidden: false,
    };
  }
  componentDidMount() {
    this.tracker = Tracker.autorun(() => {
      Meteor.subscribe('links');
      const links = Links.find({ hidden: Session.get('showHidden') }).fetch();
      this.setState({ links, hidden: Session.get('showHidden') });
    });
  }
  componentWillUnmount() {
    this.tracker.stop();
  }
  renderLinksListItems() {
    if (this.state.links.length < 1) {
      return (
        <div key='empty' className='link'>
          <div className='link__empty'>
            {this.state.hidden
              ? 'There are no hidden links available.'
              : 'There are no visible links available.'
            }
          </div>
        </div>
      );
    } else {
      return(
        <ul>
          {this.state.links.map((link) => (
            <LinkListItem key={link._id} link={link} />
          ))}
        </ul>
      );
    }
  }
  render() {
    return (
      <div className='linklist'>
        <h2>Links List</h2>
        <FlipMove maintainContainerHeight={true}>
        {this.renderLinksListItems()}
        </FlipMove>
      </div>
    );
  }
}

export default LinksList;
