import React, { Component } from 'react';
import Home from './containers/Home'

import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faClock, faChair} from '@fortawesome/free-solid-svg-icons'

library.add(faClock, faChair)

const About = () => (
  <div>
    <h2>About</h2>
  </div>
)

const BasicExample = () => (

  <Home />
)
export default BasicExample
