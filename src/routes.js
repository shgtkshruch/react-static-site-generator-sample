import React from 'react';
import { Route } from 'react-router';
import Top from './top/top';
import About from './about/about';
import Title from './title';

module.exports = (
  <Route >
    <Route path="/index.html" component={ Top } />
    <Route path="/about.html" component={ About } />
  </Route>
);
