import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import Modal from 'react-modal';

class AddLink extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: '',
      active: false,
      url: '',
      type: 'http://',
    };
  }
  onSubmit = (e) => {
    let url = this.state.url.trim();

    if (!(url.startsWith('http://') || url.startsWith('https://'))) {
      url = this.state.type + url;
    }

    e.preventDefault();

    Meteor.call('links.insert', url, Session.get('showHidden'), (err, res) => {
      if (err) {
        this.setState({
          error: err.reason,
          active: true,
          url: this.state.url,
          type: this.state.type,
        });
      } else {
        this.closeForm();
      }
    });
  }
  handleChange = (e) => {
    this.setState((curState) => { return {
      ...curState,
      type: this.refs.type.value,
      url: this.refs.url.value,
      error: '',
    };});
  }
  openForm= () => {
    this.setState({ active: true });
  }
  closeForm = () => {
    this.setState({
      error: '',
      active: false,
      url: '',
      type: this.state.type,
    });
  }
  render() {
    const formClasses = this.state.active
      ? 'boxed-view module active'
      : 'boxed-view module hidden';
    return (
      <div className='addlink'>
        <button onClick={() => this.openForm()} className='button button--purple button--large button--fullwidth'>+ ADD LINK</button>
          <Modal
            isOpen={this.state.active}
            onRequestClose={() => this.closeForm()}
            className='boxed-view__box'
            overlayClassName='boxed-view boxed-view--modal'
            contentLabel='Add Link'
            ariaHideApp={false}
          >
              {this.state.error ? (
                <div className='addlink__error'>
                  {this.state.error}
                </div>
              ) : null}
              <form onSubmit={this.onSubmit} className='addlink__form'>
                <div className='addlink__form__control boxed-view__box__formcontrol'>
                  <select ref='type' defaultValue={this.state.type} onChange={this.handleChange}>
                    <option value='http://'>http://</option>
                    <option value='https://'>https://</option>
                    <option value=''></option>
                  </select>
                  <input type='text' ref='url' placeholder='URL' value={this.state.url} onChange={this.handleChange} />
                </div>
                <button className='button button--purple'>Add Link</button>
                <button className='button' onClick={() => this.closeForm()}>Cancel</button>
              </form>
          </Modal>
      </div>
    );
  }
}

export default AddLink;
