import $ from 'jquery';
import _ from 'underscore';
import 'imports?$=jquery,jQuery=jquery!../css/semantic/semantic.min.js';
import '../css/style.css';
import React, { Component } from 'react';

window.React = React;
window.$ = $;
window.jQuery = $;
window._ = _;

//prevent caching of api data
$.ajaxSetup({ cache: false });

export default class App extends Component {
  constructor() {
    super();
  }

  render() {

    return (
      <div>Hello World</div>
    );
  }
}
