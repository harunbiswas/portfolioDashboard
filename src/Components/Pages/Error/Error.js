// External Imports
import React, { Component } from 'react';
// Internal Imports
import './Error.scss';


export default class Error extends Component {
  render() {
    return (
      <div className="errorWrapper"> 
        <h2 className='errorWrapper-text'><span>OPPS! </span> (404) Page not found!</h2>
      </div>
    );
  }
}
