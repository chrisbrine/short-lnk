import React, { Component } from 'react';
import PropTypes from 'prop-types';

const Header = ({ title = 'Short Lnk', subtitle = undefined}) => {
  let subheader;
  if (typeof subtitle === 'object') {
    subheader = (
      <button
        onClick={subtitle.onClick}
        className={subtitle.className}
      >
        {subtitle.label}
      </button>
    );
  } else {
    if (subtitle !== undefined) {
      subheader = (
        <h2>{subtitle}</h2>
      );
    }
  }
  return (
    <header className='header'>
      <div className='wrapper'>
        <h1>{title}</h1>
        {subheader}
      </div>
    </header>
  );
}

export default Header;
