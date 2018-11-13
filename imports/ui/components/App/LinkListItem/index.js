import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { Redirect } from 'react-router-dom';
import Clipboard from 'clipboard';
import Moment from 'moment';

class LinkListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      copyLabel: 'Copy',
    };
  }
  componentDidMount() {
    this.clipboard = new Clipboard(this.refs.copy);

    this.clipboard.on('success', (e) => {
      this.setState({ copyLabel: 'Copied' });
      setTimeout(() => {
        this.setState({ copyLabel: 'Copy' });
      }, 1000);
    }).on('error', (e) => {
      this.setState({ copyLabel: 'Failed' });
      setTimeout(() => {
        this.setState({ copyLabel: 'Copy' });
      }, 1000);
    });

  }
  componentWillUnmount() {
    this.clipboard.destroy;
  }
  toggleHide = () => {
    Meteor.call('links.toggleHide', this.props.link._id, !this.props.link.hidden, (err, res) => { return; });
  }
  renderStats = () => {
    const visits = this.props.link.visits;
    const visitMessage = visits != 1 ? visits + ' visits' : visits + ' visit';
    const lastvisitMessage = this.props.link.lastvisit
      ? ' (visited ' + Moment(this.props.link.lastvisit).fromNow() + ')'
      : null;
    return (
      <div className='link__visits'>
        {visitMessage}{lastvisitMessage}
      </div>
    );
  }
  removeItem = () => {
    const resp = window.confirm('Are you sure you wish to delete this link?');
    if (resp) {
      Meteor.call('links.delete', this.props.link._id);
    }
  }
  render() {
    const { link } = this.props;
    const linkUrl = Meteor.absoluteUrl(link._id);
    return (
      <li key={link._id} className='link'>
        <div className='link__url'>
          {link.url}
        </div>
        <div className='link__id'>
          {linkUrl}
        </div>
        {this.renderStats()}
        <div className='link__buttons'>
          <a href={linkUrl} target='_blank'>
            <button className='button button--bold button--spacebetween'>
              VISIT
            </button>
          </a>
          <button className='button button--bold button--spacebetween' ref='copy' data-clipboard-text={linkUrl}>
            {this.state.copyLabel}
          </button>
          <button className='button button--bold button--spacebetween' onClick={this.toggleHide}>
            {link.hidden ? 'Unhide' : 'Hide'}
          </button>
          <button className='button button--bold button--spacebetween' onClick={this.removeItem}>
            Delete
          </button>
        </div>
      </li>
    );
  }
}

export default LinkListItem;

LinkListItem.propTypes = {
  link: PropTypes.object.isRequired,
};
